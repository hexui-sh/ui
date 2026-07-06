import { type ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  style,
  ...props
}: MarqueeProps) {
  const fadeMask = vertical
    ? "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)"
    : "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)"

  return (
    <div
      {...props}
      style={{
        ...style,
        maskImage: fadeMask,
        WebkitMaskImage: fadeMask,
      }}
      className={cn(
        "group relative flex gap-(--gap) overflow-hidden [--duration:40s] [--gap:12px]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 justify-around gap-(--gap) motion-reduce:animate-none",
            vertical
              ? "animate-marquee-vertical flex-col"
              : "animate-marquee flex-row",
            reverse && "direction-[reverse]",
            pauseOnHover && "group-hover:paused"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
