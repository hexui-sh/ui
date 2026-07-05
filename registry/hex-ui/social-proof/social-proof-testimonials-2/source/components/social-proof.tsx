"use client";

import { Marquee } from '@/components/ui/marquee';
import { TestimonialCard, type Testimonial } from './testimonials-card';

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

const firstRow = testimonials.slice(0, testimonials.length / 2)
const secondRow = testimonials.slice(testimonials.length / 2)

export function SocialProof() {
    return (
        <section className="flex items-center w-full min-h-dvh bg-background">
            <style jsx>{`
                .testimonials-grid-collapsed {
                    -webkit-mask-image: linear-gradient(to bottom, black 0%, black 78%, transparent 100%);
                    mask-image: linear-gradient(to bottom, black 0%, black 78%, transparent 100%);
                }

                @media (min-width: 768px) {
                    .testimonials-grid-collapsed {
                        -webkit-mask-image: none;
                        mask-image: none;
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

                {/* Testimonials Marquee */}
                <div className='flex flex-col gap-2'>
                    <Marquee pauseOnHover className="flex">
                        {firstRow.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                testimonial={testimonial}
                            />
                        ))}
                    </Marquee>
                    <Marquee reverse pauseOnHover className="flex">
                        {secondRow.map((testimonial, index) => (
                            <TestimonialCard
                                key={index}
                                testimonial={testimonial}
                            />
                        ))}
                    </Marquee>
                </div>
            </div>
        </section>
    );
}
