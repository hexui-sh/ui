"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { useCopyToClipboard } from "@/hooks/use-copy"
import { cn } from "@/lib/utils"

type SizeVariant = "sm" | "default" | "lg"

export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onError"> {
  value?: string
  size?: SizeVariant
  asChild?: boolean
  onCopy?: () => void
  onError?: (error: Error) => void
  timeout?: number
}

const sizeMap: Record<SizeVariant, { button: string; icon: number }> = {
  sm: { button: "h-8 w-8", icon: 14 },
  default: { button: "h-9 w-9", icon: 16 },
  lg: { button: "h-12 w-12", icon: 20 },
}

/**
 * Single shared copy-to-clipboard button.
 *
 * Consolidates the previous `copy-button` (sized icon button) and
 * `copy-code-button` (asChild + callbacks + DOM fallback) variants.
 * When `value` is omitted the button falls back to copying the text of
 * the nearest `[data-code-container]` ancestor's `<pre>` element.
 */
const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      size = "default",
      asChild = false,
      onCopy,
      onError,
      timeout = 2000,
      className,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const { copied, copy } = useCopyToClipboard({ timeout, onCopy, onError })
    const internalRef = React.useRef<HTMLButtonElement>(null)

    React.useImperativeHandle(
      ref,
      () => internalRef.current as HTMLButtonElement,
      [],
    )

    const resolveText = () => {
      if (value) {
        return value
      }

      const container = internalRef.current?.closest("[data-code-container]")
      const pre = container?.querySelector("pre")
      return pre?.textContent ?? ""
    }

    const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
      copy(resolveText())
      onClick?.(event)
    }

    if (asChild) {
      return React.cloneElement(children as React.ReactElement, {
        // @ts-expect-error - we know this is a button
        onClick: handleCopy,
      })
    }

    const { button: buttonSize, icon: iconSize } = sizeMap[size]

    return (
      <button
        ref={internalRef}
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        disabled={copied}
        className={cn(
          "relative cursor-pointer active:scale-[0.97] transition-all ease-out duration-200 inline-flex items-center justify-center rounded-md text-neutral-900 disabled:pointer-events-none disabled:opacity-100 dark:text-neutral-50",
          buttonSize,
          className,
        )}
        {...props}
      >
        {children ?? (
          <>
            <div
              className={cn(
                "transition-all duration-200",
                copied
                  ? "scale-100 opacity-100 blur-none"
                  : "scale-70 opacity-0 blur-[2px]",
              )}
            >
              <CheckIcon
                size={iconSize}
                strokeWidth={2}
                aria-hidden="true"
                className="text-muted-foreground"
              />
            </div>
            <div
              className={cn(
                "absolute transition-all duration-200",
                copied
                  ? "scale-0 opacity-0 blur-[2px]"
                  : "scale-100 opacity-100 blur-none",
              )}
            >
              <CopyIcon
                size={iconSize}
                strokeWidth={2}
                aria-hidden="true"
                className="text-muted-foreground"
              />
            </div>
          </>
        )}
      </button>
    )
  },
)

CopyButton.displayName = "CopyButton"

export { CopyButton }
