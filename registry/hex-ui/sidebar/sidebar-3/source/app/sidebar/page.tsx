import { AppSidebar } from "../../components/app-sidebar"
import { AppHeader } from "../../components/app-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { MessageCircle } from "lucide-react"

const SIDEBAR_PROVIDER_STYLE = {
    "--sidebar-width": "17rem",
} as React.CSSProperties

export default function Page() {
    return (
        <SidebarProvider defaultOpen={false} className="min-h-0 flex-1" style={SIDEBAR_PROVIDER_STYLE}>
            <AppSidebar />
            <SidebarInset className="bg-background">
                <AppHeader />
                <main className="flex flex-1 flex-col items-center justify-center p-8">
                    <div className="flex max-w-2xl flex-col items-center text-center">
                        <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-foreground/5">
                            <MessageCircle className="size-7 text-foreground/70" />
                        </div>
                        <h1 className="mb-3 text-3xl font-semibold tracking-tight text-foreground">
                            How can I help you today?
                        </h1>
                        <p className="mb-8 max-w-md text-muted-foreground">
                            Start a new conversation or select an existing chat from the
                            sidebar.
                        </p>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
