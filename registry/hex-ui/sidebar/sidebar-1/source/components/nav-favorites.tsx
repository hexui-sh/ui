import {
    MoreHorizontal,
    type LucideIcon,
} from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export type NavFavoritesItem = {
    title: string
    url: string
    isActive?: boolean
    icon?: LucideIcon
    emoji?: string
}

export function NavFavorites({ items }: { items: NavFavoritesItem[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel className="gap-1.5">
                Favorites
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton isActive={subItem.isActive}>
                                <a className="flex items-center gap-2" href={subItem.url}>
                                    {/* Render either a Lucide icon or an emoji glyph (mutually exclusive). */}
                                    {subItem.icon ? <subItem.icon className="size-4" /> : null}
                                    {subItem.emoji ? (
                                        <span aria-hidden="true" className="text-[14px] leading-none">
                                            {subItem.emoji}
                                        </span>
                                    ) : null}
                                    <span>{subItem.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
            <SidebarMenuItem>
                <SidebarMenuButton className="text-sidebar-foreground/70" aria-label="More favorites">
                    <MoreHorizontal aria-hidden="true" />
                    <span>More</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarGroup>
    )
}
