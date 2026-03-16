import { supabase } from "./supabase";

export type SiteSettings = {
  websiteName: string;
  websiteEmail: string;
  maintenanceMode: boolean;
  faviconUpdatedAt: string | null;
};

export type QuickLink = {
  id: string;
  label: string;
  href: string;
  sortOrder: number;
};

export type ExplorerCategory = {
  id: string;
  name: string;
  sortOrder: number;
};

export type ExplorerProject = {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  githubLink: string;
  demoLink: string;
  sortOrder: number;
};

export type InstallCommand = {
  id: string;
  osName: string;
  command: string;
};

export async function getSiteSettings(): Promise<SiteSettings> {
  const { data, error } = await supabase
    .from("settings")
    .select("website_name, website_email, maintenance_mode, favicon_updated_at")
    .eq("id", 1)
    .single();

  if (error || !data) {
    throw new Error(`Failed to fetch site settings: ${error?.message ?? "No data"}`);
  }

  return {
    websiteName: data.website_name,
    websiteEmail: data.website_email,
    maintenanceMode: Boolean(data.maintenance_mode),
    faviconUpdatedAt: data.favicon_updated_at ?? null,
  };
}

export async function getQuickLinks(): Promise<QuickLink[]> {
  const { data, error } = await supabase
    .from("quick_links")
    .select("id, label, href, sort_order")
    .order("sort_order", { ascending: true })
    .order("label", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch quick links: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    label: row.label,
    href: row.href,
    sortOrder: row.sort_order,
  }));
}

export async function getExplorerCategories(): Promise<ExplorerCategory[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, sort_order")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    sortOrder: row.sort_order,
  }));
}

export async function getExplorerProjects(): Promise<ExplorerProject[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("id, name, description, category_id, github_link, demo_link, sort_order")
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    categoryId: row.category_id,
    githubLink: row.github_link,
    demoLink: row.demo_link,
    sortOrder: row.sort_order,
  }));
}

export async function getInstallCommands(): Promise<InstallCommand[]> {
  const { data, error } = await supabase
    .from("install_commands")
    .select("id, os_name, command")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch install commands: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    osName: row.os_name,
    command: row.command,
  }));
}

export async function getSiteSnapshot() {
  const [settings, quickLinks, categories, projects, installCommands] = await Promise.all([
    getSiteSettings(),
    getQuickLinks(),
    getExplorerCategories(),
    getExplorerProjects(),
    getInstallCommands(),
  ]);

  return { settings, quickLinks, categories, projects, installCommands };
}
