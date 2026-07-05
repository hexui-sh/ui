import { readFile, readdir, stat, writeFile } from "node:fs/promises"
import path from "node:path"

const root = process.cwd()
const registryRoot = path.join(root, "registry", "hex-ui")
const outputPath = path.join(root, "content", "blocks", "registry.json")
const previewMapPath = path.join(
  root,
  "app",
  "(view)",
  "view",
  "[slug]",
  "preview-map.ts",
)
const categoryPreviewMapPath = path.join(
  root,
  "components",
  "block-category-preview-map.ts",
)
const categoryPreviewComponentsPath = path.join(
  root,
  "components",
  "block-category-previews.tsx",
)

function compareByTitle(a, b) {
  return a.title.localeCompare(b.title, "en", { sensitivity: "base" })
}

function compareByCategory(a, b) {
  return a.category.localeCompare(b.category, "en", { sensitivity: "base" })
}

function toTitle(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function toPascalCase(value) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

async function fileExists(filePath) {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}

function buildDefaultInstallCommand(slug) {
  return `pnpm dlx shadcn@latest add https://hexui.sh/r/${slug}.json`
}

function buildDefaultV0Url(slug) {
  return `https://v0.dev/chat/import?url=https://hexui.dev/r/${slug}.json`
}

async function readJson(filePath) {
  const raw = await readFile(filePath, "utf8")
  return JSON.parse(raw)
}

async function readSortedDirectories(dirPath) {
  return (await readdir(dirPath, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }))
}

async function hasPreviewPage(categoryPath, category, slug) {
  const pageTsx = path.join(categoryPath, slug, "source", "app", category, "page.tsx")
  const pageTs = path.join(categoryPath, slug, "source", "app", category, "page.ts")
  const [hasTsx, hasTs] = await Promise.all([fileExists(pageTsx), fileExists(pageTs)])

  return hasTsx || hasTs
}

async function collectBlockEntries() {
  const categoryDirs = await readSortedDirectories(registryRoot)

  const groups = []

  for (const categoryDir of categoryDirs) {
    const categoryPath = path.join(registryRoot, categoryDir.name)
    const blockDirs = await readSortedDirectories(categoryPath)

    const blocks = []

    for (const blockDir of blockDirs) {
      const metaPath = path.join(categoryPath, blockDir.name, "meta.json")

      try {
        const meta = await readJson(metaPath)
        const slug = blockDir.name

        blocks.push({
          slug,
          title: meta.title ?? toTitle(slug),
          description: meta.description,
          path: `@/registry/hex-ui/${categoryDir.name}/${slug}/source/`,
          installCommand: meta.installCommand ?? buildDefaultInstallCommand(slug),
          previewUrl: meta.previewUrl,
          v0Url: meta.v0Url ?? buildDefaultV0Url(slug),
          previewPath: meta.previewPath,
          codePath: meta.codePath,
          files: Array.isArray(meta.files) ? meta.files : undefined,
          reference: Array.isArray(meta.reference) ? meta.reference : undefined,
        })
      } catch {
        continue
      }
    }

    if (blocks.length > 0) {
      groups.push({
        category: toTitle(categoryDir.name),
        blocks: blocks.sort(compareByTitle),
      })
    }
  }

  return groups.sort(compareByCategory)
}

async function collectPreviewEntries() {
  const categoryDirs = await readSortedDirectories(registryRoot)

  const groups = []

  for (const categoryDir of categoryDirs) {
    const categoryPath = path.join(registryRoot, categoryDir.name)
    const blockDirs = await readSortedDirectories(categoryPath)

    const entries = []

    for (const blockDir of blockDirs) {
      const slug = blockDir.name

      if (!(await hasPreviewPage(categoryPath, categoryDir.name, slug))) {
        continue
      }

      entries.push({
        slug,
        importName: `${toPascalCase(slug)}Preview`,
        importPath: `@/registry/hex-ui/${categoryDir.name}/${slug}/source/app/${categoryDir.name}/page`,
      })
    }

    if (entries.length > 0) {
      groups.push({
        category: categoryDir.name,
        entries,
      })
    }
  }

  return groups
}

async function collectCategoryPreviewEntries() {
  const categoryDirs = await readSortedDirectories(registryRoot)

  return categoryDirs.map((categoryDir) => ({
    slug: categoryDir.name,
    title: toTitle(categoryDir.name),
    componentName: `${toPascalCase(categoryDir.name)}CategoryPreview`,
  }))
}

