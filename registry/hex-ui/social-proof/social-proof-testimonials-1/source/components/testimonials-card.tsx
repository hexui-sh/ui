import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

interface Testimonial {
    avatar: string;
    comment: string;
    name: string;
    role: string;
    company?: string;
}

interface TestimonialsCardProps {
    testimonial: Testimonial;
    hidden?: boolean;
}

export function TestimonialsCard({ testimonial, hidden = false }: TestimonialsCardProps) {
    return (
        <Card className={`p-6 flex flex-col border-0 ${hidden ? 'hidden md:flex' : ''}`}>
            {/* Author Info */}
            <div className="flex items-center border-b pb-3 text-xs text-muted-foreground">
                <Avatar className="w-7 h-7 bg-muted-foreground/36 mr-2 inline-block">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <p className="font-semibold text-foreground text-sm">
                        {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                        {testimonial.company && ` • ${testimonial.company}`}
                    </p>
                </div>
            </div>

            {/* Comment */}
            <p className="text-sm text-muted-foreground grow leading-relaxed">
                {testimonial.comment}
            </p>
        </Card>
    );
}
