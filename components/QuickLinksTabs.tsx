"use client";

import { useState } from "react";
import { sora } from "./siteTheme";

type TabKey = "GitHub" | "Discord" | "Docs" | "Website";

const tabs: { key: TabKey; href: string }[] = [
  { key: "GitHub", href: "https://github.com/shahabas" },
  { key: "Discord", href: "https://discord.gg/example" },
  { key: "Docs", href: "https://docs.agelent.dev" },
  { key: "Website", href: "https://agelent.dev" },
];

export default function QuickLinksTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("GitHub");
  const [copied, setCopied] = useState(false);

  const activeLink = tabs.find((tab) => tab.key === activeTab)?.href ?? tabs[0].href;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(activeLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      id="quick-links"
      className={`${sora.className} section-reveal px-6 py-20 text-white sm:py-24`}
    >
      <div className="mx-auto max-w-4xl">
        <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_45px_rgba(255,42,42,0.08)] backdrop-blur-xl sm:p-6">
          <div className="rounded-[28px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;

                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "border border-[#ff2a2a]/80 bg-[#ff2a2a] text-white shadow-[0_0_25px_rgba(255,42,42,0.35)]"
                        : "border border-white/10 bg-white/5 text-[#9ca3af] hover:border-[#ff2a2a]/40 hover:text-white"
                    }`}
                  >
                    {tab.key}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-[24px] border border-white/10 bg-[#090909] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-[#9ca3af]">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff2a2a] shadow-[0_0_16px_rgba(255,42,42,0.75)]" />
                  Quick Link
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white transition-all duration-300 hover:border-[#ff2a2a]/60 hover:bg-white/10 hover:shadow-[0_0_24px_rgba(255,42,42,0.18)]"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="overflow-x-auto rounded-[18px] border border-white/6 bg-black/40 px-4 py-4 font-mono text-sm text-[#e5e7eb] sm:px-5">
                {activeLink}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
