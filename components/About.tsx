import SectionHeader from "./SectionHeader";
import { sora } from "./siteTheme";

const pillars = [
  { label: "Focus", value: "AI experiments" },
  { label: "System", value: "Automation workflows" },
  { label: "Built By", value: "Shahabas" },
];

type AboutProps = {
  websiteName: string;
};

export default function About({ websiteName }: AboutProps) {
  return (
    <section id="about" className={`${sora.className} section-reveal px-6 py-20 text-white sm:py-24`}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center"><SectionHeader title="About" /></div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] p-7 shadow-[0_0_40px_rgba(255,42,42,0.08)] backdrop-blur-xl sm:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,42,42,0.16),transparent_38%)]" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-[0.42em] text-[#ff2a2a]">{websiteName}</p>
              <p className="mt-6 max-w-2xl text-2xl font-semibold leading-10 text-white sm:text-3xl sm:leading-[3rem]">A lab for AI systems, practical automation, and developer-first tooling.</p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#9ca3af] sm:text-lg">{websiteName} is a collection of AI experiments, automation systems, and developer tools built by Shahabas.</p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#9ca3af] sm:text-lg">This platform documents projects, ideas, and systems created using modern AI tools, with a focus on turning experiments into useful products.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {pillars.map((item) => (
              <div key={item.label} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_0_30px_rgba(255,42,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ff2a2a]/45 hover:shadow-[0_0_32px_rgba(255,42,42,0.12)]">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#9ca3af]">{item.label}</p>
                <p className="mt-4 text-xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
