"use client";

import { useState } from "react";
import type { SiteSettings } from "@/lib/site-data";

type SettingsPanelProps = {
  initialSettings: SiteSettings;
};

export default function SettingsPanel({ initialSettings }: SettingsPanelProps) {
  const [settings, setSettings] = useState(initialSettings);
  const [message, setMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function saveSettings() {
    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const data = (await response.json()) as { item?: SiteSettings; error?: string };
    if (!response.ok || !data.item) {
      setMessage(data.error ?? "Unable to save settings.");
      return;
    }

    setSettings(data.item);
    setMessage("Global website settings saved.");
  }

  async function uploadFavicon(file: File) {
    const formData = new FormData();
    formData.append("favicon", file);
    setUploading(true);
    setMessage(null);
    const response = await fetch("/api/admin/settings/favicon", { method: "POST", body: formData });
    const data = (await response.json()) as { item?: SiteSettings; error?: string };
    setUploading(false);

    if (!response.ok || !data.item) {
      setMessage(data.error ?? "Unable to upload favicon.");
      return;
    }

    setSettings(data.item);
    setMessage("Favicon updated across the site.");
  }

  return (
    <section className="rounded-[24px] border border-[#1f2937] bg-[#111827] p-6 shadow-[0_18px_60px_rgba(2,6,23,0.18)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Settings</p>
      <h3 className="mt-2 text-xl font-semibold text-[#e5e7eb]">Website Controls</h3>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9ca3af]">Update branding, maintenance mode, and platform contact details.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5 rounded-2xl border border-[#1f2937] bg-[#0f172a] p-5">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-[#e5e7eb]">Website Name</span>
            <input value={settings.websiteName} onChange={(event) => setSettings((current) => ({ ...current, websiteName: event.target.value }))} className="rounded-xl border border-[#1f2937] bg-[#111827] px-4 py-3 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-[#e5e7eb]">Website Email</span>
            <input value={settings.websiteEmail} onChange={(event) => setSettings((current) => ({ ...current, websiteEmail: event.target.value }))} className="rounded-xl border border-[#1f2937] bg-[#111827] px-4 py-3 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" />
          </label>
          <div className="rounded-xl border border-[#1f2937] bg-[#111827] p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-[#e5e7eb]">Maintenance Mode</div>
                <div className="mt-1 text-sm text-[#9ca3af]">Turn on a maintenance screen for visitors while keeping admin access available.</div>
              </div>
              <button type="button" onClick={() => setSettings((current) => ({ ...current, maintenanceMode: !current.maintenanceMode }))} className={`relative h-8 w-16 rounded-full border transition ${settings.maintenanceMode ? "border-[#6366f1] bg-[#312e81]/30" : "border-[#1f2937] bg-[#0f172a]"}`}>
                <span className={`absolute top-1 h-6 w-6 rounded-full bg-[#e5e7eb] transition-all ${settings.maintenanceMode ? "left-9 bg-[#a5b4fc]" : "left-1"}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#1f2937] bg-[#0f172a] p-5">
          <div className="text-sm font-medium text-[#e5e7eb]">Favicon</div>
          <p className="mt-2 text-sm leading-6 text-[#9ca3af]">Upload a new site icon to update browser tab branding globally.</p>
          <div className="mt-5 flex items-center gap-4 rounded-xl border border-[#1f2937] bg-[#111827] p-4">
            <img src={`/api/favicon?ts=${settings.faviconUpdatedAt ?? "default"}`} alt="Current favicon" className="h-14 w-14 rounded-xl border border-[#1f2937] bg-[#0f172a] p-2" />
            <div>
              <div className="text-sm font-medium text-[#e5e7eb]">Current Icon</div>
              <div className="mt-1 text-sm text-[#9ca3af]">{settings.faviconUpdatedAt ? "Custom favicon active" : "Fallback favicon active"}</div>
            </div>
          </div>
          <label className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-xl border border-[#4f46e5]/40 bg-[#312e81]/20 px-4 py-3 text-sm font-medium text-[#e5e7eb] transition hover:border-[#6366f1] hover:bg-[#312e81]/30">
            {uploading ? "Uploading..." : "Upload Favicon"}
            <input type="file" accept=".png,.jpg,.jpeg,.svg,.ico,.webp" onChange={(event) => { const file = event.target.files?.[0]; if (file) { void uploadFavicon(file); } }} className="hidden" />
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="button" onClick={saveSettings} className="rounded-xl border border-[#4f46e5]/40 bg-[#312e81]/20 px-4 py-2.5 text-sm font-medium text-[#e5e7eb] transition hover:border-[#6366f1] hover:bg-[#312e81]/30">Save Settings</button>
        {message ? <p className="text-sm text-[#cbd5e1]">{message}</p> : null}
      </div>
    </section>
  );
}
