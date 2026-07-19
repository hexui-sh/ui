import type { ReactNode } from "react"
import type { MDXComponents } from "mdx/types"
import { MdxPre } from "@/components/mdx-pre"
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
    h2: ({ children, ...props }) => {
      return (
        <h2
          className="scroll-m-20 border-t pt-10 mt-10 text-2xl font-semibold tracking-tight first:mt-0 text-neutral-700 dark:text-neutral-200"
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
          className="scroll-m-20 border-b pb-2 mt-4 text-xl font-semibold tracking-tight first:mt-0 text-neutral-700 dark:text-neutral-200"
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
          className="leading-7 not-first:mt-6 text-neutral-600 dark:text-neutral-300"
          {...props}
        >
          {children}
        </p>
      );
    },
    a: ({ children, ...props }) => {
      return (
        <a
          className="underline"
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
          className="mt-6 border-l-2 pl-6 italic"
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
          className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
          {...props}
        >
          {children}
        </code>
      )
    },
    hr: ({ children, ...props }) => {
      return (
        <hr {...props} className="mt-6" />
      );
    },
  }
}
