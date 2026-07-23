import { Button } from "@/components/ui/button"

interface SocialLink {
    icon: React.ComponentType<{ className?: string }>
    label: string
}

interface SocialLinksProps {
    links: SocialLink[]
}

export function SocialLinks({ links }: SocialLinksProps) {
    return (
        <div className="flex gap-0.5 text-muted-foreground -ml-1.5">
            {links.map((link) => {
                const Icon = link.icon
                return (
                    <Button
                        key={link.label}
                        variant={"ghost"}
                        size="icon"
                        className="size-8 [&_svg]:size-4 xl:size-10 xl:[&_svg]:size-4.5"
                        aria-label={link.label}
                    >
                        <Icon className="size-5" />
                    </Button>
                )
            })}
        </div>
    )
}