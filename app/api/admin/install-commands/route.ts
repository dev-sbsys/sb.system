import { NextRequest, NextResponse } from "next/server";
import { guardAdmin } from "@/lib/admin-api";
import { supabase } from "@/lib/supabase";
import { getInstallCommands } from "@/lib/site-data";

export async function GET() {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  return NextResponse.json({ items: await getInstallCommands() });
}

export async function POST(request: NextRequest) {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  const body = (await request.json()) as { osName?: string; command?: string };
  const osName = body.osName?.trim();
  const command = body.command?.trim();

  if (!osName || !command) {
    return NextResponse.json({ error: "OS Name and Command are required." }, { status: 400 });
  }

  const { error: insertError } = await supabase.from("install_commands").insert({
    os_name: osName,
    command: command,
  });

  if (insertError) {
    return NextResponse.json({ error: "Failed to create install command." }, { status: 500 });
  }

  return NextResponse.json({ items: await getInstallCommands() });
}

export async function PUT(request: NextRequest) {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  const body = (await request.json()) as { id?: string; osName?: string; command?: string };

  if (!body.id) {
    return NextResponse.json({ error: "Command ID is required." }, { status: 400 });
  }

  const { error: updateError } = await supabase
    .from("install_commands")
    .update({
      os_name: body.osName?.trim(),
      command: body.command?.trim(),
    })
    .eq("id", body.id);

  if (updateError) {
    return NextResponse.json({ error: "Failed to update install command." }, { status: 500 });
  }

  return NextResponse.json({ items: await getInstallCommands() });
}

export async function DELETE(request: NextRequest) {
  const access = await guardAdmin();
  if (!access.ok) return access.response;

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing command ID." }, { status: 400 });
  }

  const { error: deleteError } = await supabase.from("install_commands").delete().eq("id", id);
  if (deleteError) {
    return NextResponse.json({ error: "Failed to delete install command." }, { status: 500 });
  }

  return NextResponse.json({ items: await getInstallCommands() });
}
