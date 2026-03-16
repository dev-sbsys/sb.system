"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { sora } from "./siteTheme";

type SiteNavbarProps = {
  websiteName: string;
};

export default function SiteNavbar({ websiteName }: SiteNavbarProps) {
  const [hasTeams, setHasTeams] = useState<boolean>(false);

  useEffect(() => {
    const userEmail = localStorage.getItem("agelent_user_email");
    if (userEmail) {
      fetch(`/api/workspaces/list?email=${encodeURIComponent(userEmail)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.teams.length > 0) {
            setHasTeams(true);
          } else {
            setHasTeams(false);
          }
        })
        .catch(() => setHasTeams(false));
    } else {
      setHasTeams(false);
    }
  }, []);

  return (
    <header className={`${sora.className} sticky top-0 z-40 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl`} suppressHydrationWarning>
      <div className="flex items-center justify-between pl-[15px] pr-6 pt-4 pb-2">
        {/* Logo/Name */}
        <Link href="/" prefetch className="flex items-center transition duration-200 hover:opacity-80">
          <img
            src="/logo.png"
            alt={websiteName}
            style={{ height: '44px' }}
            className="w-auto object-contain"
          />
        </Link>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            style={{ color: '#fff' }}
            className="rounded-[8px] px-5 py-2 text-sm font-bold transition-all  active:scale-[0.98]"
          >
            Home
          </Link>
          <Link
            href="/explorer"
            style={{ color: '#fff' }}
            className="rounded-[8px] px-5 py-2 text-sm font-bold transition-all  active:scale-[0.98]"
          >
            Explorer
          </Link>
          
          {hasTeams && (
            <Link
              href="/workspaces"
              style={{ color: '#fff' }}
              className="rounded-[8px] px-5 py-2 text-sm font-bold transition-all  active:scale-[0.98]"
            >
              Workspaces
            </Link>
          )}

          <Link
            href="/create-team"
            style={{ backgroundColor: '#383838ff', color: '#fff' }}
            className="rounded-[8px] px-5 py-2 text-sm font-bold transition-all hover:bg-[#cfcfcf] active:scale-[0.98]"
          >
            Create Team
          </Link>
        </div>
      </div>
    </header>
  );
}
