"use client";

import { useMemo, useState } from "react";
import type { ExplorerCategory, ExplorerProject } from "@/lib/site-data";

type ProjectManagerProps = {
  initialCategories: ExplorerCategory[];
  initialProjects: ExplorerProject[];
};

type ProjectDraft = {
  name: string;
  description: string;
  categoryId: string;
  githubLink: string;
  demoLink: string;
};

const emptyDraft: ProjectDraft = {
  name: "",
  description: "",
  categoryId: "",
  githubLink: "",
  demoLink: "",
};

export default function ProjectManager({ initialCategories, initialProjects }: ProjectManagerProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [projects, setProjects] = useState(initialProjects);
  const [categoryDraft, setCategoryDraft] = useState("");
  const [projectDraft, setProjectDraft] = useState<ProjectDraft>({
    ...emptyDraft,
    categoryId: initialCategories[0]?.id ?? "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const categoryMap = useMemo(() => new Map(categories.map((category) => [category.id, category.name])), [categories]);

  async function parseResponse<T>(response: Response) {
    const data = (await response.json()) as { items?: T[]; error?: string };
    if (!response.ok || !data.items) {
      setMessage(data.error ?? "Unable to update data.");
      return null;
    }

    return data.items;
  }

  async function addCategory() {
    const response = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: categoryDraft }),
    });
    const items = await parseResponse<ExplorerCategory>(response);
    if (!items) return;
    setCategories(items);
    setCategoryDraft("");
    setProjectDraft((current) => ({ ...current, categoryId: current.categoryId || items[0]?.id || "" }));
    setMessage("Category added.");
  }

  async function saveCategories() {
    const response = await fetch("/api/admin/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: categories.map(({ id, name }) => ({ id, name })) }),
    });
    const items = await parseResponse<ExplorerCategory>(response);
    if (!items) return;
    setCategories(items);
    setMessage("Categories updated.");
  }

  async function deleteCategory(id: string) {
    const response = await fetch(`/api/admin/categories?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const items = await parseResponse<ExplorerCategory>(response);
    if (!items) return;
    setCategories(items);
    setMessage("Category removed.");
  }

  async function addProject() {
    const response = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectDraft),
    });
    const items = await parseResponse<ExplorerProject>(response);
    if (!items) return;
    setProjects(items);
    setProjectDraft({ ...emptyDraft, categoryId: categories[0]?.id ?? "" });
    setMessage("Project added.");
  }

  async function saveProject(project: ExplorerProject) {
    setSavingId(project.id);
    const response = await fetch("/api/admin/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    const items = await parseResponse<ExplorerProject>(response);
    setSavingId(null);
    if (!items) return;
    setProjects(items);
    setMessage("Project updated.");
  }

  async function deleteProject(id: string) {
    const response = await fetch(`/api/admin/projects?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    const items = await parseResponse<ExplorerProject>(response);
    if (!items) return;
    setProjects(items);
    setMessage("Project removed.");
  }

  return (
    <div className="space-y-6">
      <section id="categories" className="rounded-[24px] border border-[#1f2937] bg-[#111827] p-6 shadow-[0_18px_60px_rgba(2,6,23,0.18)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Explorer Tabs</p>
            <h3 className="mt-2 text-xl font-semibold text-[#e5e7eb]">Category Management</h3>
            <p className="mt-2 text-sm leading-6 text-[#9ca3af]">Create, rename, and remove explorer tabs without touching any backend logic.</p>
          </div>
          <button type="button" onClick={saveCategories} className="rounded-xl border border-[#374151] bg-[#0f172a] px-4 py-2.5 text-sm font-medium text-[#e5e7eb] transition hover:border-[#6366f1] hover:bg-[#111827]">Save Categories</button>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          {categories.map((category, index) => (
            <div key={category.id} className="grid gap-3 rounded-2xl border border-[#1f2937] bg-[#0f172a] p-4 sm:grid-cols-[1fr_auto]">
              <input value={category.name} onChange={(event) => { const next = [...categories]; next[index] = { ...category, name: event.target.value }; setCategories(next); }} className="rounded-xl border border-[#1f2937] bg-[#111827] px-4 py-3 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" />
              <button type="button" onClick={() => deleteCategory(category.id)} className="rounded-xl border border-[#374151] bg-[#111827] px-4 py-3 text-sm font-medium text-[#e5e7eb] transition hover:border-rose-400 hover:text-rose-200">Delete</button>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-dashed border-[#334155] bg-[#0f172a] p-4">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <input value={categoryDraft} onChange={(event) => setCategoryDraft(event.target.value)} className="rounded-xl border border-[#1f2937] bg-[#111827] px-4 py-3 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" placeholder="Add new category" />
            <button type="button" onClick={addCategory} className="rounded-xl border border-[#4f46e5]/40 bg-[#312e81]/20 px-4 py-3 text-sm font-medium text-[#e5e7eb] transition hover:border-[#6366f1] hover:bg-[#312e81]/30">Add Tab</button>
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-[#1f2937] bg-[#111827] p-6 shadow-[0_18px_60px_rgba(2,6,23,0.18)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6366f1]">Projects</p>
          <h3 className="mt-2 text-xl font-semibold text-[#e5e7eb]">Project Management</h3>
          <p className="mt-2 text-sm leading-6 text-[#9ca3af]">Create projects, assign them to categories, and publish changes to the Explorer page.</p>
        </div>

        <div className="mt-6 rounded-2xl border border-[#1f2937] bg-[#0f172a] p-5">
          <div className="grid gap-4 lg:grid-cols-2">
            <input value={projectDraft.name} onChange={(event) => setProjectDraft((current) => ({ ...current, name: event.target.value }))} className="rounded-xl border border-[#1f2937] bg-[#111827] px-4 py-3 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" placeholder="Project name" />
            <select value={projectDraft.categoryId} onChange={(event) => setProjectDraft((current) => ({ ...current, categoryId: event.target.value }))} className="rounded-xl border border-[#1f2937] bg-[#111827] px-4 py-3 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20">
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
          </div>
          <textarea value={projectDraft.description} onChange={(event) => setProjectDraft((current) => ({ ...current, description: event.target.value }))} className="mt-4 min-h-28 w-full rounded-xl border border-[#1f2937] bg-[#111827] px-4 py-3 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" placeholder="Description" />
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <input value={projectDraft.githubLink} onChange={(event) => setProjectDraft((current) => ({ ...current, githubLink: event.target.value }))} className="rounded-xl border border-[#1f2937] bg-[#111827] px-4 py-3 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" placeholder="GitHub link" />
            <input value={projectDraft.demoLink} onChange={(event) => setProjectDraft((current) => ({ ...current, demoLink: event.target.value }))} className="rounded-xl border border-[#1f2937] bg-[#111827] px-4 py-3 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" placeholder="Demo link" />
          </div>
          <button type="button" onClick={addProject} className="mt-4 rounded-xl border border-[#4f46e5]/40 bg-[#312e81]/20 px-4 py-2.5 text-sm font-medium text-[#e5e7eb] transition hover:border-[#6366f1] hover:bg-[#312e81]/30">Add Project</button>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-[#1f2937]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#1f2937] text-left">
              <thead className="bg-[#0f172a] text-xs uppercase tracking-[0.18em] text-[#9ca3af]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Project Name</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">GitHub</th>
                  <th className="px-4 py-3 font-semibold">Demo</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2937] bg-[#111827]">
                {projects.map((project, index) => (
                  <tr key={project.id} className="align-top transition hover:bg-[#0f172a]/70">
                    <td className="px-4 py-4">
                      <input value={project.name} onChange={(event) => { const next = [...projects]; next[index] = { ...project, name: event.target.value }; setProjects(next); }} className="w-full rounded-xl border border-[#1f2937] bg-[#0f172a] px-3 py-2.5 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" />
                    </td>
                    <td className="px-4 py-4">
                      <select value={project.categoryId} onChange={(event) => { const next = [...projects]; next[index] = { ...project, categoryId: event.target.value }; setProjects(next); }} className="w-full rounded-xl border border-[#1f2937] bg-[#0f172a] px-3 py-2.5 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20">
                        {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <input value={project.githubLink} onChange={(event) => { const next = [...projects]; next[index] = { ...project, githubLink: event.target.value }; setProjects(next); }} className="w-full rounded-xl border border-[#1f2937] bg-[#0f172a] px-3 py-2.5 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" />
                    </td>
                    <td className="px-4 py-4">
                      <input value={project.demoLink} onChange={(event) => { const next = [...projects]; next[index] = { ...project, demoLink: event.target.value }; setProjects(next); }} className="w-full rounded-xl border border-[#1f2937] bg-[#0f172a] px-3 py-2.5 text-sm text-[#e5e7eb] outline-none transition focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex min-w-[150px] flex-col gap-2">
                        <button type="button" onClick={() => void saveProject(project)} className="rounded-xl border border-[#4f46e5]/40 bg-[#312e81]/20 px-4 py-2.5 text-sm font-medium text-[#e5e7eb] transition hover:border-[#6366f1] hover:bg-[#312e81]/30">{savingId === project.id ? "Saving..." : "Edit"}</button>
                        <button type="button" onClick={() => deleteProject(project.id)} className="rounded-xl border border-[#374151] bg-[#0f172a] px-4 py-2.5 text-sm font-medium text-[#e5e7eb] transition hover:border-rose-400 hover:text-rose-200">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {message ? <p className="mt-4 text-sm text-[#cbd5e1]">{message}</p> : null}
      </section>
    </div>
  );
}
