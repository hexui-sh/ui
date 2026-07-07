import { Ellipsis, Star, Pencil, GalleryVerticalEnd, Trash2 } from "lucide-react"
import React from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
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
    const { state } = useSidebar()
    const isCollapsed = state === "collapsed"

    return (
        <SidebarGroup className="p-0 transition-opacity duration-200 ease-linear delay-100 group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:delay-0">
            <SidebarGroupLabel className="px-2 delay-100 group-data-[collapsible=icon]:delay-0 group-data-[collapsible=icon]:!mt-0">Recent</SidebarGroupLabel>

            <SidebarGroupContent className="space-y-1 pt-1">
                <SidebarMenu className="gap-0.5">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton isActive={item.isActive} tooltip={item.title}>
                                <a href={item.url}>
                                    <span className="shrink-0 w-max whitespace-nowrap">{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                            {!isCollapsed && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <SidebarMenuAction
                                            className="mr-1"
                                            showOnHover
                                        >
                                            <Ellipsis className="size-4" />
                                        </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-auto"
                                        side="right"
                                        align="start"
                                        onCloseAutoFocus={(e) => e.preventDefault()}
                                    >
                                        <DropdownMenuItem>
                                            <Star />
                                            <span>Star</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Pencil />
                                            <span>Rename</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <GalleryVerticalEnd />
                                            <span>Add to project</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem variant="destructive">
                                            <Trash2 />
                                            <span>Delete</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

export const NavRecents = React.memo(NavRecentsContent)
