import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hex UI",
    template: "%s - Hex UI",
  },
  description:
    "Accelerate your section development. Get free, high-quality sections to copy, paste, and customize to your liking. Open Source. Open Code.",
  metadataBase: new URL("https://hexui.sh"),
  openGraph: {
    title: "Copy. Customize. Launch. - Hex UI",
    description:
      "Accelerate your section development. Get free, high-quality sections to copy, paste, and customize to your liking. Open Source. Open Code.",
    url: "https://hexui.sh",
    siteName: "Hex UI",
    images: [
      {
        url: "/ogp.webp",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Copy. Customize. Launch. - Hex UI",
    description:
      "Accelerate your section development. Get free, high-quality sections to copy, paste, and customize to your liking. Open Source. Open Code.",
    creator: "@ri0n_dev",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
  publisher: "@ri0n_dev",
  creator: "@ri0n_dev",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Components",
    "Sections",
    "Blocks",
    "Templates",
    "Hex UI",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body
        className={`${geistSans.className} ${geistMono.variable} font-sans antialiased bg-neutral-50 dark:bg-neutral-950`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
