import Link from "next/link";
import { SearchBar } from "@/components/ui/search";
import { ThemeToggle } from "./ui/theme-toggle";
import HexUI from "@/components/icon/hexui";
import { getSearchGroups } from "@/lib/search";
import { getHeaderNavItems, getMobileNavData } from "@/lib/navigation";
import { MobileNavigation } from "@/components/mobile-navigation";
import { GitHubStars } from "@/components/github-stars";
import { Separator } from "@/components/ui/separator";

export async function SiteHeader() {
  const [searchGroups, mobileNavData] = await Promise.all([
    getSearchGroups(),
    getMobileNavData(),
  ]);
  const navItems = getHeaderNavItems();

  return (
    <header className="fixed z-51 h-15 w-full font-sans">
      <div className="fixed inset-x-0 top-0 bg-neutral-50 dark:bg-neutral-950">
        <div className="w-full max-width px-4 xl:px-6 mx-auto h-15">
          <div className="flex h-full w-full items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-6">
              <div className="flex md:hidden">
                <MobileNavigation data={mobileNavData} />
              </div>
              <Link href="/">
                <HexUI className="invert-90 dark:invert-0" size={25} />
              </Link>
              <nav className="hidden md:block" aria-label="Main">
                <ul className="flex items-center gap-7 text-sm text-neutral-600 dark:text-neutral-400">
                  {navItems.map((item) =>
                    item.disabled ? (
                      <li key={item.url}>
                        <span className="text-neutral-400 dark:text-neutral-500 cursor-not-allowed">
                          {item.title}
                        </span>
                      </li>
                    ) : (
                      <li key={item.url}>
                        <Link
                          className="hover:text-neutral-300 transition-colors"
                          href={item.url}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center">
                <SearchBar groups={searchGroups} />
              </div>
              <Separator orientation="vertical" className="hidden md:flex h-5 mx-1 !self-center" />
              <GitHubStars />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
