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

export type NavRecentsItem = {
    title: string
    url: string
    isActive?: boolean
    icon?: LucideIcon
    emoji?: string
}

export function NavRecents({ items }: { items: NavRecentsItem[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel className="gap-1.5">
                Recents
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton isActive={subItem.isActive}>
                                <a href={subItem.url}>
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
                <SidebarMenuButton className="text-sidebar-foreground/70" aria-label="More recents">
                    <MoreHorizontal aria-hidden="true" />
                    <span>More</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarGroup>
    )
}
