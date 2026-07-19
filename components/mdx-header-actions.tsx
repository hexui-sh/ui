"use client"

import * as React from "react"
import {
  ButtonGroup
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
import {
  type OpenInContext,
  type OpenInProviderId,
  openInProviders,
} from "@/lib/open-in-links"

type MdxHeaderActionsProps = {
  markdown: string
  pageUrl: string
  registrySlug?: string
}

const providerIcons: Record<OpenInProviderId, React.ElementType> = {
  v0: SiV0,
  chatgpt: ChatGPTIcon,
  claude: SiClaude,
}

type OpenInEntry = {
  id: OpenInProviderId
  label: string
  url: string
  Icon: React.ElementType
}

export function MdxHeaderActions(props: MdxHeaderActionsProps) {
  const { pageUrl, markdown, registrySlug } = props
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

  const context = React.useMemo<OpenInContext>(
    () =>
      registrySlug
        ? { kind: "registry", slug: registrySlug }
        : { kind: "doc", pageUrl },
    [registrySlug, pageUrl],
  )

  const openInEntries = React.useMemo<OpenInEntry[]>(() => {
    const entries: OpenInEntry[] = []
    for (const provider of openInProviders) {
      if (!provider.isAvailable(context)) {
        continue
      }
      const url = provider.buildUrl(context)
      if (!url) {
        continue
      }
      entries.push({
        id: provider.id,
        label: provider.label,
        url,
        Icon: providerIcons[provider.id],
      })
    }
    return entries
  }, [context])

  return (
    <div className="hidden md:flex items-center gap-2">
      <div className="inline-flex overflow-hidden items-center bg-neutral-200/70 dark:bg-neutral-800 rounded-md">
        <Button
          className="flex gap-1.5 rounded-r-none bg-neutral-200/70 dark:bg-neutral-800 hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] text-neutral-700 dark:text-neutral-200 px-3.5 py-3.5"
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
        <div className="h-5 w-px bg-neutral-300 dark:bg-neutral-700" />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                className="bg-neutral-200/70 dark:bg-neutral-800 hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] text-neutral-700 dark:text-neutral-200 h-7 rounded-l-none!"
                size="sm"
                aria-label="More Options"
              />
            }
          >
            <ChevronDown className="size-4" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-43">
            <DropdownMenuGroup className="flex flex-col gap-2">
              <DropdownMenuItem onSelect={handleViewAsMarkdown}>
                <SiMdx />
                View as Markdown
              </DropdownMenuItem>

              {openInEntries.map(({ id, label, url, Icon }) => (
                <DropdownMenuItem key={id}>
                  <a
                    className="flex w-full items-center gap-2"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon />
                    Open in {label}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
