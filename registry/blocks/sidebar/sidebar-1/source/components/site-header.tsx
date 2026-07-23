import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader() {
    return (
        <header className="flex h-12 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex mx-1 h-4.5 w-0.5 bg-neutral-200 dark:bg-neutral-900" />
            Quick Notes
        </header>
    )
}