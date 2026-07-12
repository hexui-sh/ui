import { Button } from "@/components/ui/button"
import { ArrowRight, Blocks } from "lucide-react"

export function AppHero() {
    return (
        <section className="relative flex h-screen w-full items-end justify-start">
            <div className="relative max-w-xl z-10 flex flex-col items-start gap-6 pb-24 text-left">
                <h1 className="text-balance text-3xl md:text-4xl xl:text-5xl font-semibold tracking-tight text-foreground">
                    The Fastest Way to Get Things Done
                </h1>

                <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base xl:text-lg">
                    Build faster with modular tools, reusable components, and a flexible system that adapts to your workflow — from quick experiments to production-ready projects.
                </p>

                <Button size="lg" className="mt-2 h-11 md:h-12 rounded-4xl px-8 text-sm md:text-base">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </section>
    )
}
