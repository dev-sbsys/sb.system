import { redirect } from "next/navigation";
import AdminShell from "@/components/AdminShell";
import AdminManager from "@/components/AdminManager";
import { requireAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

async function getAdmins() {
  const { data, error } = await supabase
    .from("admins")
    .select("email, created_at")
    .order("email", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => ({
    email: row.email,
    createdAt: row.created_at,
  }));
}

export default async function AdminAdminsPage() {
  const session = await requireAdmin();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminShell
      eyebrow="Admin Management"
      title="Access Control"
      description="Review administrator accounts and create new secure logins for the dashboard."
      userEmail={session.email}
    >
      <AdminManager initialAdmins={await getAdmins()} />
    </AdminShell>
  );
}
