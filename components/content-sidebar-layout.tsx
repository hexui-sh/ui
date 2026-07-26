import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export function ContentSidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <div className="flex min-w-0 flex-1 py-1">
        <AppSidebar />
        <SidebarInset className="min-w-0">
          <div className="flex min-w-0 flex-1 flex-col bg-neutral-50 py-2 dark:bg-neutral-950 md:px-5 md:pr-0">
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
