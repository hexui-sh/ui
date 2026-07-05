"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTheme } from "@/components/theme-provider"

interface CarouselItem {
    id: number
    image: string
    name: string
    description: string
    slug: string
}

interface CardCarouselProps {
    items: CarouselItem[]
    title: string
}

export function CardCarousel({ items, title }: CardCarouselProps) {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const { resolvedTheme } = useTheme()

    const checkScrollability = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
        }
    }

    useEffect(() => {
        checkScrollability()
        window.addEventListener("resize", checkScrollability)
        return () => window.removeEventListener("resize", checkScrollability)
    }, [])

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 320
            const newScrollLeft =
                direction === "left"
                    ? scrollRef.current.scrollLeft - scrollAmount
                    : scrollRef.current.scrollLeft + scrollAmount

            scrollRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth",
            })
        }
    }

    return (
        <div className="relative w-full">
            <div className="flex max-width justify-between items-center mb-1">
                <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">{title}</h2>
                <div className="flex items-center pr-4 gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-background shadow-md disabled:opacity-40 transition-opacity"
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        aria-label="Scroll to previous page"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-background shadow-md disabled:opacity-40 transition-opacity"
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        aria-label="Scroll to next page"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div
                ref={scrollRef}
                onScroll={checkScrollability}
                className="flex gap-3 overflow-x-auto scroll-smooth pl-[max(24px,calc((100vw-1296px)/2))] pr-7 py-4 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {items.map((item) => {
                    const imageSrc = (resolvedTheme === "dark"
                        ? item.image.replace("screenshot.png", "screenshot.dark.png")
                        : item.image).replace(/^@\//, "/")
                    return (
                        <Link key={item.id} href={`/blocks/${item.slug}`}>
                            <Card className="shrink-0 w-90 h-95 border ring-0 overflow-hidden py-0 cursor-pointer">
                                <div className="relative aspect-video h-50 bg-neutral-950 border-b w-full overflow-hidden">
                                    <Image
                                        src={imageSrc}
                                        alt={item.name}
                                        fill
                                        unoptimized
                                        className="object-contain p-3"
                                    />
                                </div>
                                <CardContent className="p-4 pt-2">
                                    <h3 className="font-semibold text-lg text-foreground mb-2">
                                        {item.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {item.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
