import Link from "next/link";
import { getAdminSession } from "@/lib/auth";
import { sora } from "./siteTheme";

type SiteNavbarProps = {
  websiteName: string;
};

export default async function SiteNavbar({ websiteName }: SiteNavbarProps) {
  const session = await getAdminSession();
  const showAdminIcon = Boolean(session?.isAdmin);

  return (
    <header className={`${sora.className} sticky top-0 z-40 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" prefetch className="text-sm font-semibold uppercase tracking-[0.4em] text-[#e5e5e5] transition duration-200 hover:text-white active:scale-[0.98]">{websiteName}</Link>
        <nav className="flex items-center gap-3 sm:gap-6">
          <Link href="/" prefetch className="rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-[#bcbcbc] transition-all duration-200 hover:border-white/10 hover:bg-white/5 hover:text-white active:scale-[0.98]">Home</Link>
          <Link href="/explorer" prefetch className="rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-[#bcbcbc] transition-all duration-200 hover:border-white/10 hover:bg-white/5 hover:text-white active:scale-[0.98]">Explorer</Link>
          {showAdminIcon ? (
            <Link href="/admin/login" prefetch aria-label="Open admin login" className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ff2a2a]/45 bg-[#ff2a2a]/10 text-[#ff2a2a] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff2a2a] hover:bg-[#ff2a2a]/16 hover:text-white hover:shadow-[0_0_20px_rgba(255,42,42,0.2)] active:scale-[0.96]">
              <svg aria-hidden="true" className="h-5 w-5 transition-transform duration-150 group-hover:scale-110" fill="none" viewBox="0 0 24 24">
                <path d="M12 3 5 6v5c0 5 3.5 8.7 7 10 3.5-1.3 7-5 7-10V6z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7" />
                <path d="M9.5 12 11 13.5 14.5 10" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
              </svg>
            </Link>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
