"use client"

import { type ReactNode, useState } from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

export interface BannerProps {
  children: ReactNode
  className?: string
}

export function Banner({ children, className }: BannerProps) {
  // Local-only dismiss state: the banner stays hidden until the component remounts.
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <section
      aria-label="Promotional announcement"
      className={cn(
        "relative w-full border-b py-2 text-primary",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 text-sm font-medium">
        <div className="text-balance text-center leading-snug">
          {children}
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss promotional banner"
          className="inline-flex size-6 items-center justify-center rounded-full transition-colors hover:bg-current/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/20"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
