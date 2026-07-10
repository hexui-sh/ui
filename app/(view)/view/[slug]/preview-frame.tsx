"use client"

import type { ReactNode } from "react"
import { useSearchParams } from "next/navigation"

type PreviewFrameProps = {
  children: ReactNode
}

export function PreviewFrame({ children }: PreviewFrameProps) {
  const searchParams = useSearchParams()
  const center = searchParams.get("center")
  const shouldCenterVertically = center === "1" || center === "true"

  if (!shouldCenterVertically) {
    return children
  }

  return (
    <div className="flex min-h-dvh w-full items-center">
      {children}
    </div>
  )
}
