"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  flattenNavGroups,
  type MobileNavData,
  type NavItem,
} from "@/lib/navigation-utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { HamburgerIcon } from "@/components/ui/hamburger-icon";

type MobileNavigationProps = {
  data: MobileNavData;
};

function isItemActive(pathname: string, url: string): boolean {
  if (url.includes("#")) {
    return pathname === url.split("#")[0];
  }
  return pathname === url;
}

function FlatNavList({
  items,
  pathname,
}: {
  items: Array<NavItem & { count?: number }>;
  pathname: string;
}) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => {
        const active = isItemActive(pathname, item.url);
        return (
          <li key={item.url}>
            {item.disabled ? (
                <span className="flex h-9 w-full items-center gap-2 rounded-md px-4 text-3xl font-medium text-neutral-400 dark:text-neutral-600 cursor-not-allowed">
                  <span className="truncate">{item.title}</span>
                {item.count !== undefined && (
                  <span className="ml-auto text-base text-muted-foreground/60 tabular-nums">
                    {item.count}
                  </span>
                )}
              </span>
            ) : (
              <SheetClose asChild>
                <Link
                  href={item.url}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-9 w-full items-center gap-2 rounded-md px-3 text-3xl font-medium text-neutral-800 dark:text-neutral-200  transition-colors hover:bg-muted hover:text-foreground",
                  )}
                >
                  <span className="truncate">{item.title}</span>
                  {item.count !== undefined && (
                    <span className="ml-auto text-base text-muted-foreground/60 tabular-nums">
                      {item.count}
                    </span>
                  )}
                </Link>
              </SheetClose>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function MobileNavigation({ data }: MobileNavigationProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const docsItems = flattenNavGroups(data.docs);
  const blocksItems = flattenNavGroups(data.blocks);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="group/menu md:hidden aria-expanded:bg-transparent aria-expanded:shadow-none"
          aria-label="Open navigation menu"
        >
          <HamburgerIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="top"
        overlayClassName="bg-transparent supports-backdrop-filter:backdrop-blur-none"
        className="data-[side=top]:top-15 data-[side=top]:bottom-0 data-[side=top]:h-[calc(100svh-3.75rem)] gap-0 p-0 shadow-2xl duration-300 data-[side=top]:data-open:slide-in-from-top-[10%] data-[side=top]:data-closed:slide-out-to-top-[10%]"
        showCloseButton={false}
      >
        <nav
          aria-label="Mobile"
          className="flex flex-1 flex-col gap-6 overflow-y-auto overscroll-contain px-2 pb-6 pt-4"
        >
          <section aria-labelledby="mobile-main-heading">
            <h2
              id="mobile-main-heading"
              className="px-3 pb-1 text-base font-medium text-muted-foreground/70"
            >
              Menu
            </h2>
            <FlatNavList items={data.header} pathname={pathname} />
          </section>

          {docsItems.length > 0 ? (
            <section aria-labelledby="mobile-docs-heading">
              <h2
                id="mobile-docs-heading"
                className="px-3 pb-1 text-base font-medium text-muted-foreground/70"
              >
                Docs
              </h2>
              <FlatNavList items={docsItems} pathname={pathname} />
            </section>
          ) : null}

          {blocksItems.length > 0 ? (
            <section aria-labelledby="mobile-blocks-heading">
              <h2
                id="mobile-blocks-heading"
                className="px-3 pb-1 text-base font-medium text-muted-foreground/70"
              >
                Blocks
              </h2>
              <FlatNavList items={blocksItems} pathname={pathname} />
            </section>
          ) : null}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
