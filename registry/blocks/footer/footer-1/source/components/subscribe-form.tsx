import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SubscribeForm() {
  return (
    <form className="flex items-center gap-2">
      <label htmlFor="email-address" className="sr-only">
        Email address
      </label>
      <Input
        type="email"
        id="email-address"
        name="email"
        autoComplete="email"
        spellCheck={false}
        placeholder="your email…"
      />
      <Button type="submit" size="icon" variant="outline" aria-label="Subscribe">
        <ArrowRight />
      </Button>
    </form>
  )
}
