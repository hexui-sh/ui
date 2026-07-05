import { readdir, readFile, stat } from "node:fs/promises"
import path from "node:path"
import { getBlockNavigationGroups } from "@/lib/blocks"

type ContentEntry = {
  slug: string[]
  title: string
  description?: string
  category?: string
}

type ContentGroup = {
  title: string
  items: Array<{
    title: string
    url: string
  }>
}

const CONTENT_EXTENSIONS = new Set([".mdx"])
const FRONTMATTER_BLOCK_PATTERN = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/

type Frontmatter = {
  title?: string
  description?: string
  category?: string
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

function parseFrontmatter(content: string): Frontmatter {
  const match = content.match(FRONTMATTER_BLOCK_PATTERN)
  if (!match) {
    return {}
  }

  const lines = match[1].split(/\r?\n/)
  const frontmatter: Frontmatter = {}

  for (const line of lines) {
    const item = line.match(/^([a-zA-Z0-9_-]+)\s*:\s*(.+)\s*$/)
    if (!item) {
      continue
    }

    const key = item[1]
    const value = normalizeFrontmatterValue(item[2])

    if (key === "title" || key === "description" || key === "category") {
      frontmatter[key] = value
    }
  }

  return frontmatter
}

async function readFrontmatterFromFile(filePath: string): Promise<Frontmatter> {
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

function normalizeFileToSlug(relativePath: string) {
  const normalizedPath = relativePath.replace(/\\/g, "/")
  const parsed = path.posix.parse(normalizedPath)
  if (!CONTENT_EXTENSIONS.has(parsed.ext)) {
    return null
  }

  const dirSegments = parsed.dir ? parsed.dir.split("/").filter(Boolean) : []
  const baseName = parsed.name.toLowerCase()
  const slug = baseName === "page" ? dirSegments : [...dirSegments, parsed.name]

  return slug
}

function deriveDocSlugAndCategory(relativePath: string) {
  const normalizedPath = relativePath.replace(/\\/g, "/")
  const parsed = path.posix.parse(normalizedPath)
  if (!CONTENT_EXTENSIONS.has(parsed.ext)) {
    return null
  }

  const dirSegments = parsed.dir ? parsed.dir.split("/").filter(Boolean) : []
  if (dirSegments[0] !== "docs") {
    return null
  }

  const categorySegments = dirSegments.slice(1)
  const folderCategory =
    categorySegments.length > 0 ? toTitle(categorySegments.join(" ")) : undefined

  const slug = ["docs", parsed.name]

  return { slug, folderCategory }
}

function makeUrl(slug: string[]) {
  return `/${slug.join("/")}`
}

function makeItemTitle(slug: string[]) {
  if (slug.length === 0) {
    return "Home"
  }
  if (slug.length === 1 && slug[0] === "docs") {
    return "Get Started"
  }
  return toTitle(slug[slug.length - 1])
}

async function collectContentFiles(rootDir: string, currentDir = rootDir): Promise<string[]> {
  const entries = await readdir(currentDir, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectContentFiles(rootDir, fullPath)))
      continue
    }

    if (!entry.isFile()) {
      continue
    }

    files.push(path.relative(rootDir, fullPath))
  }

  return files
}

function compareByTitle(a: { title: string }, b: { title: string }) {
  return a.title.localeCompare(b.title, "en", { sensitivity: "base" })
}

function compareGroups(a: { title: string }, b: { title: string }) {
  if (a.title === "Get Started") return -1
  if (b.title === "Get Started") return 1
  return compareByTitle(a, b)
}

export async function getContentEntries() {
  const contentRoot = path.join(process.cwd(), "content")
  let files: string[] = []
  try {
    files = await collectContentFiles(contentRoot)
  } catch {
    return []
  }
  const routeMap = new Map<string, ContentEntry>()

  for (const filePath of files) {
    const docDerived = deriveDocSlugAndCategory(filePath)
    const slug = docDerived?.slug ?? normalizeFileToSlug(filePath)
    if (!slug || slug.length === 0) {
      continue
    }

    const routeKey = slug.join("/")
    const existing = routeMap.get(routeKey)
    const isMdx = filePath.endsWith(".mdx")
    const frontmatter = isMdx
      ? await readFrontmatterFromFile(path.join(contentRoot, filePath))
      : {}

    if (!existing || isMdx) {
      routeMap.set(routeKey, {
        slug,
        title: frontmatter.title ?? makeItemTitle(slug),
        description: frontmatter.description,
        category: frontmatter.category ?? docDerived?.folderCategory,
      })
    }
  }

  return Array.from(routeMap.values()).sort((a, b) => compareByTitle(a, b))
}

