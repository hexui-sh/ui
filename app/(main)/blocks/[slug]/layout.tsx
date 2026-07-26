import { ContentSidebarLayout } from "@/components/content-sidebar-layout"

export default function TemplatesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <ContentSidebarLayout>{children}</ContentSidebarLayout>;
}
