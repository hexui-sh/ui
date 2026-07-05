"use client"

import { type ReactNode, useState } from "react"
import { X } from "lucide-react"

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
            className={`relative w-full bg-foreground text-primary-foreground py-3 px-4 ${className ?? ""}`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center text-sm font-medium">
                <div className="text-center text-balance text-sm leading-snug">
                    {children}
                </div>
            </div>

            {/* Dismiss */}
            <button
                type="button"
                onClick={() => setDismissed(true)}
                aria-label="Dismiss promotional banner"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0 sm:p-1.5 rounded-full hover:bg-current/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/20"
            >
                <X className="size-4" aria-hidden="true" />
            </button>
        </section>
    )
}
