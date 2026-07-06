import { Banner } from "../../components/ui/banner"

export default function Page() {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center">
      <Banner>
        <span className="font-semibold">Developer tools</span>
        <span className="hidden sm:inline"> for building faster interfaces.</span>
        <span className="sm:hidden"> · Faster UI workflows</span>
        <a href="#" className="ml-1 font-medium underline underline-offset-4">
          Explore
        </a>
      </Banner>
    </div>
  )
}