async function collectAvailableCategoryPreviewComponents() {
  const source = await readFile(categoryPreviewComponentsPath, "utf8")
  const matches = source.matchAll(/export function (\w+CategoryPreview)\s*\(/g)

  return new Set(
    Array.from(matches, (match) => match[1]).filter(
      (name) => name !== "GenericCategoryPreview",
    ),
  )
}

function renderPreviewMap(groups) {
  const lines = [
    "// THIS FILE IS AUTO-GENERATED by `pnpm generate`. DO NOT EDIT MANUALLY.",
    'import type React from "react"',
    "",
  ]

  for (const group of groups) {
    lines.push(`// ${toTitle(group.category)} Blocks`)
    for (const entry of group.entries) {
      lines.push(`import ${entry.importName} from "${entry.importPath}"`)
    }
    lines.push("")
  }

  lines.push("export const previewMap: Record<string, React.ComponentType> = {")
  for (const group of groups) {
    lines.push(`  // ${toTitle(group.category)}`)
    for (const entry of group.entries) {
      lines.push(`  "${entry.slug}": ${entry.importName},`)
    }
  }
  lines.push("}")
  lines.push("")

  return lines.join("\n")
}

function renderCategoryPreviewMap(categories, availableComponentNames) {
  const specificComponentNames = Array.from(
    new Set(
      categories
        .map((category) => category.componentName)
        .filter((componentName) => availableComponentNames.has(componentName)),
    ),
  ).sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }))

  const importedComponentNames = [
    ...specificComponentNames,
    "GenericCategoryPreview",
  ].sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }))

  const lines = [
    "// THIS FILE IS AUTO-GENERATED by `pnpm generate`. DO NOT EDIT MANUALLY.",
    'import type { ComponentType } from "react"',
    "import {",
  ]

  for (const componentName of importedComponentNames) {
    lines.push(`  ${componentName},`)
  }

  lines.push(
    "  type BlockCategoryPreviewProps,",
    '} from "@/components/block-category-previews"',
    "",
    "export const blockCategoryPreviewMap: Record<string, ComponentType<BlockCategoryPreviewProps>> = {",
  )

  for (const category of categories) {
    const componentName = availableComponentNames.has(category.componentName)
      ? category.componentName
      : "GenericCategoryPreview"

    lines.push(`  "${category.slug}": ${componentName},`)
  }

  lines.push(
    "}",
    "",
    "export function getBlockCategoryPreview(categorySlug: string): ComponentType<BlockCategoryPreviewProps> {",
    "  return blockCategoryPreviewMap[categorySlug] ?? GenericCategoryPreview",
    "}",
    "",
  )

  return lines.join("\n")
}

async function main() {
  const groups = await collectBlockEntries()

  if (groups.length === 0) {
    throw new Error(`No block meta files were found under ${registryRoot}`)
  }

  const registry = {
    groups,
  }

  await writeFile(outputPath, `${JSON.stringify(registry, null, 2)}\n`, "utf8")
  console.log(`Wrote ${groups.length} groups to ${path.relative(root, outputPath)}`)

  const previewGroups = await collectPreviewEntries()
  const previewCount = previewGroups.reduce((sum, g) => sum + g.entries.length, 0)

  if (previewCount === 0) {
    throw new Error(
      `No previewable blocks were found under ${registryRoot}`,
    )
  }

  await writeFile(previewMapPath, renderPreviewMap(previewGroups), "utf8")
  console.log(
    `Wrote ${previewCount} previews to ${path.relative(root, previewMapPath)}`,
  )

  const [categoryPreviewEntries, availableCategoryPreviewComponents] = await Promise.all([
    collectCategoryPreviewEntries(),
    collectAvailableCategoryPreviewComponents(),
  ])

  await writeFile(
    categoryPreviewMapPath,
    renderCategoryPreviewMap(categoryPreviewEntries, availableCategoryPreviewComponents),
    "utf8",
  )
  console.log(
    `Wrote ${categoryPreviewEntries.length} category previews to ${path.relative(root, categoryPreviewMapPath)}`,
  )

  console.log(
    `√ Successfully generated block registry with ${groups.length} groups and ${previewCount} previews.`,
  )
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
