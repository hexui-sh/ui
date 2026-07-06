"use client"

import { type ReactNode, useState } from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

export interface BannerProps {
  /** The content to display inside the banner. */
  children: ReactNode
  /** Additional CSS classes for the outer section. */
  className?: string
}

export function Banner({ children, className }: BannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <section
      aria-label="Promotional announcement"
      className={cn(
        "relative w-full bg-foreground px-4 py-3 text-primary-foreground",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-start text-sm font-medium sm:justify-center">
        <div className="text-balance text-center text-sm leading-snug">
          {children}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss promotional banner"
        className="absolute right-2 top-1/2 inline-flex size-6 -translate-y-1/2 items-center justify-center rounded-full transition-colors hover:bg-current/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/20"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </section>
  )
}
