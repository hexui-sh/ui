"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export type UseCopyToClipboardOptions = {
  timeout?: number
  onCopy?: () => void
  onError?: (error: Error) => void
}

export type UseCopyToClipboardReturn = {
  copied: boolean
  copy: (text: string) => void
}

/**
 * Shared clipboard hook used by every copy affordance in the codebase
 * (CopyButton, CodeSnippetCopyButton, CommandCopy, MdxHeaderActions).
 * Keeps the copied state, the reset timeout and the success/error
 * callbacks in one place so behaviour stays consistent.
 */
export function useCopyToClipboard({
  timeout = 2000,
  onCopy,
  onError,
}: UseCopyToClipboardOptions = {}): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onCopyRef = useRef(onCopy)
  const onErrorRef = useRef(onError)

  useEffect(() => {
    onCopyRef.current = onCopy
    onErrorRef.current = onError
  }, [onCopy, onError])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const copy = useCallback(
    (text: string) => {
      if (
        typeof window === "undefined" ||
        !navigator.clipboard?.writeText ||
        !text
      ) {
        return
      }

      navigator.clipboard.writeText(text).then(
        () => {
          setCopied(true)
          onCopyRef.current?.()

          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }

          timeoutRef.current = setTimeout(
            () => setCopied(false),
            timeout,
          )
        },
        (error: Error) => {
          onErrorRef.current?.(error)
        },
      )
    },
    [timeout],
  )

  return { copied, copy }
}
