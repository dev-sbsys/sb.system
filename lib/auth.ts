import { compare, hash } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { supabase } from "./supabase";

const SESSION_COOKIE_NAME = "agelent_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AdminRecord = {
  id: string;
  email: string;
  password: string;
};

type AdminSession = {
  adminId: string;
  email: string;
  isAdmin: true;
};

function getJwtSecret() {
  return new TextEncoder().encode(process.env.AUTH_SECRET ?? "agelent-local-session-secret");
}

export function isValidAdminEmail(email: string) {
  return emailPattern.test(email.trim().toLowerCase());
}

export function isValidAdminPassword(password: string) {
  return password.trim().length >= 8;
}

export async function hashPassword(password: string) {
  return hash(password, 10);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return compare(password, passwordHash);
}

export async function findAdminByEmail(email: string): Promise<AdminRecord | undefined> {
  const { data, error } = await supabase
    .from("admins")
    .select("id, email, password")
    .eq("email", email.trim().toLowerCase())
    .single();

  if (error || !data) return undefined;
  return data as AdminRecord;
}

export async function createSessionToken(admin: { id: string; email: string }) {
  return new SignJWT({ email: admin.email, isAdmin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(admin.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getJwtSecret());
}

export async function verifySessionToken(token: string) {
  const verified = await jwtVerify(token, getJwtSecret());
  if (!verified.payload.sub || typeof verified.payload.email !== "string") {
    return null;
  }

  return {
    adminId: verified.payload.sub,
    email: verified.payload.email,
    isAdmin: true,
  } satisfies AdminSession;
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  };
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  try {
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  return getAdminSession();
}

export { SESSION_COOKIE_NAME };
