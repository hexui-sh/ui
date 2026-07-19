import Link from "next/link";

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
