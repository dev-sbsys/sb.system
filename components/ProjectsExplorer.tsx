"use client";

import { useState } from "react";
import type { ExplorerCategory, ExplorerProject } from "@/lib/site-data";
import SectionHeader from "./SectionHeader";
import { jetBrainsMono, sora } from "./siteTheme";

type ProjectsExplorerProps = {
  categories: ExplorerCategory[];
  projects: ExplorerProject[];
};

const terminalLines = [
  {
    prefix: "#",
    text: "Explore modular builds and AI systems",
    prefixClassName: "text-[#7c7c7c]",
    textClassName: "text-[#b6beca]",
  },
  {
    prefix: "$",
    text: "Browse AI Tools, Bots, and Experiments",
    prefixClassName: "text-[#ff2a2a]",
    textClassName: "text-[#e5e5e5]",
  },
  {
    prefix: "$",
    text: "Projects are dynamically controlled by the Admin Panel",
    prefixClassName: "text-[#ff2a2a]",
    textClassName: "text-[#e5e5e5]",
  },
  {
    prefix: "$",
    text: "New tabs and projects can be created anytime",
    prefixClassName: "text-[#ff2a2a]",
    textClassName: "text-[#e5e5e5]",
  },
];

export default function ProjectsExplorer({ categories, projects }: ProjectsExplorerProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const filteredProjects = projects.filter((project) => project.categoryId === activeCategory);

  return (
    <section id="projects" className={`${sora.className} section-reveal bg-[#050505] px-6 py-20 text-[#e5e5e5] sm:py-24`}>
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader title="Projects Explorer" />

          <div className="mx-auto mt-8 max-w-3xl rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,#111827_0%,#0d1117_55%,#050505_100%)] p-4 shadow-[0_0_40px_rgba(255,42,42,0.08)] backdrop-blur-xl transition-all duration-200 hover:shadow-[0_0_46px_rgba(255,42,42,0.12)] sm:p-5">
            <div className="overflow-hidden rounded-[26px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/8 bg-black/20 px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[0_0_12px_rgba(255,95,87,0.35)]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[0_0_12px_rgba(254,188,46,0.3)]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[0_0_12px_rgba(40,200,64,0.3)]" />
                </div>

                <div className={`${jetBrainsMono.className} flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#9ca3af]`}>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Explorer</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Admin Sync</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Live Tabs</span>
                </div>
              </div>

              <div className={`${jetBrainsMono.className} space-y-4 px-5 py-5 text-sm leading-7 sm:px-6 sm:py-6 sm:text-[15px]`}>
                {terminalLines.map((line) => (
                  <div key={line.text} className="flex items-start gap-3">
                    <span className={`${line.prefixClassName} mt-[1px] font-semibold`}>{line.prefix}</span>
                    <span className={line.textClassName}>{line.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {categories.map((category) => {
            const isActive = category.id === activeCategory;
            return (
              <button key={category.id} type="button" onClick={() => setActiveCategory(category.id)} className={`rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${isActive ? "border-[#ff2a2a] bg-[#ff2a2a] text-white shadow-[0_0_24px_rgba(255,42,42,0.3)]" : "border-white/10 bg-[#0d0d0d] text-[#e5e5e5] hover:-translate-y-0.5 hover:border-[#ff2a2a]/55 hover:text-white"}`} aria-pressed={isActive}>
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <article key={project.id} className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0d0d] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-1 hover:border-[#ff2a2a]/45 hover:shadow-[0_0_28px_rgba(255,42,42,0.14)]" style={{ animationDelay: `${index * 80}ms` }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,42,42,0.16),transparent_45%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col">
                <div className={`${jetBrainsMono.className} text-[11px] uppercase tracking-[0.28em] text-[#a3a3a3]`}>{categories.find((item) => item.id === project.categoryId)?.name ?? "Category"} / {project.id}</div>
                <h3 className="mt-4 text-2xl font-semibold text-[#e5e5e5]">{project.name}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-[#b8b8b8] sm:text-base">{project.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={project.demoLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-[#ff2a2a]/65 bg-[#ff2a2a]/12 px-5 py-3 text-sm font-semibold text-[#e5e5e5] transition-all duration-200 hover:bg-[#ff2a2a] hover:text-[#050505] hover:shadow-[0_0_22px_rgba(255,42,42,0.24)] active:scale-[0.98]">View Project</a>
                  <a href={project.githubLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-[#e5e5e5] transition-all duration-200 hover:border-[#ff2a2a]/45 hover:text-white active:scale-[0.98]">GitHub</a>
                  <a href={project.demoLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-black/20 px-5 py-3 text-sm font-semibold text-[#e5e5e5] transition-all duration-200 hover:border-[#ff2a2a]/45 hover:text-white active:scale-[0.98]">Live Demo</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
