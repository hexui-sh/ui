"use client"

import { usePathname, useRouter } from "next/navigation"

export function ReturnButton() {
    const router = useRouter()
    const pathname = usePathname()

    const handleReturn = () => {
        const segments = pathname.split("/").filter(Boolean)
        const parentPath =
            segments.length > 1 ? `/${segments.slice(0, -1).join("/")}` : "/"

        router.push(parentPath)
    }

    return (
        <p onClick={handleReturn} className="cursor-pointer mb-3 text-xl">←</p>
    )
}