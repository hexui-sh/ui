export const SITE_ORIGIN = "https://hexui.sh"

export type OpenInDocContext = {
  kind: "doc"
  pageUrl: string
}

export type OpenInRegistryContext = {
  kind: "registry"
  slug: string
}

export type OpenInContext = OpenInDocContext | OpenInRegistryContext

export type OpenInProviderId = "v0" | "chatgpt" | "claude"

export type OpenInProvider = {
  id: OpenInProviderId
  label: string
  isAvailable: (context: OpenInContext) => boolean
  buildUrl: (context: OpenInContext) => string | null
}

export function buildCanonicalDocUrl(pageUrl: string): string {
  const parsed = new URL(pageUrl, SITE_ORIGIN)
  return `${SITE_ORIGIN}${parsed.pathname}`
}

export function buildRegistryJsonUrl(slug: string): string {
  return `${SITE_ORIGIN}/r/${slug}.json`
}

function buildDocPrompt(pageUrl: string): string {
  const docUrl = buildCanonicalDocUrl(pageUrl)
  return `I'm reading this Hex UI documentation page: ${docUrl}. Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`
}

function buildRegistryPrompt(slug: string): string {
  const registryUrl = buildRegistryJsonUrl(slug)
  return `Help me install and use this Hex UI block from its registry: ${registryUrl}`
}

function buildPromptUrl(baseUrl: string, prompt: string): string {
  const separator = baseUrl.includes("?") ? "&" : "?"
  return `${baseUrl}${separator}q=${encodeURIComponent(prompt)}`
}

export const openInProviders: OpenInProvider[] = [
  {
    id: "v0",
    label: "V0",
    isAvailable: () => true,
    buildUrl: (context) => {
      if (context.kind === "registry") {
        return `https://v0.dev/chat/import?url=${encodeURIComponent(
          buildRegistryJsonUrl(context.slug),
        )}`
      }
      return buildPromptUrl(
        "https://v0.dev/chat",
        buildDocPrompt(context.pageUrl),
      )
    },
  },
  {
    id: "chatgpt",
    label: "ChatGPT",
    isAvailable: () => true,
    buildUrl: (context) => {
      const prompt =
        context.kind === "registry"
          ? buildRegistryPrompt(context.slug)
          : buildDocPrompt(context.pageUrl)
      return buildPromptUrl("https://chatgpt.com/", prompt)
    },
  },
  {
    id: "claude",
    label: "Claude",
    isAvailable: () => true,
    buildUrl: (context) => {
      const prompt =
        context.kind === "registry"
          ? buildRegistryPrompt(context.slug)
          : buildDocPrompt(context.pageUrl)
      return buildPromptUrl("https://claude.ai/new", prompt)
    },
  },
]

export function getOpenInProvider(
  id: OpenInProviderId,
): OpenInProvider | undefined {
  return openInProviders.find((provider) => provider.id === id)
}

export function getOpenInUrl(
  id: OpenInProviderId,
  context: OpenInContext,
): string | null {
  const provider = getOpenInProvider(id)
  if (!provider || !provider.isAvailable(context)) {
    return null
  }
  return provider.buildUrl(context)
}
