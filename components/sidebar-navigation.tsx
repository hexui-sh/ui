import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

type NavigationItem = {
  title: string
  url: string
  count?: number
}

type NavigationGroup = {
  title: string
  items: NavigationItem[]
}

type SidebarNavigationProps = {
  navMain: NavigationGroup[]
}

export function SidebarNavigation({ navMain }: SidebarNavigationProps) {
  return (
    <div className="hidden w-(--sidebar-width) shrink-0 md:block">
      <Sidebar collapsible="none" className="fixed bg-transparent top-14 h-[calc(100svh-3.5rem)] lg:top-16 lg:h-[calc(100svh-4rem)]">
        <SidebarContent>
          {navMain.map((item) => (
            <SidebarGroup className="pl-0" key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((subItem) => (
                    <SidebarMenuItem key={subItem.url}>
                      <SidebarMenuButton>
                        <Link className="flex w-full items-center justify-between" href={subItem.url}>
                          {subItem.title}
                          {subItem.count !== undefined && (
                            <span className="ml-auto text-xs text-muted-foreground/60">{subItem.count}</span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
      </Sidebar>
    </div>
  )
}
