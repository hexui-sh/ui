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
  templates: NavGroup[]
  blocks: NavGroup[]
}

export const HEADER_NAV_ITEMS: NavItem[] = [
  { title: "Docs", url: "/docs/introduction" },
  { title: "Blocks", url: "/blocks/" },
  { title: "Templates", url: "/templates" },
  { title: "Sponsor", url: "/sponsor", disabled: true },
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

export async function getTemplatesNavGroups(): Promise<NavGroup[]> {
  return getContentNavigation("templates")
}

export async function getMobileNavData(): Promise<MobileNavData> {
  const [docs, templates, blocks] = await Promise.all([
    getDocsNavGroups(),
    getTemplatesNavGroups(),
    getBlocksNavGroups(),
  ])

  return {
    header: getHeaderNavItems(),
    docs,
    templates,
    blocks,
  }
}
