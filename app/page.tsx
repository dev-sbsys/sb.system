import HomePage from "../components/HomePage";
import MaintenanceScreen from "../components/MaintenanceScreen";
import { getSiteSnapshot } from "@/lib/site-data";

export const dynamic = "force-dynamic";

export default async function Page() {
  const snapshot = await getSiteSnapshot();

  if (snapshot.settings.maintenanceMode) {
    return <MaintenanceScreen websiteName={snapshot.settings.websiteName} />;
  }

  return <HomePage settings={snapshot.settings} quickLinks={snapshot.quickLinks} />;
}
