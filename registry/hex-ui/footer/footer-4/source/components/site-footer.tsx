import { NavSns } from "./nav-sns"
import { Signature } from "./signature"
import { SiX, SiGithub, SiYoutube } from "@icons-pack/react-simple-icons"

const socialLinks = [
    { href: "#", Icon: SiX },
    { href: "#", Icon: SiGithub },
    { href: "#", Icon: SiYoutube },
]

const currentYear = new Date().getFullYear()

export function SiteFooter() {
    return (
        <footer className="w-full border-t border-border">
            <div className="mx-auto text-muted-foreground max-w-7xl px-8 py-2 md:py-4 xl:py-5">
                <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-8 sm:gap-12">
                    <div className="order-1 text-secondary-foreground md:order-2">
                        {/* 
                           This signature is for the Spell UI.
                           Please refer to the link below for instructions on how to install and use it.
                           https://spell.sh/docs/signature
                        */}
                        <Signature
                            text="Jane Smith"
                            fontSize={18}
                            color="currentColor"
                        />
                    </div>
                    <div className="order-2 flex w-full items-center justify-between md:contents">
                        <p className="text-sm md:order-1">© {currentYear}</p>

                        <div className="md:order-3">
                            <NavSns links={socialLinks} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
