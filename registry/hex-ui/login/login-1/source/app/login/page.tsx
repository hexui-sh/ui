import { LoginForm } from "../../components/login-form"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full min-w-0 flex-col items-center justify-center gap-6 overflow-x-hidden bg-background p-4 md:p-10">
      <LoginForm />
    </div>
  )
}
