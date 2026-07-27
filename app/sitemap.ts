import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"
import { getBlockGroups } from "@/lib/blocks"
import { getBlogCover, getBlogPosts } from "@/lib/blog"
import { getDocFileEntries, getTemplateFileEntries } from "@/lib/content"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blocks`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/templates`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }
  ]

  const blockGroups = getBlockGroups()
  const blockRoutes: MetadataRoute.Sitemap = blockGroups.map((group) => ({
    url: `${SITE_URL}/blocks/${group.categorySlug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  const [docEntries, templateEntries, blogPosts] = await Promise.all([
    getDocFileEntries(),
    getTemplateFileEntries(),
    getBlogPosts(),
  ])
  const docRoutes: MetadataRoute.Sitemap = docEntries.map((entry) => ({
    url: `${SITE_URL}/docs/${entry.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const templateRoutes: MetadataRoute.Sitemap = templateEntries.map(
    (entry) => ({
      url: `${SITE_URL}/templates/${entry.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  )

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(
      post.frontmatter.updated ?? post.frontmatter.date
    ),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [getBlogCover(post)],
  }))

  return [
    ...staticRoutes,
    ...blockRoutes,
    ...docRoutes,
    ...templateRoutes,
    ...blogRoutes,
  ]
}
