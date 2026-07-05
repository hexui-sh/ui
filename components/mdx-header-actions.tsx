"use client"

import * as React from "react"
import {
  ButtonGroup,
} from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, Copy, Check } from "lucide-react"
import { SiMdx, SiV0, SiClaude } from "@icons-pack/react-simple-icons"
import ChatGPTIcon from "@/components/icon/chat-gpt"
import { useCopyToClipboard } from "@/hooks/use-copy"

type MdxHeaderActionsProps = {
  markdown: string
  pageUrl: string
}

export function MdxHeaderActions(props: MdxHeaderActionsProps) {
  const { pageUrl, markdown } = props
  const { copied, copy } = useCopyToClipboard({ timeout: 1400 })

  const toAbsoluteUrl = React.useCallback((targetPath: string) => {
    if (targetPath.startsWith("http://") || targetPath.startsWith("https://")) {
      return targetPath
    }
    return new URL(targetPath, window.location.origin).toString()
  }, [])

  const handleCopyMarkdown = React.useCallback(() => {
    copy(markdown)
  }, [copy, markdown])

  const handleViewAsMarkdown = React.useCallback(() => {
    const markdownUrl = `${pageUrl}.md`
    window.open(toAbsoluteUrl(markdownUrl), "_blank", "noopener,noreferrer")
  }, [pageUrl, toAbsoluteUrl])

  const getCanonicalDocUrl = React.useCallback(() => {
    const absolute = toAbsoluteUrl(pageUrl)
    const parsed = new URL(absolute)
    return `https://ui.ri0n.dev${parsed.pathname}`
  }, [pageUrl, toAbsoluteUrl])

  const buildAiPrompt = React.useCallback(() => {
    const docUrl = getCanonicalDocUrl()
    return `I'm looking at this ri0n/ui documentation: ${docUrl}. Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`
  }, [getCanonicalDocUrl])

  const openIn = React.useCallback((provider: "v0" | "chatgpt" | "claude") => {
    const prompt = encodeURIComponent(buildAiPrompt())

    const targetUrl =
      provider === "v0"
        ? `https://v0.dev/?q=${prompt}`
        : provider === "chatgpt"
          ? `https://chatgpt.com/?q=${prompt}`
          : `https://claude.ai/new?q=${prompt}`

    window.open(targetUrl, "_blank", "noopener,noreferrer")
  }, [buildAiPrompt])

  return (
    <div className="hidden md:flex items-center gap-2">
      <ButtonGroup>
        <Button
          className="flex gap-1.5 bg-neutral-200/70 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 px-3.5 py-3.5"
          size="sm"
          onClick={handleCopyMarkdown}
        >
          <span className="relative inline-flex size-4 items-center justify-center">
            <Copy
              className={`absolute transition-all duration-200 ${copied ? "scale-50 opacity-0" : "scale-100 opacity-100"
                }`}
            />
            <Check
              className={`absolute transition-all duration-200 ${copied ? "scale-100 opacity-100" : "scale-50 opacity-0"
                }`}
            />
          </span>
          Copy Page
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button onClick={handleCopyMarkdown} className="bg-neutral-200/70 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 py-3.5" size="sm" aria-label="More Options">
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-43">
            <DropdownMenuGroup className="flex flex-col gap-2">
              <DropdownMenuItem
                onSelect={handleViewAsMarkdown}
              >
                <SiMdx />
                View as Markdown
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => openIn("v0")}><SiV0 />Open in V0</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => openIn("chatgpt")}><ChatGPTIcon />Open in ChatGPT</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => openIn("claude")}><SiClaude />Open in Claude</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    </div>
  )
}
