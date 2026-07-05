"use client";

import {
    Snippet,
    SnippetCopyButton,
    SnippetHeader,
    SnippetTabsContent,
    SnippetTabsList,
    SnippetTabsTrigger,
} from "@/components/ui/snippet";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

export type InstallationTabCommand = {
    label: string;
    code: string;
};

type InstallationTabsProps = {
    commands?: unknown;
    className?: string;
};

function isCommand(value: unknown): value is InstallationTabCommand {
    if (!value || typeof value !== "object") {
        return false;
    }

    const candidate = value as Record<string, unknown>;
    return typeof candidate.label === "string" && typeof candidate.code === "string";
}

function normalizeCommands(commands?: unknown) {
    if (!commands) {
        return [];
    }

    const normalized = new Map<string, InstallationTabCommand>();

    if (Array.isArray(commands)) {
        for (const command of commands) {
            if (isCommand(command)) {
                normalized.set(command.label, command);
            }
        }
        return Array.from(normalized.values());
    }

    if (typeof commands === "string") {
        const trimmed = commands.trim();

        if (!trimmed) {
            return [];
        }

        try {
            return normalizeCommands(JSON.parse(trimmed));
        } catch {
            return [{ label: "command", code: trimmed }];
        }
    }

    if (typeof commands === "object") {
        for (const [label, code] of Object.entries(commands as Record<string, unknown>)) {
            if (isCommand(code)) {
                normalized.set(code.label, code);
                continue;
            }

            if (typeof code === "string") {
                normalized.set(label, { label, code });
            }
        }
    }

    return Array.from(normalized.values());
}

export function InstallationTabs({ commands, className }: InstallationTabsProps) {
    const resolvedCommands = useMemo(() => normalizeCommands(commands), [commands]);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const value =
        selectedValue && resolvedCommands.some((command) => command.label === selectedValue)
            ? selectedValue
            : (resolvedCommands[0]?.label ?? "");
    const activeCommand = resolvedCommands.find((command) => command.label === value);

    if (resolvedCommands.length === 0) {
        return (
            <div className={cn("mt-2 mb-5 rounded-md border border-dashed p-3 text-sm text-neutral-600 dark:text-neutral-400", className)}>
                No installation commands provided.
            </div>
        );
    }

    return (
        <Snippet className={cn("mt-2 mb-5", className)} onValueChange={setSelectedValue} value={value}>
            <SnippetHeader>
                <SnippetTabsList>
                    {resolvedCommands.map((command) => (
                        <SnippetTabsTrigger key={command.label} value={command.label}>
                            {command.label}
                        </SnippetTabsTrigger>
                    ))}
                </SnippetTabsList>
                {activeCommand && (
                    <SnippetCopyButton
                        onCopy={() =>
                            console.log(`Copied "${activeCommand.code}" to clipboard`)
                        }
                        onError={() =>
                            console.error(
                                `Failed to copy "${activeCommand.code}" to clipboard`
                            )
                        }
                        value={activeCommand.code}
                    />
                )}
            </SnippetHeader>
            {resolvedCommands.map((command) => (
                <SnippetTabsContent key={command.label} value={command.label}>
                    {command.code}
                </SnippetTabsContent>
            ))}
        </Snippet>
    );
}
