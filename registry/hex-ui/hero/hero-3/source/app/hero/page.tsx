import { AppHeader } from "../../components/app-header"
import { AppHero } from "../../components/app-hero"

export default function Page() {
    return (
        <div className="flex px-6 py-4 w-full mx-auto max-w-7xl min-h-screen flex-col items-center">
            <AppHeader />
            <AppHero />
        </div>
    )
}