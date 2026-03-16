"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { jetBrainsMono } from "./siteTheme";

type SidebarItem = {
  href: string;
  label: string;
  command: string;
  icon: ReactNode;
  match: string[];
};

type AdminSidebarProps = {
  onNavigate?: () => void;
};

export default function AdminSidebar({ onNavigate }: AdminSidebarProps) {
  const pathname = usePathname();

  const items: SidebarItem[] = [
    { href: "/admin/dashboard#quick-links", label: "Quick Links", command: "edit quick-links", match: ["/admin/dashboard"], icon: <LinkIcon /> },
    { href: "/admin/projects", label: "Explorer Tabs", command: "manage tabs + projects", match: ["/admin/projects"], icon: <LayersIcon /> },
    { href: "/admin/install-commands", label: "Commands", command: "agelent.admin.installer", match: ["/admin/install-commands"], icon: <TerminalIcon /> },
    { href: "/admin/settings", label: "Settings", command: "edit settings", match: ["/admin/settings"], icon: <GearIcon /> },
    { href: "/admin/admins", label: "Admin Management", command: "manage admins", match: ["/admin/admins"], icon: <ShieldIcon /> },
  ];

  return (
    <aside className={`${jetBrainsMono.className} flex h-full flex-col overflow-hidden rounded-[24px] border border-[#1f2937] bg-[#020617] text-[#e5e7eb] shadow-[0_18px_60px_rgba(2,6,23,0.45)]`}>
      <div className="border-b border-[#1f2937] px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
          <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
          <span className="h-3 w-3 rounded-full bg-[#22c55e]" />
          <span className="ml-3 text-[11px] uppercase tracking-[0.28em] text-[#94a3b8]">AGELENT.ADMIN.SHELL</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-5">
        <div className="rounded-2xl border border-[#1f2937] bg-[#0b1120] px-4 py-4 text-xs leading-6 text-[#94a3b8]">
          <div><span className="text-[#6366f1]">$</span> connect admin</div>
          <div><span className="text-[#64748b]">&gt;</span> developer console ready</div>
        </div>

        <nav className="mt-5 space-y-2">
          {items.map((item) => {
            const isActive = item.match.includes(pathname);

            return (
              <Link
                key={item.label}
                href={item.href}
                prefetch
                onClick={onNavigate}
                className={`group flex items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-200 ${isActive
                  ? "border-[#374151] bg-[#111827] shadow-[inset_0_0_0_1px_rgba(99,102,241,0.28)]"
                  : "border-transparent bg-transparent hover:border-[#1f2937] hover:bg-[#0f172a]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${isActive ? "border-[#3730a3]/40 bg-[#312e81]/20 text-[#a5b4fc]" : "border-[#1f2937] bg-[#0b1120] text-[#94a3b8] group-hover:text-[#cbd5e1]"}`}>
                    {item.icon}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-[#e5e7eb]">&gt; {item.label}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#64748b]">{item.command}</div>
                  </div>
                </div>
                <span className={`h-2.5 w-2.5 rounded-full transition ${isActive ? "bg-[#6366f1]" : "bg-[#1f2937] group-hover:bg-[#334155]"}`} />
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

function DashboardIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" stroke="currentColor" strokeWidth="1.7" /></svg>;
}
function LinkIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="M10 14 21 3M15 3h6v6M9 7H6a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
}
function LayersIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="m12 4 8 4-8 4-8-4 8-4Zm8 8-8 4-8-4m16 4-8 4-8-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
}
function GearIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="M12 8.25A3.75 3.75 0 1 0 12 15.75A3.75 3.75 0 1 0 12 8.25z" stroke="currentColor" strokeWidth="1.7" /><path d="M19.4 15a1.2 1.2 0 0 0 .24 1.32l.04.04a1.5 1.5 0 0 1-2.12 2.12l-.04-.04A1.2 1.2 0 0 0 16.2 18.2a1.2 1.2 0 0 0-.72.24 1.2 1.2 0 0 0-.48.96V20a1.5 1.5 0 0 1-3 0v-.08a1.2 1.2 0 0 0-.48-.96A1.2 1.2 0 0 0 10.8 18.2a1.2 1.2 0 0 0-1.32.24l-.04.04a1.5 1.5 0 0 1-2.12-2.12l.04-.04A1.2 1.2 0 0 0 7.6 15a1.2 1.2 0 0 0-.24-.72 1.2 1.2 0 0 0-.96-.48H6a1.5 1.5 0 0 1 0-3h.08a1.2 1.2 0 0 0 .96-.48A1.2 1.2 0 0 0 7.6 9a1.2 1.2 0 0 0-.24-1.32l-.04-.04a1.5 1.5 0 0 1 2.12-2.12l.04.04A1.2 1.2 0 0 0 10.8 5.8a1.2 1.2 0 0 0 .72-.24 1.2 1.2 0 0 0 .48-.96V4a1.5 1.5 0 0 1 3 0v.08a1.2 1.2 0 0 0 .48.96 1.2 1.2 0 0 0 .72.24 1.2 1.2 0 0 0 1.32-.24l.04-.04a1.5 1.5 0 0 1 2.12 2.12l-.04.04A1.2 1.2 0 0 0 19.4 9c0 .26.08.51.24.72.2.29.53.46.88.48H21a1.5 1.5 0 0 1 0 3h-.08a1.2 1.2 0 0 0-.96.48 1.2 1.2 0 0 0-.24.72z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" /></svg>;
}
function ShieldIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 5 3.5 8.7 7 10 3.5-1.3 7-5 7-10V6z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" /></svg>;
}
function TerminalIcon() {
  return <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
}
