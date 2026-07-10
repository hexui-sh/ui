import registryJson from "@/registry.json"

const REGISTRY_ITEM_URL_ORIGIN = "https://hexui.sh"

export type BlockFile = {
  path: string
  type?: string
  target?: string
}

export type BlockPropDefinition = {
  prop: string
  type: string
  default: string | null
  description: string
}

export type BlockReferenceEntry = {
  name: string
  description: string
  props: BlockPropDefinition[]
}

export type RegistryBlockItem = {
  name: string
  type: "registry:block"
  title?: string
  description?: string
  registryDependencies?: string[]
  dependencies?: string[]
  files: BlockFile[]
  categories: string[]
  installCommand?: string
  previewUrl?: string
  v0Url?: string
  previewPath?: string
  codePath?: string
  reference?: BlockReferenceEntry[]
}

export type RegistryItem = RegistryBlockItem | {
  name: string
  type: string
  title?: string
  description?: string
  registryDependencies?: string[]
  dependencies?: string[]
  files?: BlockFile[]
  categories?: string[]
}

export type Registry = {
  $schema?: string
  name: string
  homepage?: string
  items: RegistryItem[]
}

export type BlockEntry = {
  slug: string
  name: string
  title: string
  description?: string
  category: string
  categorySlug: string
  path?: string
  installCommand: string
  previewUrl?: string
  v0Url?: string
  previewPath?: string
  codePath?: string
  files: BlockFile[]
  reference?: BlockReferenceEntry[]
}

type BlockGroup = {
  category: string
  categorySlug: string
  blocks: BlockEntry[]
}

type BlockNavigationGroup = {
  title: string
  items: Array<{
    title: string
    url: string
    count?: number
  }>
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

function stringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined
  }

  return value.filter((item): item is string => typeof item === "string")
}

function parseFiles(value: unknown, itemName: string): BlockFile[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.map((file, index) => {
    if (!isRecord(file) || !isNonEmptyString(file.path)) {
      throw new Error(`Registry item "${itemName}" has an invalid file at index ${index}.`)
    }

    return {
      path: file.path,
      type: optionalString(file.type),
      target: optionalString(file.target),
    }
  })
}

function parseReferenceEntries(value: unknown, itemName: string): BlockReferenceEntry[] | undefined {
  if (!Array.isArray(value)) {
    return undefined
  }

  return value.map((entry, entryIndex) => {
    if (!isRecord(entry) || !isNonEmptyString(entry.name) || !isNonEmptyString(entry.description)) {
      throw new Error(`Registry item "${itemName}" has an invalid reference at index ${entryIndex}.`)
    }

    const props = Array.isArray(entry.props) ? entry.props : []

    return {
      name: entry.name,
      description: entry.description,
      props: props.map((prop, propIndex) => {
        if (
          !isRecord(prop) ||
          !isNonEmptyString(prop.prop) ||
          !isNonEmptyString(prop.type) ||
          !isNonEmptyString(prop.description)
        ) {
          throw new Error(
            `Registry item "${itemName}" has an invalid reference prop at index ${propIndex}.`
          )
        }

        return {
          prop: prop.prop,
          type: prop.type,
          default: typeof prop.default === "string" ? prop.default : null,
          description: prop.description,
        }
      }),
    }
  })
}

function parseRegistry(value: unknown): Registry {
  if (!isRecord(value) || !isNonEmptyString(value.name) || !Array.isArray(value.items)) {
    throw new Error("Root registry.json must include a name and an items array.")
  }

  return {
    $schema: optionalString(value.$schema),
    name: value.name,
    homepage: optionalString(value.homepage),
    items: value.items.map((item, index) => {
      if (!isRecord(item) || !isNonEmptyString(item.name) || !isNonEmptyString(item.type)) {
        throw new Error(`Registry item at index ${index} must include a name and type.`)
      }

      const files = parseFiles(item.files, item.name)
      const categories = stringArray(item.categories)
      const baseItem = {
        name: item.name,
        type: item.type,
        title: optionalString(item.title),
        description: optionalString(item.description),
        registryDependencies: stringArray(item.registryDependencies),
        dependencies: stringArray(item.dependencies),
        files,
        categories,
      }

      if (item.type !== "registry:block") {
        return baseItem
      }

      if (!categories || categories.length === 0) {
        throw new Error(`Block registry item "${item.name}" must include at least one category.`)
      }

      if (files.length === 0) {
        throw new Error(`Block registry item "${item.name}" must include at least one file.`)
      }

      return {
        ...baseItem,
        type: "registry:block",
        categories,
        files,
        installCommand: optionalString(item.installCommand),
        previewUrl: optionalString(item.previewUrl),
        v0Url: optionalString(item.v0Url),
        previewPath: optionalString(item.previewPath),
        codePath: optionalString(item.codePath),
        reference: parseReferenceEntries(item.reference, item.name),
      }
    }),
  }
}

