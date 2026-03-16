"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sora, inter } from "./siteTheme";

type CreateWorkspaceModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateWorkspaceModal({ isOpen, onClose }: CreateWorkspaceModalProps) {
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

  const handleSubmit = async () => {
    if (!workspaceName) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/create-workspace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspace_name: workspaceName,
          description: description,
          member_emails: memberEmails,
        }),
      });

      if (response.ok) {
        alert("Workspace created successfully!");
        onClose();
        // Reset form
        setWorkspaceName("");
        setDescription("");
        setMemberEmails([]);
      }
    } catch (error) {
      console.error("Error creating workspace:", error);
      alert("Failed to create workspace.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`${sora.className} relative w-full max-w-[480px] overflow-hidden rounded-[12px] border border-white/10 bg-[#1a1a1a] p-8 shadow-2xl transition-all`}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">Create Workspace</h2>
              <p className="mt-2 text-sm text-[#9ca3af]">
                Create a team workspace to collaborate on projects.
              </p>
            </div>

            <div className="space-y-6">
              {/* Workspace Name */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                  Workspace Name
                </label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="My Team Workspace"
                  className="w-full rounded-[8px] border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#ddd]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description about the team"
                  rows={3}
                  className="w-full resize-none rounded-[8px] border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#ddd]"
                />
              </div>

              {/* Invite Members */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                  Invite Members
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddEmail()}
                    placeholder="Enter email address"
                    className="flex-1 rounded-[8px] border border-white/10 bg-[#0f0f0f] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-[#ddd]"
                  />
                  <button
                    onClick={() => handleAddEmail()}
                    className="rounded-[8px] bg-[#333] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#444]"
                  >
                    Add
                  </button>
                </div>

                {/* Email Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {memberEmails.map((email) => (
                    <span
                      key={email}
                      className="flex items-center gap-2 rounded-full bg-[#333] px-3 py-1 text-xs text-white"
                    >
                      {email}
                      <button
                        onClick={() => removeEmail(email)}
                        className="text-[#9ca3af] hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="rounded-[8px] px-6 py-2.5 text-sm font-semibold text-[#9ca3af] transition hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !workspaceName}
                  className="rounded-[8px] bg-[#ddd] px-6 py-2.5 text-sm font-bold text-[#000] transition hover:bg-white disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create Workspace"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
