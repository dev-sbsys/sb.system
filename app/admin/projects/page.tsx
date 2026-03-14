import { redirect } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import ProjectManager from "@/components/ProjectManager";
import { requireAdmin } from "@/lib/auth";
import { getExplorerCategories, getExplorerProjects } from "@/lib/site-data";

export default async function AdminProjectsPage() {
  const session = await requireAdmin();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell
      eyebrow="Explorer"
      title="Projects Workspace"
      description="Manage explorer tabs and project records in a structured dashboard layout."
      userEmail={session.email}
    >
      <ProjectManager initialCategories={await getExplorerCategories()} initialProjects={await getExplorerProjects()} />
    </AdminShell>
  );
}
