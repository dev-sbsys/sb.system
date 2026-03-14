"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleLogout() {
    setError(null);
    const response = await fetch("/api/admin/auth/logout", { method: "POST" });
    if (!response.ok) {
      setError("Unable to log out right now.");
      return;
    }

    startTransition(() => {
      router.push("/admin/login");
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-2">
      {error ? <span className="hidden text-xs text-rose-400 xl:block">{error}</span> : null}
      <button type="button" onClick={handleLogout} disabled={isPending} className="rounded-xl border border-[#1f2937] bg-[#111827] px-4 py-2 text-sm font-medium text-[#e5e7eb] transition hover:-translate-y-0.5 hover:border-[#374151] hover:bg-[#0b1220] disabled:cursor-not-allowed disabled:opacity-60">
        {isPending ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
