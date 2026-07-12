import Image from "next/image";
import { Marquee } from '@/components/ui/marquee';

// Logos registry
const logos = [
    { src: "/demo/logos/cursor.svg", alt: "Cursor logo" },
    { src: "/demo/logos/discord.svg", alt: "Discord logo" },
    { src: "/demo/logos/framer.svg", alt: "Framer logo" },
    { src: "/demo/logos/github.svg", alt: "Github logo" },
    { src: "/demo/logos/google.svg", alt: "Google logo" },
    { src: "/demo/logos/tailwind.svg", alt: "Tailwind logo" },
    { src: "/demo/logos/linear.svg", alt: "Linear logo" },
    { src: "/demo/logos/netflix.svg", alt: "Netflix logo" },
    { src: "/demo/logos/openai.svg", alt: "OpenAI logo" },
    { src: "/demo/logos/polar.svg", alt: "Polar logo" },
    { src: "/demo/logos/notion.svg", alt: "Notion logo" },
    { src: "/demo/logos/resend.svg", alt: "Resend logo" },
    { src: "/demo/logos/shopify.svg", alt: "Shopify logo" },
    { src: "/demo/logos/spotify.svg", alt: "Spotify logo" },
    { src: "/demo/logos/supabase.svg", alt: "Supabase logo" },
    { src: "/demo/logos/vercel.svg", alt: "Vercel logo" },
];

export function SocialProof() {
    return (
        <div className="mx-auto flex min-h-dvh w-full max-w-sm flex-col justify-center gap-8 px-4 py-12 md:max-w-3xl">
            {/* Description */}
            <div className="flex flex-col">
                <p className="text-center text-sm md:text-base text-muted-foreground">LOGO MARQUEE</p>
                <p className="text-center text-xs md:text-sm text-muted-foreground">Some logos are for illustrative purposes only.</p>
            </div>

            {/* Logos */}
            <Marquee className="w-full">
                {logos.map((logo) => (
                    <Image
                        key={logo.src}
                        src={logo.src}
                        alt={logo.alt}
                        width={96}
                        height={96}
                        loading="eager"
                        className="mx-4 md:mx-8 h-6 md:h-12 w-24 md:w-30 object-contain opacity-80 not-dark:invert-100 pointer-events-none select-none"
                        unoptimized
                    />
                ))}
            </Marquee>
        </div>
    )
}