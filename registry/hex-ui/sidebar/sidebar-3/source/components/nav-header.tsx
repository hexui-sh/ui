"use client"

import React from "react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export type NavigationItem = {
    title: string
    url: string
    icon: React.ElementType
    isActive?: boolean
}

type SidebarHeaderMenuProps = {
    items: NavigationItem[]
}

function NavHeaderContent({ items }: SidebarHeaderMenuProps) {
    return (
        <SidebarMenu className="gap-0.5">
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={item.isActive} tooltip={item.title}>
                        <a href={item.url}>
                            <item.icon className="size-4 shrink-0" />
                            <span className="shrink-0 w-max whitespace-nowrap transition-opacity duration-200 ease-linear delay-100 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:delay-0">
                                {item.title}
                            </span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}

export const NavHeader = React.memo(NavHeaderContent)
