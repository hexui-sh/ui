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
import { Search, ArrowDownIcon, ArrowUpIcon, CornerDownLeftIcon, Book, Cuboid, PanelsTopLeft } from "lucide-react"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import type { SearchGroup, SearchItem, SearchItemType } from "@/lib/search"

const searchItemIcon: Record<SearchItemType, typeof Book> = {
  docs: Book,
  templates: PanelsTopLeft,
  blocks: Cuboid,
}

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
                <div
                    role="search"
                    aria-label="Search documentation, templates, and blocks"
                    className="flex h-8 w-64 max-w-xs cursor-pointer items-center justify-between rounded-md border border-border pl-2.5 pr-1.5 text-neutral-500 dark:text-neutral-400"
                >
                    <div className="flex items-center gap-2">
                        <Search size={16.5} />
                        <p className="text-sm">Search documentation...</p>
                    </div>
                    <Kbd>/</Kbd>
                </div>
            </CommandDialogTrigger>
            <CommandDialogPopup>
                <Command items={groups}>
                    <CommandInput placeholder="Search docs, templates, and blocks..." />
                    <CommandPanel>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandList>
                            {(group: SearchGroup) => (
                                <Fragment key={group.value}>
                                    <CommandGroup items={group.items}>
                                        <CommandGroupLabel>{group.value}</CommandGroupLabel>
                                        <CommandCollection>
                                            {(item: SearchItem) => {
                                                const Icon = searchItemIcon[item.type]
                                                return (
                                                    <CommandItem
                                                        key={item.value}
                                                        value={item.value}
                                                        onClick={() => handleSelect(item)}
                                                    >
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <Icon
                                                                size={16}
                                                                className="shrink-0 text-muted-foreground"
                                                            />
                                                            <span className="truncate">{item.label}</span>
                                                        </div>
                                                    </CommandItem>
                                                )
                                            }}
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
