import type { Metadata } from "next"
import HeroSection from "./_components/hero"
import Blocks from "./_components/blocks"
import { SiteFooter } from "@/components/site-footer"
import { JsonLd } from "@/components/json-ld"
import { softwareApplicationJsonLd, SITE_URL } from "@/lib/seo"

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
}

export default function HomePage() {
  return (
    <div className="mt-24 flex w-full flex-col gap-14 md:mt-36">
      <JsonLd data={softwareApplicationJsonLd()} />
      <HeroSection />
      <Blocks />
      <SiteFooter />
    </div>
  )
}
