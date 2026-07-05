import Link from "next/link"
import { Command } from "lucide-react"
import { NavLinks } from "./nav-links"
import Typographic from "./typographic-approach"

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
            <div className="flex flex-col gap-6 mx-auto max-w-7xl px-6 pt-8 xl:pt-12 md:px-8">
                <div className="w-full flex items-start justify-between gap-8 sm:gap-12">
                    <NavLinks sections={footerSections} />

                    <Link href="#" className="flex items-center gap-2">
                        <Command />
                    </Link>
                </div>

                <div className="w-full h-full text-shadow text-black/90 dark:text-white/90">
                    <Typographic />
                </div>
            </div>
        </footer>
    )
}
