"use client"

import { useState } from "react"
import { Languages } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

const items = [
    { label: "English", value: "en" },
    { label: "日本語", value: "ja" },
    { label: "한국어", value: "ko" },
    { label: "中文", value: "zh" },
];

export function LanguageSelect() {
    const [selectedValue, setSelectedValue] = useState("en")
    // Derive the human-readable label shown in the trigger from the selected value.
    const selectedLabel = items.find((item) => item.value === selectedValue)?.label || "English"

    return (
        <Select value={selectedValue} onValueChange={(value) => {
            if (value) setSelectedValue(value)
        }}>
            <SelectTrigger className="h-7 xl:h-9 w-40 rounded-md border-border/70 bg-background/80 px-3 shadow-xs">
                <div className="flex min-w-0 items-center gap-2">
                    <Languages className="size-4 shrink-0 text-muted-foreground" />
                    <span className="truncate text-sm">{selectedLabel}</span>
                </div>
            </SelectTrigger>
            {/* Opens upward: this select sits near the page bottom, so a downward popup would overflow. */}
            <SelectContent side="top" sideOffset={8} align="start" alignItemWithTrigger={false}>
                {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}