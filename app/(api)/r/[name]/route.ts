import { loadRegistryItem, RegistryItemNotFoundError } from "shadcn/registry"

export async function GET(
  _request: Request,
  context: {
    params: Promise<{
      name: string
    }>
  }
) {
  const { name } = await context.params
  const itemName = name.replace(/\.json$/, "")

  try {
    const item = await loadRegistryItem(itemName)
    return Response.json(item)
  } catch (error) {
    if (error instanceof RegistryItemNotFoundError) {
      return Response.json(
        { error: `Registry item "${itemName}" was not found.` },
        { status: 404 }
      )
    }
    console.error(error)
    return Response.json(
      { error: "Failed to load registry item." },
      { status: 500 }
    )
  }
}
