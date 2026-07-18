"use client";

import Image from "next/image";

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
            <div className="grid grid-cols-2 md:grid-cols-4 w-full">
                {logos.map((logo, index) => (
                    <div
                        key={logo.alt}
                        className="logo-item flex items-center justify-center w-full aspect-video"
                        // Stagger each logo's reveal by 120ms so they cascade in.
                        style={{ animationDelay: `${index * 120}ms` }}
                    >
                        <div className="flex items-center justify-center relative w-28 md:w-26 lg:w-30 aspect-video">
                            {/* Invert logos in light mode only; assumes SVGs are white-on-transparent. */}
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                fill
                                loading="eager"
                                className="object-contain opacity-80 not-dark:invert-100"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Scoped reveal animation: each logo fades/blurs in with a staggered delay,
                disabled under prefers-reduced-motion. */}
            <style jsx>{`
                .logo-item {
                    opacity: 0;
                    filter: blur(12px);
                    transform: translateY(8px);
                    animation: logo-reveal 0.8s ease-out forwards;
                    will-change: opacity, filter, transform;
                }

                @keyframes logo-reveal {
                    from {
                        opacity: 0;
                        filter: blur(12px);
                        transform: translateY(-8px);
                    }

                    to {
                        opacity: 1;
                        filter: blur(0);
                        transform: translateY(0);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .logo-item {
                        opacity: 1;
                        filter: blur(0);
                        transform: translateY(0);
                        animation: none;
                        will-change: auto;
                    }
                }
            `}</style>
        </div>
    )
}
