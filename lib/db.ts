// SQLite has been removed. This file now only exports the makeId utility
// which is used by API routes to generate slug-based IDs for new records.

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

export function makeId(value: string, fallback = "item") {
  const slug = slugify(value);
  return slug || `${fallback}-${crypto.randomUUID().slice(0, 8)}`;
}
