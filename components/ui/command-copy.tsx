"use client";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { cn } from "@/lib/utils";
import { Check, Terminal } from "lucide-react";

export function CommandCopy({
  value,
  displayValue,
  className,
}: {
  value: string;
  displayValue?: string;
  className?: string;
}) {
    const { copied, copy } = useCopyToClipboard({ timeout: 2000 });

    const handleCopy = () => {
        copy(value);
    };

    return (
        <Button
            size="sm"
            variant={"outline"}
            className={cn("h-full", className)}
            onClick={handleCopy}
        >
            <span className="relative mr-1 h-4 w-4 shrink-0">
                <Terminal
                    className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${
                        copied ? "scale-75 opacity-0" : "scale-100 opacity-100"
                    }`}
                />
                <Check
                    className={`text-green-700 dark:text-green-600 absolute inset-0 h-4 w-4 transition-all duration-200 ${
                        copied ? "scale-100 opacity-100" : "scale-75 opacity-0"
                    }`}
                />
            </span>
            <span className="min-w-0 truncate">{displayValue ?? value}</span>
        </Button>
    );
}
