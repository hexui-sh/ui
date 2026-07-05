import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarRail,
} from "@/components/ui/sidebar"
import { SidebarCollapsibleMenuItem } from "@/components/sidebar-collapsible-menu-item"

type NavigationItem = {
  title: string
  url: string
  count?: number
}

type NavigationGroup = {
  title: string
  items: NavigationItem[]
}

type SidebarNavigationCollapsibleProps = {
  navMain: NavigationGroup[]
}

export function SidebarNavigationCollapsible({
  navMain,
}: SidebarNavigationCollapsibleProps) {
  return (
    <div className="hidden w-(--sidebar-width) shrink-0 md:block">
      <Sidebar collapsible="none" className="fixed top-14 h-[calc(100svh-3.5rem)] lg:top-16 lg:h-[calc(100svh-4rem)]">
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navMain.map((item, index) => (
                <SidebarCollapsibleMenuItem
                  key={item.title}
                  title={item.title}
                  items={item.items}
                  defaultOpen={index === 0}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </div>
  )
}
