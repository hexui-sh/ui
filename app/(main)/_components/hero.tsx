import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="w-full mb-6 self-center text-center">
      <div className="flex flex-col w-full max-w-2xl mx-auto gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="mb-4 text-3xl sm:text-4xl xl:text-5xl font-semibold text-neutral-800 dark:text-neutral-200">
            Copy. Customize. Launch.
          </h1>
          <p className="dark:text-neutral-400">
            Check out these beautiful and sophisticated UI blocks and templates.
            You can easily integrate them into your own project using
            copy-and-paste or the Shadcn CLI.
          </p>
        </div>
        <div className="flex flex-row gap-2 justify-center">
          <Link href="/docs/introduction">
            <Button size="lg" className="px-3">
              Get Started
            </Button>
          </Link>
          <Link href="/blocks">
            <Button variant="ghost" size="lg">
              Browse Blocks
            </Button>
          </Link>
        </div>
      </div>

      {/*
        <div className="mt-18 rounded-lg bg-[url('/assets/hexui-wallpaper.png')] bg-cover bg-center px-2 pt-20 md:px-4 md:pt-4 xl:px-12 xl:pt-12">
          <img
            src="/demo/screenshots/dashboard.png"
            alt="Dashboard preview"
            width={1200}
            height={800}
            className="h-full w-full rounded-md rounded-b-xs"
          />
        </div>
        */}
    </div>
  );
}
