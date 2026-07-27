import { cache } from "react"
import { readdir, readFile } from "node:fs/promises"
import path from "node:path"

const BLOG_DIRECTORY = path.join(process.cwd(), "blog")
const FRONTMATTER_PATTERN =
  /^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/
const WORDS_PER_MINUTE = 225

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  updated?: string
  tags: string[]
  cover: string
  locale: "en" | "ja"
  published: true
}

export type BlogPost = {
  slug: string
  fileName: string
  source: string
  frontmatter: BlogFrontmatter
  readingTime: {
    minutes: number
    words: number
    text: string
  }
}

export type BlogNavigationContext = {
  previous?: Pick<BlogPost, "slug" | "frontmatter">
  next?: Pick<BlogPost, "slug" | "frontmatter">
}

type ParsedFrontmatter = Partial<
  Omit<BlogFrontmatter, "tags" | "published" | "locale">
> & {
  tags?: string[]
  locale?: string
  published?: boolean
}

function unquote(value: string) {
  const trimmed = value.trim()

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

function parseTags(value: string) {
  const normalized =
    value.startsWith("[") && value.endsWith("]")
      ? value.slice(1, -1)
      : value

  return normalized
    .split(",")
    .map((tag) => unquote(tag))
    .filter(Boolean)
}

function parseFrontmatter(source: string): ParsedFrontmatter {
  const match = source.match(FRONTMATTER_PATTERN)
  if (!match) {
    return {}
  }

  const values: ParsedFrontmatter = {}
  const lines = match[1].split(/\r?\n/)

  for (let index = 0; index < lines.length; index += 1) {
    const field = lines[index].match(/^([a-zA-Z0-9_-]+)\s*:\s*(.*)$/)
    if (!field) {
      continue
    }

    const key = field[1]
    const rawValue = field[2].trim()

    if (key === "tags") {
      if (rawValue) {
        values.tags = parseTags(rawValue)
        continue
      }

      const tags: string[] = []
      while (index + 1 < lines.length) {
        const tag = lines[index + 1].match(/^\s*-\s+(.+?)\s*$/)
        if (!tag) {
          break
        }
        tags.push(unquote(tag[1]))
        index += 1
      }
      values.tags = tags
      continue
    }

    if (key === "published") {
      values.published = unquote(rawValue).toLowerCase() === "true"
      continue
    }

    if (
      key === "title" ||
      key === "description" ||
      key === "date" ||
      key === "updated" ||
      key === "cover" ||
      key === "locale"
    ) {
      values[key] = unquote(rawValue) || undefined
    }
  }

  return values
}

function normalizeDate(value: string, field: "date" | "updated", fileName: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    throw new Error(
      `Invalid blog frontmatter "${field}" in ${fileName}: ${value}`
    )
  }

  return value
}

function normalizeCover(value: string, fileName: string) {
  if (value.startsWith("/") && !value.startsWith("//")) {
    return value
  }

  let coverUrl: URL

  try {
    coverUrl = new URL(value)
  } catch {
    throw new Error(
      `Blog frontmatter "cover" in ${fileName} must be an absolute URL.`
    )
  }

  if (
    coverUrl.protocol !== "https:" ||
    coverUrl.username ||
    coverUrl.password
  ) {
    throw new Error(
      `Blog frontmatter "cover" in ${fileName} must be a public HTTPS URL.`
    )
  }

  return coverUrl.toString()
}

function normalizeLocale(value: string | undefined, fileName: string) {
  if (!value || value === "en") {
    return "en" as const
  }
  if (value === "ja") {
    return "ja" as const
  }

  throw new Error(
    `Blog frontmatter "locale" in ${fileName} must be "en" or "ja".`
  )
}

function validatePublishedFrontmatter(
  value: ParsedFrontmatter,
  fileName: string
): BlogFrontmatter {
  if (!value.title) {
    throw new Error(
      `Published blog post ${fileName} is missing frontmatter "title".`
    )
  }
  if (!value.description) {
    throw new Error(
      `Published blog post ${fileName} is missing frontmatter "description".`
    )
  }
  if (!value.date) {
    throw new Error(
      `Published blog post ${fileName} is missing frontmatter "date".`
    )
  }
  if (!value.cover) {
    throw new Error(
      `Published blog post ${fileName} is missing frontmatter "cover".`
    )
  }

  return {
    title: value.title,
    description: value.description,
    date: normalizeDate(value.date, "date", fileName),
    updated: value.updated
      ? normalizeDate(value.updated, "updated", fileName)
      : undefined,
    tags: value.tags ?? [],
    cover: normalizeCover(value.cover, fileName),
    locale: normalizeLocale(value.locale, fileName),
    published: true,
  }
}

function stripMdxForReadingTime(source: string) {
  return source
    .replace(FRONTMATTER_PATTERN, "")
    .replace(/^import\s+.*$/gm, "")
    .replace(/^export\s+.*$/gm, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[#>*_`~|{}[\]()-]/g, " ")
}

function calculateReadingTime(
  source: string,
  locale: BlogFrontmatter["locale"]
): BlogPost["readingTime"] {
  const plainText = stripMdxForReadingTime(source)
  const words =
    plainText.match(/[\p{L}\p{N}][\p{L}\p{N}'’.-]*/gu)
      ?.length ?? 0
  const japaneseCharacters =
    plainText.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu)
      ?.length ?? 0
  const minutes =
    locale === "ja"
      ? Math.max(1, Math.ceil(japaneseCharacters / 500 + words / WORDS_PER_MINUTE))
      : Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))

  return {
    minutes,
    words,
    text: locale === "ja" ? `約${minutes}分` : `${minutes} min read`,
  }
}

function sortPostsNewestFirst(a: BlogPost, b: BlogPost) {
  return (
    new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime() ||
    a.frontmatter.title.localeCompare(b.frontmatter.title, "en")
  )
}

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  let entries
  try {
    entries = await readdir(BLOG_DIRECTORY, { withFileTypes: true })
  } catch {
    return []
  }

  const fileNames = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, "en"))

  const posts = await Promise.all(
    fileNames.map(async (fileName): Promise<BlogPost | null> => {
      const source = await readFile(path.join(BLOG_DIRECTORY, fileName), "utf8")
      const parsed = parseFrontmatter(source)

      if (parsed.published !== true) {
        return null
      }

      const frontmatter = validatePublishedFrontmatter(parsed, fileName)

      return {
        slug: path.parse(fileName).name,
        fileName,
        source,
        frontmatter,
        readingTime: calculateReadingTime(source, frontmatter.locale),
      }
    })
  )

  return posts.filter((post): post is BlogPost => post !== null).sort(
    sortPostsNewestFirst
  )
})

export const getBlogPost = cache(async (slug: string) => {
  const posts = await getBlogPosts()
  return posts.find((post) => post.slug === slug) ?? null
})

export async function getBlogNavigation(
  slug: string
): Promise<BlogNavigationContext> {
  const posts = await getBlogPosts()
  const index = posts.findIndex((post) => post.slug === slug)

  if (index < 0) {
    return {}
  }

  return {
    previous: posts[index + 1],
    next: index > 0 ? posts[index - 1] : undefined,
  }
}

export function formatBlogDate(
  value: string,
  locale: BlogFrontmatter["locale"] = "en"
) {
  return new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value))
}

export function getBlogCover(post: Pick<BlogPost, "frontmatter">) {
  return post.frontmatter.cover
}
