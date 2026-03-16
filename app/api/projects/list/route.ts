import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ projects: [] });
    }

    // 1. Get all team IDs the user belongs to
    const { data: userTeams, error: teamError } = await supabase
      .from("team_members")
      .select("team_id")
      .eq("email", email.trim().toLowerCase());

    if (teamError) throw teamError;
    
    const teamIds = (userTeams || []).map(t => t.team_id);

    // 2. Fetch projects: 
    // - Projects created by the user
    // - OR projects within teams the user is a member of
    let query = supabase
      .from("projects")
      .select(`
        *,
        teams (
          id,
          name
        )
      `);

    if (teamIds.length > 0) {
      query = query.or(`creator_email.eq.${email.trim().toLowerCase()},team_id.in.(${teamIds.join(",")})`);
    } else {
      query = query.eq("creator_email", email.trim().toLowerCase());
    }

    const { data: projects, error: projectError } = await query.order("created_at", { ascending: false });

    if (projectError) throw projectError;

    return NextResponse.json({ success: true, projects });
  } catch (error: any) {
    console.error("List All Projects Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
