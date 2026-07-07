"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type NavLink = {
  title: string
  href: string
}

type MdxNavActionsProps = {
  previous?: NavLink
  next?: NavLink
  label: string
}

export function MdxNavActions({ previous, next, label }: MdxNavActionsProps) {
  return (
    <div className="flex items-center gap-1">
      {previous ? (
        <Link
          href={previous.href}
          title={previous.title}
          aria-label={`Previous ${label}`}
          className={cn(
            buttonVariants({ variant: "secondary", size: "icon" }),
            "size-8 rounded-full"
          )}
        >
          <ArrowLeft className="size-4" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          role="link"
          aria-label={`Previous ${label}`}
          className={cn(
            buttonVariants({ variant: "secondary", size: "icon" }),
            "size-8 rounded-full pointer-events-none opacity-50"
          )}
        >
          <ArrowLeft className="size-4" />
        </span>
      )}

      {next ? (
        <Link
          href={next.href}
          title={next.title}
          aria-label={`Next ${label}`}
          className={cn(
            buttonVariants({ variant: "secondary", size: "icon" }),
            "size-8 rounded-full"
          )}
        >
          <ArrowRight className="size-4" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          role="link"
          aria-label={`Next ${label}`}
          className={cn(
            buttonVariants({ variant: "secondary", size: "icon" }),
            "size-8 rounded-full pointer-events-none opacity-50"
          )}
        >
          <ArrowRight className="size-4" />
        </span>
      )}
    </div>
  )
}
