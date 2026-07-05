import Link from "next/link";
import { NavLinks } from "./nav-links";
import { FluidGradientText } from "./fluid-gradient-text"

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
];

export function AppFooter() {
  return (
    <footer className="relative w-full overflow-visible pt-32">
      <div
        aria-hidden
        className="absolute inset-x-0 z-0 translate-y-[-62.5%]"
      >
        <FluidGradientText text="Acme" />
      </div>

      <div className="relative z-10 border-t border-border bg-background backdrop-blur-3xl supports-backdrop-filter:bg-background/60">
        <div className="mx-auto max-w-7xl px-6 py-8 md:px-8 md:pb-16 md:pt-12">
          <div className="flex flex-col xl:flex-row gap-8 sm:gap-12">
            <NavLinks sections={footerSections} />
          </div>

          <div className="mt-8 border-t border-border pt-8">
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
              <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Acme Inc. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Sitemap
                </Link>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Cookie
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
