import path from "node:path"
import { readFile } from "node:fs/promises"

export type BlockFile = {
  path: string
  type?: string
}

export type BlockPropDefinition = {
  prop: string
  type: string
  default: string | null
  description: string
}

export type BlockReferenceEntry = {
  name: string
  description: string
  props: BlockPropDefinition[]
}

export type BlockEntry = {
  slug: string
  title: string
  description?: string
  category?: string
  path?: string
  installCommand?: string
  previewUrl?: string
  v0Url?: string
  previewPath?: string
  codePath?: string
  files?: BlockFile[]
  reference?: BlockReferenceEntry[]
}

type BlockGroup = {
  category: string
  blocks: BlockEntry[]
}

type BlockNavigationGroup = {
  title: string
  items: Array<{
    title: string
    url: string
    count?: number
  }>
}

type BlockJsonShape = {
  blocks?: BlockEntry[]
  group?: Array<{
    category?: string
    blocks?: BlockEntry[]
  }>
  groups?: Array<{
    category?: string
    blocks?: BlockEntry[]
  }>
}

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

function compareByTitle(a: { title: string }, b: { title: string }) {
  return a.title.localeCompare(b.title, "en", { sensitivity: "base" })
}

async function readBlocksJson(): Promise<BlockJsonShape> {
  const filePath = path.join(process.cwd(), "content", "blocks", "registry.json")

  try {
    const raw = await readFile(filePath, "utf8")
    return JSON.parse(raw) as BlockJsonShape
  } catch {
    return {}
  }
}

function isBlockEntry(entry: BlockEntry | undefined | null): entry is BlockEntry {
  return Boolean(entry?.slug) && Boolean(entry?.title)
}

function normalizeBlockEntry(entry: BlockEntry): BlockEntry {
  return {
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    path: entry.path,
    installCommand: entry.installCommand,
    previewUrl: entry.previewUrl,
    v0Url: entry.v0Url,
    previewPath: entry.previewPath,
    codePath: entry.codePath,
    files: Array.isArray(entry.files) ? entry.files : undefined,
    reference: Array.isArray(entry.reference) ? entry.reference : undefined,
  }
}

function normalizeBlockGroups(data: BlockJsonShape): BlockGroup[] {
  const groupCandidates = Array.isArray(data.groups)
    ? data.groups
    : Array.isArray(data.group)
      ? data.group
      : []

  if (groupCandidates.length > 0) {
    return groupCandidates
      .map((group) => ({
        category: group.category?.trim() || "General",
        blocks: (Array.isArray(group.blocks) ? group.blocks : [])
          .filter(isBlockEntry)
          .map(normalizeBlockEntry),
      }))
      .filter((group) => group.blocks.length > 0)
      .sort((a, b) => compareByTitle({ title: a.category }, { title: b.category }))
      .map((group) => ({
        ...group,
        blocks: [...group.blocks].sort(compareByTitle),
      }))
  }

  const entries = (Array.isArray(data.blocks) ? data.blocks : [])
    .filter(isBlockEntry)
    .map(normalizeBlockEntry)
    .sort(compareByTitle)

  if (entries.length === 0) {
    return []
  }

  return [
    {
      category: "General",
      blocks: entries,
    },
  ]
}

export async function getBlockGroups(): Promise<BlockGroup[]> {
  const data = await readBlocksJson()
  return normalizeBlockGroups(data)
}

export async function getBlockEntries(): Promise<BlockEntry[]> {
  const groups = await getBlockGroups()
  return groups.flatMap((group) =>
    group.blocks.map((block) => ({ ...block, category: group.category }))
  ).sort(compareByTitle)
}

export async function getBlockEntryBySlug(slug: string): Promise<BlockEntry | undefined> {
  const entries = await getBlockEntries()
  return entries.find((entry) => entry.slug === slug)
}

export async function getBlockCategories(): Promise<string[]> {
  const groups = await getBlockGroups()
  const seen = new Set<string>()

  for (const group of groups) {
    seen.add(group.category)
  }

  return Array.from(seen).sort((a, b) =>
    a.localeCompare(b, "en", { sensitivity: "base" })
  )
}

export async function getBlockEntriesByCategory(
  slug: string
): Promise<{ category: string; blocks: BlockEntry[] } | undefined> {
  const groups = await getBlockGroups()
  const group = groups.find((g) => categoryToSlug(g.category) === slug)
  if (!group) return undefined
  return {
    category: group.category,
    blocks: [...group.blocks].sort(compareByTitle),
  }
}

export async function getBlockNavigationGroups(): Promise<BlockNavigationGroup[]> {
  const groups = await getBlockGroups()

  return [
    {
      title: "Categories",
      items: groups.map((group) => ({
        title: group.category,
        url: `/blocks/${categoryToSlug(group.category)}`,
        count: group.blocks.length,
      })),
    },
  ]
}
