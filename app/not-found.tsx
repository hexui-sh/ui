import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="w-full mx-auto mt-30 px-4 flex flex-col items-center justify-center gap-4">
            <Image
                src="/assets/404-computer.png"
                alt="404"
                width={280}
                height={280}
                className="mx-auto invert-80 dark:invert-0 drop-shadow-2xl select-none pointer-events-none"
                draggable={false}
            />

            <h1 className="text-2xl xl:text-3xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">
                404 Not Found
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
                The page you are looking for does not exist.
            </p>
            <Button size="lg" className="rounded-4xl mt-4">
                <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft />
                    Go back home
                </Link>
            </Button>
        </div>
    )
}