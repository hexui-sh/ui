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

const DOCS_DIR_NAME = "docs"
const CONTENT_EXTENSIONS = new Set([".mdx"])
const FRONTMATTER_BLOCK_PATTERN = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/

type Frontmatter = {
  title?: string
  description?: string
  category?: string
}

function getDocsRoot() {
  return path.join(process.cwd(), DOCS_DIR_NAME)
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

function deriveDocSlugAndCategory(relativePath: string) {
  const normalizedPath = relativePath.replace(/\\/g, "/")
  const parsed = path.posix.parse(normalizedPath)
  if (!CONTENT_EXTENSIONS.has(parsed.ext)) {
    return null
  }

  const dirSegments = parsed.dir ? parsed.dir.split("/").filter(Boolean) : []
  const folderCategory =
    dirSegments.length > 0 ? toTitle(dirSegments.join(" ")) : undefined

  const slug = [DOCS_DIR_NAME, parsed.name]

  return { slug, folderCategory }
}

function makeUrl(slug: string[]) {
  return `/${slug.join("/")}`
}

function makeItemTitle(slug: string[]) {
  if (slug.length === 0) {
    return "Home"
  }
  if (slug.length === 1 && slug[0] === DOCS_DIR_NAME) {
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
  const docsRoot = getDocsRoot()
  let files: string[] = []
  try {
    files = await collectContentFiles(docsRoot)
  } catch {
    return []
  }
  const routeMap = new Map<string, ContentEntry>()

  for (const filePath of files) {
    if (!filePath.endsWith(".mdx")) {
      continue
    }

    const derived = deriveDocSlugAndCategory(filePath)
    if (!derived) {
      continue
    }

    const routeKey = derived.slug.join("/")
    const frontmatter = await readFrontmatterFromFile(path.join(docsRoot, filePath))

    routeMap.set(routeKey, {
      slug: derived.slug,
      title: frontmatter.title ?? makeItemTitle(derived.slug),
      description: frontmatter.description,
      category: frontmatter.category ?? derived.folderCategory,
    })
  }

  return Array.from(routeMap.values()).sort((a, b) => compareByTitle(a, b))
}

export async function getDocFileEntries() {
  const docsRoot = getDocsRoot()
  let files: string[] = []
  try {
    files = await collectContentFiles(docsRoot)
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
    .filter((entry) => entry.slug[0] === DOCS_DIR_NAME && entry.slug.length >= 2)
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
  const docSlug = slugSegments[slugSegments.length - 1]
  const docsRoot = getDocsRoot()

  const entries = await getDocFileEntries()
  const match = entries.find((entry) => entry.slug === docSlug)
  if (!match) {
    return {}
  }

  const frontmatter = await readFrontmatterFromFile(path.join(docsRoot, match.relativePath))
  if (frontmatter.title || frontmatter.description) {
    return frontmatter
  }

  return {}
}

export async function resolveDocFile(slug: string) {
  const entries = await getDocFileEntries()
  return entries.find((entry) => entry.slug === slug) ?? null
}

export async function getDocNavigationContext(slug: string) {
  const groups = await getContentNavigation(DOCS_DIR_NAME)
  const items = groups.flatMap((group) =>
    group.items.map((item) => ({ title: item.title, href: item.url }))
  )
  const index = items.findIndex((item) => item.href === `/docs/${slug}`)

  return {
    previous: index > 0 ? items[index - 1] : undefined,
    next: index < items.length - 1 ? items[index + 1] : undefined,
  }
}

export async function resolveDocSourcePath(segments: string[]): Promise<string | null> {
  if (segments.length === 0) {
    return null
  }
  if (segments.some((segment) => segment === ".." || segment === "." || segment === "")) {
    return null
  }

  const docsRoot = getDocsRoot()
  const directRelative = `${segments.join("/")}.mdx`
  const directStats = await stat(path.join(docsRoot, directRelative)).catch(() => null)
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