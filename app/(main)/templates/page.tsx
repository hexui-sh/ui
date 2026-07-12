import type { Metadata } from "next"
import Link from "next/link"
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo"
import { JsonLd } from "@/components/json-ld"

export const metadata: Metadata = pageMetadata({
    title: "Templates",
    description:
        "Hex UI templates are coming soon. Browse the free open-source UI blocks available now, and stay tuned for premium React, Next.js, and Tailwind CSS templates.",
    path: "/templates",
});

export default function TemplatePage() {
    return (
        <div className="w-full h-full flex flex-col gap-1 items-center justify-center">
            <JsonLd
                data={breadcrumbJsonLd([
                    { name: "Home", path: "/" },
                    { name: "Templates", path: "/templates" },
                ])}
            />
            <h1 className="text-2xl font-bold">Sorry, templates are not available yet 🙇‍♂️</h1>
            <p className="text-neutral-700 dark:text-neutral-300">
                Please stay tuned to{" "}
                <Link href="https://x.com/ri0n_dev" className="underline" target="_blank" rel="noopener noreferrer">
                    ri0n_dev&apos;s X account
                </Link>{" "}
                for further updates. In the meantime, you can{" "}
                <Link href="/blocks" className="underline">
                    browse the free blocks
                </Link>
                .
            </p>
        </div>
    )
}
