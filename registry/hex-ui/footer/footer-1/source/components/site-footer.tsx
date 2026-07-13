import Link from "next/link"
import { Command } from "lucide-react"

import { SubscribeForm } from "./subscribe-form"
import { NavLinks } from "./nav-links"

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

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:pb-16 md:pt-12">
        <div className="flex flex-col gap-8 sm:gap-12 xl:flex-row">
          <div className="space-y-6 xl:w-1/3 xl:max-w-sm">
            <Link
              href="#"
              className="flex items-center gap-2 rounded outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <Command />
              <span className="text-xl font-semibold text-foreground">
                Acme Inc.
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Streamline workflows, ship faster, and stay ahead with AI.
            </p>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p>Subscribe to our newsletter:</p>
              <SubscribeForm />
            </div>
          </div>

          <NavLinks sections={footerSections} />
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-border pt-8 md:flex-row md:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Acme Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="rounded text-xs text-muted-foreground transition-colors hover:text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Sitemap
            </Link>
            <Link
              href="#"
              className="rounded text-xs text-muted-foreground transition-colors hover:text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
