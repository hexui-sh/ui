import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlockPreviewPanel } from "@/components/block-preview-panel"
import { BlockViewer } from "@/components/block-viewer"
import { MdxNavActions } from "@/components/mdx-nav-actions"
import { categoryToSlug, getBlockCategories, getBlockCategoryNavigationContext, getBlockEntriesByCategory } from "@/lib/blocks"
import type { BlockEntry } from "@/lib/blocks"
import { readCodePath } from "@/lib/read-code-path"

function resolveRegistryPath(registryPath: string): string {
  return registryPath.replace(/^@\//, "").replace(/\/$/, "")
}

type BlockCategoryPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: BlockCategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await getBlockEntriesByCategory(slug)

  if (!result) {
    return {}
  }

  return {
    title: result.category,
  }
}

export default async function BlockCategoryPage({
  params,
}: BlockCategoryPageProps) {
  const { slug } = await params
  const result = await getBlockEntriesByCategory(slug)

  if (!result) {
    notFound()
  }

  const { category, blocks } = result

  const blockCategoryNav = await getBlockCategoryNavigationContext(slug)

  const blocksWithCode = await Promise.all(
    blocks.map(async (block: BlockEntry) => ({
      ...block,
      codeFiles: block.path
        ? await readCodePath(resolveRegistryPath(block.path))
        : [],
    }))
  )

  return (
    <div className="mx-auto mt-16 flex w-full max-docs-content-width flex-col gap-5">
      <div className="flex gap-4 items-start justify-between">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">
          {category}
        </h1>
        <div className="block xl:hidden">
          <MdxNavActions previous={blockCategoryNav.previous} next={blockCategoryNav.next} label="block category" />
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {blocksWithCode.map((block) => (
          <div key={block.slug} id={block.slug} className="scroll-mt-20 flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">
                {block.title}
              </h2>
              {block.description ? (
                <p className="mt-1 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                  {block.description}
                </p>
              ) : null}
            </div>

            <BlockPreviewPanel
              hasPreview={Boolean(block.path)}
              slug={block.slug}
              centerVertically
              installCommand={
                block.installCommand ?? `pnpm dlx shadcn@latest add https://hexui.sh/r/${block.slug}.json`
              }
              v0Url={block.v0Url}
              codeFiles={block.codeFiles}
            >
              <BlockViewer slug={block.slug} />
            </BlockPreviewPanel>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const categories = await getBlockCategories()
  return categories.map((category) => ({ slug: categoryToSlug(category) }))
}

export const dynamicParams = false
