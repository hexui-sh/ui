'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TestimonialsCard } from './testimonials-card';

const INITIAL_MOBILE_CARDS = 3;
const MOBILE_CARDS_PER_LOAD = 3;
const TESTIMONIALS_GRID_ID = 'testimonials-grid';

interface Testimonial {
    avatar: string;
    comment: string;
    name: string;
    role: string;
    company?: string;
}

const testimonials: Testimonial[] = [
    {
        avatar: "/demo/avatars/avatar-1.svg",
        comment:
            "This solution has completely transformed how our team works. The efficiency gains have been remarkable, and our productivity has increased significantly.",
        name: 'Sarah Anderson',
        role: 'Product Manager',
        company: 'TechFlow Inc.',
    },
    {
        avatar: "/demo/avatars/avatar-2.svg",
        comment:
            "I've been impressed with the seamless integration and exceptional support. It's rare to find a product that delivers on all its promises.",
        name: 'Michael Chen',
        role: 'CEO',
        company: 'CloudX Solutions',
    },
    {
        avatar: "/demo/avatars/avatar-3.svg",
        comment:
            "The results speak for themselves. We've seen a 40% improvement in our workflow efficiency and the team loves the intuitive interface.",
        name: 'Emma Rodriguez',
        role: 'Operations Director',
        company: 'NextGen Systems',
    },
    {
        avatar: "/demo/avatars/avatar-4.svg",
        comment:
            'Outstanding product with incredible attention to detail. The customer service team goes above and beyond to ensure success.',
        name: 'James Wilson',
        role: 'CTO',
        company: 'Digital Innovations',
    },
    {
        avatar: "/demo/avatars/avatar-5.svg",
        comment:
            'From day one, the implementation was smooth and the ROI has exceeded our expectations. This is a game-changer for our organization.',
        name: 'Lisa Zhang',
        role: 'VP of Strategy',
        company: 'Future Corp',
    },
    {
        avatar: "/demo/avatars/avatar-6.svg",
        comment:
            'What sets this apart is the commitment to continuous improvement. Every update brings valuable enhancements that our team immediately benefits from.',
        name: 'David Kim',
        role: 'Head of Development',
        company: 'InnovateTech',
    },
];

export function SocialProof() {
    const [visibleMobileCards, setVisibleMobileCards] = useState(INITIAL_MOBILE_CARDS);
    const prefersReducedMotion = useReducedMotion();
    const visibleTestimonials = testimonials.slice(0, visibleMobileCards);
    const hasHiddenTestimonials = visibleMobileCards < testimonials.length;
    const hasExpandedTestimonials = visibleMobileCards > INITIAL_MOBILE_CARDS;

    const loadMoreTestimonials = () => {
        setVisibleMobileCards((currentCount) =>
            Math.min(currentCount + MOBILE_CARDS_PER_LOAD, testimonials.length)
        );
    };

    const showFewerTestimonials = () => {
        setVisibleMobileCards(INITIAL_MOBILE_CARDS);
    };

    return (
        <section className="flex items-center w-full min-h-dvh bg-background">
            {/* Scoped CSS: swaps the mobile/desktop grid via media queries, and applies a
                bottom fade mask to the mobile grid while it's collapsed. */}
            <style jsx>{`
                .testimonials-grid-collapsed {
                    -webkit-mask-image: linear-gradient(to bottom, black 0%, black 78%, transparent 100%);
                    mask-image: linear-gradient(to bottom, black 0%, black 78%, transparent 100%);
                }

                .testimonials-grid-desktop {
                    display: none;
                }

                .testimonials-grid-mobile {
                    display: grid;
                }

                @media (min-width: 768px) {
                    .testimonials-grid-collapsed {
                        -webkit-mask-image: none;
                        mask-image: none;
                    }

                    .testimonials-grid-desktop {
                        display: grid;
                    }

                    .testimonials-grid-mobile {
                        display: none;
                    }
                }
            `}</style>

            <div className="max-w-7xl py-16 px-8 mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl xl:text-3xl font-bold text-foreground mb-2 text-balance">
                        Trusted by Industry Leaders
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto text-pretty">
                        See how companies like yours are achieving remarkable results with our solution
                    </p>
                </div>

                {/* The complete grid stays visible on desktop. */}
                <div className="testimonials-grid-desktop grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 xl:gap-5">
                    {testimonials.map((testimonial) => (
                        <TestimonialsCard key={testimonial.name} testimonial={testimonial} />
                    ))}
                </div>

                {/* Mobile uses a slice so testimonials are added in predictable batches. */}
                <div
                    id={TESTIMONIALS_GRID_ID}
                    className={`testimonials-grid-mobile grid-cols-1 gap-3
                        ${hasExpandedTestimonials ? '' : 'testimonials-grid-collapsed'}`}
                >
                    <AnimatePresence initial={false}>
                        {visibleTestimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                // Skip animation under reduced-motion; otherwise stagger newly loaded cards.
                                transition={
                                    prefersReducedMotion
                                        ? { duration: 0 }
                                        : {
                                            duration: 0.25,
                                            delay: Math.max(0, index - INITIAL_MOBILE_CARDS) * 0.1,
                                            ease: 'easeOut',
                                        }
                                }
                            >
                                <TestimonialsCard testimonial={testimonial} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="mt-4 flex flex-col items-center gap-3 md:hidden">
                    {hasHiddenTestimonials && (
                        <Button
                            type="button"
                            variant="secondary"
                            className="rounded-4xl px-5"
                            aria-controls={TESTIMONIALS_GRID_ID}
                            aria-expanded={hasExpandedTestimonials}
                            onClick={loadMoreTestimonials}
                        >
                            See More
                        </Button>
                    )}

                    {hasExpandedTestimonials && (
                        <Button
                            type="button"
                            variant="secondary"
                            className="rounded-4xl px-5"
                            aria-controls={TESTIMONIALS_GRID_ID}
                            aria-expanded="true"
                            onClick={showFewerTestimonials}
                        >
                            Show Less
                        </Button>
                    )}
                </div>
            </div>
        </section>
    );
}
