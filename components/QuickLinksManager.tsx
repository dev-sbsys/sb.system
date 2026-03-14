"use client";

import { useState } from "react";
import type { QuickLink } from "@/lib/site-data";

type QuickLinksManagerProps = {
  initialItems: QuickLink[];
};

export default function QuickLinksManager({ initialItems }: QuickLinksManagerProps) {
  const [items, setItems] = useState(initialItems);
  const [draft, setDraft] = useState({ label: "", href: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function saveAll(nextItems: QuickLink[]) {
    setSaving(true);
    setMessage(null);
    const response = await fetch("/api/admin/quick-links", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: nextItems.map(({ id, label, href }) => ({ id, label, href })) }),
    });
    const data = (await response.json()) as { items?: QuickLink[]; error?: string };
    setSaving(false);

    if (!response.ok || !data.items) {
      setMessage(data.error ?? "Unable to save quick links.");
      return;
    }

    setItems(data.items);
    setMessage("Quick Links updated.");
  }

  async function handleAdd() {
    if (!draft.label.trim() || !draft.href.trim()) {
      setMessage("Enter both a tab name and a link.");
      return;
    }

    setSaving(true);
    setMessage(null);
    const response = await fetch("/api/admin/quick-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    const data = (await response.json()) as { items?: QuickLink[]; error?: string };
    setSaving(false);

    if (!response.ok || !data.items) {
      setMessage(data.error ?? "Unable to add quick link.");
      return;
    }

    setItems(data.items);
    setDraft({ label: "", href: "" });
    setMessage("Quick link added.");
  }

  async function handleDelete(id: string) {
    setSaving(true);
    setMessage(null);
    const response = await fetch(`/api/admin/quick-links?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const data = (await response.json()) as { items?: QuickLink[]; error?: string };
    setSaving(false);

    if (!response.ok || !data.items) {
      setMessage(data.error ?? "Unable to delete quick link.");
      return;
    }

    setItems(data.items);
    setMessage("Quick link removed.");
  }

  return (
    <section id="quick-links" className="rounded-[24px] border border-[#1f2937] bg-[#111827] p-6 shadow-[0_18px_60px_rgba(2,6,23,0.18)] transition hover:-translate-y-0.5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Quick Links</p>
          <h3 className="mt-2 text-xl font-semibold text-[#e5e7eb]">Quick Links Management</h3>

        </div>
        <button type="button" onClick={() => saveAll(items)} disabled={saving} className="rounded-xl border border-[#374151] bg-[#0f172a] px-4 py-2.5 text-sm font-medium text-[#e5e7eb] transition hover:border-[#4f46e5] hover:bg-[#111827] disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Saving..." : "Save"}</button>
      </div>
      <hr className="mt-3" />

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#1f2937]">
        <div className="grid grid-cols-[0.85fr_1.5fr_auto] gap-3 border-b border-[#1f2937] bg-[#0f172a] px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#9ca3af]">
          <span>Label</span>
          <span>Link</span>
          <span>Actions</span>
        </div>
        <div className="divide-y divide-[#1f2937] bg-[#111827]">
          {items.map((item, index) => (
            <div key={item.id} className="grid grid-cols-[0.85fr_1.5fr_auto] gap-3 px-4 py-4">
              <input value={item.label} onChange={(event) => { const next = [...items]; next[index] = { ...item, label: event.target.value }; setItems(next); }} className="rounded-xl border border-[#1f2937] bg-[#0f172a] px-4 py-3 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" placeholder="Tab name" />
              <input value={item.href} onChange={(event) => { const next = [...items]; next[index] = { ...item, href: event.target.value }; setItems(next); }} className="rounded-xl border border-[#1f2937] bg-[#0f172a] px-4 py-3 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" placeholder="https://example.com" />
              <button type="button" onClick={() => handleDelete(item.id)} className="rounded-xl border border-[#374151] bg-[#0f172a] px-4 py-3 text-sm font-medium text-[#e5e7eb] transition hover:border-rose-400 hover:text-rose-200">Delete</button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-[#334155] bg-[#0f172a] p-4">
        <div className="grid gap-3 lg:grid-cols-[0.85fr_1.5fr_auto]">
          <input value={draft.label} onChange={(event) => setDraft((current) => ({ ...current, label: event.target.value }))} className="rounded-xl border border-[#1f2937] bg-[#111827] px-4 py-3 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" placeholder="New tab name" />
          <input value={draft.href} onChange={(event) => setDraft((current) => ({ ...current, href: event.target.value }))} className="rounded-xl border border-[#1f2937] bg-[#111827] px-4 py-3 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" placeholder="New tab link" />
          <button type="button" onClick={handleAdd} className="rounded-xl border border-[#4f46e5]/40 bg-[#312e81]/20 px-4 py-3 text-sm font-medium text-[#e5e7eb] transition hover:border-[#6366f1] hover:bg-[#312e81]/30">Add Link</button>
        </div>
      </div>

      {message ? <p className="mt-4 text-sm text-[#cbd5e1]">{message}</p> : null}
    </section>
  );
}
