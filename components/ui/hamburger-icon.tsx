import { cn } from "@/lib/utils";

type HamburgerIconProps = {
  className?: string;
};

export function HamburgerIcon({ className }: HamburgerIconProps) {
  return (
    <div className={cn("relative h-5 w-5", className)}>
      <span
        className={cn(
          "absolute left-0 top-1 h-0.5 w-4 origin-center rounded-full bg-current transition-transform duration-200",
          "group-data-[state=open]/menu:translate-y-1 group-data-[state=open]/menu:rotate-45",
        )}
      />
      <span
        className={cn(
          "absolute left-0 top-3 h-0.5 w-4 origin-center rounded-full bg-current transition-transform duration-200",
          "group-data-[state=open]/menu:-translate-y-1 group-data-[state=open]/menu:-rotate-45",
        )}
      />
    </div>
  );
}
