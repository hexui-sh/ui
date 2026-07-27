import type { ComponentProps } from "react"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function Steps({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "my-8 ml-3 space-y-0 border-l border-neutral-200 dark:border-neutral-800",
        className
      )}
      {...props}
    />
  )
}

export function Step({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative pb-8 pl-7 last:pb-0 before:absolute before:-left-1.5 before:top-2 before:size-3 before:rounded-full before:bg-neutral-300 before:ring-4 before:ring-neutral-50 dark:before:bg-neutral-700 dark:before:ring-neutral-950",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function Cards({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("my-8 grid gap-4 sm:grid-cols-2", className)}
      {...props}
    />
  )
}

export function MdxCard({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: React.ReactNode
}) {
  return (
    <Card className="gap-0 bg-white dark:bg-neutral-900">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? (
          <CardDescription className="text-pretty leading-6">
            {description}
          </CardDescription>
        ) : null}
      </CardHeader>
      {children ? <CardContent className="mt-4">{children}</CardContent> : null}
    </Card>
  )
}

export function MdxImage({
  alt,
  className,
  height = 630,
  width = 1200,
  ...props
}: Omit<ComponentProps<typeof Image>, "alt"> & { alt?: string }) {
  return (
    <Image
      alt={alt ?? ""}
      className={cn(
        "my-8 h-auto w-full rounded-md outline -outline-offset-1 outline-black/10 dark:outline-white/10",
        className
      )}
      height={height}
      width={width}
      sizes="(min-width: 768px) 768px, 100vw"
      {...props}
    />
  )
}
