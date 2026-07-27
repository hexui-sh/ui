import {
  getBlogCover,
  getBlogPosts,
  type BlogPost,
} from "@/lib/blog"
import {
  SITE_AUTHOR,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo"

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function toRfc822(value: string | number) {
  return new Date(value).toUTCString()
}

function getFeedUpdated(posts: BlogPost[]) {
  return posts.reduce((latest, post) => {
    const postDate = new Date(
      post.frontmatter.updated ?? post.frontmatter.date
    ).getTime()
    return postDate > latest ? postDate : latest
  }, 0)
}

export async function createRssFeed() {
  const posts = await getBlogPosts()
  const items = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`)
      const categories = post.frontmatter.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("")

      return `<item>
  <title>${escapeXml(post.frontmatter.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${toRfc822(post.frontmatter.date)}</pubDate>
  <dc:creator>${escapeXml(SITE_AUTHOR)}</dc:creator>
  <description>${escapeXml(post.frontmatter.description)}</description>
  ${categories}
  <media:content url="${escapeXml(absoluteUrl(getBlogCover(post)))}" medium="image" />
</item>`
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
  <title>${SITE_NAME} Blog</title>
  <link>${absoluteUrl("/blog")}</link>
  <description>${escapeXml(SITE_DESCRIPTION)}</description>
  <language>en-us</language>
  <lastBuildDate>${toRfc822(getFeedUpdated(posts))}</lastBuildDate>
  <atom:link href="${absoluteUrl("/blog/rss.xml")}" rel="self" type="application/rss+xml" />
  ${items}
</channel>
</rss>`
}

export async function createAtomFeed() {
  const posts = await getBlogPosts()
  const entries = posts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`)
      const categories = post.frontmatter.tags
        .map((tag) => `<category term="${escapeXml(tag)}" />`)
        .join("")

      return `<entry>
  <title>${escapeXml(post.frontmatter.title)}</title>
  <id>${url}</id>
  <link href="${url}" rel="alternate" />
  <link href="${escapeXml(absoluteUrl(getBlogCover(post)))}" rel="enclosure" />
  <published>${new Date(post.frontmatter.date).toISOString()}</published>
  <updated>${new Date(post.frontmatter.updated ?? post.frontmatter.date).toISOString()}</updated>
  <author><name>${escapeXml(SITE_AUTHOR)}</name></author>
  <summary type="text">${escapeXml(post.frontmatter.description)}</summary>
  ${categories}
</entry>`
    })
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE_NAME} Blog</title>
  <subtitle>${escapeXml(SITE_DESCRIPTION)}</subtitle>
  <id>${SITE_URL}/blog</id>
  <link href="${absoluteUrl("/blog")}" rel="alternate" />
  <link href="${absoluteUrl("/blog/atom.xml")}" rel="self" type="application/atom+xml" />
  <updated>${new Date(getFeedUpdated(posts)).toISOString()}</updated>
  <author><name>${escapeXml(SITE_AUTHOR)}</name></author>
  ${entries}
</feed>`
}
