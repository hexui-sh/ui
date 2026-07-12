import Link from "next/link";

const footerNav = [
  { title: "Docs", href: "/docs/introduction" },
  { title: "Blocks", href: "/blocks" },
  { title: "Pricing", href: "/pricing" },
  { title: "Templates", href: "/templates" },
  { title: "GitHub", href: "https://github.com/ri0n-dev/hex-ui" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 flex flex-col items-center">
      <p className="text-sm font-medium text-center text-muted-foreground">
        Design and Developed by{" "}
        <Link
          className="underline"
          href="https://x.com/ri0n.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rion
        </Link>
      </p>
    </footer>
  );
}
