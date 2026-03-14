import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  findAdminByEmail,
  getSessionCookieOptions,
  isValidAdminEmail,
  verifyPassword,
  SESSION_COOKIE_NAME,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as { email?: string; password?: string };
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password?.trim() ?? "";

  if (!isValidAdminEmail(email) || password.length === 0) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
  }

  const admin = await findAdminByEmail(email);
  if (!admin) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const isMatch = await verifyPassword(password, admin.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await createSessionToken({ id: admin.id, email: admin.email });
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, getSessionCookieOptions());
  return response;
}
