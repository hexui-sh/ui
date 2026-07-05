import Image from "next/image"
import { LoginForm } from "../../components/login-form"

export default function Page() {
    return (
        <div className="grid min-h-svh w-full lg:grid-cols-10">
            <div className="flex flex-1 items-center justify-center col-span-4">
                <div className="w-full max-w-xs">
                    <LoginForm />
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block col-span-6">
                <Image width={1500} height={1600} src="/placeholder.svg" alt="Background" className="h-full w-full object-cover dark:brightness-[0.3] dark:grayscale" />
            </div>
        </div>
    )
}
