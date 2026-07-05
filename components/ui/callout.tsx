import * as React from "react"

import { cn } from "@/lib/utils"

function Callout({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="callout"
      className={cn(
        "mb-4 rounded-lg px-4 py-3 border text-base text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200",
        className
      )}
      {...props}
    />
  )
}

export { Callout }