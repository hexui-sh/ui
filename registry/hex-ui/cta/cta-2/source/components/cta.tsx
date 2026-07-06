import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Cta() {
  return (
    <section aria-labelledby="cta-heading" className="relative w-full">
      <div className="mx-auto max-w-6xl rounded-xl border px-6 py-18">
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="cta-heading"
            className="text-2xl font-bold text-foreground md:text-3xl xl:text-4xl"
          >
            Ready to get started?
          </h2>
          <p className="mt-4 text-sm text-muted-foreground md:text-base xl:text-lg">
            Empower your team to create at the speed of thought. Ship faster,
            iterate smarter, and scale effortlessly.
          </p>
          <div className="mt-8 flex items-start justify-center gap-4 md:items-center">
            <Button
              size="lg"
              className="h-11 rounded-4xl px-6 text-sm md:text-base"
            >
              Get Started
              <ArrowRight className="ml-2 transition-transform group-hover/button:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-11 rounded-4xl px-6 text-sm md:text-base"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
