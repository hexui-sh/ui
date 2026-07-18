import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

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
    <div className="flex w-full flex-col items-center rounded-lg border px-4 py-14">
      <div className="flex max-w-lg flex-col items-center gap-5">
        {/* `grayscale` mutes the avatars so the CTA button remains the visual focus. */}
        <AvatarGroup className="grayscale">
          {supportAvatars.map((avatar) => (
            <Avatar
              key={avatar.src}
              size="lg"
              className={cn("border bg-accent", avatar.className)}
            >
              <AvatarImage src={avatar.src} alt={avatar.alt} />
              <AvatarFallback>{avatar.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
        <div className="flex flex-col gap-2 text-center">
          <h2 className="font-semibold md:text-2xl">Still have questions?</h2>
          <p className="text-muted-foreground">
            If you can&rsquo;t find the answer you&rsquo;re looking for, please
            chat to our support team.
          </p>
        </div>
        <Button size="lg">Get in touch</Button>
      </div>
    </div>
  )
}
