import type { QuickLink, SiteSettings } from "@/lib/site-data";
import Hero from "./Hero";
import QuickStartTabs from "./QuickStartTabs";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import RoutePrefetch from "./RoutePrefetch";

type HomePageProps = {
  settings: SiteSettings;
  quickLinks: QuickLink[];
};

export default async function HomePage({ settings, quickLinks }: HomePageProps) {
  return (
    <main className="bg-[#050505] page-transition">
      <RoutePrefetch />
      <Hero websiteName={settings.websiteName} />
      <QuickStartTabs quickLinks={quickLinks} />
      <About websiteName={settings.websiteName} />
      <Contact websiteEmail={settings.websiteEmail} />
      <Footer websiteName={settings.websiteName} websiteEmail={settings.websiteEmail} />
    </main>
  );
}
