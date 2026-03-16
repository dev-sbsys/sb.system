"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { sora, jetBrainsMono } from "@/components/siteTheme";
import Link from "next/link";

type Team = {
  id: string;
  name: string;
  description: string;
  owner_id: string;
  created_at: string;
};

type Member = {
  id: string;
  email: string;
  role: string;
  joined_at: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  creator_email: string;
};

export default function WorkspaceDashboard() {
  const { teamId } = useParams();
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>("");

  // Modal States
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDesc, setNewProjectDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("agelent_user_email") || "";
    setUserEmail(email);
    if (teamId) fetchWorkspace();
  }, [teamId]);

  const fetchWorkspace = async () => {
    try {
      const resp = await fetch(`/api/workspaces/${teamId}`);
      const data = await resp.json();
      if (data.success) {
        setTeam(data.team);
        setMembers(data.members);
        setProjects(data.projects);
      } else {
        router.push("/workspaces");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInviteMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const resp = await fetch(`/api/workspaces/${teamId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newMemberEmail }),
      });
      if (resp.ok) {
        setNewMemberEmail("");
        setShowMemberModal(false);
        fetchWorkspace();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const resp = await fetch(`/api/workspaces/${teamId}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: newProjectName, 
          description: newProjectDesc,
          creator_email: userEmail 
        }),
      });
      
      const data = await resp.json();

      if (resp.ok && data.success) {
        setNewProjectName("");
        setNewProjectDesc("");
        setShowProjectModal(false);
        fetchWorkspace(); // Refresh list immediately
      } else {
        const errorMsg = data.error || "Failed to create project.";
        alert(`${errorMsg} Please try again.`);
      }
    } catch (err: any) {
      console.error(err);
      alert(`Connection error: ${err.message}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f] text-white">
        <div className="animate-pulse text-xl">Initializing Workspace...</div>
      </div>
    );
  }

  if (!team) return null;

  const activeProjects = projects;

  return (
    <main className={`${sora.className} min-h-screen bg-[#0f0f0f] text-white pb-20`}>
      {/* HEADER */}
      <header className="border-b border-white/5 bg-[#1a1a1a]/50 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <Link href="/workspaces" className="h-10 w-10 flex items-center justify-center rounded-full border border-white/5 hover:bg-white/5 transition">
                <span className="text-gray-400">{"<-"}</span>
             </Link>
             <div>
               <div className="flex items-center gap-3">
                  <h1 className="text-xl font-bold">{team.name}</h1>
               </div>
               <p className="text-xs text-[#9ca3af] mt-1">{team.description || "No description provided."}</p>
             </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest text-[#9ca3af]">Workspace Owner</span>
            <p className="text-sm font-semibold">{team.owner_id}</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT: TEAM MEMBERS */}
        <section className="lg:col-span-1 border border-white/5 bg-[#1a1a1a] rounded-[24px] p-6 shadow-xl h-fit sticky top-28">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#9ca3af]">Members</h2>
            <button 
              onClick={() => setShowMemberModal(true)}
              className="text-[10px] font-bold text-[#ddd] hover:text-white transition uppercase border border-[#ddd]/20 px-2 py-1 rounded"
            >
              + Invite
            </button>
          </div>
          
          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#222] flex items-center justify-center text-[10px] font-bold border border-white/5 uppercase text-gray-400">
                    {member.email.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-medium truncate max-w-[120px]">{member.email}</p>
                    <p className="text-[9px] uppercase tracking-tighter text-gray-500">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT: PROJECTS */}
        <section className="lg:col-span-3 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/5 pb-6">
            <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#ddd]" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#9ca3af]">Workspace Projects</h2>
            </div>
            
            <button 
              onClick={() => setShowProjectModal(true)}
              className="px-6 py-3 bg-[#ddd] text-black text-sm font-bold rounded-[12px] hover:bg-white transition active:scale-95 shadow-xl"
            >
              Create Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeProjects.length === 0 ? (
              <div className="col-span-2 border border-dashed border-white/10 rounded-[32px] p-20 text-center text-[#9ca3af]">
                No projects found in this workspace yet.
              </div>
            ) : (
              activeProjects.map((project) => (
                <Link 
                  key={project.id} 
                  href={`/workspace/${teamId}/projects/${project.id}`}
                  className="group block border border-white/5 bg-[#1a1a1a] rounded-[28px] p-8 hover:border-[#ddd]/30 transition shadow-2xl relative"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold group-hover:text-[#ddd] transition">{project.name}</h3>
                    <div className="h-2 w-2 rounded-full bg-[#ff2a2a]/40" />
                  </div>
                  
                  <p className="text-sm text-[#9ca3af] mt-3 line-clamp-2 leading-relaxed">
                    {project.description || "No description provided for this project."}
                  </p>

                  <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-6">
                    <div className="flex flex-col">
                       <span className="text-[9px] uppercase tracking-widest text-gray-500 mb-1">Created Date</span>
                       <span className={`${jetBrainsMono.className} text-[10px] text-gray-400`}>
                         {new Date(project.created_at).toLocaleDateString()}
                       </span>
                    </div>
                    <span className="text-[11px] font-bold text-[#ddd] opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      Open Project {"->"}
                   </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {showMemberModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMemberModal(false)} 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-[#1a1a1a] rounded-[24px] p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold mb-2">Invite Collaborator</h3>
              <p className="text-sm text-[#9ca3af] mb-6">Invite someone to join the {team.name} workspace.</p>
              <form onSubmit={handleInviteMember} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#9ca3af] mb-1">Email Address</label>
                  <input 
                    type="email" required value={newMemberEmail} onChange={(e) => setNewMemberEmail(e.target.value)}
                    className="w-full bg-[#0f0f0f] border border-white/10 rounded-[12px] px-4 py-3 text-sm focus:border-[#ddd] outline-none transition"
                    placeholder="teammate@example.com"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowMemberModal(false)} className="flex-1 py-3 text-sm font-semibold text-[#9ca3af] hover:text-white transition">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-[#ddd] text-black font-bold rounded-[12px] hover:bg-white transition active:scale-95 disabled:opacity-50">
                    {isSubmitting ? "Inviting..." : "Send Invite"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {showProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowProjectModal(false)} 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-[#1a1a1a] rounded-[24px] p-8 border border-white/10"
            >
              <h3 className="text-xl font-bold mb-2">New Project</h3>
              <p className="text-sm text-[#9ca3af] mb-6">Initialize a new project in this workspace.</p>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#9ca3af] mb-1">Project Name</label>
                  <input 
                    type="text" required value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full bg-[#0f0f0f] border border-white/10 rounded-[12px] px-4 py-3 text-sm focus:border-[#ddd] outline-none transition"
                    placeholder="E.g. Automation Hub"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#9ca3af] mb-1">Description</label>
                  <textarea 
                    value={newProjectDesc} onChange={(e) => setNewProjectDesc(e.target.value)}
                    className="w-full bg-[#0f0f0f] border border-white/10 rounded-[12px] px-4 py-3 text-sm focus:border-[#ddd] outline-none transition resize-none h-24"
                    placeholder="Short summary of the project goals..."
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setShowProjectModal(false)} className="flex-1 py-3 text-sm font-semibold text-[#9ca3af] hover:text-white transition">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-[#ddd] text-black font-bold rounded-[12px] hover:bg-white transition active:scale-95 disabled:opacity-50">
                    {isSubmitting ? "Creating..." : "Create Project"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
