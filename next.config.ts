import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  outputFileTracingIncludes: {
    "/r/*": ["./registry.json"],
    "/blocks/*": [
      "./registry/blocks/**/source/**/*.ts",
      "./registry/blocks/**/source/**/*.tsx",
      "./registry/blocks/**/source/**/*.js",
      "./registry/blocks/**/source/**/*.jsx",
      "./registry/blocks/**/source/**/*.css",
      "./registry/blocks/**/source/**/*.json",
      "./registry/blocks/**/source/**/*.md",
      "./registry/blocks/**/source/**/*.mdx",
      "./registry/blocks/**/source/**/*.html",
      "./registry/blocks/**/source/**/*.yml",
      "./registry/blocks/**/source/**/*.yaml",
      "./registry/blocks/**/source/**/*.sh",
      "./registry/blocks/**/source/**/*.env"
    ],
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
