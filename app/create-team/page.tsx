import React from "react";
import CreateTeamForm from "@/components/CreateTeamForm";
import { getSiteSnapshot } from "@/lib/site-data";
import { sora } from "@/components/siteTheme";

export const dynamic = "force-dynamic";

export default async function CreateTeamPage() {
  const snapshot = await getSiteSnapshot();

  return (
    <main className={`${sora.className} flex h-screen flex-col overflow-hidden bg-[#050505] text-white`}>
      <CreateTeamForm />
      
      <style dangerouslySetInnerHTML={{ __html: `
        body { overflow: hidden !important; }
      ` }} />
    </main>
  );
}
