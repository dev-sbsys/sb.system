import type { QuickLink, SiteSettings, InstallCommand } from "@/lib/site-data";
import SiteNavbar from "./SiteNavbar";
import Hero from "./Hero";
import QuickStartTabs from "./QuickStartTabs";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import RoutePrefetch from "./RoutePrefetch";

type HomePageProps = {
  settings: SiteSettings;
  quickLinks: QuickLink[];
  installCommands: InstallCommand[];
};

export default async function HomePage({ settings, quickLinks, installCommands }: HomePageProps) {
  return (
    <main className="bg-[#050505] page-transition" suppressHydrationWarning>
      <RoutePrefetch />
      <SiteNavbar websiteName={settings.websiteName} />
      <Hero websiteName={settings.websiteName} installCommands={installCommands} />
      <QuickStartTabs quickLinks={quickLinks} />
      <About websiteName={settings.websiteName} />
      <Contact websiteEmail={settings.websiteEmail} />
      <Footer websiteName={settings.websiteName} websiteEmail={settings.websiteEmail} />
    </main>
  );
}
