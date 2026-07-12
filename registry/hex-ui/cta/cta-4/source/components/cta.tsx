import { type ReactNode } from "react"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const features = [
  "Organize notes, tasks, and projects in one place",
  "Real-time collaboration with your team",
  "Customizable blocks for any workflow",
  "Powerful search and instant access to information",
]

function CtaCard({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-start justify-center bg-card/90 px-6 py-10 sm:px-8 md:px-10 md:py-14",
        className
      )}
    >
      {children}
    </div>
  )
}

export function Cta() {
  return (
    <section aria-labelledby="cta-heading" className="relative w-full">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-2 md:gap-4 lg:grid-cols-3">
        <CtaCard className="gap-4 lg:col-span-2 lg:gap-6">
          <h2 className="text-3xl font-medium leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Everything you need
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            to get work done
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl">
            Bring your notes, tasks, and projects together in a single workspace.
            Plan, write, and collaborate without switching tools.
          </p>
          <div className="mt-6 flex items-center justify-start gap-4 md:mt-8">
            <Button
              size="lg"
              className="h-11 rounded-4xl px-6 text-sm md:text-base"
            >
              Get Started
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </CtaCard>
        <CtaCard>
          <div className="mb-8 flex flex-col gap-1 md:mb-10">
            <p className="text-2xl font-medium sm:text-3xl md:text-5xl">
              One Workspace
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-widest text-muted-foreground md:mt-2 md:text-sm">
              FOR YOUR TEAM &amp; IDEAS
            </p>
          </div>
          <ul className="space-y-3 md:space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check
                  className="mt-1 size-5 shrink-0 text-emerald-400 md:size-6"
                  aria-hidden="true"
                />
                <p className="text-sm text-accent-foreground sm:text-base">
                  {feature}
                </p>
              </li>
            ))}
          </ul>
        </CtaCard>
      </div>
    </section>
  )
}
