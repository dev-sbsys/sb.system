import { NextRequest, NextResponse } from "next/server";
import { guardAdmin } from "@/lib/admin-api";
import { supabase } from "@/lib/supabase";
import { makeId } from "@/lib/db";
import { getQuickLinks } from "@/lib/site-data";

export async function GET() {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  return NextResponse.json({ items: await getQuickLinks() });
}

export async function POST(request: NextRequest) {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  const body = (await request.json()) as { label?: string; href?: string };
  const label = body.label?.trim();
  const href = body.href?.trim();

  if (!label || !href) {
    return NextResponse.json({ error: "Label and link are required." }, { status: 400 });
  }

  const { count } = await supabase
    .from("quick_links")
    .select("*", { count: "exact", head: true });

  const { error: insertError } = await supabase
    .from("quick_links")
    .insert({ id: makeId(label, "link"), label, href, sort_order: count ?? 0 });

  if (insertError) {
    return NextResponse.json({ error: "Failed to add quick link." }, { status: 500 });
  }

  return NextResponse.json({ items: await getQuickLinks() });
}

export async function PUT(request: NextRequest) {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  const body = (await request.json()) as { items?: Array<{ id: string; label: string; href: string }> };
  if (!Array.isArray(body.items)) {
    return NextResponse.json({ error: "Invalid quick links payload." }, { status: 400 });
  }

  await Promise.all(
    body.items.map((item, index) =>
      supabase
        .from("quick_links")
        .update({ label: item.label.trim(), href: item.href.trim(), sort_order: index })
        .eq("id", item.id),
    ),
  );

  return NextResponse.json({ items: await getQuickLinks() });
}

export async function DELETE(request: NextRequest) {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing link id." }, { status: 400 });
  }

  const { error: deleteError } = await supabase.from("quick_links").delete().eq("id", id);
  if (deleteError) {
    return NextResponse.json({ error: "Failed to delete quick link." }, { status: 500 });
  }

  return NextResponse.json({ items: await getQuickLinks() });
}