import { Command } from "lucide-react";

type AppBrandProps = {
  href?: string;
  className?: string;
  size?: number;
};

export function AppBrand({ href = "#", className, size = 20 }: AppBrandProps) {
  return (
    // Centralize the brand UI so header and sidebar stay visually consistent.
    <a href={href} className="flex items-center gap-2 font-medium">
      <Command className={className} size={size} />
    </a>
  );
}
