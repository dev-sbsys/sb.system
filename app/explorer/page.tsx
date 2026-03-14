import ProjectsExplorer from "../../components/ProjectsExplorer";
import MaintenanceScreen from "../../components/MaintenanceScreen";
import { getSiteSnapshot } from "@/lib/site-data";
import { sora } from "../../components/siteTheme";

export const dynamic = "force-dynamic";

export default async function ExplorerPage() {
  const snapshot = await getSiteSnapshot();

  if (snapshot.settings.maintenanceMode) {
    return <MaintenanceScreen websiteName={snapshot.settings.websiteName} />;
  }

  return (
    <main className={`${sora.className} min-h-screen bg-[#050505] pt-10 pb-20`}>
      <ProjectsExplorer categories={snapshot.categories} projects={snapshot.projects} />
    </main>
  );
}
