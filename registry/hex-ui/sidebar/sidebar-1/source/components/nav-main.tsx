import { type LucideIcon } from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

export type NavMainItem = {
    title: string
    url: string
    isActive?: boolean
    icon?: LucideIcon
    emoji?: string
}

export function NavMain({ items }: { items: NavMainItem[] }) {
    return (
        <SidebarGroup className="p-0">
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
        </SidebarGroup>
    )
}
