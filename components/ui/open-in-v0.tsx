import { Button } from "@/components/ui/button";
import { SiV0 } from "@icons-pack/react-simple-icons";

export function OpenInV0({ url }: { url?: string }) {
    if (!url) {
        return (
            <Button size="sm" className="h-full" disabled>
                Open in <SiV0 />
            </Button>
        )
    }

    return (
        <Button size="sm" className="h-full">
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                Open in <SiV0 />
            </a>
        </Button>
    )
}