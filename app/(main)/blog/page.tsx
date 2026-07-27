import type { Metadata } from "next"
import { BlogPostCard } from "@/app/(main)/blog/_components/blog-post-item"
import { JsonLd } from "@/components/json-ld"
import { getBlogPosts } from "@/lib/blog"
import {
  absoluteUrl,
  breadcrumbJsonLd,
  collectionPageJsonLd,
  pageMetadata,
} from "@/lib/seo"

const BLOG_TITLE = "Frontend Design & Development Blog"
const BLOG_DESCRIPTION =
  "Practical articles about React, Next.js, Tailwind CSS, UI design, accessibility, and building better frontend experiences."

export const metadata: Metadata = {
  ...pageMetadata({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    path: "/blog",
  }),
  alternates: {
    canonical: absoluteUrl("/blog"),
    types: {
      "application/rss+xml": absoluteUrl("/blog/rss.xml"),
      "application/atom+xml": absoluteUrl("/blog/atom.xml"),
    },
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

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="mx-auto w-full max-w-3xl pb-24 pt-24 sm:pt-36">
      <JsonLd
        data={collectionPageJsonLd({
          name: BLOG_TITLE,
          description: BLOG_DESCRIPTION,
          path: "/blog",
          items: posts.map((post) => ({
            name: post.frontmatter.title,
            path: `/blog/${post.slug}`,
          })),
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <header className="max-w-3xl">
        <h1 className="text-balance text-4xl font-semibold tracking-[-0.035em] text-neutral-950 sm:text-5xl dark:text-white">
          Blog
        </h1>
        <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-neutral-600 sm:text-lg dark:text-neutral-400">
          Articles, guides, and updates from the Hex UI team.
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="mt-14 divide-y divide-border">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-sm text-neutral-500 dark:text-neutral-400">
          New articles are on the way.
        </p>
      )}
    </main>
  )
}
