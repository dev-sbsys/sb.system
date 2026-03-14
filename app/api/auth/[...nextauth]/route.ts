import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ error: "Email/password login is active. This OAuth route is disabled." }, { status: 404 });
}

export async function POST() {
  return NextResponse.json({ error: "Email/password login is active. This OAuth route is disabled." }, { status: 404 });
}
