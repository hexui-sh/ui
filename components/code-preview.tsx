"use client"

import { useState } from "react"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { FilesTree } from "@/components/code-tree"
import {
    type BundledLanguage,
    CodeSnippet,
    CodeSnippetBody,
    CodeSnippetContent,
    CodeSnippetItem,
} from "@/components/ui/snippet"
import { CopyButton } from "@/components/ui/copy-button"

export type CodePreviewFile = {
    path: string
    content: string
    language: BundledLanguage
}

type CodePreviewProps = {
    files: CodePreviewFile[]
}

export function CodePreview({ files }: CodePreviewProps) {
    const [selectedFile, setSelectedFile] = useState<string>(files[0]?.path ?? "")
    const activeFile = files.find((f) => f.path === selectedFile) ?? files[0]

    const filePaths = files.map((f) => f.path)

    const snippetData = activeFile
        ? [{ language: activeFile.language, filename: activeFile.path, code: activeFile.content }]
        : []

    return (
        <SidebarProvider className="h-full min-h-0">
            <FilesTree
                files={filePaths}
                selectedFile={selectedFile}
                onSelect={setSelectedFile}
            />
            <SidebarInset className="flex flex-col min-w-0 overflow-hidden h-full">
                <header className="flex w-full h-12 shrink-0 justify-between items-center border-b px-4">
                    <span className="font-mono text-sm text-muted-foreground">
                        /{activeFile?.path ?? ""}
                    </span>
                    <CopyButton value={activeFile?.content ?? ""} />
                </header>
                <div className="flex-1 min-h-0 min-w-0 overflow-x-auto overflow-y-auto">
                    {snippetData.length > 0 && (
                        <CodeSnippet data={snippetData} defaultValue={snippetData[0].language}>
                            <CodeSnippetBody>
                                {(item) => (
                                    <CodeSnippetItem key={item.language} value={item.language}>
                                        <CodeSnippetContent language={item.language as BundledLanguage}>
                                            {item.code}
                                        </CodeSnippetContent>
                                    </CodeSnippetItem>
                                )}
                            </CodeSnippetBody>
                        </CodeSnippet>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
