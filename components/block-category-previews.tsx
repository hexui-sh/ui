import type { ReactNode } from "react"
import { X, ChevronDown } from "lucide-react"

export type BlockCategoryPreviewProps = {
  category: string
  categorySlug?: string
}

function PreviewShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex w-full overflow-hidden p-3 xl:p-4 2xl:p-5" style={{ minHeight: 0, aspectRatio: "16/9" }}>
      {children}
    </div>
  )
}

function CardPreviewShell({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={`rounded-md mx-auto border border-border/70 shadow-[0_0_0_0.5px_rgba(255,255,255,0.06)_inset,0_1px_0_0_rgba(255,255,255,0.08)_inset,0_1px_3px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.04)] bg-card ${className}`}>
      {children}
    </div>
  )
}

function MiniLine({ className, size = "md" }: { className?: string; size?: "xs" | "sm" | "md" | "lg" | "xl" }) {
  const sizeClasses = {
    xs: "h-1",
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
    xl: "h-4",
  }

  return <div className={`${sizeClasses[size]} rounded-full bg-muted-foreground/25 ${className}`} />
}

function Text({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`text-[11px] font-mono font-medium text-muted-foreground/60 ${className}`}>{children}</span>
}

export function BannerCategoryPreview(props: BlockCategoryPreviewProps) {
  return (
    <PreviewShell {...props}>
      <div className="flex flex-1 items-center">
        <div className="flex flex-col w-full justify-center items-center gap-2">
          <Text className="mx-auto">Banner</Text>
          <CardPreviewShell className="w-full max-w-90 sm:max-w-full p-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 space-y-1.5">
                <MiniLine className="w-3/4" />
                <MiniLine className="w-1/2" />
              </div>
              <X className="size-5 text-foreground/25" />
            </div>
          </CardPreviewShell>
        </div>
      </div>
    </PreviewShell>
  )
}

export function CtaCategoryPreview(props: BlockCategoryPreviewProps) {
  return (
    <PreviewShell {...props}>
      <div className="flex flex-1 items-center overflow-hidden">
        <CardPreviewShell className="w-full max-w-80 sm:max-w-full">
          <div className="flex flex-col items-center justify-center p-4 gap-3">
            <div className="flex flex-col items-center space-y-1.5">
              <Text>Cta Section</Text>
              <MiniLine className="w-16" />
            </div>
            <div className="flex items-center space-x-2">
              <MiniLine size="xl" className="w-12" />
            </div>
          </div>
        </CardPreviewShell>
      </div>
    </PreviewShell>
  )
}

export function FaqCategoryPreview(props: BlockCategoryPreviewProps) {
  return (
    <PreviewShell {...props}>
      <div className="absolute inset-0 flex items-center justify-center p-3 xl:p-4 2xl:p-5 overflow-hidden">
        <CardPreviewShell className="w-full max-w-80 sm:max-w-full overflow-hidden">
          <div className="flex flex-col items-center justify-center w-full py-3 px-4 gap-2">
            <Text>Faq Section</Text>
            <div className="flex flex-col items-center space-y-1.5 w-full">
              {[0, 1, 2].map((column) => (
                <div key={column} className="flex items-center justify-between w-full px-2 py-0.5 rounded-md text-muted-foreground/60 border border-muted-foreground/10">
                  <MiniLine size="sm" className="w-1/2" />
                  <ChevronDown size={14} />
                </div>
              ))}
            </div>
          </div>
        </CardPreviewShell>
      </div>
    </PreviewShell>
  )
}

export function FooterCategoryPreview(props: BlockCategoryPreviewProps) {
  return (
    <PreviewShell {...props}>
      <div className="flex flex-1 items-center overflow-hidden">
        <div className="flex flex-col w-full min-w-0 justify-center items-center gap-2">
          <Text className="mx-auto">Footer</Text>
          <CardPreviewShell className="w-full max-w-80 sm:max-w-full grid grid-cols-4 gap-1.5 rounded-md p-3 overflow-hidden">
            <div className="col-span-1 space-y-2 min-w-0">
              <MiniLine className="w-full max-w-12" />
              <MiniLine className="w-4/5 max-w-10" />
            </div>
            {[0, 1, 2].map((column) => (
              <div key={column} className="space-y-1.5 min-w-0 overflow-hidden">
                <MiniLine size="xs" className="w-full max-w-8 bg-foreground/25" />
                <MiniLine className="w-4/5 max-w-12" />
                <MiniLine className="w-full max-w-8" />
              </div>
            ))}
          </CardPreviewShell>
        </div>
      </div>
    </PreviewShell>
  )
}

export function HeroCategoryPreview(props: BlockCategoryPreviewProps) {
  return (
    <PreviewShell {...props}>
      <div className="w-full max-w-lg mx-auto grid flex-1 grid-cols-[1.1fr_0.9fr] items-center gap-3">
        <div className="space-y-2">
          <MiniLine size="md" className="w-20" />
          <MiniLine size="lg" className="w-full" />
          <MiniLine size="lg" className="w-3/4" />
          <MiniLine size="xl" className="mt-4 w-18" />
        </div>
        <div className="relative aspect-square rounded-md bg-muted-foreground/15 dark:bg-muted/50" />
      </div>
    </PreviewShell>
  )
}

export function LoginCategoryPreview(props: BlockCategoryPreviewProps) {
  return (
    <PreviewShell {...props}>
      <div className="w-full max-w-lg mx-auto flex flex-1 items-center">
        <div className="grid flex-1 grid-cols-[1.1fr_0.9fr] items-center gap-3">
          <div className="flex flex-col space-y-2">
            <Text>Login</Text>
            <div className="flex items-center px-2 h-6 w-full rounded-md border">
              <MiniLine size="xs" className="w-20" />
            </div>
            <div className="flex items-center px-2 h-6 w-full rounded-md border">
              <span className="text-muted-foreground/25">{"••••••••••••"}</span>
            </div>
            <MiniLine size="xl" className="mt-1 w-18" />
          </div>
          <div className="relative aspect-square rounded-md bg-muted-foreground/15 dark:bg-muted/50" />
        </div>
      </div>
    </PreviewShell>
  )
}

export function SidebarCategoryPreview(props: BlockCategoryPreviewProps) {
  return (
    <PreviewShell {...props}>
      <div className="flex flex-1 px-4 items-center">
        <CardPreviewShell className="flex w-full max-w-80 sm:max-w-full h-full max-h-48 sm:max-h-full mx-4">
          <div className="relative w-20 sm:w-16 bg-muted/50" />
        </CardPreviewShell>
      </div>
    </PreviewShell>
  )
}

export function SocialProofCategoryPreview(props: BlockCategoryPreviewProps) {
  return (
    <PreviewShell {...props}>
      <div className="flex flex-1 flex-col justify-center gap-3">
        <div className="flex flex-col w-full justify-center items-center gap-2">
          <Text className="mx-auto">Social Proof</Text>
          <div className="mx-auto grid w-full max-w-xs grid-cols-4 gap-1.5">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((column) => (
              <div
                key={column}
                className="h-10 rounded-md bg-muted-foreground/15 dark:bg-muted/50"
              />
            ))}
          </div>
        </div>
      </div>
    </PreviewShell>
  )
}

export function GenericCategoryPreview(props: BlockCategoryPreviewProps) {
  return (
    <PreviewShell {...props}>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {[0, 1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="rounded-md border border-border bg-muted/60 p-2">
            <MiniLine className="mb-2 w-8 bg-foreground/25" />
            <MiniLine className="w-full" />
          </div>
        ))}
      </div>
    </PreviewShell>
  )
}
