import { Button } from "@/components/ui/button"

export function WaitlistForm() {
    return (
        <form className="flex flex-row max-w-sm p-0.5 items-center bg-clip-padding dark:bg-input/32 border rounded-4xl gap-4">
            <label htmlFor="waitlist-email-3" className="sr-only">Email address</label>
            <input
                id="waitlist-email-3"
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
