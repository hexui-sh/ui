import { notFound, permanentRedirect } from "next/navigation"
import { getTemplateFileEntries } from "@/lib/content"

export default async function TemplatesRoot() {
  const [firstTemplate] = await getTemplateFileEntries()

  if (!firstTemplate) {
    notFound()
  }

  permanentRedirect(`/templates/${firstTemplate.slug}`)
}
