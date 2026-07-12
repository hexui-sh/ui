import type { Metadata } from "next"
import { Suspense } from "react"
import { previewMap } from "./preview-map"
import { PreviewFrame } from "./preview-frame"
import { getBlockPreviewStaticParams } from "@/lib/blocks"

export const metadata: Metadata = {
  title: "Preview",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
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
