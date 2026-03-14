import { NextRequest, NextResponse } from "next/server";
import { guardAdmin } from "@/lib/admin-api";
import { supabase } from "@/lib/supabase";
import { makeId } from "@/lib/db";
import { getExplorerCategories } from "@/lib/site-data";

export async function GET() {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  return NextResponse.json({ items: await getExplorerCategories() });
}

export async function POST(request: NextRequest) {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  const body = (await request.json()) as { name?: string };
  const name = body.name?.trim();
  if (!name) {
    return NextResponse.json({ error: "Category name is required." }, { status: 400 });
  }

  const { count } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true });

  const { error: insertError } = await supabase
    .from("categories")
    .insert({ id: makeId(name, "category"), name, sort_order: count ?? 0 });

  if (insertError) {
    return NextResponse.json({ error: "Failed to create category." }, { status: 500 });
  }

  return NextResponse.json({ items: await getExplorerCategories() });
}

export async function PUT(request: NextRequest) {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  const body = (await request.json()) as { items?: Array<{ id: string; name: string }> };
  if (!Array.isArray(body.items)) {
    return NextResponse.json({ error: "Invalid categories payload." }, { status: 400 });
  }

  await Promise.all(
    body.items.map((item, index) =>
      supabase
        .from("categories")
        .update({ name: item.name.trim(), sort_order: index })
        .eq("id", item.id),
    ),
  );

  return NextResponse.json({ items: await getExplorerCategories() });
}

export async function DELETE(request: NextRequest) {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing category id." }, { status: 400 });
  }

  const { count } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("category_id", id);

  if ((count ?? 0) > 0) {
    return NextResponse.json(
      { error: "Delete or move projects in this category before removing it." },
      { status: 400 },
    );
  }

  const { error: deleteError } = await supabase.from("categories").delete().eq("id", id);
  if (deleteError) {
    return NextResponse.json({ error: "Failed to delete category." }, { status: 500 });
  }

  return NextResponse.json({ items: await getExplorerCategories() });
}