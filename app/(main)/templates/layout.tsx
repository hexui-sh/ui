export default function TemplateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col h-screen items-center justify-start">
            {children}
        </div>
    );
}
