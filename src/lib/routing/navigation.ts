export interface NavigationItem {
  key: string;
  path: string;
}

export const primaryNavigationItems: NavigationItem[] = [
  { key: "collection", path: "/" },
  { key: "brands", path: "/brands" },
  { key: "manufacturers", path: "/manufacturers" },
  { key: "feed", path: "/feed" },
];

export const secondaryNavigationItems: NavigationItem[] = [
  { key: "community", path: "/community" },
  { key: "chat", path: "/chat" },
  { key: "changelog", path: "/changelog" },
];

export const mobileNavigationItems: NavigationItem[] = [
  { key: "collection", path: "/" },
  { key: "brands", path: "/brands" },
  { key: "feed", path: "/feed" },
  { key: "community", path: "/community" },
];

export function isPathActive(pathname: string | null | undefined, path: string) {
  if (!pathname) {
    return false;
  }

  if (path === "/") {
    return pathname === "/";
  }

  return pathname === path || pathname.startsWith(`${path}/`) || pathname.startsWith(path);
}
