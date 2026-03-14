import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { getSiteSettings } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: settings.websiteName,
    description: `Build and manage ${settings.websiteName} from a premium admin control panel.`,
    icons: {
      icon: settings.faviconUpdatedAt ? `/api/favicon?ts=${encodeURIComponent(settings.faviconUpdatedAt)}` : "/api/favicon",
    },
  };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="page-transition">{children}</div>
      </body>
    </html>
  );
}
