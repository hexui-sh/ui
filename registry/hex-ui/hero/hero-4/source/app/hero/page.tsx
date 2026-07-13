import { SiteHeader } from "../../components/site-header"
import { SiteHero } from "../../components/site-hero"

export default function Page() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background">
            <div className="absolute inset-0 bg-[url('/demo/backgrounds/vintage.png')] bg-cover bg-center opacity-40 dark:bg-[url('/demo/backgrounds/vintage_dark.png')]" />

            <div className="relative z-10 px-8 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center">
                <SiteHeader />
                <SiteHero />
            </div>
        </div>
    )
}
