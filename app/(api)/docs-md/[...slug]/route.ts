import { readFile } from "node:fs/promises"
import path from "node:path"
import { resolveDocSourcePath } from "@/lib/content"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  if (!slug || slug.length === 0) {
    return new Response("Not Found", { status: 404 })
  }

  const relativePath = await resolveDocSourcePath(slug)
  if (!relativePath) {
    return new Response("Not Found", { status: 404 })
  }

  const content = await readFile(
    path.join(process.cwd(), "docs", relativePath),
    "utf8"
  )

  return new Response(content, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
