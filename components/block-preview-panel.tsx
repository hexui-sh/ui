"use client"

import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react"
import Link from "next/link"
import { useState } from "react"
import {
  Maximize,
  Monitor,
  RefreshCw,
  Smartphone,
  Tablet,
} from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"
import { CodePreview, type CodePreviewFile } from "@/components/code-preview"
import { CommandCopy } from "@/components/ui/command-copy"
import { OpenInV0 } from "@/components/ui/open-in-v0"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type BlockPreviewPanelProps = {
  hasPreview: boolean
  slug: string
  centerVertically?: boolean
  installCommand: string
  v0Url?: string
  codeFiles: CodePreviewFile[]
  children: ReactNode
}

type PreviewScreen = "desktop" | "tablet" | "mobile"
type PreviewOrientation = "portrait" | "landscape"

const screenOptions: Array<{
  value: PreviewScreen
  icon: typeof Monitor
  label: string
}> = [
    {
      value: "desktop",
      icon: Monitor,
      label: "Desktop",
    },
    {
      value: "tablet",
      icon: Tablet,
      label: "Tablet",
    },
    {
      value: "mobile",
      icon: Smartphone,
      label: "Mobile",
    },
  ]

const previewSizeMap: Record<
  PreviewScreen,
  Record<PreviewOrientation, string>
> = {
  desktop: {
    portrait: "w-full max-w-[1280px]",
    landscape: "w-full max-w-[1280px]",
  },
  tablet: {
    portrait: "w-full max-w-[769px] border-r",
    landscape: "w-full max-w-[960px]",
  },
  mobile: {
    portrait: "w-full max-w-[540px] border-r",
    landscape: "w-full max-w-[740px]",
  },
}

const screenWidthLabelMap: Record<PreviewScreen, string> = {
  desktop: "1280px",
  tablet: "768px",
  mobile: "640px",
}

