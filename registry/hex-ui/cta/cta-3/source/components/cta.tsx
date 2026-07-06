import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Cta() {
  return (
    <section aria-labelledby="cta-heading" className="relative w-full">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border">
        <div className="relative z-10 grid min-h-120 items-center gap-8 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-0">
          <div className="mx-auto max-w-xl px-6 text-center sm:px-8 lg:mx-0 lg:pl-14 lg:text-left">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/50 px-3 py-1 text-xs text-muted-foreground sm:px-4 sm:py-1.5 lg:text-sm">
              <Sparkles className="size-3.5" />
              New Feature
            </p>
            <h2
              id="cta-heading"
              className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl"
            >
              Ready to get started?
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg lg:text-xl">
              Empower your team to create at the speed of thought. Ship faster,
              iterate smarter, and scale effortlessly.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <Button
                size="lg"
                className="h-11 rounded-full px-5 text-sm font-semibold sm:px-8 sm:text-base"
              >
                Download App
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
          <div className="relative h-64 w-full self-stretch lg:h-full">
            <Image
              src="/demo/devices/homescreen_zoom_top.png"
              alt="App preview on a mobile phone"
              fill
              className="object-contain object-center lg:object-bottom-right lg:translate-x-10 drop-shadow-2xl"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
