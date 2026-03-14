import { NextResponse } from "next/server";
import { guardAdmin } from "@/lib/admin-api";
import { supabase } from "@/lib/supabase";
import { getSiteSettings } from "@/lib/site-data";

const supportedMimeTypes = new Set(["image/png", "image/jpeg", "image/svg+xml", "image/x-icon", "image/webp"]);

export async function POST(request: Request) {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  const formData = await request.formData();
  const file = formData.get("favicon");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Favicon file is required." }, { status: 400 });
  }

  if (!supportedMimeTypes.has(file.type)) {
    return NextResponse.json({ error: "Unsupported favicon format." }, { status: 400 });
  }

  // Convert the uploaded file to base64 for storage in PostgreSQL TEXT column
  const arrayBuffer = await file.arrayBuffer();
  const base64Data = Buffer.from(arrayBuffer).toString("base64");
  const updatedAt = new Date().toISOString();

  const { error: updateError } = await supabase
    .from("settings")
    .update({
      favicon_data: base64Data,
      favicon_mime: file.type,
      favicon_updated_at: updatedAt,
    })
    .eq("id", 1);

  if (updateError) {
    return NextResponse.json({ error: "Failed to upload favicon." }, { status: 500 });
  }

  return NextResponse.json({ item: await getSiteSettings() });
}