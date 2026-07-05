"use client";

import Image from "next/image";

// Logos registry
const logos = [
    { src: "/demo/logos/cursor.svg", alt: "Cursor logo" },
    { src: "/demo/logos/discord.svg", alt: "Discord logo" },
    { src: "/demo/logos/framer.svg", alt: "Framer logo" },
    { src: "/demo/logos/polar.svg", alt: "Polar logo" },
    { src: "/demo/logos/google.svg", alt: "Google logo" },
];

export function SocialProof() {
    return (
        <div className="mx-auto mt-6 flex w-full max-w-3xl flex-col">
            {/* Description */}
            <div className="flex flex-col">
                <p className="text-center text-xs font-medium tracking-[0.2em] text-muted-foreground md:text-sm">
                    TRUSTED BY LEADING TEAMS
                </p>
            </div>

            {/* Logos */}
            <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-3 md:gap-x-0 md:gap-y-0">
                {logos.map((logo) => (
                    <div
                        key={logo.alt}
                        className="flex basis-1/3 items-center justify-center px-2 sm:basis-1/4 md:basis-1/5 md:px-0"
                    >
                        <div className="relative flex aspect-video items-center justify-center w-20 md:w-22 lg:w-24">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                fill
                                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
                                loading="eager"
                                className="object-contain opacity-80 not-dark:invert-100"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
