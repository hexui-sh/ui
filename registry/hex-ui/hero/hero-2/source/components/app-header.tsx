import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Command, Menu } from "lucide-react"

const NAV_ITEMS = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#blog", label: "Blog" },
]

export function AppHeader() {
    return (
        <header className="w-full">
            <div className="mx-auto flex w-full items-center justify-between">
                <div className="flex gap-6">
                    <Link href="#" className="flex items-center gap-2 text-foreground">
                        <Command className="size-5" />
                        <span className="text-base font-semibold tracking-tight">Acme Inc.</span>
                    </Link>

                    <nav className="hidden items-center gap-6 md:flex">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex items-center gap-1 md:gap-2">
                    <Button className="rounded-4xl p-4">
                        Get Started
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-4xl md:hidden" aria-label="Open menu">
                        <Menu className="size-5" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
