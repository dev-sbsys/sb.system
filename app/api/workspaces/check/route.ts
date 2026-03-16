import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ hasWorkspace: false });
    }

    const { data: membership, error } = await supabase
      .from("team_members")
      .select("team_id")
      .eq("email", email.trim().toLowerCase())
      .limit(1)
      .single();

    if (error || !membership) {
      return NextResponse.json({ hasWorkspace: false });
    }

    return NextResponse.json({ 
      hasWorkspace: true, 
      teamId: membership.team_id 
    });
  } catch (error) {
    return NextResponse.json({ hasWorkspace: false });
  }
}
