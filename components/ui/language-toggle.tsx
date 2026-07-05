"use client"

import * as React from "react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { Languages } from "lucide-react"

export const DARK_MODE_FORWARD_TYPE = "dark-mode-forward"

export function LanguageToggle({
  variant = "ghost",
  className,
}: {
  variant?: React.ComponentProps<typeof Button>["variant"]
  className?: React.ComponentProps<typeof Button>["className"]
}) {
  return (
    <Button
      variant={variant}
      size="icon"
      className={cn(
        "group/toggle border border-neutral-300 dark:border-neutral-800 extend-touch-target size-8",
        className
      )}
    >
      <Languages />
      <span className="sr-only">Toggle language</span>
    </Button>
  )
}