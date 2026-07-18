"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ChevronDown, HatGlasses } from "lucide-react"

const MODEL_OPTIONS = [
    {
        value: "hex-1.0-pro",
        label: "Hex 1.0 Pro",
        description: "Best for deep reasoning",
    },
    {
        value: "hex-1.0",
        label: "Hex 1.0",
        description: "Balanced for everyday conversations",
    },
    {
        value: "hex-1.0-lite",
        label: "Hex 1.0 Lite",
        description: "Faster responses for lightweight tasks",
    },
] as const

export function AppHeader() {
    const [selectedModel, setSelectedModel] = React.useState<string>(MODEL_OPTIONS[0].value)

    // Keep the displayed model metadata in sync with the selected value (fallback to the first).
    const activeModel =
        MODEL_OPTIONS.find((model) => model.value === selectedModel) ?? MODEL_OPTIONS[0]

    return (
        <header className="flex h-12 shrink-0 items-center justify-between gap-3 px-3 sm:px-4">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <SidebarTrigger className="shrink-0 sm:hidden" />

                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button
                                type="button"
                                variant="ghost"
                                className="h-9 min-w-0 max-w-55 justify-start gap-2 px-2.5 sm:max-w-65"
                            />
                        }
                    >
                        <span className="truncate text-base font-medium">{activeModel.label}</span>
                        <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start" className="w-72">
                        <DropdownMenuRadioGroup
                            value={selectedModel}
                            onValueChange={setSelectedModel}
                        >
                            {MODEL_OPTIONS.map((model) => (
                                <DropdownMenuRadioItem
                                    key={model.value}
                                    value={model.value}
                                    className="py-2"
                                >
                                    <div className="flex min-w-0 flex-col gap-0.5 pr-4">
                                        <span className="truncate font-medium text-foreground">
                                            {model.label}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {model.description}
                                        </span>
                                    </div>
                                </DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Button
                type="button"
                size="icon"
                variant={"ghost"}
                className="shrink-0"
                aria-label="User menu"
            >
                <HatGlasses className="size-4.5" aria-hidden="true" />
            </Button>
        </header>
    )
}
