import Link from "next/link";

type FooterLinkItem = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLinkItem[];
};

type NavLinksProps = {
  sections: FooterSection[];
};

export function NavLinks({ sections }: NavLinksProps) {
  return (
    <div className="grid gap-6 sm:gap-8 col-span-2 grid-cols-2 xl:w-2/3 xl:flex-1 xl:grid-cols-3">
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="text-sm font-semibold text-foreground">
            {section.title}
          </h3>
          <ul role="list" className="mt-4 space-y-2 sm:space-y-3">
            {section.links.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
