import SectionHeader from "./SectionHeader";
import { jetBrainsMono, sora } from "./siteTheme";

type ContactProps = {
  websiteEmail: string;
};

export default function Contact({ websiteEmail }: ContactProps) {
  return (
    <section id="contact" className={`${sora.className} section-reveal px-6 py-20 text-white sm:py-24`}>
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeader title="Contact" />
        <p className="mt-6 text-base leading-8 text-[#9ca3af] sm:text-lg">
          Reach out for collaborations, AI experiments, or custom automation systems.
        </p>

        <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-[30px] border border-[#ff2a2a]/20 bg-[#050505] text-left shadow-[0_0_40px_rgba(255,42,42,0.08)]">
          <div className="border-b border-[#ff2a2a]/20 bg-[linear-gradient(180deg,rgba(255,42,42,0.12),rgba(255,42,42,0.03))] px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_12px_rgba(255,95,86,0.4)]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_12px_rgba(255,189,46,0.3)]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_12px_rgba(39,201,63,0.3)]" />
              </div>
              <span className={`${jetBrainsMono.className} text-[11px] uppercase tracking-[0.28em] text-[#ff8d8d]`}>
                contact.terminal
              </span>
            </div>
          </div>

          <div className="relative bg-[linear-gradient(180deg,rgba(8,8,8,0.98),rgba(3,3,3,1))] p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:100%_24px]" />

            <div className={`${jetBrainsMono.className} relative rounded-[24px] border border-white/8 bg-black/50 p-5 text-sm text-[#bcbcbc] sm:p-6`}>
              <div className="text-[11px] uppercase tracking-[0.24em] text-[#ff5c5c]">outbound channel</div>
              <div className="mt-4 space-y-3 leading-7">
                <div><span className="text-[#ff2a2a]">$</span> initiate contact --topic collaboration</div>
              </div>

              <div className="mt-6 rounded-[18px] border border-white/8 bg-[#080808] px-4 py-4 text-[#d8d8d8] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <span className="text-[#ff6b6b]">&gt;</span> {websiteEmail}
              </div>

              <a
                href={`mailto:${websiteEmail}`}
                className="mt-6 inline-flex items-center gap-3 rounded-[18px] border border-[#ff2a2a]/45 bg-[linear-gradient(180deg,rgba(255,42,42,0.16),rgba(255,42,42,0.05))] px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ff2a2a]/75 hover:bg-[linear-gradient(180deg,rgba(255,42,42,0.24),rgba(255,42,42,0.08))] hover:shadow-[0_0_24px_rgba(255,42,42,0.18)]"
              >
                <span className="text-[#ff8d8d]">&gt;_</span>
                <span>Send Message</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
