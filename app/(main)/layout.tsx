import { SiteHeader } from "@/components/site-header";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col max-width px-4 md:px-6 xl:px-8 pb-5 mx-auto">
      <SiteHeader />
      <div>{children}</div>
    </div>
  );
}
