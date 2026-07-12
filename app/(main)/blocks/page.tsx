import type { Metadata } from "next";
import Link from "next/link";
import { getBlockCategoryPreview } from "@/components/block-category-preview-map";
import { Card, CardContent } from "@/components/ui/card";
import { categoryToSlug, getBlockGroups } from "@/lib/blocks";
import { pageMetadata, collectionPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = pageMetadata({
  title: "Blocks",
  description:
    "Browse 50+ free, copy-and-paste UI blocks for React, Next.js, and Tailwind CSS. Installable via the shadcn CLI, fully open source, and ready to customize.",
  path: "/blocks",
});

export default async function BlocksPage() {
  const groups = await getBlockGroups();

  return (
    <div className="mt-20 flex w-full flex-col gap-17 md:mt-30">
      <JsonLd
        data={collectionPageJsonLd({
          name: "Hex UI Blocks",
          description:
            "Free, copy-and-paste UI blocks for React, Next.js, and Tailwind CSS, installable via the shadcn CLI.",
          path: "/blocks",
          items: groups.map((group) => ({
            name: group.category,
            path: `/blocks/${group.categorySlug}`,
          })),
        })}
      />
      <div className="mx-auto w-full max-w-xl self-start text-center">
        <h1 className="mb-4 text-4xl font-bold text-neutral-800 dark:text-neutral-200">
          Building Blocks for the Web
        </h1>
        <p className="dark:text-neutral-400">
          Check out this collection of 50 Hex UI blocks! You can easily drop
          them into your project by copying and pasting or using the Shadcn CLI.
          Everything is totally free.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
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
    </div>
  );
}
