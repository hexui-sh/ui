import { getContentNavigation } from "@/lib/content"
import { getBlockNavigationGroups } from "@/lib/blocks"

export type NavItem = {
  title: string
  url: string
  disabled?: boolean
}

export type NavGroup = {
  title: string
  items: Array<NavItem & { count?: number }>
}

export type MobileNavData = {
  header: NavItem[]
  docs: NavGroup[]
  blocks: NavGroup[]
}

export const HEADER_NAV_ITEMS: NavItem[] = [
  { title: "Docs", url: "/docs/introduction" },
  { title: "Pricing", url: "/pricing" },
  { title: "Blocks", url: "/blocks/banner" },
  { title: "Templates", url: "/templates", disabled: true },
]

export function getHeaderNavItems(): NavItem[] {
  return HEADER_NAV_ITEMS
}

export async function getDocsNavGroups(): Promise<NavGroup[]> {
  return getContentNavigation("docs")
}

export async function getBlocksNavGroups(): Promise<NavGroup[]> {
  return getBlockNavigationGroups()
}

export async function getMobileNavData(): Promise<MobileNavData> {
  const [docs, blocks] = await Promise.all([
    getDocsNavGroups(),
    getBlocksNavGroups(),
  ])

  return {
    header: getHeaderNavItems(),
    docs,
    blocks,
  }
}
