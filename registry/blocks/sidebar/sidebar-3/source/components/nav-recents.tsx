import React from "react"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export type ConversationItem = {
    title: string
    url: string
    isActive?: boolean
}

type NavRecentsProps = {
    items: ConversationItem[]
}

function NavRecentsContent({ items }: NavRecentsProps) {
    return (
        // Whole group hides (and ignores pointer events) when the sidebar is icon-only.
        <SidebarGroup className="p-0 transition-opacity duration-200 ease-linear delay-100 group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:delay-0">
            <SidebarGroupLabel className="px-2 delay-100 group-data-[collapsible=icon]:delay-0 group-data-[collapsible=icon]:mt-0!">Recent</SidebarGroupLabel>

            <SidebarGroupContent className="pt-1">
                <SidebarMenu className="gap-0.5">
                    {items.map((item) => (
                        <SidebarMenuItem className="h-8" key={item.title}>
                            <SidebarMenuButton isActive={item.isActive} tooltip={item.title}>
                                <a className="flex items-center gap-2" href={item.url}>
                                    <span className="shrink-0 w-max whitespace-nowrap">{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

// Memoized: the conversation list is static, so we skip re-renders when the sidebar toggles.
export const NavRecents = React.memo(NavRecentsContent)
