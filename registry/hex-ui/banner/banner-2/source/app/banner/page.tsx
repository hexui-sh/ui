import { Banner } from "../../components/ui/banner"

export default function Page() {
    return (
        <div className="flex w-full mx-auto min-h-screen flex-col items-center">
            <Banner>
                <span className="font-semibold">Summer Sale is live</span>
                <span className="hidden sm:inline"> — up to 40% off on all plans.</span>
                <span className="sm:hidden"> · Up to 40% off </span>
                <span className="hidden md:inline"> No code needed.</span>

                <a href="#" className="font-medium underline underline-offset-4 ml-1">
                    Shop now
                </a>
            </Banner>
        </div>
    )
}
