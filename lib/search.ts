import { categoryToSlug, getBlockGroups } from "@/lib/blocks"
import { getContentEntries } from "@/lib/content"

export type SearchItemType = "docs" | "templates" | "blocks"

export type SearchItem = {
  value: string
  label: string
  type: SearchItemType
  url: string
}

export type SearchGroup = {
  value: string
  items: SearchItem[]
}

export async function getSearchGroups(): Promise<SearchGroup[]> {
  const [blockGroups, contentEntries] = await Promise.all([
    getBlockGroups(),
    getContentEntries(),
  ])

  const groups: SearchGroup[] = []

  const docItems: SearchItem[] = contentEntries
    .filter((entry) => entry.slug[0] === "docs")
    .map((entry) => ({
      value: `doc:${entry.slug.join("/")}`,
      label: entry.title,
      type: "docs" as const,
      url: `/${entry.slug.join("/")}`,
    }))

  if (docItems.length > 0) {
    groups.push({ value: "Docs", items: docItems })
  }

  const templateItems: SearchItem[] = contentEntries
    .filter((entry) => entry.slug[0] === "templates")
    .map((entry) => ({
      value: `template:${entry.slug.join("/")}`,
      label: entry.title,
      type: "templates" as const,
      url: `/${entry.slug.join("/")}`,
    }))

  if (templateItems.length > 0) {
    groups.push({ value: "Templates", items: templateItems })
  }

  for (const group of blockGroups) {
    const categorySlug = categoryToSlug(group.category)
    groups.push({
      value: group.category,
      items: group.blocks.map((block) => ({
        value: `block:${block.slug}`,
        label: block.title,
        type: "blocks" as const,
        url: `/blocks/${categorySlug}#${block.slug}`,
      })),
    })
  }

  return groups
}
