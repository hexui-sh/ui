import { Banner } from "../../components/ui/banner"

export default function Page() {
    return (
        <div className="flex w-full mx-auto min-h-screen flex-col items-center">
            <Banner>
                <span className="font-semibold">Developer tools</span>
                <span className="hidden sm:inline"> for building faster interfaces.</span>
                <span className="sm:hidden"> · Faster UI workflows</span>

                <a href="#" className="font-medium underline underline-offset-4 ml-1">
                    Explore
                </a>
            </Banner>
        </div>
    )
}
