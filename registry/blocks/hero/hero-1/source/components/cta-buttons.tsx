import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTAButtons() {
    return (
        <div className="flex w-full max-w-sm flex-row items-stretch justify-center gap-3 md:max-w-none md:items-center md:gap-4">
            <Button size="lg" className="h-11 md:h-12 rounded-4xl px-8 text-sm md:text-base">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="h-11 md:h-12 rounded-4xl px-8 text-sm md:text-base">
                Get a Demo
            </Button>
        </div>
    )
}
