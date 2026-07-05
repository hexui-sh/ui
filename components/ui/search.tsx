"use client"

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Command,
    CommandCollection,
    CommandDialog,
    CommandDialogPopup,
    CommandDialogTrigger,
    CommandEmpty,
    CommandFooter,
    CommandGroup,
    CommandGroupLabel,
    CommandInput,
    CommandItem,
    CommandList,
    CommandPanel,
    CommandSeparator,
} from "@/components/ui/command";
import { Search, ArrowDownIcon, ArrowUpIcon, CornerDownLeftIcon } from "lucide-react"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import type { SearchGroup, SearchItem } from "@/lib/search"

export interface SearchBarProps {
    groups: SearchGroup[]
}

function isEditableTarget(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) return false
    if (target.isContentEditable) return true
    const tag = target.tagName
    return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT"
}

export function SearchBar({ groups }: SearchBarProps) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "/") return
            if (event.metaKey || event.ctrlKey || event.altKey) return
            if (isEditableTarget(event.target)) return

            event.preventDefault()
            setOpen((prev) => !prev)
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [])

    const handleSelect = (item: SearchItem) => {
        setOpen(false)
        router.push(item.url)
    }

    return (
        <CommandDialog onOpenChange={setOpen} open={open}>
            <CommandDialogTrigger>
                <div className="flex items-center text-neutral-500 dark:text-neutral-400 border border-neutral-300 dark:border-neutral-800 w-64 py-1.5 pl-2.5 pr-1.5 rounded-md justify-between cursor-pointer max-w-xs">
                    <div className="flex items-center gap-2">
                        <Search size={16.5} />
                        <p className="text-sm">Search documentation...</p>
                    </div>
                    <Kbd>/</Kbd>
                </div>
            </CommandDialogTrigger>
            <CommandDialogPopup>
                <Command items={groups}>
                    <CommandInput placeholder="Search docs and blocks..." />
                    <CommandPanel>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandList>
                            {(group: SearchGroup) => (
                                <Fragment key={group.value}>
                                    <CommandGroup items={group.items}>
                                        <CommandGroupLabel>{group.value}</CommandGroupLabel>
                                        <CommandCollection>
                                            {(item: SearchItem) => (
                                                <CommandItem
                                                    key={item.value}
                                                    value={item.value}
                                                    onClick={() => handleSelect(item)}
                                                >
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="truncate">{item.label}</span>
                                                        {item.description && (
                                                            <span className="truncate text-xs text-muted-foreground">
                                                                {item.description}
                                                            </span>
                                                        )}
                                                    </div>
                                                </CommandItem>
                                            )}
                                        </CommandCollection>
                                    </CommandGroup>
                                    <CommandSeparator />
                                </Fragment>
                            )}
                        </CommandList>
                    </CommandPanel>
                    <CommandFooter>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <KbdGroup>
                                    <Kbd>
                                        <ArrowUpIcon />
                                    </Kbd>
                                    <Kbd>
                                        <ArrowDownIcon />
                                    </Kbd>
                                </KbdGroup>
                                <span>Navigate</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Kbd>
                                    <CornerDownLeftIcon />
                                </Kbd>
                                <span>Open</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Kbd>Esc</Kbd>
                            <span>Close</span>
                        </div>
                    </CommandFooter>
                </Command>
            </CommandDialogPopup>
        </CommandDialog>
    )
}
