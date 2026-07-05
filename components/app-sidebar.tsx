import { SidebarNavigation } from "@/components/sidebar-navigation"
import { SidebarNavigationCollapsible } from "@/components/sidebar-navigation-collapsible"
import { getUnifiedNavigation } from "@/lib/content"

type AppSidebarProps = {
  variant?: "default" | "collapsible"
}

export async function AppSidebar({ variant = "default" }: AppSidebarProps) {
  const navMain = await getUnifiedNavigation()

  if (variant === "collapsible") {
    return <SidebarNavigationCollapsible navMain={navMain} />
  }

  return <SidebarNavigation navMain={navMain} />
}
