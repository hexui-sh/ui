import Link from "next/link"
import type React from "react"

type SocialLink = {
  href: string
  Icon: React.ComponentType<{ size?: string | number }>
  label: string
}

interface NavSnsProps {
  links: SocialLink[]
}

export function NavSns({ links }: NavSnsProps) {
  return (
    <div className="flex gap-6 items-center">
      {links.map(({ href, Icon, label }, index) => (
        <Link
          key={index}
          href={href}
          aria-label={label}
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Icon size={"18"} />
        </Link>
      ))}
    </div>
  )
}
