import { redirect } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import InstallCommandsManager from "@/components/InstallCommandsManager";
import { requireAdmin } from "@/lib/auth";
import { getInstallCommands } from "@/lib/site-data";

export default async function AdminInstallCommandsPage() {
  const session = await requireAdmin();
  if (!session) {
    redirect("/admin/login");
  }

  const commands = await getInstallCommands();

  return (
    <AdminShell
      eyebrow="Agelent"
      title="Installer Commands"
      description="Manage the commands automatically detected and shown in the website hero section."
      userEmail={session.email}
    >
      <InstallCommandsManager initialCommands={commands} />
    </AdminShell>
  );
}
