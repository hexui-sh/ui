import { ContentSidebarLayout } from "@/components/content-sidebar-layout"

export default function ContentLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <ContentSidebarLayout>{children}</ContentSidebarLayout>;
}
