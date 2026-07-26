import { readdir, readFile, stat } from "node:fs/promises"
import path from "node:path"
import { getBlockNavigationGroups } from "@/lib/blocks"
import { getTemplateBySlug, getTemplates, getTemplateSummary } from "@/lib/templates"

export const CONTENT_SECTIONS = ["docs", "templates"] as const

export type ContentSection = (typeof CONTENT_SECTIONS)[number]

export type ContentFrontmatter = {
  title?: string
  description?: string
  category?: string
  order?: number
}

export type ContentEntry = {
  slug: string[]
  title: string
  description?: string
  category?: string
  order?: number
}

export type ContentFileEntry = {
  slug: string
  relativePath: string
  importPath: string
  title: string
  description?: string
  category?: string
  order?: number
}

export type ContentNavigationItem = {
  title: string
  url: string
  count?: number
}

export type ContentNavigationGroup = {
  title: string
  items: ContentNavigationItem[]
}

export type ContentNavigationContext = {
  previous?: {
    title: string
    href: string
  }
  next?: {
    title: string
    href: string
  }
}

export type ContentPageData = {
  file: ContentFileEntry
  frontmatter: ContentFrontmatter
  source: string
  navigation: ContentNavigationContext
}

const CONTENT_SECTION_CONFIG: Record<
  ContentSection,
  { defaultCategory: string }
> = {
  docs: {
    defaultCategory: "General",
  },
  templates: {
    defaultCategory: "Templates",
  },
}

const CONTENT_EXTENSIONS = new Set([".mdx"])
const FRONTMATTER_BLOCK_PATTERN =
  /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/

export function isContentSection(value: string): value is ContentSection {
  return CONTENT_SECTIONS.includes(value as ContentSection)
}

export function getContentRoot(section: ContentSection) {
  if (section === "docs") {
    return path.join(process.cwd(), "docs")
  }

  return path.join(process.cwd(), "templates")
}

function normalizeFrontmatterValue(value: string) {
  const trimmed = value.trim()

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

function parseFrontmatter(content: string): ContentFrontmatter {
  const match = content.match(FRONTMATTER_BLOCK_PATTERN)
  if (!match) {
    return {}
  }

  const frontmatter: ContentFrontmatter = {}

  for (const line of match[1].split(/\r?\n/)) {
    const item = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.+)\s*$/)
    if (!item) {
      continue
    }

    const key = item[1]
    const value = normalizeFrontmatterValue(item[2])

    if (key === "title" || key === "description" || key === "category") {
      frontmatter[key] = value
      continue
    }

    if (key === "order" || key === "displayOrder" || key === "display_order") {
      const order = Number(value)
      if (Number.isFinite(order)) {
        frontmatter.order = order
      }
    }
  }

  return frontmatter
}

async function readFrontmatterFromFile(
  filePath: string
): Promise<ContentFrontmatter> {
  try {
    const raw = await readFile(filePath, "utf8")
    return parseFrontmatter(raw)
  } catch {
    return {}
  }
}

function toTitle(value: string) {
  return value
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function deriveContentFile(
  section: ContentSection,
  relativePath: string
) {
  const normalizedPath = relativePath.replace(/\\/g, "/")
  const parsed = path.posix.parse(normalizedPath)
  if (!CONTENT_EXTENSIONS.has(parsed.ext)) {
    return null
  }

  const directorySegments = parsed.dir
    ? parsed.dir.split("/").filter(Boolean)
    : []
  const folderCategory =
    directorySegments.length > 0
      ? toTitle(directorySegments.join(" "))
      : undefined

  return {
    slug: parsed.name,
    folderCategory,
    importPath: normalizedPath.replace(/\.mdx$/, ""),
    section,
  }
}

function makeUrl(section: ContentSection, slug: string) {
  return `/${section}/${slug}`
}

async function collectContentFiles(
  rootDir: string,
  currentDir = rootDir
): Promise<string[]> {
  const entries = await readdir(currentDir, { withFileTypes: true })
  const files: string[] = []

  entries.sort((a, b) =>
    a.name.localeCompare(b.name, "en", { sensitivity: "base" })
  )

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectContentFiles(rootDir, fullPath)))
      continue
    }

    if (entry.isFile()) {
      files.push(path.relative(rootDir, fullPath))
    }
  }

  return files
}

