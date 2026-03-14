import { NextRequest, NextResponse } from "next/server";
import { guardAdmin } from "@/lib/admin-api";
import { supabase } from "@/lib/supabase";
import { hashPassword, isValidAdminEmail, isValidAdminPassword } from "@/lib/auth";

async function getAdmins() {
  const { data, error } = await supabase
    .from("admins")
    .select("email, created_at")
    .order("email", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => ({
    email: row.email,
    createdAt: row.created_at,
  }));
}

export async function GET() {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  return NextResponse.json({ items: await getAdmins() });
}

export async function POST(request: NextRequest) {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  const body = (await request.json()) as { email?: string; password?: string };
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password?.trim() ?? "";

  if (!isValidAdminEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!isValidAdminPassword(password)) {
    return NextResponse.json({ error: "Password must be at least 8 characters long." }, { status: 400 });
  }

  const { data: existing } = await supabase
    .from("admins")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing?.id) {
    return NextResponse.json({ error: "An admin with that email already exists." }, { status: 400 });
  }

  try {
    const passwordHash = await hashPassword(password);
    const { error: insertError } = await supabase
      .from("admins")
      .insert({ id: crypto.randomUUID(), email, password: passwordHash });

    if (insertError) {
      return NextResponse.json({ error: "Failed to create admin." }, { status: 500 });
    }

    return NextResponse.json({ items: await getAdmins() });
  } catch (err) {
    return NextResponse.json({ error: "Failed to process the request securely." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  const email = new URL(request.url).searchParams.get("email")?.trim().toLowerCase();
  if (!email) {
    return NextResponse.json({ error: "Missing admin email." }, { status: 400 });
  }

  const { count } = await supabase
    .from("admins")
    .select("*", { count: "exact", head: true });

  if ((count ?? 0) <= 1) {
    return NextResponse.json({ error: "At least one admin must remain in the system." }, { status: 400 });
  }

  const { error: deleteError } = await supabase.from("admins").delete().eq("email", email);
  if (deleteError) {
    return NextResponse.json({ error: "Failed to remove admin." }, { status: 500 });
  }

  return NextResponse.json({ items: await getAdmins() });
}
