import type { Metadata } from "next"
import { Suspense } from "react"
import { previewMap } from "./preview-map"
import { PreviewFrame } from "./preview-frame"
import { getBlockEntryBySlug, getBlockPreviewStaticParams } from "@/lib/blocks"
import { defaultOpenGraph, defaultTwitter } from "@/lib/seo"

type PreviewPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PreviewPageProps): Promise<Metadata> {
  const { slug } = await params
  const block = getBlockEntryBySlug(slug)
  const description =
    block?.description ??
    `Preview of the ${block?.title ?? slug} block from Hex UI.`

  return {
    title: "Preview",
    description,
    robots: {
      index: false,
      follow: false,
    },
    openGraph: defaultOpenGraph(description),
    twitter: defaultTwitter(description),
  }
}

export default async function PreviewPage({
  params,
}: PreviewPageProps) {
  const { slug } = await params
  const PreviewComponent = previewMap[slug]

  if (!PreviewComponent) {
    return null
  }

  return (
    <Suspense fallback={<PreviewComponent />}>
      <PreviewFrame>
        <PreviewComponent />
      </PreviewFrame>
    </Suspense>
  )
}

export function generateStaticParams() {
  return getBlockPreviewStaticParams()
}

export const dynamicParams = false
