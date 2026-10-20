/** Paths outside TanStack Link (public assets and native browser navigation). */
export function sitePath(path: string, base = import.meta.env.BASE_URL): string {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

export function siteUrl(path: string): string {
  return new URL(sitePath(path), "https://dghawss03.github.io").href;
}

/** Keep older locally entered image paths usable after moving to a project URL. */
export function siteAssetPath(path: string, base = import.meta.env.BASE_URL): string {
  return path.startsWith("/assets/") ||
    path.startsWith("/src/assets/") ||
    path === "/social-card.svg"
    ? sitePath(path, base)
    : path;
}
