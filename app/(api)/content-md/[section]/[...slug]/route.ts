import { readFile } from "node:fs/promises"
import path from "node:path"
import {
  getContentRoot,
  isContentSection,
  resolveContentSourcePath,
} from "@/lib/content"

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ section: string; slug: string[] }>
  }
) {
  const { section, slug } = await params
  if (
    !isContentSection(section) ||
    !slug ||
    slug.length === 0
  ) {
    return new Response("Not Found", { status: 404 })
  }

  const relativePath = await resolveContentSourcePath(section, slug)
  if (!relativePath) {
    return new Response("Not Found", { status: 404 })
  }

  const content = await readFile(
    path.join(getContentRoot(section), relativePath),
    "utf8"
  )

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "X-Robots-Tag": "noindex",
    },
  })
}
