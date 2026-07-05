import { previewMap } from "./preview-map"

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ center?: string }>
}) {
  const { slug } = await params
  const { center } = await searchParams
  const PreviewComponent = previewMap[slug]
  const shouldCenterVertically = center === "1" || center === "true"

  if (!PreviewComponent) {
    return null
  }

  if (!shouldCenterVertically) {
    return <PreviewComponent />
  }

  return (
    <div className="flex min-h-dvh w-full items-center">
      <PreviewComponent />
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(previewMap).map((slug) => ({ slug }))
}
