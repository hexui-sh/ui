import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Templates",
};

export default function TemplatePage() {
    return (
        <div className="w-full h-full flex flex-col gap-1 items-center justify-center">
            <h1 className="text-2xl font-bold">Sorry, templates are not available yet 🙇‍♂️</h1>
            <p className="text-neutral-700 dark:text-neutral-300">Please stay tuned to <Link href="https://x.com/ri0n_dev" className="underline" target="_blank">ri0n_dev's X account</Link> for further updates.</p>
        </div>
    )
}