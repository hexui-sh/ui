import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
    'Organize notes, tasks, and projects in one place',
    'Real-time collaboration with your team',
    'Customizable blocks for any workflow',
    'Powerful search and instant access to information',
];

interface CtaCardProps {
    className?: string;
    children: React.ReactNode;
}

function CtaCard({ className, children }: CtaCardProps) {
    return (
        <div className={`flex flex-col h-full w-full bg-card/90 items-start justify-center px-6 sm:px-8 md:px-10 py-10 md:py-14 text-left mx-auto ${className || ''}`}>
            {children}
        </div>
    );
}

export function Cta() {
    return (
        <section aria-labelledby="cta-heading" className="relative w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 max-w-6xl gap-2 md:gap-4 mx-auto">
                <CtaCard className="lg:col-span-2 gap-4 lg:gap-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
                        Everything you need<br className="hidden sm:block" />
                        <span className="sm:hidden"> </span>to get work done
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl">
                        Bring your notes, tasks, and projects together in a single workspace. Plan, write, and collaborate without switching tools.
                    </p>
                    <div className="mt-6 md:mt-8 flex flex-row items-center justify-start gap-4">
                        <Button
                            type="button"
                            className="h-10 md:h-11 xl:h-12 px-6 text-sm md:text-base font-medium rounded-4xl bg-foreground text-background hover:bg-foreground/90 transition-colors duration-300 group"
                        >
                            Get Started
                            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </CtaCard>
                <CtaCard className="lg:col-span-1">
                    <div className="flex flex-col gap-1 mb-8 md:mb-10">
                        <p className="text-2xl sm:text-3xl md:text-5xl font-medium">
                            One Workspace
                        </p>
                        <p className="text-xs md:text-sm uppercase tracking-widest text-muted-foreground font-medium mt-1 md:mt-2">
                            FOR YOUR TEAM & IDEAS
                        </p>
                    </div>

                    <ul className="space-y-3 md:space-y-4">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                                <div className="shrink-0 pt-1">
                                    <Check className="h-5 w-5 md:h-6 md:w-6 text-emerald-400" aria-hidden="true" />
                                </div>
                                <p className="ml-3 text-sm sm:text-base text-accent-foreground">
                                    {feature}
                                </p>
                            </li>
                        ))}
                    </ul>
                </CtaCard>
            </div>
        </section>
    )
}