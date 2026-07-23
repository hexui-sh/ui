import Link from "next/link"

const faqItems = [
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
]

export function FAQ() {
  return (
    <section className="relative flex w-full justify-center py-16">
      <div className="flex w-full max-w-3xl flex-col items-center gap-10">
        <div className="flex flex-col gap-2 text-center">
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            FAQ
          </p>
          <h1 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl xl:text-4xl">
            Your Questions Answered
          </h1>
          <p className="mt-2 text-muted-foreground">
            Need help with something? Here are some of the most common questions
            we get.
          </p>
        </div>

        {/* Two-column grid of Q&A items. Each item gets an `id` so it can be deep-linked. */}
        <div className="grid w-full gap-8 md:grid-cols-2 md:gap-12">
          {faqItems.map((item, index) => (
            <div
              key={item.value}
              id={`faq-${index + 1}`}
              className="flex items-start gap-4"
            >
              {/* Two-digit, tabular-nums index keeps the numbered badges aligned. */}
              <div
                className="inline-flex size-7 shrink-0 items-center justify-center rounded-sm bg-accent text-xs font-medium tabular-nums text-muted-foreground"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-sm font-semibold md:text-base">
                  {item.question}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground/80">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground xl:text-base">
          Still have questions?{" "}
          <Link className="text-foreground underline" href="#">
            Contact support
          </Link>
        </p>
      </div>
    </section>
  )
}