function compareByTitle(a: { title: string }, b: { title: string }) {
  return a.title.localeCompare(b.title, "en", { sensitivity: "base" })
}

function compareContentEntries(
  a: { title: string; order?: number },
  b: { title: string; order?: number }
) {
  const orderDifference =
    (a.order ?? Number.POSITIVE_INFINITY) -
    (b.order ?? Number.POSITIVE_INFINITY)

  return orderDifference || compareByTitle(a, b)
}

function compareGroups(a: { title: string }, b: { title: string }) {
  if (a.title === "Get Started") return -1
  if (b.title === "Get Started") return 1
  return compareByTitle(a, b)
}

export async function getContentFileEntries(
  section: ContentSection
): Promise<ContentFileEntry[]> {
  if (section === "templates") {
    return getTemplates().map((template, index) => ({
      slug: template.slug,
      relativePath: "templates.json",
      importPath: "",
      title: template.title,
      description: getTemplateSummary(template),
      order: index + 1,
    }))
  }

  const contentRoot = getContentRoot(section)
  let files: string[] = []

  try {
    files = await collectContentFiles(contentRoot)
  } catch {
    return []
  }

  const entries: ContentFileEntry[] = []
  const seen = new Set<string>()

  for (const filePath of files) {
    const derived = deriveContentFile(section, filePath)
    if (!derived || seen.has(derived.slug)) {
      continue
    }

    seen.add(derived.slug)
    const frontmatter = await readFrontmatterFromFile(
      path.join(contentRoot, filePath)
    )

    entries.push({
      slug: derived.slug,
      relativePath: filePath.replace(/\\/g, "/"),
      importPath: derived.importPath,
      title: frontmatter.title ?? toTitle(derived.slug),
      description: frontmatter.description,
      category: frontmatter.category ?? derived.folderCategory,
      order: frontmatter.order,
    })
  }

  return entries.sort(compareContentEntries)
}

export async function getContentEntries(
  section?: ContentSection
): Promise<ContentEntry[]> {
  const sections = section ? [section] : [...CONTENT_SECTIONS]
  const sectionEntries = await Promise.all(
    sections.map(async (contentSection) => {
      const entries = await getContentFileEntries(contentSection)
      return entries.map((entry) => ({
        slug: [contentSection, entry.slug],
        title: entry.title,
        description: entry.description,
        category: entry.category,
        order: entry.order,
      }))
    })
  )

  return sectionEntries.flat()
}

export async function getContentNavigation(
  section: ContentSection
): Promise<ContentNavigationGroup[]> {
  const entries = await getContentFileEntries(section)
  const grouped = new Map<
    string,
    ContentNavigationGroup & { orderedItems: ContentFileEntry[] }
  >()

  for (const entry of entries) {
    const groupTitle =
      entry.category?.trim() ||
      CONTENT_SECTION_CONFIG[section].defaultCategory
    const groupKey = groupTitle.toLowerCase()
    const group = grouped.get(groupKey) ?? {
      title: groupTitle,
      items: [],
      orderedItems: [],
    }

    group.orderedItems.push(entry)
    grouped.set(groupKey, group)
  }

  return Array.from(grouped.values())
    .sort(compareGroups)
    .map(({ title, orderedItems }) => ({
      title,
      items: orderedItems.sort(compareContentEntries).map((entry) => ({
        title: entry.title,
        url: makeUrl(section, entry.slug),
      })),
    }))
}

async function getSectionNavigationItems(section: ContentSection) {
  const groups = await getContentNavigation(section)
  return groups.flatMap((group) => group.items)
}

export async function getUnifiedNavigation(): Promise<
  ContentNavigationGroup[]
