import Link from "next/link";
import { getBlockCategoryPreview } from "@/components/block-category-preview-map";
import { Card, CardContent } from "@/components/ui/card";
import { categoryToSlug, getBlockGroups } from "@/lib/blocks";

export default async function Blocks() {
  const groups = await getBlockGroups();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {groups.map(({ category, blocks: categoryBlocks }) => {
        const categorySlug = categoryToSlug(category);
        const CategoryPreview = getBlockCategoryPreview(categorySlug);

        return (
          <Link key={category} href={`/blocks/${categorySlug}`}>
            <Card className="w-full cursor-pointer overflow-hidden rounded-xs bg-transparent py-0 ring-0">
              <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border-3 bg-neutral-50 p-3 dark:bg-neutral-950">
                <CategoryPreview
                  category={category}
                  categorySlug={categorySlug}
                />
              </div>
              <CardContent className="px-0 pb-8">
                <h3 className="text-base font-semibold text-foreground">
                  {category}
                </h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {categoryBlocks.length}{" "}
                  {categoryBlocks.length === 1 ? "Block" : "Blocks"}
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
