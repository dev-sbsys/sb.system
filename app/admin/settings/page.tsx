import { redirect } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import SettingsPanel from "@/components/SettingsPanel";
import { requireAdmin } from "@/lib/auth";
import { getSiteSettings } from "@/lib/site-data";

export default async function AdminSettingsPage() {
  const session = await requireAdmin();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell
      eyebrow="Agelent"
      title="Platform Settings"
      description="Adjust branding, maintenance mode, and global website behavior with modern controls."
      userEmail={session.email}
    >
      <SettingsPanel initialSettings={await getSiteSettings()} />
    </AdminShell>
  );
}
