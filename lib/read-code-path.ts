import path from "node:path"
import { readdir, readFile } from "node:fs/promises"
import type { BundledLanguage } from "shiki"

export type CodeFile = {
  path: string
  content: string
  language: BundledLanguage
}

const languageMap: Record<string, BundledLanguage> = {
  tsx: "tsx",
  ts: "typescript",
  jsx: "jsx",
  js: "javascript",
  css: "css",
  json: "json",
  md: "markdown",
  mdx: "mdx",
  html: "html",
  yaml: "yaml",
  yml: "yaml",
  sh: "bash",
  env: "bash",
}

const ignoredDirectoryNames = new Set<string>()
const binaryFileExtensions = new Set([
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "avif",
  "ico",
  "bmp",
  "svg",
  "otf",
  "ttf",
  "woff",
  "woff2",
])

function getLanguage(filename: string): BundledLanguage {
  const ext = path.extname(filename).slice(1).toLowerCase()
  return languageMap[ext] ?? "typescript"
}

async function readDirRecursive(dirPath: string, relativeTo: string = dirPath): Promise<CodeFile[]> {
  const entries = await readdir(dirPath, { withFileTypes: true })
  const files: CodeFile[] = []

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)
    const relativePath = path.relative(relativeTo, fullPath).replace(/\\/g, "/")

    if (entry.isDirectory()) {
      if (ignoredDirectoryNames.has(entry.name.toLowerCase())) {
        continue
      }

      const nested = await readDirRecursive(fullPath, relativeTo)
      files.push(...nested)
    } else {
      const extension = path.extname(entry.name).slice(1).toLowerCase()

      if (binaryFileExtensions.has(extension)) {
        files.push({
          path: relativePath,
          content: `// Binary asset — copy this file into your project at the same path.`,
          language: "plaintext" as BundledLanguage,
        })
        continue
      }

      const content = await readFile(fullPath, "utf8")
      files.push({ path: relativePath, content, language: getLanguage(entry.name) })
    }
  }

  return files
}

export async function readCodePath(codePath: string): Promise<CodeFile[]> {
  const absolutePath = path.join(/* turbopackIgnore: true */ process.cwd(), codePath)
  try {
    return await readDirRecursive(absolutePath)
  } catch {
    return []
  }
}
