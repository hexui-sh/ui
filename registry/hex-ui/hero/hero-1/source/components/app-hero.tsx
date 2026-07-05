import { Command } from "lucide-react"
import { CTAButtons } from "./cta-buttons"
import { SocialProof } from "./social-proof"

export function AppHero() {
    return (
        <section className="relative flex w-full justify-center pt-20">
            <div className="z-10 mx-auto flex max-w-5xl flex-col items-center gap-10 text-center">
                {/* Logo */}
                <Command className="h-8 w-8 md:h-10 md:w-10" />

                <div className="flex max-w-3xl flex-col gap-3 md:gap-4">
                    {/* Main Heading */}
                    <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                        Automate Your Workflow
                        Ship Faster Than Ever
                    </h1>

                    {/* Description */}
                    <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                        Build systems that grow with your company, automate critical operations, and maintain speed and reliability even as demand increases.
                    </p>
                </div>

                {/* CTA Buttons */}
                <CTAButtons />

                {/* Social Proof */}
                <SocialProof />
            </div>
        </section>
    )
}
