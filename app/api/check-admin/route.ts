import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const session = await getAdminSession();

  if (!session?.email) {
    return NextResponse.json({ isAdmin: false });
  }

  const { data } = await supabase
    .from("admins")
    .select("id")
    .eq("email", session.email.toLowerCase())
    .maybeSingle();

  return NextResponse.json({ isAdmin: Boolean(data?.id) });
}
