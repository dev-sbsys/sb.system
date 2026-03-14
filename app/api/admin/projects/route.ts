import { NextRequest, NextResponse } from "next/server";
import { guardAdmin } from "@/lib/admin-api";
import { supabase } from "@/lib/supabase";
import { makeId } from "@/lib/db";
import { getExplorerProjects } from "@/lib/site-data";

export async function GET() {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  return NextResponse.json({ items: await getExplorerProjects() });
}

export async function POST(request: NextRequest) {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  const body = (await request.json()) as {
    name?: string;
    description?: string;
    categoryId?: string;
    githubLink?: string;
    demoLink?: string;
  };

  const name = body.name?.trim();
  const description = body.description?.trim();
  const categoryId = body.categoryId?.trim();
  const githubLink = body.githubLink?.trim();
  const demoLink = body.demoLink?.trim();

  if (!name || !description || !categoryId || !githubLink || !demoLink) {
    return NextResponse.json({ error: "All project fields are required." }, { status: 400 });
  }

  const { count } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  const { error: insertError } = await supabase.from("projects").insert({
    id: makeId(name, "project"),
    name,
    description,
    category_id: categoryId,
    github_link: githubLink,
    demo_link: demoLink,
    sort_order: count ?? 0,
  });

  if (insertError) {
    return NextResponse.json({ error: "Failed to create project." }, { status: 500 });
  }

  return NextResponse.json({ items: await getExplorerProjects() });
}

export async function PUT(request: NextRequest) {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  const body = (await request.json()) as {
    id?: string;
    name?: string;
    description?: string;
    categoryId?: string;
    githubLink?: string;
    demoLink?: string;
  };

  if (!body.id) {
    return NextResponse.json({ error: "Project id is required." }, { status: 400 });
  }

  const { error: updateError } = await supabase
    .from("projects")
    .update({
      name: body.name?.trim(),
      description: body.description?.trim(),
      category_id: body.categoryId?.trim(),
      github_link: body.githubLink?.trim(),
      demo_link: body.demoLink?.trim(),
    })
    .eq("id", body.id);

  if (updateError) {
    return NextResponse.json({ error: "Failed to update project." }, { status: 500 });
  }

  return NextResponse.json({ items: await getExplorerProjects() });
}

export async function DELETE(request: NextRequest) {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing project id." }, { status: 400 });
  }

  const { error: deleteError } = await supabase.from("projects").delete().eq("id", id);
  if (deleteError) {
    return NextResponse.json({ error: "Failed to delete project." }, { status: 500 });
  }

  return NextResponse.json({ items: await getExplorerProjects() });
}