import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { SquareArrowOutUpRight } from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { Button } from "@/components/ui/button"
import { articleJsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo"
import { SiGithub } from "@icons-pack/react-simple-icons"
import {
  getTemplateBySlug,
  getTemplates,
  getTemplateSummary,
} from "@/lib/templates"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const template = getTemplateBySlug(slug)

  if (!template) {
    return {}
  }

  return pageMetadata({
    title: template.title,
    description: getTemplateSummary(template),
    socialDescription: template.description.templateType,
    path: `/templates/${slug}`,
    type: "article",
  })
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pagePath = `/templates/${slug}`
  const template = getTemplateBySlug(slug)

  if (!template) {
    notFound()
  }

  const summary = getTemplateSummary(template)

  return (
    <div className="mx-auto mt-16 flex w-full min-w-0 md:mt-14">
      <JsonLd
        data={articleJsonLd({
          title: template.title,
          description: summary,
          path: pagePath,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Templates", path: "/templates" },
          { name: template.title, path: pagePath },
        ])}
      />
      <article className="min-w-0 w-full py-1">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-start md:justify-between">
            <div>
              <h1 className="text-balance text-3xl font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">
                {template.title}
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-6 text-neutral-600 dark:text-neutral-400">{template.description.templateType}</p>
            </div>
            <nav
              className="flex w-full flex-col gap-2 sm:ml-auto sm:w-auto sm:shrink-0 sm:flex-row sm:items-center"
              aria-label="Template actions"
            >
              <Button
                size="lg"
                nativeButton={false}
                className="h-11 w-full transition-[background-color,color,box-shadow,transform] active:scale-[0.96] sm:h-10 sm:w-auto sm:min-w-36"
                render={
                  <a href={template.repoUrl} target="_blank" rel="noopener noreferrer" />
                }
              >
                <SiGithub />
                Download
              </Button>
              <Button
                variant="outline"
                size="lg"
                nativeButton={false}
                className="h-11 w-full transition-[background-color,color,box-shadow,transform] active:scale-[0.96] sm:h-10 sm:w-auto sm:min-w-36"
                render={
                  <a href={template.previewUrl} target="_blank" rel="noopener noreferrer" />
                }
              >
                <SquareArrowOutUpRight />
                Live Preview
              </Button>
            </nav>
          </div>
        </header>

        <div className="relative aspect-video overflow-hidden rounded-md bg-neutral-950 border-2">
          <Image
            src={template.screenshotUrl}
            alt={`Screenshot of ${template.title}`}
            fill
            sizes="100vw"
            className="object-cover md:hidden"
          />
          <iframe
            title={`Preview of ${template.title}`}
            className="hidden size-full md:block"
            src={template.previewUrl}
            loading="lazy"
          />
        </div>

        <dl className="mt-10 divide-y divide-neutral-200 dark:divide-neutral-800">
          <div className="grid grid-cols-1 gap-y-3 py-10 sm:grid-cols-[minmax(7.5rem,0.8fr)_minmax(0,1.7fr)] sm:gap-x-12 sm:gap-y-0">
            <dt className="text-balance text-2xl font-medium text-neutral-900 dark:text-neutral-100">
              What is this?
            </dt>
            <dd className="text-pretty text-base leading-6 text-neutral-600 dark:text-neutral-400">
              {template.description.about}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-y-3 py-10 sm:grid-cols-[minmax(7.5rem,0.8fr)_minmax(0,1.7fr)] sm:gap-x-12 sm:gap-y-0">
            <dt className="text-balance text-2xl font-medium text-neutral-900 dark:text-neutral-100">
              Who is this for?
            </dt>
            <dd className="text-pretty text-base leading-6 text-neutral-600 dark:text-neutral-400">
              {template.description.audience}
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-y-3 py-10 sm:grid-cols-[minmax(7.5rem,0.8fr)_minmax(0,1.7fr)] sm:gap-x-12 sm:gap-y-0">
            <dt className="text-balance text-2xl font-medium text-neutral-900 dark:text-neutral-100">
              What&apos;s included?
            </dt>
            <dd>
              <ul className="grid gap-2 text-base leading-6 text-neutral-600 dark:text-neutral-400">
                {template.description.included.map((item) => (
                  <li
                    key={item}
                    className="relative pl-4 before:absolute before:left-0 before:top-[0.65rem] before:size-1 before:rounded-full before:bg-neutral-400 dark:before:bg-neutral-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>

          <div className="grid grid-cols-1 gap-y-3 py-10 sm:grid-cols-[minmax(7.5rem,0.8fr)_minmax(0,1.7fr)] sm:gap-x-12 sm:gap-y-0">
            <dt className="text-balance text-2xl font-medium text-neutral-900 dark:text-neutral-100">
              Built With
            </dt>
            <dd className="min-w-0 overflow-x-auto">
              <table className="w-full min-w-64 border-collapse text-left text-base">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800">
                    <th
                      scope="col"
                      className="w-2/3 pb-3 pr-6 text-sm font-medium text-neutral-500 dark:text-neutral-500"
                    >
                      Technology
                    </th>
                    <th
                      scope="col"
                      className="pb-3 text-sm font-medium text-neutral-500 dark:text-neutral-500"
                    >
                      Version
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {template.description.packages.map((technology) => (
                    <tr key={technology.name}>
                      <th
                        scope="row"
                        className="py-3 pr-6 font-medium text-neutral-800 dark:text-neutral-200"
                      >
                        {technology.name}
                      </th>
                      <td className="py-3 tabular-nums text-neutral-500 dark:text-neutral-400">
                        {technology.version ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </dd>
          </div>
        </dl>
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  return getTemplates().map((template) => ({ slug: template.slug }))
}

export const dynamicParams = false
