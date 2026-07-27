import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Bug, PenLine } from "lucide-react"
import { BlogPostNavigation } from "@/app/(main)/blog/_components/blog-post-navigation"
import { JsonLd } from "@/components/json-ld"
import {
  formatBlogDate,
  getBlogCover,
  getBlogNavigation,
  getBlogPost,
  getBlogPosts,
} from "@/lib/blog"
import { buildGitHubEditUrl, buildGitHubIssueUrl } from "@/lib/github-links"
import {
  SITE_AUTHOR,
  SITE_NAME,
  SITE_TWITTER_CREATOR,
  absoluteUrl,
  blogPostingJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {
      title: "Article not found",
      robots: { index: false, follow: false },
    }
  }

  const { frontmatter } = post
  const url = absoluteUrl(`/blog/${slug}`)
  const image = getBlogCover(post)
  const socialTitle = `${frontmatter.title} - ${SITE_NAME}`

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": absoluteUrl("/blog/rss.xml"),
        "application/atom+xml": absoluteUrl("/blog/atom.xml"),
      },
    },
    openGraph: {
      type: "article",
      title: frontmatter.title,
      description: frontmatter.description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.updated ?? frontmatter.date,
      tags: frontmatter.tags,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: frontmatter.description,
      creator: SITE_TWITTER_CREATOR,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const [{ default: Post }, navigation] = await Promise.all([
    import(`@/blog/${post.slug}.mdx`),
    getBlogNavigation(slug),
  ])

  const { frontmatter } = post
  const pagePath = `/blog/${slug}`

  return (
    <main className="mx-auto w-full max-w-5xl pb-24 pt-26 sm:pt-32">
      <JsonLd
        data={blogPostingJsonLd({
          title: frontmatter.title,
          description: frontmatter.description,
          path: pagePath,
          image: getBlogCover(post),
          datePublished: frontmatter.date,
          dateModified: frontmatter.updated,
          author: SITE_AUTHOR,
          tags: frontmatter.tags,
          wordCount: post.readingTime.words,
          readingMinutes: post.readingTime.minutes,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: frontmatter.title, path: pagePath },
        ])}
      />

      <Link
        href="/blog"
        className="inline-flex min-h-11 items-center gap-1.5 rounded-md pr-3 text-sm font-medium text-neutral-500 outline-none transition-[color,scale] duration-150 ease-out hover:text-neutral-950 active:scale-[0.96] focus-visible:ring-3 focus-visible:ring-neutral-400/50 dark:text-neutral-400 dark:hover:text-white"
      >
        <ArrowLeft className="size-4" />
        All articles
      </Link>

      <article>
        <header className="mx-auto mt-8 max-w-3xl text-center">
          {frontmatter.tags.length > 0 ? (
            <ul
              className="flex flex-wrap justify-center gap-2"
              aria-label="Tags"
            >
              {frontmatter.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-neutral-200/70 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.04em] text-neutral-950 sm:text-5xl sm:leading-[1.08] dark:text-white">
            {frontmatter.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-neutral-600 sm:text-lg dark:text-neutral-400">
            {frontmatter.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-neutral-400 dark:text-neutral-500">
            <time dateTime={frontmatter.date}>
              Published {formatBlogDate(frontmatter.date)}
            </time>
            {frontmatter.updated ? (
              <>
                <span aria-hidden="true">·</span>
                <time dateTime={frontmatter.updated}>
                  Updated {formatBlogDate(frontmatter.updated)}
                </time>
              </>
            ) : null}
            <span aria-hidden="true">·</span>
            <span>{post.readingTime.text}</span>
          </div>
        </header>

        <div className="relative mt-10 aspect-1200/630 overflow-hidden rounded-md bg-neutral-100 shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_12px_40px_-24px_rgba(0,0,0,0.28)] dark:bg-neutral-900 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.1)]">
          <Image
            src={getBlogCover(post)}
            alt=""
            fill
            preload
            className="object-cover"
            sizes="(min-width: 1024px) 1024px, 100vw"
          />
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="min-w-0">
            <Post />
          </div>

          <footer className="mt-16 border-t pt-6">
            <BlogPostNavigation navigation={navigation} />
          </footer>
        </div>
      </article>
    </main>
  )
}

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export const dynamicParams = false