> {
  const [docsItems, templateItems, blocksNav] = await Promise.all([
    getSectionNavigationItems("docs"),
    getSectionNavigationItems("templates"),
    getBlockNavigationGroups(),
  ])

  return [
    {
      title: "Getting Started",
      items: docsItems,
    },
    {
      title: "Templates",
      items: templateItems,
    },
    {
      title: "Blocks",
      items: blocksNav.flatMap((group) => group.items),
    },
  ]
}

export async function getContentFrontmatter(
  section: ContentSection,
  slug: string
): Promise<ContentFrontmatter> {
  if (section === "templates") {
    const template = getTemplateBySlug(slug)

    return template
      ? {
          title: template.title,
          description: getTemplateSummary(template),
        }
      : {}
  }

  const entry = await resolveContentFile(section, slug)
  if (!entry) {
    return {}
  }

  return readFrontmatterFromFile(
    path.join(getContentRoot(section), entry.relativePath)
  )
}

export async function resolveContentFile(
  section: ContentSection,
  slug: string
) {
  const entries = await getContentFileEntries(section)
  return entries.find((entry) => entry.slug === slug) ?? null
}

export async function getContentNavigationContext(
  section: ContentSection,
  slug: string
): Promise<ContentNavigationContext> {
  const items = await getSectionNavigationItems(section)
  const index = items.findIndex(
    (item) => item.url === makeUrl(section, slug)
  )

  return {
    previous:
      index > 0
        ? { title: items[index - 1].title, href: items[index - 1].url }
        : undefined,
    next:
      index >= 0 && index < items.length - 1
        ? { title: items[index + 1].title, href: items[index + 1].url }
        : undefined,
  }
}

export async function getContentPageData(
  section: ContentSection,
  slug: string
): Promise<ContentPageData | null> {
  const file = await resolveContentFile(section, slug)
  if (!file) {
    return null
  }

  const [source, frontmatter, navigation] = await Promise.all([
    readFile(path.join(getContentRoot(section), file.relativePath), "utf8"),
    getContentFrontmatter(section, slug),
    getContentNavigationContext(section, slug),
  ])

  return {
    file,
    frontmatter,
    source,
    navigation,
  }
}

export async function resolveContentSourcePath(
  section: ContentSection,
  segments: string[]
): Promise<string | null> {
  if (
    segments.length === 0 ||
    segments.some(
      (segment) => segment === ".." || segment === "." || segment === ""
    )
  ) {
    return null
  }

  const contentRoot = getContentRoot(section)
  const directRelative = `${segments.join("/")}.mdx`
  const directStats = await stat(
    path.join(contentRoot, directRelative)
  ).catch(() => null)

  if (directStats?.isFile()) {
    return directRelative
  }

  if (segments.length === 1) {
    const entry = await resolveContentFile(section, segments[0])
    return entry?.relativePath ?? null
  }

  return null
}

export async function getDocFileEntries() {
  return getContentFileEntries("docs")
}

export async function getTemplateFileEntries() {
  return getContentFileEntries("templates")
}

export async function getTemplateFrontmatter(slug: string | string[]) {
  const slugSegments = Array.isArray(slug) ? slug : [slug]
  return getContentFrontmatter(
    "templates",
    slugSegments[slugSegments.length - 1]
  )
}

export async function resolveTemplateFile(slug: string) {
  return resolveContentFile("templates", slug)
}

export async function getTemplateNavigationContext(slug: string) {
  return getContentNavigationContext("templates", slug)
}

export async function getDocFrontmatter(slug: string | string[]) {
  const slugSegments = Array.isArray(slug) ? slug : [slug]
  return getContentFrontmatter(
    "docs",
    slugSegments[slugSegments.length - 1]
  )
}

export async function resolveDocFile(slug: string) {
  return resolveContentFile("docs", slug)
}

export async function getDocNavigationContext(slug: string) {
  return getContentNavigationContext("docs", slug)
}

export async function resolveDocSourcePath(segments: string[]) {
  return resolveContentSourcePath("docs", segments)
}