export async function getDocFileEntries() {
  const contentRoot = path.join(process.cwd(), "content")
  let files: string[] = []
  try {
    files = await collectContentFiles(contentRoot)
  } catch {
    return []
  }

  const entries: Array<{
    slug: string
    relativePath: string
    importPath: string
    category?: string
  }> = []
  const seen = new Set<string>()

  for (const filePath of files) {
    if (!filePath.endsWith(".mdx")) {
      continue
    }
    const derived = deriveDocSlugAndCategory(filePath)
    if (!derived || derived.slug.length !== 2) {
      continue
    }
    const slug = derived.slug[1]
    if (seen.has(slug)) {
      continue
    }
    seen.add(slug)
    const relativePath = filePath.replace(/\\/g, "/")
    entries.push({
      slug,
      relativePath,
      importPath: relativePath.replace(/\.mdx$/, ""),
      category: derived.folderCategory,
    })
  }

  return entries
}

export async function getContentNavigation(section: string) {
  if (section === "blocks") {
    return getBlockNavigationGroups()
  }

  const entries = await getContentEntries()
  const grouped = new Map<string, ContentGroup>()
  const sectionEntries = entries.filter(
    (entry) => entry.slug[0] === section && entry.slug.length >= 2
  )

  for (const entry of sectionEntries) {
    const groupTitle = entry.category?.trim() || "General"
    const groupKey = groupTitle.toLowerCase()
    const fallbackItemTitle =
      entry.slug.length === 1 ? groupTitle : entry.slug.slice(1).map(toTitle).join(" / ")
    const itemTitle = entry.title || fallbackItemTitle

    const group = grouped.get(groupKey) ?? {
      title: groupTitle,
      items: [],
    }

    group.items.push({
      title: itemTitle,
      url: makeUrl(entry.slug),
    })

    grouped.set(groupKey, group)
  }

  return Array.from(grouped.values())
    .sort(compareGroups)
    .map((group) => ({
      ...group,
      items: group.items.sort(compareByTitle),
    }))
}

export async function getUnifiedNavigation() {
  const entries = await getContentEntries()
  const docsEntries = entries
    .filter((entry) => entry.slug[0] === "docs" && entry.slug.length >= 2)
    .map((entry) => ({
      title: entry.title || entry.slug.slice(1).map(toTitle).join(" / "),
      url: makeUrl(entry.slug),
    }))
    .sort(compareByTitle)

  const blocksNav = await getBlockNavigationGroups()
  const blocksItems = blocksNav.flatMap((group) => group.items)

  return [
    {
      title: "Getting Started",
      items: docsEntries,
    },
    {
      title: "Blocks",
      items: blocksItems,
    },
  ]
}

export async function getDocFrontmatter(slug: string | string[]) {
  const slugSegments = Array.isArray(slug) ? slug : [slug]
  const contentRoot = path.join(process.cwd(), "content")

  const candidates: string[] = [
    path.join(contentRoot, ...slugSegments) + ".mdx",
    path.join(contentRoot, ...slugSegments, "page.mdx"),
  ]

  if (slugSegments[0] === "docs" && slugSegments.length === 2) {
    const docEntries = await getDocFileEntries()
    const match = docEntries.find((entry) => entry.slug === slugSegments[1])
    if (match) {
      candidates.unshift(path.join(contentRoot, match.relativePath))
    }
  }

  for (const candidate of candidates) {
    const frontmatter = await readFrontmatterFromFile(candidate)
    if (frontmatter.title || frontmatter.description) {
      return frontmatter
    }
  }

  return {}
}

export async function resolveDocFile(slug: string) {
  const entries = await getDocFileEntries()
  return entries.find((entry) => entry.slug === slug) ?? null
}

export async function resolveDocSourcePath(segments: string[]): Promise<string | null> {
  if (segments.length === 0) {
    return null
  }
  if (segments.some((segment) => segment === ".." || segment === "." || segment === "")) {
    return null
  }

  const contentRoot = path.join(process.cwd(), "content")
  const directRelative = `docs/${segments.join("/")}.mdx`
  const directStats = await stat(path.join(contentRoot, directRelative)).catch(() => null)
  if (directStats?.isFile()) {
    return directRelative
  }

  if (segments.length === 1) {
    const entry = await resolveDocFile(segments[0])
    if (entry) {
      return entry.relativePath
    }
  }

  return null
}
