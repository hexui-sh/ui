import { Sparkles } from "lucide-react"
import { WaitlistForm } from "./waitlist-form"

export function AppHero() {
    return (
        <section className="relative flex w-full pt-20 justify-center">
            <div className="mx-auto flex flex-col items-center gap-14 text-center">
                <div className="flex max-w-2xl flex-col items-center gap-4">
                    <div className="inline-flex items-center gap-2 rounded-4xl bg-accent px-4 py-1 text-xs text-accent-foreground/80 lg:text-sm">
                        <Sparkles className="size-3 sm:size-3.5" />
                        New: Private Beta Open
                    </div>

                    <h1 className="text-balance text-3xl md:text-4xl xl:text-5xl font-semibold tracking-tight text-foreground">
                        Automate Your Workflow Ship Faster Than Ever
                    </h1>

                    <p className="mx-auto max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base xl:text-lg">
                        Everything your team needs in one organized workspace.
                    </p>

                    <WaitlistForm />
                </div>

                <div className="bg-accent rounded-lg px-2 pt-2 md:px-4 md:pt-4 xl:px-10 xl:pt-10">
                    <img
                        src="/demo/screenshots/dashboard.png"
                        alt="Dashboard preview"
                        width={1200}
                        height={800}
                        className="h-full w-full rounded-md rounded-b-xs"
                    />
                </div>
            </div>
        </section>
    )
}
