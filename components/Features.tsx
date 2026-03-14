import SectionHeader from "./SectionHeader";
import { sora } from "./siteTheme";

const features = [
  {
    title: "AI Automation",
    description: "Workflow systems and intelligent agents for repetitive tasks.",
  },
  {
    title: "Developer Tools",
    description: "Practical utilities designed for builders working with modern AI stacks.",
  },
  {
    title: "Rapid Experiments",
    description: "Fast-moving prototypes that test new ideas, interfaces, and AI workflows.",
  },
];

export default function Features() {
  return (
    <section id="features" className={`${sora.className} section-reveal px-6 py-20 text-white sm:py-24`}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeader title="Features" />
          <p className="mt-6 text-base leading-8 text-[#9ca3af] sm:text-lg">
            Core capabilities that shape the SB.system ecosystem.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_0_28px_rgba(255,42,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#ff2a2a]/45 hover:shadow-[0_0_34px_rgba(255,42,42,0.14)]"
            >
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#9ca3af] sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
