import HeroSection from "./_components/hero";
import Blocks from "./_components/blocks";
import { SiteFooter } from "@/components/site-footer";

export default function HomePage() {
  return (
    <div className="mt-24 flex w-full flex-col gap-14 md:mt-36">
      <HeroSection />
      <Blocks />
      <SiteFooter />
    </div>
  );
}
