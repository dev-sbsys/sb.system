"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { jetBrainsMono } from "@/components/siteTheme";

export default function CreateTeamForm() {
  const router = useRouter();
  const [ownerEmail, setOwnerEmail] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  const [description, setDescription] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [memberEmails, setMemberEmails] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddEmail = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (emailInput && !memberEmails.includes(emailInput) && emailInput.includes("@")) {
      setMemberEmails([...memberEmails, emailInput]);
      setEmailInput("");
    }
  };

  const removeEmail = (email: string) => {
    setMemberEmails(memberEmails.filter((e) => e !== email));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workspaceName || !ownerEmail) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/create-workspace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspace_name: workspaceName,
          description: description,
          member_emails: memberEmails,
          owner_email: ownerEmail,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        localStorage.setItem("agelent_user_email", ownerEmail);
        router.push(`/workspace/${result.teamId}`);
      } else {
        alert(result.error || "Failed to create workspace.");
      }
    } catch (error) {
      console.error("Error creating workspace:", error);
      alert("Failed to create workspace.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid flex-1 overflow-hidden lg:grid-cols-2">
      {/* LEFT SECTION (VISUAL SIDE) */}
      <section className="relative hidden h-full flex-col justify-center bg-[#0f0f0f] p-12 lg:flex xl:p-24">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #333 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className={`${jetBrainsMono.className} absolute left-10 top-20 space-y-2 text-[10px] text-gray-600`}>
            <p>{"// initialize_environment..."}</p>
            <p>{"const team = new Team({ name: 'Agelent' });"}</p>
            <p>{"team.connect(collaborators);"}</p>
          </div>
          <div className="absolute bottom-1/4 right-1/4 h-32 w-32 rounded-full bg-[#ff2a2a]/10 blur-[100px]" />
          <div className="absolute right-10 top-1/2 h-24 w-24 rounded-full bg-[#ddd]/5 blur-[80px]" />
        </div>

        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-bold tracking-tight text-white lg:text-7xl"
          >
            Build together.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-[#9ca3af]"
          >
            Create a workspace and collaborate with your team on projects.
          </motion.p>
        </div>
      </section>

      {/* RIGHT SECTION (FORM SIDE) */}
      <section className="flex h-full flex-col items-center justify-center bg-[#050505] p-6 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[500px] rounded-[24px] border border-white/10 bg-[#1a1a1a] p-6 shadow-2xl sm:p-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Create Workspace</h2>
            <p className="mt-1 text-sm text-[#9ca3af]">
              Start a new team workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                Your Email (Owner)
              </label>
              <input
                type="email"
                required
                value={ownerEmail}
                onChange={(e) => setOwnerEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-[12px] border border-white/10 bg-[#0f0f0f] px-5 py-3 text-sm text-white outline-none transition-all focus:border-[#ddd] focus:ring-1 focus:ring-[#ddd]/20"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                Workspace Name
              </label>
              <input
                type="text"
                required
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="My Team Workspace"
                className="w-full rounded-[12px] border border-white/10 bg-[#0f0f0f] px-5 py-3 text-sm text-white outline-none transition-all focus:border-[#ddd] focus:ring-1 focus:ring-[#ddd]/20"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description about the team."
                rows={2}
                className="w-full resize-none rounded-[12px] border border-white/10 bg-[#0f0f0f] px-5 py-3 text-sm text-white outline-none transition-all focus:border-[#ddd] focus:ring-1 focus:ring-[#ddd]/20"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                Invite Members
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddEmail())}
                  placeholder="Enter email address"
                  className="flex-1 rounded-[12px] border border-white/10 bg-[#0f0f0f] px-5 py-3 text-sm text-white outline-none transition-all focus:border-[#ddd] focus:ring-1 focus:ring-[#ddd]/20"
                />
                <button
                  type="button"
                  onClick={() => handleAddEmail()}
                  className="rounded-[12px] bg-[#333] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#444]"
                >
                  Add
                </button>
              </div>

              <div className="mt-3 flex max-h-[60px] flex-wrap gap-2 overflow-y-auto">
                {memberEmails.map((email) => (
                  <span
                    key={email}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-[#222] px-3 py-1 text-[10px] text-white"
                  >
                    {email}
                    <button
                      type="button"
                      onClick={() => removeEmail(email)}
                      className="ml-1 text-[#9ca3af] hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <Link
                href="/"
                className="text-sm font-semibold text-[#9ca3af] transition hover:text-white"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || !workspaceName || !ownerEmail}
                style={{ backgroundColor: '#ddd', color: '#fff' }}
                className="rounded-[10px] px-8 py-3 text-sm font-bold transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Create Workspace"}
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
