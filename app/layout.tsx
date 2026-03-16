import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getSiteSettings } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: {
      default: "Agelent — AI Agents & Developer Automation Platform",
      template: "%s | Agelent",
    },
    description: "Build AI agents, automation workflows, and developer tools faster with Agelent.",
    openGraph: {
      title: "Agelent — AI Agents & Developer Automation Platform",
      description: "Build AI agents, automation workflows, and developer tools faster with Agelent.",
      type: "website",
      url: "https://agelent.dev",
      siteName: "Agelent",
    },
    twitter: {
      card: "summary_large_image",
      title: "Agelent — AI Agents & Developer Automation Platform",
      description: "Build AI agents, automation workflows, and developer tools faster with Agelent.",
    },
    icons: {
      icon: settings.faviconUpdatedAt ? `/api/favicon?ts=${encodeURIComponent(settings.faviconUpdatedAt)}` : "/api/favicon",
    },
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="page-transition">{children}</div>
      </body>
    </html>
  );
}
