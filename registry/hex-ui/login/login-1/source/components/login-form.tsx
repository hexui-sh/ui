"use client"

import { useState, type ComponentProps } from "react"
import { SiGoogle, SiApple } from "@icons-pack/react-simple-icons"
import { Eye, EyeClosed } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type LoginInputProps = ComponentProps<typeof Input>

function LoginInput({ className, ...props }: LoginInputProps) {
  return <Input className={cn("h-8 md:h-10 flex items-center text-xs md:text-sm", className)} {...props} />
}

type LoginButtonProps = ComponentProps<typeof Button>

function LoginButton({ className, children, ...props }: LoginButtonProps) {
  return (
    <Button className={cn("h-8 md:h-10 text-xs md:text-sm", className)} {...props}>
      {children}
    </Button>
  )
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex w-full max-w-sm min-w-0 flex-col gap-6 pb-8">
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-semibold sm:text-3xl">Welcome back</h1>
            <FieldDescription className="text-sm sm:text-base text-center">
              Sign in to your account to continue
            </FieldDescription>
          </div>
          <Field>
            <LoginButton variant="outline" type="button">
              <SiGoogle />
              Continue with Google
            </LoginButton>
          </Field>
          <Field>
            <LoginButton variant="outline" type="button">
              <SiApple />
              Continue with Apple
            </LoginButton>
          </Field>
          <FieldSeparator>or</FieldSeparator>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <LoginInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="m@example.com"
              required
            />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <a
                href="#"
                className="text-muted-foreground ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <div className="relative">
              <LoginInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                className="pr-6"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((currentValue) => !currentValue)}
                className="absolute top-1/2 right-1 z-10 -translate-y-1/2 text-muted-foreground hover:text-foreground active:-translate-y-1/2"
              >
                {showPassword ? <EyeClosed className="size-4" /> : <Eye className="size-4" />}
              </Button>
            </div>
          </Field>
          <Field className="mt-1">
            <LoginButton type="submit">Login</LoginButton>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-0 text-center sm:px-6">
        Don&rsquo;t have an account?{" "}
        <a href="#" className="text-primary">
          Sign up
        </a>
      </FieldDescription>
    </div>
  )
}
