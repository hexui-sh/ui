import { Button } from "@/components/ui/button"

export function WaitlistForm() {
    return (
        <form className="flex max-w-sm items-center gap-4 rounded-4xl border bg-clip-padding p-0.5 dark:bg-input/32">
            <label htmlFor="waitlist-email-2" className="sr-only">Email address</label>
            <input
                id="waitlist-email-2"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                placeholder="Enter your email…"
                className="w-full px-4 focus-visible:outline-none"
            />
            <Button type="submit" className="flex min-h-full px-4 py-3 xl:py-4.5 items-center rounded-4xl gap-2">
                Join Waitlist
            </Button>
        </form>
    )
}
