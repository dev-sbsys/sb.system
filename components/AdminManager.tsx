"use client";

import { useState } from "react";

type AdminRecord = {
  email: string;
  createdAt: string;
};

type AdminManagerProps = {
  initialAdmins: AdminRecord[];
};

export default function AdminManager({ initialAdmins }: AdminManagerProps) {
  const [admins, setAdmins] = useState(initialAdmins);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function addAdmin() {
    const response = await fetch("/api/admin/admins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = (await response.json()) as { items?: AdminRecord[]; error?: string };
    if (!response.ok || !data.items) {
      setMessage(data.error ?? "Unable to add admin.");
      return;
    }

    setAdmins(data.items);
    setEmail("");
    setPassword("");
    setMessage("Admin added successfully.");
  }

  async function removeAdmin(targetEmail: string) {
    const response = await fetch(`/api/admin/admins?email=${encodeURIComponent(targetEmail)}`, { method: "DELETE" });
    const data = (await response.json()) as { items?: AdminRecord[]; error?: string };
    if (!response.ok || !data.items) {
      setMessage(data.error ?? "Unable to remove admin.");
      return;
    }

    setAdmins(data.items);
    setMessage("Admin removed.");
  }

  return (
    <section className="rounded-[24px] border border-[#1f2937] bg-[#111827] p-6 shadow-[0_18px_60px_rgba(2,6,23,0.18)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Admin Management</p>
      <h3 className="mt-2 text-xl font-semibold text-[#e5e7eb]">Authorized Admins</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9ca3af]">Create and manage direct email/password admin access.</p>

      <div className="mt-6 rounded-2xl border border-[#1f2937] bg-[#0f172a] p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_auto]">
          <input value={email} onChange={(event) => setEmail(event.target.value)} className="rounded-xl border border-[#1f2937] bg-[#111827] px-4 py-3 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" placeholder="admin@agelent.dev" />
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="rounded-xl border border-[#1f2937] bg-[#111827] px-4 py-3 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" placeholder="Password" />
          <button type="button" onClick={addAdmin} className="rounded-xl border border-[#4f46e5]/40 bg-[#312e81]/20 px-4 py-3 text-sm font-medium text-[#e5e7eb] transition hover:border-[#6366f1] hover:bg-[#312e81]/30">Add Admin</button>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#1f2937]">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-[#1f2937] bg-[#0f172a] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9ca3af]">
          <span>Admin</span>
          <span>Actions</span>
        </div>
        <div className="divide-y divide-[#1f2937] bg-[#111827]">
          {admins.map((admin) => (
            <div key={admin.email} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 px-4 py-4">
              <div>
                <div className="font-medium text-[#e5e7eb]">{admin.email}</div>
                <div className="mt-1 text-sm text-[#9ca3af]">Added {new Date(admin.createdAt).toLocaleString()}</div>
              </div>
              <button type="button" onClick={() => removeAdmin(admin.email)} className="rounded-xl border border-[#374151] bg-[#0f172a] px-4 py-3 text-sm font-medium text-[#e5e7eb] transition hover:border-rose-400 hover:text-rose-200">Remove</button>
            </div>
          ))}
        </div>
      </div>

      {message ? <p className="mt-4 text-sm text-[#cbd5e1]">{message}</p> : null}
    </section>
  );
}
