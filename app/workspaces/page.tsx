"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { sora, jetBrainsMono } from "@/components/siteTheme";
import { useRouter } from "next/navigation";

type Team = {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  created_at: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  creator_email: string;
  team_id: string;
};

export default function WorkspacesPage() {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"your" | "collab">("your");
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const email = localStorage.getItem("agelent_user_email") || "";
    setUserEmail(email);
    if (!email) {
      router.push("/create-team");
      return;
    }

    fetchTeams(email);
  }, []);

  const fetchTeams = async (email: string) => {
    try {
      const resp = await fetch(`/api/workspaces/list?email=${encodeURIComponent(email)}`);
      const data = await resp.json();
      if (data.success) {
        setTeams(data.teams || []);
      }
    } catch (err) {
      console.error("Fetch Teams Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] text-white">
        <div className="animate-pulse text-xl">Loading your workspaces...</div>
      </div>
    );
  }

  const yourTeams = teams.filter(t => t.owner_id?.toLowerCase() === userEmail?.toLowerCase());
  const collabTeams = teams.filter(t => t.owner_id?.toLowerCase() !== userEmail?.toLowerCase());
  const activeTeams = activeTab === "your" ? yourTeams : collabTeams;

  return (
    <main className={`${sora.className} min-h-screen bg-[#0f0f0f] text-white pb-20`} suppressHydrationWarning>
      <header className="border-b border-white/5 bg-[#1a1a1a]/50 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Workspaces</h1>
            <p className="text-[#9ca3af] mt-1 text-sm">Select a workspace to start collaborating.</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex bg-[#1a1a1a] p-1 rounded-[12px] border border-white/5">
                <button 
                  onClick={() => setActiveTab("your")}
                  className={`px-6 py-2 text-xs font-bold rounded-[8px] transition-all ${activeTab === "your" ? "bg-[#333] text-white shadow-lg" : "text-gray-500 hover:text-white"}`}
                >
                  Your Teams ({yourTeams.length})
                </button>
                <button 
                  onClick={() => setActiveTab("collab")}
                  className={`px-6 py-2 text-xs font-bold rounded-[8px] transition-all ${activeTab === "collab" ? "bg-[#333] text-white shadow-lg" : "text-gray-500 hover:text-white"}`}
                >
                  Shared Teams ({collabTeams.length})
                </button>
             </div>
             
             <Link 
               href="/create-team"
               className="px-6 py-3 bg-[#ddd] text-black font-bold rounded-[12px] hover:bg-white transition active:scale-95 shadow-xl"
             >
               + Create Team
             </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-12">
        {activeTeams.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-[32px] p-24 text-center">
            <h2 className="text-xl font-bold text-[#9ca3af]">
              {activeTab === "your" ? "You haven't created any teams yet." : "No shared workspaces found."}
            </h2>
            <Link href="/create-team" className="mt-4 inline-block text-[#ddd] underline hover:text-white transition">
              {activeTab === "your" ? "Create your first team now" : "Join a team to get started"}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTeams.map((team) => (
              <Link 
                key={team.id}
                href={`/workspace/${team.id}`}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#1a1a1a] p-8 hover:border-[#ddd]/40 transition shadow-xl"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition text-[#ddd]">
                   <span className="text-[10px] font-bold tracking-widest uppercase">
                    {activeTab === "your" ? "Owner" : "Collaborator"}
                   </span>
                </div>

                <h3 className="text-2xl font-bold group-hover:text-[#ddd] transition">{team.name}</h3>
                <p className="mt-3 text-sm text-[#9ca3af] line-clamp-3 leading-relaxed h-[60px]">
                  {team.description || "No description provided."}
                </p>

                <div className="mt-8 border-t border-white/5 pt-6 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider">
                    <span className="text-gray-500 font-medium">Owner</span>
                    <span className="text-[#ddd] font-semibold">{team.owner_id}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] uppercase tracking-wider">
                    <span className="text-gray-500 font-medium">Founded</span>
                    <span className={`${jetBrainsMono.className} text-gray-400 font-medium`}>
                      {new Date(team.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-end">
                   <span className="text-[11px] font-bold text-[#ddd] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      Open Workspace {"->"}
                   </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>


      {/* Decorative Gradient */}
      <div className="fixed bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#ff2a2a]/5 to-transparent pointer-events-none -z-10" />
    </main>
  );
}
