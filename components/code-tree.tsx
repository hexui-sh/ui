import * as React from "react"
import { ChevronRight, File, Folder } from "lucide-react"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarRail,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

type FileNode = { type: "file"; name: string; path: string }
type FolderNode = { type: "folder"; name: string; children: TreeNode[] }
type TreeNode = FileNode | FolderNode

function buildTree(paths: string[]): TreeNode[] {
    const root: TreeNode[] = []

    for (const filePath of paths) {
        const parts = filePath.split("/")
        let current = root

        for (let i = 0; i < parts.length; i++) {
            const name = parts[i]
            const isLast = i === parts.length - 1

            if (isLast) {
                current.push({ type: "file", name, path: filePath })
            } else {
                let folder = current.find(
                    (n): n is FolderNode => n.type === "folder" && n.name === name
                )
                if (!folder) {
                    folder = { type: "folder", name, children: [] }
                    current.push(folder)
                }
                current = folder.children
            }
        }
    }

    return root
}

type TreeItemProps = {
    node: TreeNode
    selectedFile: string | null
    onSelect: (path: string) => void
}

function TreeItem({ node, selectedFile, onSelect }: TreeItemProps) {
    if (node.type === "file") {
        return (
            <SidebarMenuButton
                isActive={node.path === selectedFile}
                className="data-[active=true]:bg-sidebar-accent"
                onClick={() => onSelect(node.path)}
            >
                <File className="shrink-0" />
                {node.name}
            </SidebarMenuButton>
        )
    }

    return (
        <SidebarMenuItem>
            <Collapsible
                className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                defaultOpen
            >
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                        <ChevronRight className="transition-transform" />
                        <Folder />
                        {node.name}
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {node.children.map((child, index) => (
                            <TreeItem
                                key={index}
                                node={child}
                                selectedFile={selectedFile}
                                onSelect={onSelect}
                            />
                        ))}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </Collapsible>
        </SidebarMenuItem>
    )
}

export type FilesTreeProps = Omit<React.ComponentProps<typeof Sidebar>, "onSelect"> & {
    files: string[]
    selectedFile: string | null
    onSelect: (path: string) => void
}

export function FilesTree({ className, style, files, selectedFile, onSelect, ...props }: FilesTreeProps) {
    const tree = React.useMemo(() => buildTree(files), [files])

    return (
        <Sidebar
            {...props}
            collapsible="none"
            className={cn("w-65 h-auto self-stretch border-r", className)}
            style={{ "--sidebar-width": "100%", ...style } as React.CSSProperties}
        >
            <SidebarContent className="min-w-0 overflow-x-auto overflow-y-auto">
                <div className="flex items-center px-4 h-12 border-b">
                    <p>Files</p>
                </div>
                <SidebarGroup className="min-h-0 flex-1">
                    <SidebarGroupContent className="flex h-full flex-col">
                        <SidebarMenu className="flex-1">
                            {tree.map((node, index) => (
                                <TreeItem
                                    key={index}
                                    node={node}
                                    selectedFile={selectedFile}
                                    onSelect={onSelect}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail className="hidden" />
        </Sidebar>
    )
}
