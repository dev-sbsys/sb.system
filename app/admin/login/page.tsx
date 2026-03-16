import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { sora } from "@/components/siteTheme";
import AdminLoginCard from "@/components/AdminLoginCard";

export const metadata = {
  title: "Admin Login | Agelent",
  description: "Secure access to the Agelent administration shell.",
};

export default async function AdminLoginPage() {
  const session = await requireAdmin();
  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <main className={`${sora.className} flex min-h-screen items-center justify-center bg-[#050505] px-6`}>
      <AdminLoginCard />
    </main>
  );
}
