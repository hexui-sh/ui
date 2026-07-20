import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { JsonLd } from "@/components/json-ld";
import { organizationJsonLd, websiteJsonLd, defaultOpenGraph, defaultTwitter } from "@/lib/seo";
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hexui.sh"),
  title: {
    default: "Hex UI",
    template: "%s - Hex UI",
  },
  description:
    "Accelerate your section development. Get free, high-quality sections to copy, paste, and customize to your liking. Open Source. Open Code.",
  applicationName: "Hex UI",
  alternates: {
    canonical: "https://hexui.sh",
  },
  openGraph: defaultOpenGraph(),
  twitter: defaultTwitter(),
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  authors: [{ name: "Rion", url: "https://x.com/ri0n_dev" }],
  creator: "Rion",
  publisher: "Rion",
  keywords: [
    "Hex UI",
    "UI blocks",
    "React components",
    "Next.js sections",
    "Tailwind CSS blocks",
    "shadcn registry",
    "copy paste UI",
    "open source UI",
    "Components",
    "Sections",
    "Blocks",
    "Templates",
  ],
  category: "technology",
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
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
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
