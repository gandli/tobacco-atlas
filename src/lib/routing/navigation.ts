export interface NavigationItem {
  key: string;
  path: string;
}

export const primaryNavigationItems: NavigationItem[] = [
  { key: "collection", path: "/" },
  { key: "brands", path: "/brands" },
  { key: "manufacturers", path: "/manufacturers" },
  { key: "community", path: "/community" },
  { key: "chat", path: "/chat" },
  { key: "my", path: "/my" },
];

export function isPathActive(pathname: string, path: string) {
  if (path === "/") {
    return pathname === "/";
  }

  return pathname === path || pathname.startsWith(`${path}/`) || pathname.startsWith(path);
}
