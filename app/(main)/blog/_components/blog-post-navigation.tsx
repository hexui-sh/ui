import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import type { BlogNavigationContext } from "@/lib/blog"

export function BlogPostNavigation({
  navigation,
}: {
  navigation: BlogNavigationContext
}) {
  if (!navigation.previous && !navigation.next) {
    return null
  }

  return (
    <nav
      aria-label="Article navigation"
      className="grid gap-3 sm:grid-cols-2"
    >
      {navigation.previous ? (
        <Link
          href={`/blog/${navigation.previous.slug}`}
          className="group rounded-md bg-transparent hover:bg-muted/30 p-4"
        >
          <span className="flex items-center gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
            <ArrowLeft className="size-3.5" />
            Previous article
          </span>
          <span className="mt-2 block text-pretty text-sm font-medium leading-5 text-neutral-800 dark:text-neutral-200">
            {navigation.previous.frontmatter.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {navigation.next ? (
        <Link
          href={`/blog/${navigation.next.slug}`}
          className="group rounded-md text-right bg-transparent hover:bg-muted/30 p-4"
        >
          <span className="flex items-center justify-end gap-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Next article
            <ArrowRight className="size-3.5" />
          </span>
          <span className="mt-2 block text-pretty text-sm font-medium leading-5 text-neutral-800 dark:text-neutral-200">
            {navigation.next.frontmatter.title}
          </span>
        </Link>
      ) : null}
    </nav>
  )
}
