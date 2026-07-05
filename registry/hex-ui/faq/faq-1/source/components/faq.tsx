import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SupportContactCard, type SupportAvatar } from "./support-contact-card";

type FAQItem = {
  value: string;
  question: string;
  answer: string;
};

const faqItems: ReadonlyArray<FAQItem> = [
  {
    value: "account",
    question: "How do I create an account?",
    answer:
      "You can sign up using your email address or a supported social login. Once registered, your workspace will be created automatically and you can start adding pages immediately.",
  },
  {
    value: "collaboration",
    question: "Can I collaborate with my team in real time?",
    answer:
      "Yes, multiple users can edit the same page simultaneously. Changes are synced instantly, and you can leave comments, mention teammates, and track updates in real time.",
  },
  {
    value: "offline",
    question: "Does the app work offline?",
    answer:
      "You can view and edit recently opened pages without an internet connection. Your changes will automatically sync once you reconnect.",
  },
  {
    value: "security",
    question: "How is my data secured?",
    answer:
      "All data is encrypted in transit and at rest. We follow industry-standard security practices and regularly perform backups to ensure your content is protected.",
  },
  {
    value: "storage",
    question: "Is there a storage limit?",
    answer:
      "Free plans include a limited storage quota, while paid plans offer higher or unlimited storage depending on the subscription tier.",
  },
  {
    value: "billing",
    question: "How does billing work?",
    answer:
      "Billing is based on your selected plan and the number of active users in your workspace. You can upgrade, downgrade, or cancel your subscription at any time from the billing settings.",
  },
];

const supportAvatars: ReadonlyArray<SupportAvatar> = [
  {
    src: "/demo/avatars/avatar-1.svg",
    alt: "@u1",
    fallback: "A1",
    className: "size-10 border bg-accent z-1",
  },
  {
    src: "https://avatars.githubusercontent.com/u/114809507",
    alt: "@ri0n_dev",
    fallback: "RI",
    className: "size-12 border bg-accent z-2",
  },
  {
    src: "/demo/avatars/avatar-4.svg",
    alt: "@u2",
    fallback: "A4",
    className: "size-10 border bg-accent z-1",
  },
];

export function FAQ() {
  return (
    <section className="relative flex w-full justify-center py-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10">
        <div className="flex max-w-3xl flex-col gap-2 text-center">
          <p className="mx-auto max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
            FAQ
          </p>

          <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl xl:text-4xl">
            Your Questions Answered
          </h1>

          <p className="text-muted-foreground mt-2">
            Need help with something? Here are some of the most common questions
            we get.
          </p>
        </div>

        <div className="w-full max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.value} value={item.value}>
                <AccordionTrigger className="text-sm md:text-base font-medium text-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base leading-relaxed text-muted-foreground/90">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <SupportContactCard supportAvatars={supportAvatars} />
      </div>
    </section>
  );
}
