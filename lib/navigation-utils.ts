import type { NavGroup, NavItem, MobileNavData } from "@/lib/navigation"

export type { NavItem, NavGroup, MobileNavData }

export function flattenNavGroups(
  groups: NavGroup[],
): Array<NavItem & { count?: number }> {
  return groups.flatMap((group) => group.items)
}

export function isNavItemActive(pathname: string, url: string): boolean {
  const [path] = url.split("#")
  return pathname === path || pathname === path.replace(/\/$/, "")
}
