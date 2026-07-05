import Link from "next/link"
import { Command } from "lucide-react"
import { NavLinks } from "./nav-links"
import { LanguageSelect } from "./language-select"
import { SocialLinks } from "./social-links"
import { SiX, SiInstagram, SiFacebook, SiGithub, SiBluesky } from "@icons-pack/react-simple-icons"

const SOCIAL_LINKS = [
    { icon: SiX, label: "X" },
    { icon: SiInstagram, label: "Instagram" },
    { icon: SiFacebook, label: "Facebook" },
    { icon: SiGithub, label: "GitHub" },
    { icon: SiBluesky, label: "Bluesky" },
]

const footerSections = [
    {
        title: "Product",
        links: [
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Case Studies", href: "#" },
            { label: "Changelog", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Contact", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Documentation", href: "#" },
            { label: "API Reference", href: "#" },
            { label: "Guides", href: "#" },
            { label: "Support", href: "#" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Terms of Service", href: "#" },
            { label: "Privacy Policy", href: "#" },
            { label: "Cookie Settings", href: "#" },
        ],
    },
]

export function AppFooter() {
    return (
        <footer className="w-full border-t border-border">
            <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:pb-16 md:pt-12">
                <div className="flex flex-col xl:flex-row gap-8 sm:gap-12">
                    <div className="flex flex-col h-full justify-between space-y-6 xl:w-1/4 xl:max-w-sm">
                        <div className="flex flex-col space-y-4">
                            <Link href="#" className="flex items-center gap-2">
                                <Command />
                                <span className="text-xl font-semibold text-foreground">Acme Inc.</span>
                            </Link>

                            <SocialLinks links={SOCIAL_LINKS} />
                        </div>

                        <LanguageSelect />

                        <div className="flex flex-col gap-4">
                            <Link href="#" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                                Cookie Setting
                            </Link>
                            <p className="text-xs text-muted-foreground">
                                &copy; {new Date().getFullYear()} Acme Inc. All rights reserved.
                            </p>
                        </div>
                    </div>

                    <NavLinks sections={footerSections} />
                </div>
            </div>
        </footer>
    )
}
