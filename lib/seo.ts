import type { Metadata } from "next"

export const SITE_URL = "https://hexui.sh"
export const SITE_NAME = "Hex UI"
export const SITE_TAGLINE = "Copy. Customize. Launch."
export const SITE_DESCRIPTION =
  "Accelerate your section development. Get free, high-quality sections to copy, paste, and customize to your liking. Open Source. Open Code."
export const SITE_TWITTER_CREATOR = "@ri0n_dev"
export const SITE_OG_IMAGE = "/ogp.webp"
export const SITE_OG_IMAGE_WIDTH = 1200
export const SITE_OG_IMAGE_HEIGHT = 630
export const SITE_GITHUB_URL = "https://github.com/ri0n-dev/hex-ui"
export const SITE_AUTHOR = "Rion"

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return new URL(normalized, SITE_URL).toString()
}

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  type?: "website" | "article"
  /**
   * Optional description used only for social sharing metadata
   * (Open Graph and Twitter). When omitted, `description` is used.
   * The browser tab title and the standard meta `description` are unaffected.
   */
  socialDescription?: string
}

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  socialDescription,
}: PageMetadataOptions): Metadata {
  const url = absoluteUrl(path)
  const ogTitle = `${title} - ${SITE_NAME}`
  const shareDescription = socialDescription ?? description

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: shareDescription,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: [
        {
          url: SITE_OG_IMAGE,
          width: SITE_OG_IMAGE_WIDTH,
          height: SITE_OG_IMAGE_HEIGHT,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: shareDescription,
      creator: SITE_TWITTER_CREATOR,
      images: [absoluteUrl(SITE_OG_IMAGE)],
    },
  }
}

export function defaultOpenGraph(
  description: string = SITE_DESCRIPTION
): NonNullable<Metadata["openGraph"]> {
  return {
    title: SITE_TAGLINE,
    description,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: SITE_OG_IMAGE_WIDTH,
        height: SITE_OG_IMAGE_HEIGHT,
        alt: `${SITE_NAME} - ${SITE_TAGLINE}`,
      },
    ],
    locale: "en_US",
    type: "website",
  }
}

export function defaultTwitter(
  description: string = SITE_DESCRIPTION
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title: `${SITE_TAGLINE} - ${SITE_NAME}`,
    description,
    creator: SITE_TWITTER_CREATOR,
    images: [absoluteUrl(SITE_OG_IMAGE)],
  }
}

type JsonLd = Record<string, unknown>

export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/favicon.ico"),
    description: SITE_DESCRIPTION,
    sameAs: [
      "https://github.com/ri0n-dev/hex-ui",
      "https://x.com/ri0n_dev",
    ],
  }
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

export function softwareApplicationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    isAccessibleForFree: true,
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: "https://x.com/ri0n_dev",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

export type Crumb = {
  name: string
  path: string
}

export function breadcrumbJsonLd(crumbs: Crumb[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  }
}

export function collectionPageJsonLd({
  name,
  description,
  path,
  items,
}: {
  name: string
  description: string
  path: string
  items?: Array<{ name: string; path: string }>
}): JsonLd {
  const page: JsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  }

  if (items && items.length > 0) {
    page.hasPart = items.map((item) => ({
      "@type": "CreativeWork",
      name: item.name,
      url: absoluteUrl(item.path),
    }))
  }

  return page
}

export function articleJsonLd({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: SITE_AUTHOR,
      url: "https://x.com/ri0n_dev",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

export function blogPostingJsonLd({
  title,
  description,
  path,
  image,
  datePublished,
  dateModified,
  author,
  tags,
  wordCount,
  readingMinutes,
}: {
  title: string
  description: string
  path: string
  image: string
  datePublished: string
  dateModified?: string
  author: string
  tags: string[]
  wordCount: number
  readingMinutes: number
}): JsonLd {
  const url = absoluteUrl(path)

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image,
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/favicon.ico"),
      },
    },
    keywords: tags.join(", "),
    wordCount,
    timeRequired: `PT${readingMinutes}M`,
    isPartOf: {
      "@type": "Blog",
      name: `${SITE_NAME} Blog`,
      url: absoluteUrl("/blog"),
    },
  }
}

export function faqPageJsonLd(faqs: Array<{ question: string; answer: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}
