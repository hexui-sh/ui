import {
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Minus, Plus } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type NavigationItem = {
  title: string
  url: string
  count?: number
}

type SidebarCollapsibleMenuItemProps = {
  title: string
  items: NavigationItem[]
  defaultOpen?: boolean
}

export function SidebarCollapsibleMenuItem({
  title,
  items,
  defaultOpen = false,
}: SidebarCollapsibleMenuItemProps) {
  return (
    <SidebarMenuItem key={title}>
      <details className="group/collapsible" open={defaultOpen}>
        <summary
          data-slot="sidebar-menu-button"
          data-sidebar="menu-button"
          data-size="default"
          data-active={false}
          className={cn(
            "peer/menu-button group/menu-button flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate",
            "cursor-pointer list-none [&::-webkit-details-marker]:hidden"
          )}
        >
          {title}
          <Plus className="ml-auto size-4 group-open/collapsible:hidden" />
          <Minus className="ml-auto hidden size-4 group-open/collapsible:block" />
        </summary>

        {items.length ? (
          <SidebarMenuSub>
            {items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.url}>
                <SidebarMenuSubButton>
                  <Link href={subItem.url}>{subItem.title}</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        ) : null}
      </details>
    </SidebarMenuItem>
  )
}
