import type { Metadata } from "next"
import path from "node:path"
import { readFile } from "node:fs/promises"
import { notFound } from "next/navigation"
import { Bug, Pen, TextAlignStart } from "lucide-react"
import { MdxHeaderActions } from "@/components/mdx-header-actions"
import { MdxNavActions } from "@/components/mdx-nav-actions"
import { buildGitHubEditUrl, buildGitHubIssueUrl } from "@/lib/github-links"
import { getDocFileEntries, getDocFrontmatter, getDocNavigationContext, resolveDocFile } from "@/lib/content"
import { HeadingSlugger } from "@/lib/heading"
import { pageMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"

type TocHeading = {
    id: string
    title: string
    level: 2 | 3
}

function stripMdxFormatting(value: string) {
    return value
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/<\/?[^>]+>/g, "")
        .replace(/[*_~]/g, "")
        .trim()
}

function getTocHeadings(source: string): TocHeading[] {
    const contentWithoutFrontmatter = source.replace(
        /^---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/,
        ""
    )

    const contentWithoutCodeBlocks = contentWithoutFrontmatter
        .replace(/```[\s\S]*?```/g, "")
        .replace(/~~~[\s\S]*?~~~/g, "")

    const headingPattern = /^(#{2,3})\s+(.+?)\s*#*\s*$/gm
    const tocHeadings: TocHeading[] = []
    const slugger = new HeadingSlugger()
    let match: RegExpExecArray | null = null

    while ((match = headingPattern.exec(contentWithoutCodeBlocks)) !== null) {
        const level = match[1].length as 2 | 3
        const title = stripMdxFormatting(match[2])
        if (!title) {
            continue
        }

        tocHeadings.push({
            id: slugger.slug(title),
            title,
            level,
        })
    }

    return tocHeadings
}

function formatSlugToTitle(slug: string) {
    return slug
        .replace(/[-_]+/g, " ")
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase())
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const frontmatter = await getDocFrontmatter(slug)
    const title = frontmatter?.title ?? formatSlugToTitle(slug)
    const description = frontmatter?.description
        ?? `Read the ${title} guide in the Hex UI documentation.`

    return pageMetadata({
        title,
        description,
        path: `/docs/${slug}`,
        type: "article",
    })
}

export default async function DocsPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const pagePath = `/docs/${slug}`
    const docFile = await resolveDocFile(slug)
    if (!docFile) {
        notFound()
    }

    const source = await readFile(
        path.join(process.cwd(), "docs", docFile.relativePath),
        "utf8"
    )

    const [{ default: Post }, frontmatter] = await Promise.all([
        import(`@/docs/${docFile.importPath}.mdx`),
        getDocFrontmatter(slug),
    ])

    const docNav = await getDocNavigationContext(slug)
    const title = frontmatter.title ?? formatSlugToTitle(slug)
    const tocHeadings = getTocHeadings(source)

    const issueUrl = buildGitHubIssueUrl({ title: `[bug]: ${pagePath}` })
    const editUrl = buildGitHubEditUrl(`docs/${docFile.relativePath}`)

    return (
        <div className="mx-auto mt-16 flex w-full min-w-0 md:mt-14">
            <JsonLd
                data={articleJsonLd({
                    title,
                    description: frontmatter.description
                        ?? `Read the ${title} guide in the Hex UI documentation.`,
                    path: pagePath,
                })}
            />
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: "Home", path: "/" },
                    { name: "Docs", path: "/docs/introduction" },
                    { name: title, path: pagePath },
                ])}
            />
            <article className="min-w-0 w-full py-1">
                <header className="mb-6 dark:border-neutral-800">
                    <div className="flex gap-4 items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">{title}</h1>
                            {frontmatter.description ? (
                                <p className="mt-2 max-w-2xl text-base leading-6 text-neutral-600 dark:text-neutral-400">{frontmatter.description}</p>
                            ) : null}
                        </div>
                        <div className="flex items-center gap-2">
                            <MdxHeaderActions markdown={source} pageUrl={pagePath} />
                            <MdxNavActions previous={docNav.previous} next={docNav.next} label="document" />
                        </div>
                    </div>
                </header>

                <Post />
            </article>

            {tocHeadings.length > 0 ? (
                <aside className="hidden min-w-64 pl-7 pr-1 lg:block">
                    <div className="sticky top-19">
                        <p className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300"><TextAlignStart size={14} />On This Page</p>
                        <nav aria-label="On this page table of contents">
                            <ul className="space-y-1.5">
                                {tocHeadings.map((heading) => (
                                    <li key={heading.id}>
                                        <a
                                            href={`#${heading.id}`}
                                            className={`block text-sm text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100 ${heading.level === 3 ? "pl-3" : ""}`}
                                        >
                                            {heading.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <hr className="my-6.5 border-neutral-200 dark:border-neutral-800" />

                        <nav aria-label="On this page table of contents">
                            <ul className="space-y-1">
                                <li>
                                    <a
                                        href={issueUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-sm text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100"
                                    >
                                        <Bug size={13} /> Report an Issue
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={editUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-sm text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-neutral-100"
                                    >
                                        <Pen size={13} /> Edit this page
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
            ) : null}
        </div>
    )
}

export async function generateStaticParams() {
    const entries = await getDocFileEntries()
    return entries.map((entry) => ({ slug: entry.slug }))
}

export const dynamicParams = false
