"use client";

import React from "react";
import { useParams } from "next/navigation";
import { sora, jetBrainsMono } from "@/components/siteTheme";
import Link from "next/link";

export default function ProjectDetailsPage() {
  const { teamId, projectId } = useParams();

  return (
    <main className={`${sora.className} min-h-screen bg-[#0f0f0f] text-white flex flex-col items-center justify-center p-6`}>
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest text-[#9ca3af]">
          Project Details
        </div>
        <h1 className="text-4xl font-bold">Project Placeholder</h1>
        <p className="text-[#9ca3af] leading-relaxed">
          You are viewing project <span className={`${jetBrainsMono.className} text-[#ddd]`}>{projectId}</span> inside workspace <span className={`${jetBrainsMono.className} text-[#ddd]`}>{teamId}</span>.
        </p>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href={`/workspace/${teamId}`}
            className="px-6 py-3 bg-[#ddd] text-black font-bold rounded-[12px] hover:bg-white transition active:scale-95"
          >
            Back to Dashboard
          </Link>
          <div className="text-sm text-gray-500 italic">
            Active developer tracking and integration features coming in Phase 2.
          </div>
        </div>
      </div>
      
      {/* Decorative Visual */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff2a2a]/20 blur-[150px] rounded-full" />
      </div>
    </main>
  );
}
