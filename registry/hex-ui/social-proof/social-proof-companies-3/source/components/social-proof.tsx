import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

// Logos registry
const logos = [
    { src: "/demo/logos/cursor.svg", alt: "Cursor logo" },
    { src: "/demo/logos/discord.svg", alt: "Discord logo" },
    { src: "/demo/logos/framer.svg", alt: "Framer logo" },
    { src: "/demo/logos/polar.svg", alt: "Polar logo" },
    { src: "/demo/logos/google.svg", alt: "Google logo" },
    { src: "/demo/logos/linear.svg", alt: "Linear logo" },
    { src: "/demo/logos/netflix.svg", alt: "Netflix logo" },
    { src: "/demo/logos/openai.svg", alt: "OpenAI logo" },
];

export function SocialProof() {
    return (
        <div className="mx-auto flex min-h-dvh w-full max-w-sm flex-col items-center justify-center px-4 md:max-w-3xl">
            {/* Description */}
            <div className="flex flex-col">
                <p className="text-center text-sm md:text-base text-muted-foreground">LOGO WALL</p>
                <p className="text-center text-xs md:text-sm text-muted-foreground">Some logos are for illustrative purposes only.</p>
            </div>

            {/* Logos */}
            {/* On hover the logos recede (scale down, blur, fade) and the "Meet our customers"
                link fades in. Logos are inverted in light mode (white-on-transparent SVGs). */}
            <div className="group relative grid grid-cols-2 md:grid-cols-4 w-full">
                {logos.map((logo) => (
                    <div
                        key={logo.alt}
                        className="logo-item flex items-center justify-center w-full aspect-video"
                    >
                        <div className="flex items-center justify-center relative w-28 md:w-26 lg:w-30 aspect-video transition-all duration-400 group-hover:scale-90">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                fill
                                loading="eager"
                                className="object-contain opacity-80 transition-all duration-300 group-hover:blur-[2px] group-hover:opacity-50 not-dark:invert-100"
                            />
                        </div>
                    </div>
                ))}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <Link href="#" className="cursor-pointer pointer-events-auto">
                        <span className="flex items-center gap-1 translate-y-2 opacity-0 text-shadow-xs text-sm xl:text-base font-semibold tracking-wide transition-all duration-500 ease-out hover:text-muted-foreground group-hover:translate-y-0 group-hover:opacity-100">
                            Meet our customers <ArrowUpRight size={16} />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}