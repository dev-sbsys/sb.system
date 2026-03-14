import { NextRequest, NextResponse } from "next/server";
import { guardAdmin } from "@/lib/admin-api";
import { supabase } from "@/lib/supabase";
import { getSiteSettings } from "@/lib/site-data";

export async function GET() {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  return NextResponse.json({ item: await getSiteSettings() });
}

export async function PUT(request: NextRequest) {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  const body = (await request.json()) as {
    websiteName?: string;
    websiteEmail?: string;
    maintenanceMode?: boolean;
  };

  const websiteName = body.websiteName?.trim();
  const websiteEmail = body.websiteEmail?.trim();

  if (!websiteName || !websiteEmail) {
    return NextResponse.json({ error: "Website name and email are required." }, { status: 400 });
  }

  const { error: updateError } = await supabase
    .from("settings")
    .update({
      website_name: websiteName,
      website_email: websiteEmail,
      maintenance_mode: body.maintenanceMode ?? false,
    })
    .eq("id", 1);

  if (updateError) {
    return NextResponse.json({ error: "Failed to save settings." }, { status: 500 });
  }

  return NextResponse.json({ item: await getSiteSettings() });
}