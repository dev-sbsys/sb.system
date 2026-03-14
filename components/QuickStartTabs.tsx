"use client";

import { useState } from "react";
import type { QuickLink } from "@/lib/site-data";
import SectionHeader from "./SectionHeader";
import { sora } from "./siteTheme";

type QuickStartTabsProps = {
  quickLinks: QuickLink[];
};

export default function QuickStartTabs({ quickLinks }: QuickStartTabsProps) {
  const [activeTab, setActiveTab] = useState(quickLinks[0]?.id ?? "");
  const activeLink = quickLinks.find((tab) => tab.id === activeTab)?.href ?? quickLinks[0]?.href ?? "#";

  function handleOpen() {
    window.open(activeLink, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="quick-links" className={`${sora.className} section-reveal px-6 py-20 text-white sm:py-24`}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-10"><SectionHeader title="Quick Start" /></div>
        <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,17,17,0.92),rgba(8,8,8,0.88))] p-4 shadow-[0_0_50px_rgba(255,42,42,0.08)] backdrop-blur-xl sm:p-6">
          <div className="rounded-[28px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {quickLinks.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${isActive ? "border-[#ff2a2a]/80 bg-[#ff2a2a] text-white shadow-[0_0_20px_rgba(255,42,42,0.28)]" : "border-white/10 bg-[#141414] text-[#9ca3af] hover:border-[#ff2a2a]/45 hover:text-white hover:shadow-[0_0_14px_rgba(255,42,42,0.1)]"}`}>
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,#0c0c0c,#080808)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-[#9ca3af]"><span className="h-2.5 w-2.5 rounded-full bg-[#ff2a2a] shadow-[0_0_16px_rgba(255,42,42,0.75)]" />Quick Link</div>
                <button type="button" onClick={handleOpen} aria-label="Open active quick link" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-200 hover:border-[#ff2a2a]/60 hover:bg-white/10 hover:shadow-[0_0_18px_rgba(255,42,42,0.18)] active:scale-[0.96]">
                  <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24"><path d="M14 5h5v5M10 14 19 5M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
                </button>
              </div>
              <div className="overflow-x-auto rounded-[18px] border border-white/6 bg-black/45 px-4 py-4 font-mono text-sm text-[#e5e7eb] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:px-5"><span className="text-[#ff6b6b]">$</span> <span>{activeLink}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
