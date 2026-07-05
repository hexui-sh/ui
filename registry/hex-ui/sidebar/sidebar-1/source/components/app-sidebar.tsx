"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarFooter,
} from "@/components/ui/sidebar"
import {
    Globe,
    Inbox,
    House,
    Search,
    LibraryBig,
    SquarePen,
    Settings,
    Store,
    Trash2,
} from "lucide-react"
import { NavMain, type NavMainItem } from "./nav-main"
import { NavRecents, type NavRecentsItem } from "./nav-recents"
import { NavFavorites, type NavFavoritesItem } from "./nav-favorites"
import { NavPrivate, type NavPrivateItem } from "./nav-private"
import { NavSecondary, type NavSecondaryItem } from "./nav-secondary"
import { WorkSpaceSwitcher } from "./workspaces-switcher"

type WorkspaceItem = React.ComponentProps<typeof WorkSpaceSwitcher>["workspaces"][number]

// This is sample data.
const data = {
    workspaces: [
        {
            name: "Acme Inc",
            plan: "Enterprise",
            logo: Globe,
        },
        {
            name: "Hex Studio",
            plan: "Enterprise",
            logo: Globe,
        },
    ] satisfies WorkspaceItem[],
    navMain: [
        {
            title: "Search",
            url: "#",
            icon: Search,
        },
        {
            title: "Home",
            url: "#",
            icon: House,
        },
        {
            title: "Inbox",
            url: "#",
            icon: Inbox,
        },
        {
            title: "Library",
            url: "#",
            icon: LibraryBig,
        },
    ] satisfies NavMainItem[],
    recents: [
        { title: "Quick Notes", url: "#", emoji: "📝" },
        { title: "Meeting Minutes", url: "#", emoji: "📋" },
        { title: "Ideas", url: "#", emoji: "💡" },
        { title: "Changelog", url: "#", emoji: "📜" },
    ] satisfies NavRecentsItem[],

    private: [
        { title: "Health Tracker", url: "#", emoji: "💪" },
        { title: "Reading List", url: "#", emoji: "📚" },
        { title: "Passwords", url: "#", emoji: "🔐" },
        { title: "Shopping List", url: "#", emoji: "🛒" },
        { title: "Home Tasks", url: "#", emoji: "🏠" },
        { title: "Life Goals", url: "#", emoji: "🎯" },
        { title: "Side Projects", url: "#", emoji: "🛠️" },
        { title: "Ideas Vault", url: "#", emoji: "🏦" },
        { title: "Recipes", url: "#", emoji: "🍳" },
    ] satisfies NavPrivateItem[],

    favorites: [
        { title: "Project Dashboard", url: "#", emoji: "📊" },
        { title: "Design System", url: "#", emoji: "🎨" },
        { title: "Component Library", url: "#", emoji: "🧱" },
        { title: "Development Guide", url: "#", emoji: "👨‍💻" },
        { title: "Team Wiki", url: "#", emoji: "👥" },
        { title: "Product Vision", url: "#", emoji: "🔭" },
        { title: "Launch Checklist", url: "#", emoji: "✅" },
        { title: "User Feedback", url: "#", emoji: "💬" },
        { title: "Analytics", url: "#", emoji: "📈" },
        { title: "Performance Metrics", url: "#", emoji: "⚡" },
        { title: "Security Policy", url: "#", emoji: "🛡️" },
        { title: "Database Schema", url: "#", emoji: "🗄️" },
        { title: "API Keys", url: "#", emoji: "🔑" },
        { title: "Release Notes", url: "#", emoji: "📣" },
        { title: "Support Docs", url: "#", emoji: "📚" },
    ] satisfies NavFavoritesItem[],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: Settings,
        },
        {
            title: "Marketplace",
            url: "#",
            icon: Store,
        },
        {
            title: "Trush",
            url: "#",
            icon: Trash2,
        },
    ] satisfies NavSecondaryItem[],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader className="flex flex-col">
                <div className="flex flex-row w-full justify-between">
                    <WorkSpaceSwitcher workspaces={data.workspaces} />
                    <Button variant="ghost" size="icon" className="ml-auto" aria-label="New page">
                        <SquarePen />
                    </Button>
                </div>
                <NavMain items={data.navMain} />
            </SidebarHeader>
            <SidebarContent>
                <NavRecents items={data.recents} />
                <NavFavorites items={data.favorites} />
                <NavPrivate items={data.private} />
            </SidebarContent>
            <SidebarFooter className="border-t">
                <NavSecondary items={data.navSecondary} />
            </SidebarFooter>
        </Sidebar>
    )
}
