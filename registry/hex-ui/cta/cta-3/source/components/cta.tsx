import Image from "next/image"
import { ArrowDownToLine, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Cta() {
  return (
    <section aria-labelledby="cta-heading" className="relative w-full">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border">
        <div className="relative z-10 grid min-h-120 items-center gap-8 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:pt-0">
          <div className="mx-auto max-w-xl px-6 text-center sm:px-8 lg:mx-0 lg:pl-14 lg:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-4xl bg-accent px-4 py-1 text-xs text-accent-foreground lg:text-sm">
              <Sparkles className="size-3 sm:size-3.5" />
              <span>New Feature</span>
            </div>
            <h2
              id="cta-heading"
              className="text-balance text-2xl font-bold text-foreground md:text-3xl xl:text-4xl"
            >
              Ready to get started?
            </h2>
            <p className="mt-4 text-pretty text-sm text-muted-foreground md:text-base xl:text-lg">
              Empower your team to create at the speed of thought. Ship faster,
              iterate smarter, and scale effortlessly.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <Button
                size="lg"
                className="h-11 rounded-full px-5 text-sm font-semibold sm:px-8 sm:text-base"
              >
                Download App
                <ArrowDownToLine className="ml-2" />
              </Button>
            </div>
          </div>
          <div className="relative h-64 w-full self-stretch lg:h-full">
            {/* `priority` preloads this image (it's the LCP element on this section);
               `sizes` lets Next pick an appropriately sized srcset per viewport. */}
            <Image
              src="/demo/devices/homescreen_zoom_top.png"
              alt="App preview on a mobile phone"
              fill
              className="object-contain object-center lg:object-bottom-right lg:translate-x-10 drop-shadow-2xl outline-1 outline-black/10 dark:outline-white/10"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
