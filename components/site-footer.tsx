import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24">
      <p className="text-sm font-medium text-center text-muted-foreground">
        Design and Developed by{" "}
        <Link className="underline" href="https://x.com/ri0n.dev">
          Rion
        </Link>
      </p>
    </footer>
  );
}
