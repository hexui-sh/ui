import { createAtomFeed } from "@/lib/blog-feeds"

export const dynamic = "force-static"

export async function GET() {
  return new Response(await createAtomFeed(), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  })
}
