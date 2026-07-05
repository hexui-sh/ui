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
            className={`relative w-full border-b text-primary py-2 ${className ?? ""}`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm font-medium">
                <div className="text-center text-balance text-sm leading-snug">
                    {children}
                </div>

                {/* Dismiss */}
                <button
                    type="button"
                    onClick={() => setDismissed(true)}
                    aria-label="Dismiss promotional banner"
                    className="p-0 sm:p-1.5 rounded-full hover:bg-current/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/20"
                >
                    <X className="size-4" aria-hidden="true" />
                </button>
            </div>
        </section>
    )
}
