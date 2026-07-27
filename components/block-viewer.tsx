"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

type BlockViewerProps = {
  slug: string
  className?: string
  emulatedViewportWidth?: number
  disableScale?: boolean
  refreshKey?: number
}

export function BlockViewer({
  slug,
  className,
  emulatedViewportWidth = 1280,
  disableScale = false,
  refreshKey = 0,
}: BlockViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const previousScaleRef = useRef(1)
  const scaleSpinnerTimeoutRef = useRef<number | null>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [showScaleSpinner, setShowScaleSpinner] = useState(false)

  useEffect(() => {
    const element = containerRef.current

    if (!element) {
      return
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry) {
        return
      }

      setContainerWidth(entry.contentRect.width)
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  const scale = useMemo(() => {
    if (disableScale) {
      return 1
    }

    if (!containerWidth || !emulatedViewportWidth) {
      return 1
    }

    return Math.min(containerWidth / emulatedViewportWidth, 1)
  }, [containerWidth, disableScale, emulatedViewportWidth])

  const iframeWidth = disableScale ? "100%" : `${emulatedViewportWidth}px`
  const iframeHeight = disableScale ? "100%" : `${100 / scale}%`
  const iframeTransform = disableScale ? "none" : `scale(${scale})`

  const src = `/view/${slug}?_r=${refreshKey}`

  useEffect(() => {
    const previousScale = previousScaleRef.current
    const hasScaleChanged = Math.abs(previousScale - scale) > 0.001

    if (!hasScaleChanged) {
      return
    }

    previousScaleRef.current = scale
    setShowScaleSpinner(true)

    if (scaleSpinnerTimeoutRef.current) {
      window.clearTimeout(scaleSpinnerTimeoutRef.current)
    }

    scaleSpinnerTimeoutRef.current = window.setTimeout(() => {
      setShowScaleSpinner(false)
      scaleSpinnerTimeoutRef.current = null
    }, 180)

    return () => {
      if (scaleSpinnerTimeoutRef.current) {
        window.clearTimeout(scaleSpinnerTimeoutRef.current)
      }
    }
  }, [scale])

  useEffect(() => {
    return () => {
      if (scaleSpinnerTimeoutRef.current) {
        window.clearTimeout(scaleSpinnerTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className={cn("relative h-full w-full overflow-hidden", className)}>
      <iframe
        key={refreshKey}
        src={src}
        title={`Preview of ${slug}`}
        className="block border-0"
        style={{
          width: iframeWidth,
          height: iframeHeight,
          transform: iframeTransform,
          transformOrigin: "top left",
        }}
      />
      {showScaleSpinner ? (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background backdrop-blur-[1px]">
          <Spinner className="size-5 text-foreground/70" />
        </div>
      ) : null}
    </div>
  )
}
