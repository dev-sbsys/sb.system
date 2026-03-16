import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ teamId: string }> }
) {
  try {
    const { teamId } = await context.params;

    // 1. Fetch Team
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .select("*")
      .eq("id", teamId)
      .single();

    if (teamError || !team) {
      return NextResponse.json({ error: "Workspace not found" }, { status: 404 });
    }

    // 2. Fetch Members
    const { data: members, error: membersError } = await supabase
      .from("team_members")
      .select("*")
      .eq("team_id", teamId);

    // 3. Fetch Projects
    const { data: projects, error: projectsError } = await supabase
      .from("projects")
      .select("*")
      .eq("team_id", teamId);

    return NextResponse.json({
      success: true,
      team,
      members: members || [],
      projects: projects || [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
