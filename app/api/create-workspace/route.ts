import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workspace_name, description, member_emails, owner_email } = body;

    if (!workspace_name || !owner_email) {
      return NextResponse.json(
        { success: false, error: "Workspace name and owner email are required" },
        { status: 400 }
      );
    }

    // 1. Create the team
    const { data: team, error: teamError } = await supabase
      .from("teams")
      .insert({
        name: workspace_name,
        description: description,
        owner_id: owner_email,
      })
      .select()
      .single();

    if (teamError || !team) {
      console.error("Supabase Team Error:", teamError);
      throw new Error(teamError?.message || "Failed to create team record");
    }

    // 2. Add members (owner + invited)
    const membersToInsert = [
      { team_id: team.id, email: owner_email, role: "owner" },
      ...member_emails.map((email: string) => ({
        team_id: team.id,
        email,
        role: "developer",
      })),
    ];

    const { error: membersError } = await supabase
      .from("team_members")
      .insert(membersToInsert);

    if (membersError) {
      console.error("Supabase Members Error:", membersError);
      // Optional: Cleanup team if members fail? Or just let it be.
    }

    return NextResponse.json({
      success: true,
      teamId: team.id,
    });
  } catch (error: any) {
    console.error("Create Workspace Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create workspace" },
      { status: 500 }
    );
  }
}
