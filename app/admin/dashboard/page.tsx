import { redirect } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import QuickLinksManager from "@/components/QuickLinksManager";
import { requireAdmin } from "@/lib/auth";
import { getExplorerCategories, getExplorerProjects, getQuickLinks, getSiteSettings } from "@/lib/site-data";

export default async function AdminDashboardPage() {
  const session = await requireAdmin();
  if (!session) {
    redirect("/admin/login");
  }

  const settings = await getSiteSettings();
  const quickLinks = await getQuickLinks();
  const categories = await getExplorerCategories();
  const projects = await getExplorerProjects();
  const stats = [
    { label: "Authorized Access", value: "Live", tone: "Online" },
    { label: "Quick Links Count", value: String(quickLinks.length).padStart(2, "0"), tone: "Published" },
    { label: "Explorer Tabs Count", value: String(categories.length).padStart(2, "0"), tone: "Categories" },
    { label: "Total Projects", value: String(projects.length).padStart(2, "0"), tone: "Records" },
  ];

  return (
    <AdminShell
      eyebrow="Dashboard"
      title="Admin Overview"
      description="Monitor platform content, edit explorer data, and manage settings from a clean developer-first workspace."
      userEmail={session.email}
    >
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[24px] border border-[#1f2937] bg-[#111827] p-5 shadow-[0_18px_60px_rgba(2,6,23,0.18)] transition hover:-translate-y-0.5">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9ca3af]">{stat.label}</div>
              <div className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#e5e7eb]">{stat.value}</div>
              <div className="mt-2 text-sm text-[#94a3b8]">{stat.tone}</div>
            </div>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <QuickLinksManager initialItems={quickLinks} />
          <div className="rounded-[24px] border border-[#1f2937] bg-[#111827] p-6 shadow-[0_18px_60px_rgba(2,6,23,0.18)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Workspace Status</p>
            <h3 className="mt-2 text-xl font-semibold text-[#e5e7eb]">Platform Snapshot</h3>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-[#1f2937] bg-[#0f172a] p-4">
                <div className="text-sm font-medium text-[#e5e7eb]">Website Name</div>
                <div className="mt-2 text-sm text-[#9ca3af]">{settings.websiteName}</div>
              </div>
              <div className="rounded-2xl border border-[#1f2937] bg-[#0f172a] p-4">
                <div className="text-sm font-medium text-[#e5e7eb]">Website Email</div>
                <div className="mt-2 text-sm text-[#9ca3af]">{settings.websiteEmail}</div>
              </div>
              <div className="rounded-2xl border border-[#1f2937] bg-[#0f172a] p-4">
                <div className="text-sm font-medium text-[#e5e7eb]">Maintenance Mode</div>
                <div className="mt-2 text-sm text-[#9ca3af]">{settings.maintenanceMode ? "Active for visitors" : "Running normally"}</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
