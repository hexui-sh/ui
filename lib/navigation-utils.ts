import type { NavGroup, NavItem, MobileNavData } from "@/lib/navigation"

export type { NavItem, NavGroup, MobileNavData }

export function flattenNavGroups(
  groups: NavGroup[],
): Array<NavItem & { count?: number }> {
  return groups.flatMap((group) => group.items)
}
