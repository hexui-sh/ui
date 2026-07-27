"use client";

import { useEffect, useState } from "react";
import { SquareSlash } from "lucide-react";
import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsList,
  SnippetTabsTrigger,
} from "@/components/ui/snippet";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

const PACKAGE_MANAGER_ORDER: PackageManager[] = ["pnpm", "npm", "yarn", "bun"];
const STORAGE_KEY = "hex-ui:package-manager";

type CodeBlockCommandProps = {
  commands: Partial<Record<PackageManager, string>>;
};

export function CodeBlockCommand({
  commands,
}: CodeBlockCommandProps) {
  const [selectedPM, setSelectedPM] = useState<PackageManager>(
    PACKAGE_MANAGER_ORDER.find((pm) => pm in commands) ?? "pnpm",
  );

  const available = PACKAGE_MANAGER_ORDER.filter((pm) => pm in commands);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(
        STORAGE_KEY,
      ) as PackageManager | null;

      if (stored && available.includes(stored)) {
        setSelectedPM(stored);
      }
    } catch {}
  }, [available.join(",")]);

  const handlePMChange = (value: string) => {
    const pm = value as PackageManager;
    setSelectedPM(pm);

    try {
      window.localStorage.setItem(STORAGE_KEY, pm);
    } catch {}
  };

  if (available.length === 0) {
    return null;
  }

  const command = commands[selectedPM] ?? "";

  return (
    <Snippet
      className="bg-transparent dark:bg-foreground/2 rounded-md"
      value={selectedPM}
      onValueChange={handlePMChange}
    >
      <SnippetHeader>
        <div className="flex items-center pl-2 gap-2">
          <SquareSlash size={16} className="text-muted-foreground" />
          <SnippetTabsList>
            {available.map((pm) => (
              <SnippetTabsTrigger key={pm} value={pm}>
                {pm}
              </SnippetTabsTrigger>
            ))}
          </SnippetTabsList>
        </div>
        <SnippetCopyButton value={command} />
      </SnippetHeader>
      <span className="px-3 py-3 font-mono text-sm">{command}</span>
    </Snippet>
  );
}
