import type { Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RichButton, type Color } from "@/components/ui/rich-button";
import { SiteFooter } from "@/components/site-footer";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
};

const plans: {
  name: string;
  description: string;
  price: string;
  billing: string;
  cta: string;
  href?: string;
  color?: Color;
  features: { name: string; description: string }[];
}[] = [
  {
    name: "Individual",
    description: "For users who want to use just one template",
    price: "$49",
    billing: "/one-time",
    cta: "Buy Template",
    href: "/templates",
    features: [
      {
        name: "Selected Template",
        description:
          "Access to a template built with your preferred stack of React, Next.js, and Tailwind CSS.",
      },
      {
        name: "Commercial Use",
        description:
          "Templates can be used for commercial projects. Reselling the code is prohibited.",
      },
      {
        name: "Lifetime License",
        description: "The template is yours to keep forever.",
      },
      {
        name: "Lifetime Updates",
        description: "Access all future updates at no extra cost.",
      },
    ],
  },
  {
    name: "Full Access",
    description: "For all template users",
    price: "$179",
    billing: "/one-time",
    cta: "Buy Full Access",
    color: "blue",
    features: [
      {
        name: "All Templates",
        description:
          "Gain access to every template built with React, Next.js, and Tailwind CSS.",
      },
      {
        name: "Commercial Use",
        description:
          "Templates can be used for commercial projects. Reselling the code is prohibited.",
      },
      {
        name: "Lifetime License",
        description: "The templates are yours to keep forever.",
      },
      {
        name: "Lifetime Updates",
        description: "Access all future updates at no extra cost.",
      },
      {
        name: "Lifetime Access",
        description:
          "Get access to all currently available content, plus everything added in the future.",
      },
    ],
  },
];

const faq = [
  {
    value: "item-1",
    trigger: "How do I get access after purchasing?",
    content:
      "Once you create an account and complete your payment through Whop, you will be able to access all templates from the template page.",
  },
  {
    value: "item-2",
    trigger:
      "Can blocks and templates be used in commercial projects or client work?",
    content:
      "Yes, all templates and blocks can be used for commercial projects and client work. However, there are some restrictions, so please refer to the license terms for more details.",
  },
  {
    value: "item-3",
    trigger: "What payment methods do you accept?",
    content:
      "Hex UI uses Whop as its payment system, supporting Card, Whop Balance, Apple Pay, Cash App, Crypto, and bank payments.",
  },
  {
    value: "item-4",
    trigger: "What does “lifetime access” mean?",
    content:
      "With a one-time payment, you get lifetime access to all templates. This also includes any new templates that are released in the future.",
  },
  {
    value: "item-5",
    trigger: "What does “lifetime updates” mean?",
    content:
      "When new features or fixes are added to the templates you’ve purchased or selected, you can access these updates for free.",
  },
  {
    value: "item-6",
    trigger: "Do you offer refunds?",
    content:
      "No, returns are not accepted. If you have any issues, please contact support@hexui.sh",
  },
  {
    value: "item-7",
    trigger:
      "Is it possible to use this even without any programming knowledge?",
    content:
      "It is not highly recommended. Hex UI is designed for developers who have experience with code modifications and updates.",
  },
  {
    value: "item-8",
    trigger:
      "Which is better value for money: purchasing items individually or buying Full Access?",
    content:
      "If you’re considering purchasing three or fewer items, buying them individually will be cheaper. For four or more items, Full Access is more cost-effective. Additionally, Full Access comes with lifetime access, allowing you to access any new templates released in the future. I recommend going with Full Access.",
  },
  {
    value: "item-9",
    trigger: "I'd like to develop using AI, is this suitable for that?",
    content:
      "Yes, Hex UI templates come with design documents, which can be loaded into AI to enable stable AI-assisted development.",
  },
];

export default async function PricingPage() {
  return (
    <div className="flex flex-col gap-14 w-full mt-30">
      <div className="w-full max-w-xl mx-auto text-center self-start">
        <h1 className="text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-200">
          Unlock All Access
        </h1>
        <p className="dark:text-neutral-400">
          Unlock all templates with a single purchase. It’s more cost-effective
          than buying them individually, and you'll also gain access to all
          future templates as they are released.
        </p>
      </div>

      <div className="mx-auto w-full max-w-4xl grid grid-cols-1 gap-4 lg:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="flex flex-col rounded-2xl bg-card px-5 py-6 md:px-8 md:py-8 gap-7 w-full mx-auto lg:mx-0 lg:max-w-none max-w-lg"
          >
            <div className="pb-7 flex flex-col border-b">
              <div className="mb-3">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold text-card-foreground">
                    {plan.name}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-card-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground">{plan.billing}</span>
              </div>
            </div>

            <div className="flex flex-col max-w-2xl gap-4 pb-3">
              {plan.features.map((feature) => (
                <div key={feature.name} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 dark:bg-primary/20">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-sm text-card-foreground">
                    <span className="font-medium">{feature.name}:</span>{" "}
                    <span className="text-muted-foreground">
                      {feature.description}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-auto h-15 flex flex-col">
              {plan.href ? (
                <>
                  <RichButton>
                    <Link href={plan.href}>{plan.cta}</Link>
                  </RichButton>
                </>
              ) : (
                <>
                  <RichButton color={plan.color}>{plan.cta}</RichButton>
                  <label className="text-xs text-neutral-500 mt-2 block">
                    Payments handled by Whop.
                  </label>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col mt-24 w-full gap-8 items-center">
        <div className="inline-flex gap-2 mx-auto max-w-xl text-center flex-col items-center">
          <p className="flex items-center gap-2 rounded-4xl bg-accent/50 px-4 py-1 text-xs text-muted-foreground">
            FAQ
          </p>
          <h2 className="scroll-mt-20 text-2xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="flex flex-col gap-4 w-full max-w-2xl">
          <Accordion
            className="w-full"
            type="single"
            defaultValue="item-1"
            collapsible
          >
            {faq.map((item) => (
              <AccordionItem
                key={item.value}
                value={item.value}
                className="rounded-xl border-0 bg-card px-4 mb-2"
              >
                <AccordionTrigger className="text-card-foreground/90 pt-3">
                  {item.trigger}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="text-sm text-muted-foreground text-center">
            Still have questions? email at{" "}
            <Link className="underline" href="mailto:info@ri0n.dev">
              info@ri0n.dev
            </Link>
          </p>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
