import Link from "next/link";
import { sora } from "./siteTheme";

type FooterProps = {
  websiteName: string;
  websiteEmail: string;
};

export default function Footer({ websiteName, websiteEmail }: FooterProps) {
  return (
    <footer className={`${sora.className} border-t border-white/10 bg-[#050505] px-6 py-10 text-center text-sm text-[#9ca3af]`} suppressHydrationWarning>
      <div className="mx-auto max-w-4xl">
        <div className="text-base font-semibold text-white">{websiteName}</div>
        <p className="mt-2">© 2026 Agelent. All rights reserved.</p>
      </div>
    </footer>
  );
}
