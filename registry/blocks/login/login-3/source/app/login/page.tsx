import Image from "next/image"
import { LoginForm } from "../../components/login-form"

export default function Page() {
  return (
    // Two-column split on lg: form (4 cols) + decorative background image (6 cols, hidden below lg).
    <div className="grid min-h-svh w-full lg:grid-cols-10">
      <div className="flex col-span-4 items-center justify-center">
        <div className="w-full max-w-xs">
          <LoginForm />
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block col-span-6">
        <Image
          width={1500}
          height={1600}
          src="/demo/backgrounds/sky.png"
          alt="Background"
          // Darken and desaturate the photo in dark mode so it doesn't compete with the form.
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
