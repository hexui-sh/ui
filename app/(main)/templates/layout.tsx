import { ContentSidebarLayout } from "@/components/content-sidebar-layout"

export default function TemplateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <ContentSidebarLayout>{children}</ContentSidebarLayout>;
}
