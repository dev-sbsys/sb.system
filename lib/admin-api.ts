import { NextResponse } from "next/server";
import { requireAdmin } from "./auth";

export async function guardAdmin() {
  const session = await requireAdmin();
  if (!session) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { ok: true as const, session };
}
