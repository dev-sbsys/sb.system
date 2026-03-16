import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { makeId } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: { teamId: string } }
) {
  try {
    const { teamId } = params;
    const { name, description, creator_email } = await request.json();

    if (!name) {
      return NextResponse.json({ error: "Project name is required" }, { status: 400 });
    }

    const { data: project, error } = await supabase
      .from("projects")
      .insert({
        id: makeId(name, "project"),
        team_id: teamId,
        name,
        description: description || "",
        creator_email: creator_email || "",
        created_at: new Date().toISOString(),
        // Keep these if they are likely NOT NULL and don't have FKs
        github_link: "",
        demo_link: "",
        sort_order: 0
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, project });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
