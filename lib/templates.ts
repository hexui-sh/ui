import templateCatalog from "@/registry-templates.json"

export type TemplatePackage = {
  name: string
  version?: string
}

export type TemplateDescription = {
  templateType: string
  about: string
  audience: string
  included: string[]
  packages: TemplatePackage[]
}

export type TemplateData = {
  slug: string
  title: string
  previewUrl: string
  screenshotUrl: string
  repoUrl: string
  description: TemplateDescription
}

type TemplateCatalog = {
  templates: TemplateData[]
}

const templates = (templateCatalog as TemplateCatalog).templates

export function getTemplates() {
  return templates
}

export function getTemplateBySlug(slug: string) {
  return templates.find((template) => template.slug === slug) ?? null
}

export function getTemplateSummary(template: TemplateData) {
  return `${template.description.templateType} Built for ${template.description.audience}`
}
