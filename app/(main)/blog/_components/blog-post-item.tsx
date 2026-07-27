import Image from "next/image"
import Link from "next/link"
import {
  formatBlogDate,
  getBlogCover,
  type BlogPost,
} from "@/lib/blog"
import { Clock } from "lucide-react"

export function BlogPostCard({ post }: { post: BlogPost }) {
  const { frontmatter } = post

  return (
    <article className="relative overflow-hidden">
      <Link
        href={`/blog/${post.slug}`}
        className="flex flex-col gap-6 py-8 md:flex-row md:gap-10"
        aria-label={`Read ${frontmatter.title}`}
      >
        {/* Meta column */}
        <div className="flex shrink-0 flex-col gap-4 md:w-52">
          <div className="flex flex-col gap-1">
            {frontmatter.updated ? (
              <time
                dateTime={frontmatter.updated}
                className="font-mono text-sm text-foreground"
              >
                {formatBlogDate(frontmatter.updated)}
              </time>
            ) : null}
            <span className="flex items-center gap-1.5 font-mono text-sm text-muted-foreground">
              <Clock className="size-3.5" aria-hidden="true" />
              {post.readingTime.text}
            </span>
          </div>
          <ul className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>


        {/* Content column */}
        <div className="flex flex-1 flex-col gap-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={getBlogCover(post)}
              alt=""
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 640px"
            />
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-balance text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary md:text-2xl">
              {frontmatter.title}
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              {frontmatter.description}
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}
