import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data } = await supabase
    .from("settings")
    .select("favicon_data, favicon_mime, favicon_updated_at")
    .eq("id", 1)
    .single();

  if (data?.favicon_data && data?.favicon_mime) {
    const buffer = Buffer.from(data.favicon_data, "base64");
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": data.favicon_mime,
        "Cache-Control": "no-store, max-age=0",
        ETag: data.favicon_updated_at ?? `${Date.now()}`,
      },
    });
  }

  // Fallback SVG favicon when no custom favicon is set
  const fallbackSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <rect width="64" height="64" rx="18" fill="#050505"/>
      <rect x="8" y="8" width="48" height="48" rx="14" fill="#0d0d0d" stroke="rgba(255,42,42,0.5)"/>
      <path d="M22 36c0-7 4-12 10-12 4 0 7 2 9 5" fill="none" stroke="#ff2a2a" stroke-width="5" stroke-linecap="round"/>
      <circle cx="44" cy="22" r="4" fill="#ff2a2a"/>
    </svg>
  `;

  return new NextResponse(fallbackSvg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}