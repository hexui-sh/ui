import * as React from "react"

import { cn } from "@/lib/utils"

function Callout({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="callout"
      className={cn(
        "my-7 rounded-md px-4 py-3 text-base text-neutral-800 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200",
        className
      )}
      {...props}
    />
  )
}

export { Callout }