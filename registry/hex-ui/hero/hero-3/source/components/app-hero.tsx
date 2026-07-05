import Image from "next/image"
import { Sparkles } from "lucide-react"
import { WaitlistForm } from "./waitlist-form"

export function AppHero() {
    return (
        <section className="relative flex w-full pt-16 justify-center">
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.4fr] items-center gap-14 mx-auto w-full h-full text-center xl:text-left">
                <div className="flex flex-col items-center xl:items-start text-left pb-8 gap-3 md:gap-4 xl:gap-5">
                    <p className="flex items-center gap-2 rounded-4xl bg-accent/50 px-4 py-1 text-sm text-muted-foreground">
                        <Sparkles size={14} />
                        Early access waitlist
                    </p>

                    <h1 className="text-balance text-3xl md:text-4xl xl:text-5xl font-semibold tracking-tight text-foreground">
                        Plan smarter. Ship faster.
                    </h1>

                    <p className="mx-auto max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base xl:text-lg">
                        Everything your team needs in one organized workspace.
                    </p>

                    {/* Waitlist Form */}
                    <div className="mt-2">
                        <WaitlistForm />
                    </div>
                </div>

                <Image
                    src="/demo/mockups/app-hand-hero.png"
                    alt="Background"
                    width={864}
                    height={1080}
                    unoptimized
                    className="h-200 rounded-4xl border-2 border-border object-cover"
                />
            </div>
        </section>
    )
}
