import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ teamId: string }> }
) {
  try {
    const { teamId } = await context.params;
    const { email, role } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { data: member, error } = await supabase
      .from("team_members")
      .insert({
        team_id: teamId,
        email,
        role: role || "developer",
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, member });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
