"use client"

import { Button } from "./button"
import { cn } from "@/lib/utils"
import ThemeIcon from "@/components/icon/theme"
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "group/toggle border border-border extend-touch-target size-8",
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <ThemeIcon />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}