export function BlockPreviewPanel({
  hasPreview,
  slug,
  centerVertically = false,
  installCommand,
  v0Url,
  codeFiles,
  children,
}: BlockPreviewPanelProps) {
  const isMobile = useIsMobile()
  const [screen, setScreen] = useState<PreviewScreen>("desktop")
  const [isLandscape, setIsLandscape] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const canRotate = screen !== "desktop"
  const disableIframeScale = isMobile || screen !== "desktop"
  const orientation: PreviewOrientation =
    canRotate && isLandscape ? "landscape" : "portrait"
  const openInNewTabUrl = `/view/${slug}`
  const packageName = installCommand.replace(/^pnpm\s+dlx\s+shadcn@\S+\s+add\s+/, "")

  const previewChildren = Children.map(children, (child) => {
    if (!isValidElement(child) || typeof child.type === "string") {
      return child
    }

    return cloneElement(
      child as ReactElement<{ disableScale?: boolean; refreshKey?: number }>,
      {
        disableScale: disableIframeScale,
        refreshKey,
      }
    )
  })

  const handleScreenChange = (nextScreen: PreviewScreen) => {
    setScreen(nextScreen)

    if (nextScreen === "desktop") {
      setIsLandscape(false)
    }
  }

  if (isMobile) {
    return (
      <div className="@container w-full">
        <div className="flex h-8 w-full min-w-0 items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">{packageName}</p>
          <div className="flex items-center h-8">
            {hasPreview ? (
              <Button
                size="icon"
                variant="ghost"
                nativeButton={false}
                render={<Link href={openInNewTabUrl} target="_blank" rel="noopener noreferrer" />}
              >
                <Maximize className="text-neutral-700 dark:text-neutral-300" />
              </Button>
            ) : (
              <Button size="icon" variant="ghost" disabled>
                <Maximize className="text-neutral-700 dark:text-neutral-300" />
              </Button>
            )}
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Refresh preview"
              disabled={!hasPreview}
              onClick={() => setRefreshKey((k) => k + 1)}
            >
              <RefreshCw className="text-neutral-700 dark:text-neutral-300" />
            </Button>
            <div className="flex @5xl:hidden ml-2 mr-4 h-4.5 w-0.5 dark:bg-neutral-900" />
            <OpenInV0 url={v0Url} />
          </div>
        </div>
        <div className="mx-auto mt-4 w-full">
          <div className="h-[70vh] max-h-180 w-full overflow-hidden rounded-lg border-2 border-border bg-neutral-50 dark:bg-neutral-950">
            {hasPreview ? (
              previewChildren
            ) : (
              <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-neutral-400">
                No preview available :(
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="@container w-full">
      <Tabs defaultValue="preview" className="w-full">
        <div className="flex h-8 w-full min-w-0 items-center justify-between gap-2 sm:gap-4">
          <TabsList className="px-0 py-0.5 bg-transparent">
            <TabsTrigger className="px-2" value="preview">Preview</TabsTrigger>
            <TabsTrigger className="px-2" value="code">Code</TabsTrigger>
          </TabsList>
          <div className="flex h-full items-center gap-2">
            <ButtonGroup className="rounded-md border border-border">
              {screenOptions.map(({ value, icon: Icon, label }) => (
                <Tooltip key={value}>
                  <TooltipTrigger
                    render={
                      <Button
                        type="button"
                        size="icon"
                        variant={screen === value ? "secondary" : "ghost"}
                        className="rounded-md"
                        aria-label={label}
                        aria-pressed={screen === value}
                        onClick={() => handleScreenChange(value)}
                      />
                    }
                  >
                    <Icon className="text-neutral-700 dark:text-neutral-300" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" sideOffset={8}>
                    {label}: {screenWidthLabelMap[value]}
                  </TooltipContent>
                </Tooltip>
              ))}
              <ButtonGroupSeparator />
              {hasPreview ? (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        size="icon"
                        variant="ghost"
                        nativeButton={false}
                        render={<Link href={openInNewTabUrl} target="_blank" rel="noopener noreferrer" />}
                      />
                    }
                  >
                    <Maximize className="text-neutral-700 dark:text-neutral-300" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" sideOffset={8}>
                    Open in New Tab
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger
                    render={<Button size="icon" variant="ghost" disabled />}
                  >
                    <Maximize className="text-neutral-700 dark:text-neutral-300" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" sideOffset={8}>
                    Open in New Tab
                  </TooltipContent>
                </Tooltip>
              )}
              <ButtonGroupSeparator />
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="rounded-md"
                      aria-label="Refresh preview"
                      disabled={!hasPreview}
                      onClick={() => setRefreshKey((k) => k + 1)}
                    />
                  }
                >
                  <RefreshCw className="text-neutral-700 dark:text-neutral-300" />
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8}>
                  Refresh Preview
                </TooltipContent>
              </Tooltip>
            </ButtonGroup>
            <div className="hidden @5xl:flex mx-1.5 h-4.5 w-0.5 dark:bg-neutral-900" />
            <CommandCopy value={installCommand} displayValue={packageName} />
            <OpenInV0 url={v0Url} />
          </div>
        </div>

        <TabsContent value="preview">
          <div className="max-docs-content-width h-175 overflow-hidden rounded-lg border-2">
            {hasPreview ? (
              <div className="flex justify-start items-center h-full
bg-[repeating-linear-gradient(45deg,rgba(0,0,0,0.05),rgba(0,0,0,0.05)_1px,transparent_3px,transparent_9px)]
dark:bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.05),rgba(255,255,255,0.05)_1px,transparent_3px,transparent_9px)]">
                <div
                  className={cn(
                    "flex items-center overflow-hidden transition-[max-width,min-height] duration-200 ease-out h-full bg-neutral-50 dark:bg-neutral-950",
                    previewSizeMap[screen][orientation]
                  )}
                >
                  {previewChildren}
                </div>
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center text-center text-sm text-neutral-400">
                No preview available :(
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="code">
          <div className="h-175 max-docs-content-width overflow-hidden rounded-lg border-2">
            {codeFiles.length > 0 ? (
              <CodePreview files={codeFiles} />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-center text-sm text-neutral-400">
                No source files found :(
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
