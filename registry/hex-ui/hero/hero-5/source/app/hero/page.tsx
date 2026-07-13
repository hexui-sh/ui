import { SiteHeader } from "../../components/site-header"
import { SiteHero } from "../../components/site-hero"

export default function Page() {
    return (
        <div className="flex px-6 pb-4 w-full mx-auto max-w-380 min-h-screen flex-col items-center">
            <SiteHeader />
            <SiteHero />
        </div>
    )
}
