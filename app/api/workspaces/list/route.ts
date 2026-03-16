import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ teams: [] });
    }

    // Join team_members with teams to get full team details
    const { data: userTeams, error } = await supabase
      .from("team_members")
      .select(`
        team_id,
        teams (
          id,
          name,
          description,
          owner_id,
          created_at
        )
      `)
      .eq("email", email.trim().toLowerCase());

    if (error) throw error;

    // Flatten the result
    const teams = (userTeams || []).map((item: any) => item.teams).filter(Boolean);

    return NextResponse.json({ success: true, teams });
  } catch (error: any) {
    console.error("List Workspaces Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
