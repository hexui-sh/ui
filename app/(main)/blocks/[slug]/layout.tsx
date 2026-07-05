import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

export default function BlocksLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <div className="flex flex-1 py-1">
                <AppSidebar />
                <SidebarInset>
                    <div className="flex bg-neutral-50 dark:bg-neutral-950 flex-1 flex-col py-2 md:pl-4">
                        {children}
                    </div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}