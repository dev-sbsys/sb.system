import { sora } from "./siteTheme";

type SectionHeaderProps = {
  title: string;
};

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className={`${sora.className} flex items-center justify-center gap-3 text-center`}>
      <span className="text-2xl font-bold leading-none tracking-[0.08em] text-[#ff2a2a] sm:text-3xl">
        &gt;
      </span>
      <h2 className="text-3xl font-bold tracking-[0.06em] text-white sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
