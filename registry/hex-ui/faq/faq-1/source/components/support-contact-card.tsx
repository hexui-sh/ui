import { Button } from "@/components/ui/button"
import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarImage,
} from "@/components/ui/avatar"

export type SupportAvatar = {
    src: string
    alt: string
    fallback: string
    className: string
}

type SupportContactCardProps = {
    supportAvatars: ReadonlyArray<SupportAvatar>
}

export function SupportContactCard({ supportAvatars }: SupportContactCardProps) {
    return (
        <div className="flex w-full flex-col items-center justify-center rounded-lg border px-4 py-14">
            <div className="flex max-w-lg flex-col items-center justify-center gap-5">
                <AvatarGroup className="flex items-center grayscale">
                    {supportAvatars.map((avatar) => (
                        <Avatar key={avatar.src} className={avatar.className}>
                            <AvatarImage src={avatar.src} alt={avatar.alt} />
                            <AvatarFallback>{avatar.fallback}</AvatarFallback>
                        </Avatar>
                    ))}
                </AvatarGroup>
                <div className="gap-1 text-center">
                    <h2 className="md:text-2xl font-semibold">Still have questions?</h2>
                    <p className="mt-2 text-muted-foreground">
                        If you can&rsquo;t find the answer you&rsquo;re looking for, please chat to our support team.
                    </p>
                </div>
                <Button className="rounded-md p-3.5 md:p-4 xl:p-4.5">Get in touch</Button>
            </div>
        </div>
    )
}