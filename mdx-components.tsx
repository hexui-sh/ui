import type { ReactNode } from "react"
import type { MDXComponents } from "mdx/types"
import { MdxPre } from "@/components/mdx-pre"
import {
  Cards,
  MdxCard,
  MdxImage,
  Step,
  Steps,
} from "@/components/mdx-content"
import { Callout } from "@/components/ui/callout"
import { HeadingSlugger } from "@/lib/heading"

function extractTextFromChildren(children: ReactNode): string {
  if (children == null || typeof children === "boolean") {
    return ""
  }
  if (typeof children === "string" || typeof children === "number") {
    return String(children)
  }
  if (Array.isArray(children)) {
    let text = ""
    for (const child of children) {
      text += extractTextFromChildren(child)
    }
    return text
  }
  if (typeof children === "object" && "props" in children) {
    return extractTextFromChildren(
      (children as { props: { children?: ReactNode } }).props.children
    )
  }
  return ""
}

export function useMDXComponents(): MDXComponents {
  const slugger = new HeadingSlugger()

  return {
    Callout,
    Steps,
    Step,
    Cards,
    Card: MdxCard,
    Image: MdxImage,
    h2: ({ children, ...props }) => {
      return (
        <h2
          className="mt-10 scroll-m-20 border-t pt-10 text-balance text-2xl font-semibold tracking-tight text-neutral-700 first:mt-0 dark:text-neutral-200"
          {...props}
          id={props.id ?? slugger.slug(extractTextFromChildren(children))}
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      return (
        <h3
          className="mt-8 scroll-m-20 border-b pb-2 text-balance text-xl font-semibold tracking-tight text-neutral-700 first:mt-0 dark:text-neutral-200"
          {...props}
          id={props.id ?? slugger.slug(extractTextFromChildren(children))}
        >
          {children}
        </h3>
      );
    },
    p: ({ children, ...props }) => {
      return (
        <p
          className="text-pretty leading-7 text-neutral-600 not-first:mt-6 dark:text-neutral-300"
          {...props}
        >
          {children}
        </p>
      );
    },
    a: ({ children, ...props }) => {
      return (
        <a
          className="font-medium underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-950 dark:decoration-neutral-600 dark:hover:text-white"
          {...props}
        >
          {children}
        </a>
      );
    },
    ul: ({ children, ...props }) => {
      return (
        <ul
          className="my-6 ml-6 list-disc [&>li]:mt-2 text-neutral-600 dark:text-neutral-300"
          {...props}
        >
          {children}
        </ul>
      );
    },
    ol: ({ children, ...props }) => {
      return (
        <ol
          className="my-6 ml-6 list-decimal [&>li]:mt-2 text-neutral-600 dark:text-neutral-300"
          {...props}
        >
          {children}
        </ol>
      );
    },
    li: ({ children, ...props }) => {
      return <li {...props}>{children}</li>;
    },
    blockquote: ({ children, ...props }) => {
      return (
        <blockquote
          className="mt-6 border-l-2 pl-6 text-pretty italic text-neutral-600 dark:text-neutral-300"
          {...props}
        >
          {children}
        </blockquote>
      );
    },
    pre: ({ children }) => {
      return <MdxPre>{children}</MdxPre>;
    },
    code: ({ className, children, ...props }) => {
      if (className?.includes("language-")) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        )
      }
      return (
        <code
          className="relative rounded-md bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
          {...props}
        >
          {children}
        </code>
      )
    },
    hr: ({ children, ...props }) => {
      return (
        <hr {...props} className="my-10" />
      );
    },
    img: ({ src, alt, ...props }) => {
      if (typeof src !== "string") {
        return null
      }

      return <MdxImage src={src} alt={alt ?? ""} {...props} />
    },
  }
}
