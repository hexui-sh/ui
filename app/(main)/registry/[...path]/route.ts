import { readFile } from "node:fs/promises"
import path from "node:path"

const CONTENT_TYPES: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    svg: "image/svg+xml",
    webp: "image/webp",
    gif: "image/gif",
}

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path: segments } = await params
    const filePath = path.join(process.cwd(), "registry", ...segments)

    try {
        const file = await readFile(filePath)
        const ext = segments[segments.length - 1].split(".").pop() ?? ""
        const contentType = CONTENT_TYPES[ext] ?? "application/octet-stream"
        return new Response(file, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
                "X-Robots-Tag": "noindex",
            },
        })
    } catch {
        return new Response("Not found", { status: 404 })
    }
}
