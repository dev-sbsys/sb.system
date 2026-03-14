"use client";

import { useState, type ReactNode } from "react";
import { sora } from "./siteTheme";
import AdminSidebar from "./AdminSidebar";
import AdminLogoutButton from "./AdminLogoutButton";
import { jetBrainsMono } from "./siteTheme";

type AdminShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  userEmail?: string | null;
  children: ReactNode;
};

export default function AdminShell({ title, eyebrow, description, userEmail, children }: AdminShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const initial = userEmail?.[0]?.toUpperCase() ?? "A";

  return (
    <main className={`${sora.className} min-h-screen bg-[#0f172a] text-[#e5e7eb}`}>
      <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="hidden lg:block lg:h-[calc(100vh-2rem)] lg:sticky lg:top-4">
            <AdminSidebar />
          </div>

          {menuOpen ? (
            <div className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden" onClick={() => setMenuOpen(false)}>
              <div className="h-full w-[290px] p-4" onClick={(event) => event.stopPropagation()}>
                <AdminSidebar onNavigate={() => setMenuOpen(false)} />
              </div>
            </div>
          ) : null}

          <div className="min-w-0 space-y-6">
            <header className={`${jetBrainsMono.className} rounded-[24px] border border-[#1f2937] bg-[#020617] px-6 py-5`}>

              {/* terminal bar */}
              <div className="flex items-center gap-2 border-b border-[#1f2937] pb-4">


                <span className="ml-3 text-[11px] uppercase tracking-[0.28em] text-[#94a3b8]">
                  SB.ADMIN.SHELL
                </span>
              </div>

              <div className="flex items-start justify-between pt-5">

                {/* terminal text */}
                <div>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[#6366f1]">
                    {eyebrow}
                  </div>

                  <div className="mt-2 text-xl font-semibold text-[#e5e7eb]">
                    <span className="text-[#6366f1]">$</span> {title.replace(" ", ".").toLowerCase()}
                  </div>


                </div>

                {/* session panel */}
                <div className="flex items-center gap-3 rounded-2xl border border-[#1f2937] bg-[#0b1120] px-3 py-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#312e81] text-sm font-semibold text-[#e5e7eb]">
                    {initial}
                  </div>

                  <div className="hidden sm:block">
                    <div className="text-sm text-[#94a3b8]">{userEmail ?? "admin@sb.system"}</div>
                  </div>

                  <AdminLogoutButton />
                </div>

              </div>

            </header>

            <div className="animate-[sectionFade_0.45s_ease_forwards]">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
