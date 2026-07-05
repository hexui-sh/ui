import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Cta() {
    return (
        <section aria-labelledby="cta-heading" className="relative w-full">
            <div className="mx-auto max-w-6xl px-6 py-18 border rounded-xl">
                <div className="text-center mx-auto max-w-xl">
                    <h2 id="cta-heading" className="text-2xl md:text-3xl xl:text-4xl font-bold text-foreground">Ready to get started?</h2>
                    <p className="mt-4 text-sm md:text-base xl:text-lg text-muted-foreground">
                        Empower your team to create at the speed of thought. Ship faster, iterate smarter, and scale effortlessly.
                    </p>
                    <div className="mt-8 flex flex-row items-start md:items-center justify-center gap-4">
                        <Button
                            type="button"
                            className="h-10 md:h-11 xl:h-12 px-6 text-sm md:text-base font-medium rounded-4xl bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300 group"
                        >
                            Get Started
                            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="h-10 md:h-11 xl:h-12 px-6 text-sm md:text-base font-medium rounded-4xl border-border bg-transparent text-foreground hover:bg-secondary transition-colors duration-300 group"
                        >
                            Watch Demo
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
