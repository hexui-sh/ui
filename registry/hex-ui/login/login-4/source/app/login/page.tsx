import Image from "next/image"
import { LoginForm } from "../../components/login-form"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Page() {
    return (
        <div className="grid min-h-svh w-full lg:grid-cols-10">
            <div className="flex flex-1 items-center justify-center col-span-4">
                <div className="w-full max-w-xs">
                    <LoginForm />
                </div>
            </div>
            <div className="relative hidden lg:block overflow-hidden col-span-6">
                <div className="absolute inset-0">
                    <Image width={1500} height={1600} src="/demo/backgrounds/sky.png" alt="Background" className="h-full w-full object-cover dark:brightness-[0.3] dark:grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent dark:from-black/80 dark:via-black/40 dark:to-black/20" />
                </div>

                <div className="relative z-10 flex flex-col justify-end h-full p-10">
                    <div className="text-white space-y-2">
                        <blockquote className="text-2xl font-medium leading-snug">
                            "It{"'"}s so wonderful to see you all!"
                        </blockquote>
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="https://github.com/ri0n-dev.png" alt="@ri0n-dev" />
                                <AvatarFallback>RI</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <div className="font-semibold">Rion</div>
                                <div className="text-sm text-white/80">Founder</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
