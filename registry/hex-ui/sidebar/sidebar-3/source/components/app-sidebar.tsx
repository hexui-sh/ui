"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import {
    Search,
    SquarePen,
    Telescope,
    GalleryVerticalEnd,
    X,
} from "lucide-react"
import { AppBrand } from "./app-brand"
import { NavHeader } from "./nav-header"
import { NavRecents } from "./nav-recents"
import { NavUser } from "./nav-user"

const data = {
    user: {
        name: "Rion",
        email: "m@example.com",
        avatar: "https://avatars.githubusercontent.com/u/114809507",
    },
    navMain: [
        {
            title: "New chat",
            url: "#",
            icon: SquarePen,
            isActive: true,
        },
        {
            title: "Search chat",
            url: "#",
            icon: Search,
        },
        {
            title: "Projects",
            url: "#",
            icon: GalleryVerticalEnd,
        },
        {
            title: "Deep research",
            url: "#",
            icon: Telescope,
        },
    ],
}

const conversationItems = [
    { title: "Q2 growth strategy brainstorm", url: "#" },
    { title: "Landing page copy ideas", url: "#" },
    { title: "Summarize customer interview notes", url: "#" },
    { title: "Create a launch checklist", url: "#" },
    { title: "Refactor sidebar animation", url: "#" },
    { title: "Write onboarding email sequence", url: "#" },
    { title: "Design a pricing page structure", url: "#" },
    { title: "Research competitors in AI tooling", url: "#" },
    { title: "Generate social post variations", url: "#" },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="gap-3">
                <SidebarHeaderContent />
                <NavHeader items={data.navMain} />
            </SidebarHeader>

            <SidebarContent className="px-2 py-3">
                <NavRecents items={conversationItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}

function SidebarHeaderContent() {
    const { isMobile, setOpenMobile, state, toggleSidebar } = useSidebar()
    const isCollapsed = state === "collapsed"

    if (isMobile) {
        return (
            <div className="flex h-8 items-center justify-between gap-2">
                <AppBrand className="ml-1 size-5" />

                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground"
                    onClick={() => setOpenMobile(false)}
                    aria-label="Close sidebar"
                >
                    <X className="size-4" />
                </Button>
            </div>
        )
    }

    if (isCollapsed) {
        return (
            <div className="flex h-8 items-center justify-center">
                <button
                    type="button"
                    className="group flex size-8 items-center justify-center transition-colors"
                    onClick={() => toggleSidebar()}
                    aria-label="Expand sidebar"
                >
                    <div className="relative flex size-8 items-center justify-center">
                        <AppBrand className="transition-opacity group-hover:opacity-0" size={20} />
                        <SidebarTrigger className="absolute size-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                </button>
            </div>
        )
    }

    return (
        <div className="flex h-8 items-center justify-between gap-2">
            <div className="flex items-center gap-2">
                <AppBrand className="ml-1 size-5" />
            </div>

            <>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="text-muted-foreground md:hidden"
                    onClick={() => toggleSidebar()}
                    aria-label="Collapse sidebar"
                >
                    <X className="size-4" />
                </Button>

                <SidebarTrigger className="hidden text-muted-foreground md:flex" />
            </>
        </div>
    )
}
