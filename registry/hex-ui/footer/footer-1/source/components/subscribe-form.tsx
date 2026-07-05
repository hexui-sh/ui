import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function SubscribeForm() {
    return (
        <form className="flex flex-col gap-3 sm:flex-row sm:gap-2">
            <label htmlFor="email-address" className="sr-only">
                Email address
            </label>
            <div className="flex items-center w-full gap-2">
                <Input type="email" id="email-address" name="email" autoComplete="email" spellCheck={false} placeholder="your email…" className="border" />
                <Button type="submit" size="icon" variant="outline" aria-label="Subscribe"><ArrowRight /></Button>
            </div>
        </form>
    )
}