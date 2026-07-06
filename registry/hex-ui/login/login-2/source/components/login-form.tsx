"use client"

import { useState } from "react"
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

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex w-full max-w-sm min-w-0 flex-col gap-6 pb-8">
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-semibold sm:text-3xl">Welcome back</h1>
            <FieldDescription className="text-center sm:text-base">
              Sign in to your account to continue
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
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
                className="ml-auto inline-block text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <div className="relative">
              <Input
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
                className="absolute top-1/2 right-1 z-10 -translate-y-1/2 text-muted-foreground active:-translate-y-1/2"
              >
                {showPassword ? <EyeClosed className="size-4" /> : <Eye className="size-4" />}
              </Button>
            </div>
          </Field>
          <Field className="mt-1">
            <Button type="submit" size="lg">
              Login
            </Button>
          </Field>
          <FieldSeparator>Or authorize with</FieldSeparator>
          <Field className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button">
              <SiApple />
              <span className="font-normal">Apple</span>
            </Button>
            <Button variant="outline" type="button">
              <SiGoogle />
              <span className="font-normal">Google</span>
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-0 text-center sm:px-6">
        Don&rsquo;t have an account?{" "}
        <a href="#" className="text-primary underline-offset-4 hover:underline">
          Sign up
        </a>
      </FieldDescription>
    </div>
  )
}
