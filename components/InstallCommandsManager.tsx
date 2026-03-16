"use client";

import { useState } from "react";
import type { InstallCommand } from "@/lib/site-data";

type InstallCommandsManagerProps = {
  initialCommands: InstallCommand[];
};

export default function InstallCommandsManager({ initialCommands }: InstallCommandsManagerProps) {
  const [commands, setCommands] = useState(initialCommands);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [messages, setMessages] = useState<{ [key: string]: string | null }>({});

  // Ensure we have rows for the 3 main OS types
  const osTypes = ["Windows", "Mac", "Linux"];
  
  async function handleUpdate(id: string, osName: string, command: string) {
    if (!command.trim()) return;

    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    setMessages((prev) => ({ ...prev, [id]: null }));

    const response = await fetch("/api/admin/install-commands", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, osName, command }),
    });

    const data = await response.json();
    setLoadingStates((prev) => ({ ...prev, [id]: false }));

    if (response.ok) {
      setCommands(data.items);
      setMessages((prev) => ({ ...prev, [id]: "Saved successfully." }));
      setTimeout(() => setMessages((prev) => ({ ...prev, [id]: null })), 3000);
    } else {
      setMessages((prev) => ({ ...prev, [id]: data.error || "Update failed." }));
    }
  }

  function handleCommandChange(id: string, value: string) {
    setCommands(prev => prev.map(cmd => cmd.id === id ? { ...cmd, command: value } : cmd));
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[24px] border border-[#1f2937] bg-[#111827] p-8 shadow-[0_18px_60px_rgba(2,6,23,0.18)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Control Center</p>
        <h3 className="mt-2 text-2xl font-bold text-[#f8fafc]">Installer Commands</h3>
        <p className="mt-2 text-sm text-[#94a3b8]">These commands are automatically detected and displayed in the hero terminal based on the visitor&apos;s OS.</p>
        
        <div className="mt-10 space-y-8">
          {osTypes.map(os => {
            const cmd = commands.find(c => c.osName.toLowerCase() === os.toLowerCase());
            if (!cmd) return null;

            return (
              <div key={cmd.id} className="group relative rounded-2xl border border-[#1f2937] bg-[#0f172a] p-6 transition-all hover:border-[#374151]">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                  <div className="min-w-[140px]">
                    <span className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-[#f1f5f9]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#6366f1]" />
                      {cmd.osName}
                    </span>
                  </div>

                  <div className="flex flex-1 gap-3">
                    <input
                      value={cmd.command}
                      onChange={(e) => handleCommandChange(cmd.id, e.target.value)}
                      className="w-full rounded-xl border border-[#1f2937] bg-[#111827] px-4 py-3 font-mono text-xs text-[#94a3b8] outline-none transition focus:border-[#6366f1] focus:ring-1 focus:ring-[#6366f1]/30 group-hover:border-[#374151]"
                      placeholder={`Enter ${cmd.osName} install command...`}
                    />
                    <button
                      onClick={() => handleUpdate(cmd.id, cmd.osName, cmd.command)}
                      disabled={loadingStates[cmd.id]}
                      className="shrink-0 rounded-xl bg-[#6366f1] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4f46e5] active:scale-95 disabled:opacity-50"
                    >
                      {loadingStates[cmd.id] ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
                {messages[cmd.id] && (
                  <p className={`mt-3 text-xs font-medium ${messages[cmd.id]?.includes("Saved") ? "text-emerald-400" : "text-rose-400"}`}>
                    {messages[cmd.id]}
                  </p>
                )}
              </div>
            );
          })}
          
          {commands.length === 0 && (
            <div className="rounded-xl border border-dashed border-[#1f2937] p-10 text-center">
              <p className="text-sm text-[#64748b]">No standard installer commands found in database.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
