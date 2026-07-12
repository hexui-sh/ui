import { loadRegistry } from "shadcn/registry"

export async function GET() {
  try {
    const registry = await loadRegistry()
    return Response.json(registry, {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
        "X-Robots-Tag": "noindex",
      },
    })
  } catch (error) {
    console.error(error)
    return Response.json(
      { error: "Failed to load registry." },
      { status: 500 }
    )
  }
}