function compareByTitle(a: { title: string }, b: { title: string }) {
  return a.title.localeCompare(b.title, "en", { sensitivity: "base" })
}

function toTitle(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

export function getBlockUrl(block: Pick<BlockEntry, "categorySlug">): string {
  return `/blocks/${block.categorySlug}`
}

export function getRegistryItemJsonUrl(slug: string): string {
  return `${REGISTRY_ITEM_URL_ORIGIN}/r/${slug}.json`
}

export function getDefaultInstallCommand(slug: string): string {
  return `pnpm dlx shadcn@latest add ${getRegistryItemJsonUrl(slug)}`
}

export function getDefaultV0Url(slug: string): string {
  return `https://v0.dev/chat/import?url=${getRegistryItemJsonUrl(slug)}`
}

function deriveSourcePath(files: BlockFile[]): string | undefined {
  const sourceFile = files.find((file) => file.path.includes("/source/"))
  if (!sourceFile) {
    return undefined
  }

  const sourceRoot = sourceFile.path.slice(0, sourceFile.path.indexOf("/source/") + "/source/".length)
  return `@/${sourceRoot}`
}

function blockFromRegistryItem(item: RegistryBlockItem): BlockEntry {
  const categorySlug = item.categories[0]
  const category = toTitle(categorySlug)
  const path = deriveSourcePath(item.files)

  return {
    slug: item.name,
    name: item.name,
    title: item.title ?? toTitle(item.name),
    description: item.description,
    category,
    categorySlug,
    path,
    installCommand: item.installCommand ?? getDefaultInstallCommand(item.name),
    previewUrl: item.previewUrl,
    v0Url: item.v0Url ?? getDefaultV0Url(item.name),
    previewPath: item.previewPath,
    codePath: item.codePath,
    files: item.files,
    reference: item.reference,
  }
}

function assertUnique(values: string[], label: string) {
  const seen = new Set<string>()
  for (const value of values) {
    if (seen.has(value)) {
      throw new Error(`Duplicate ${label} in root registry.json: ${value}`)
    }
    seen.add(value)
  }
}

function getValidatedBlocks(): BlockEntry[] {
  const registry = parseRegistry(registryJson)
  const blocks = registry.items
    .filter((item): item is RegistryBlockItem => item.type === "registry:block")
    .map(blockFromRegistryItem)

  assertUnique(blocks.map((block) => block.name), "block name")
  assertUnique(blocks.map((block) => block.slug), "block slug")
  assertUnique(blocks.map((block) => `${block.categorySlug}/${block.slug}`), "block path")

  return blocks.sort(compareByTitle)
}

const blockEntries = getValidatedBlocks()

export function getBlockGroups(): BlockGroup[] {
  const grouped = new Map<string, BlockGroup>()

  for (const block of blockEntries) {
    const group = grouped.get(block.categorySlug) ?? {
      category: block.category,
      categorySlug: block.categorySlug,
      blocks: [],
    }

    group.blocks.push(block)
    grouped.set(block.categorySlug, group)
  }

  return Array.from(grouped.values())
    .sort((a, b) => compareByTitle({ title: a.category }, { title: b.category }))
    .map((group) => ({
      ...group,
      blocks: [...group.blocks].sort(compareByTitle),
    }))
}

export function getBlockEntries(): BlockEntry[] {
  return [...blockEntries]
}

export function getBlockEntryBySlug(slug: string): BlockEntry | undefined {
  return blockEntries.find((entry) => entry.slug === slug)
}

export function getBlockCategories(): string[] {
  return getBlockGroups().map((group) => group.category)
}

export function getBlockEntriesByCategory(
  slug: string
): { category: string; blocks: BlockEntry[] } | undefined {
  const group = getBlockGroups().find((g) => g.categorySlug === slug)
  if (!group) return undefined

  return {
    category: group.category,
    blocks: [...group.blocks].sort(compareByTitle),
  }
}

export function getBlockCategoryNavigationContext(slug: string) {
  const groups = getBlockNavigationGroups()
  const categories = groups.flatMap((group) =>
    group.items.map((item) => ({ title: item.title, href: item.url }))
  )
  const index = categories.findIndex((item) => item.href === `/blocks/${slug}`)

  return {
    previous: index > 0 ? categories[index - 1] : undefined,
    next: index < categories.length - 1 ? categories[index + 1] : undefined,
  }
}

export function getBlockNavigationGroups(): BlockNavigationGroup[] {
  const groups = getBlockGroups()

  return [
    {
      title: "Categories",
      items: groups.map((group) => ({
        title: group.category,
        url: `/blocks/${group.categorySlug}`,
        count: group.blocks.length,
      })),
    },
  ]
}

export function getBlockCategoryStaticParams() {
  return getBlockGroups().map((group) => ({ slug: group.categorySlug }))
}

export function getBlockPreviewStaticParams() {
  return blockEntries.map((block) => ({ slug: block.slug }))
}
