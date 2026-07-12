import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"
import { getBlockGroups } from "@/lib/blocks"
import { getDocFileEntries } from "@/lib/content"

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
      url: `${SITE_URL}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/templates`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  const blockGroups = getBlockGroups()
  const blockRoutes: MetadataRoute.Sitemap = blockGroups.map((group) => ({
    url: `${SITE_URL}/blocks/${group.categorySlug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const docEntries = await getDocFileEntries()
  const docRoutes: MetadataRoute.Sitemap = docEntries.map((entry) => ({
    url: `${SITE_URL}/docs/${entry.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...blockRoutes, ...docRoutes]
}
