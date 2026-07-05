import { Button } from "@/components/ui/button"

export function AppHero() {
    return (
        <section className="relative flex w-full h-160 mt-1 py-20 bg-accent/40 rounded-4xl justify-center">
            <div className="z-2 mx-auto flex flex-col items-center gap-14 text-center">
                <div className="flex h-full max-w-xl md:max-w-2xl xl:max-w-4xl flex-col justify-center items-center gap-4">
                    <h1 className="text-balance text-3xl md:text-4xl xl:text-5xl font-semibold tracking-tight text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">
                        Automate Your Workflow Ship Faster Than Ever
                    </h1>

                    <p className="max-w-2xl text-pretty text-sm leading-relaxed text-neutral-100 [text-shadow:0_2px_12px_rgba(0,0,0,0.5)] md:text-base xl:text-lg">
                        Build systems that grow with your company, automate critical operations, and maintain speed and reliability even as demand increases.
                    </p>

                    <Button size="lg" className="flex items-center h-11 md:h-12 rounded-3xl px-8 text-sm shadow-xl transition-background md:text-base text-neutral-900 bg-neutral-100 hover:bg-white">
                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <title>Apple</title><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                        </svg>
                        Download for Mac
                    </Button>
                </div>
            </div>

            <div className="z-1 absolute inset-0 rounded-4xl overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-[url('/demo/backgrounds/nature.png')] bg-cover bg-center" />

                {/* Black overlay */}
                <div className="absolute inset-0 bg-black/40" />
            </div>
        </section>
    )
}