import { sora } from "./siteTheme";

type MaintenanceScreenProps = {
  websiteName: string;
};

export default function MaintenanceScreen({ websiteName }: MaintenanceScreenProps) {
  return (
    <main className={`${sora.className} relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6 text-[#e5e5e5]`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,42,42,0.2),transparent_30%),radial-gradient(circle_at_bottom,rgba(255,42,42,0.14),transparent_32%)]" />
      <div className="relative w-full max-w-2xl rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,15,15,0.92),rgba(7,7,7,0.96))] p-10 text-center shadow-[0_0_60px_rgba(255,42,42,0.14)]">
        <div className="mx-auto h-16 w-16 rounded-full border border-[#ff2a2a]/40 bg-[#ff2a2a]/10 p-4 shadow-[0_0_30px_rgba(255,42,42,0.2)]">
          <div className="h-full w-full animate-pulse rounded-full bg-[#ff2a2a] shadow-[0_0_28px_rgba(255,42,42,0.65)]" />
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.42em] text-[#ff2a2a]">{websiteName}</p>
        <h1 className="mt-4 text-4xl font-semibold text-white [text-shadow:0_0_22px_rgba(255,42,42,0.15)] sm:text-5xl">Maintenance Mode</h1>
        <p className="mt-6 text-base leading-8 text-[#b7b7b7] sm:text-lg">Website is currently under maintenance. Please come back later.</p>
      </div>
    </main>
  );
}