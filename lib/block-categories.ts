// Centralized metadata for block categories.
//
// `registry.json` only supports descriptions for individual blocks, so
// category-level copy (used for social sharing metadata such as Open Graph and
// Twitter descriptions) lives here instead. Keep this file as the single source
// of truth for category descriptions and reuse it wherever a category name or
// description is required.

export type BlockCategoryMetadata = {
  /** URL slug used in the route, e.g. `/blocks/<slug>`. */
  slug: string
  /** Short, category-specific description used for social sharing metadata. */
  description: string
}

/**
 * Reasonable fallback used when a category slug has no dedicated entry, or when
 * an unknown/missing category is requested.
 */
export const FALLBACK_BLOCK_CATEGORY_DESCRIPTION =
  "Free, high-quality UI blocks to copy, paste, and customize for your next project."

const BLOCK_CATEGORY_METADATA: Record<string, BlockCategoryMetadata> = {
  banner: {
    slug: "banner",
    description:
      "Announcement and promo banner sections to highlight offers, updates, and important messages.",
  },
  cta: {
    slug: "cta",
    description:
      "Call-to-action sections designed to convert visitors and drive clicks.",
  },
  faq: {
    slug: "faq",
    description:
      "Frequently asked questions sections to answer common queries and build trust.",
  },
  footer: {
    slug: "footer",
    description:
      "Footer sections with navigation, links, and branding for the bottom of your site.",
  },
  hero: {
    slug: "hero",
    description:
      "Hero sections to make a bold first impression and introduce your product.",
  },
  login: {
    slug: "login",
    description:
      "Login and authentication sections for sign-in and account access flows.",
  },
  sidebar: {
    slug: "sidebar",
    description:
      "Sidebar navigation sections for dashboards and application layouts.",
  },
  "social-proof": {
    slug: "social-proof",
    description:
      "Social proof sections featuring testimonials and company logos to build credibility.",
  },
}

/**
 * Returns the metadata for a given category slug, or `undefined` when the slug
 * is unknown or missing.
 */
export function getBlockCategoryMetadata(
  slug: string | undefined | null
): BlockCategoryMetadata | undefined {
  if (!slug) {
    return undefined
  }

  return BLOCK_CATEGORY_METADATA[slug]
}

/**
 * Returns the short, category-specific description for a given slug, falling
 * back to a generic description for unknown or missing categories.
 */
export function getBlockCategoryDescription(
  slug: string | undefined | null
): string {
  return getBlockCategoryMetadata(slug)?.description ?? FALLBACK_BLOCK_CATEGORY_DESCRIPTION
}
