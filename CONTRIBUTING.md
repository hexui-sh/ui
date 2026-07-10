# Contributing

Thanks for your interest in contributing to Hex UI. We're happy to have you here.

Hex UI is a collection of free, production-ready blocks with React, Next.js, and Tailwind CSS. Whether you're fixing a typo, improving a block, or adding a brand-new section, your contribution is welcome.

Before you start, please take a moment to look through the existing [Issues](https://github.com/ri0n-dev/hex-ui/issues) and [Pull Requests](https://github.com/ri0n-dev/hex-ui/pulls) to see if someone is already working on something similar. If you're planning a large change or a new feature, open an Issue first so we can discuss the direction before you invest time in implementation.

## Ways to Contribute

You don't need to write code to help. Common ways to contribute include:

- **Reporting bugs** — something doesn't render or behave correctly.
- **Suggesting features or improvements** — a new block, a variant, or a better UX.
- **Improving documentation** — fixing errors, clarifying steps, or adding examples.
- **Fixing existing components or blocks** — accessibility, responsive behavior, or visual bugs.
- **Adding new components or blocks** — see [Adding or Updating Blocks and Components](#adding-or-updating-blocks-and-components).
- **Improving accessibility, responsive behavior, and UX** — keyboard navigation, screen-reader support, mobile layouts.

## Repository Structure

Hex UI is a single Next.js application that also serves as the shadcn-style registry for its blocks.

```text
hex-ui/
├── app/                       # Next.js App Router
│   ├── (api)/                 # API routes (registry JSON, docs markdown)
│   ├── (main)/                # Main site (home, blocks, docs, templates, pricing)
│   ├── (view)/                # Block preview pages served at /view/[slug]
│   ├── globals.css            # Tailwind CSS entry and design tokens
│   ├── layout.tsx             # Root layout
│   └── not-found.tsx
├── components/                # Site-level and base UI components
│   ├── ui/                    # Reusable UI primitives (button, card, dialog, etc.)
│   ├── block-viewer.tsx       # Block preview and code viewer
│   ├── block-category-previews.tsx  # Hand-written category preview components
│   └── ...                    # Header, footer, navigation, MDX components
├── content/                   # MDX content and generated block metadata
│   ├── blocks/registry.json   # Generated — do not edit manually
│   └── docs/                  # Documentation MDX files
├── hooks/                     # React hooks (use-mobile, use-copy, use-theme-toggle, ...)
├── lib/                       # Utilities and data helpers
│   ├── utils.ts               # `cn()` class-name merge helper
│   ├── blocks.ts              # Block data access and navigation
│   ├── content.ts             # MDX content resolution
│   └── read-code-path.ts      # Reads block source files for the code viewer
├── registry/hex-ui/           # Block source files and meta.json
│   └── <category>/<slug>/
│       ├── meta.json          # Block metadata consumed by the generator
│       └── source/            # app/<category>/page.tsx + components/*.tsx
├── scripts/                   # Build scripts
│   └── generate-block-registry.mjs  # Generates registry, preview-map, category map
├── public/                    # Static assets and demos
├── components.json            # shadcn configuration (style: base-nova)
├── registry.json              # shadcn registry definition (items, dependencies, files)
├── eslint.config.mjs          # ESLint configuration
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Project manifest and scripts
└── pnpm-workspace.yaml        # pnpm workspace configuration
```

A few important notes:

- `registry/hex-ui/` holds the **source of truth** for every block. Each block's `source/` folder mirrors the structure users get when they install it (`app/<category>/page.tsx` and `components/*.tsx`).
- `content/blocks/registry.json`, `app/(view)/view/[slug]/preview-map.ts`, and `components/block-category-preview-map.ts` are **auto-generated** by `pnpm generate`. Do not edit them by hand.
- `registry.json` (at the repository root) is the shadcn registry definition that the CLI reads. It lists every item with its `dependencies`, `registryDependencies`, `files`, and `categories`.

## Local Development

Hex UI uses [pnpm](https://pnpm.io) as its package manager.

1. **Fork the repository** on GitHub.
2. **Clone your fork:**

   ```bash
   git clone https://github.com/your-username/hex-ui.git
   ```

3. **Move into the project directory:**

   ```bash
   cd hex-ui
   ```

4. **Create a working branch:**

   ```bash
   git checkout -b feat/my-feature
   ```

5. **Install dependencies:**

   ```bash
   pnpm install
   ```

6. **Start the development server:**

   ```bash
   pnpm dev
   ```

The site is available at the URL printed in your terminal (typically `http://localhost:3000`).

## Adding or Updating Blocks and Components

This section describes the actual workflow used by Hex UI. Use an existing block (for example `registry/hex-ui/hero/hero-1/`) as a reference while you work.

### 1. Create the block source files

Blocks are grouped by category under `registry/hex-ui/<category>/<slug>/`. Create a new folder with a `meta.json` file and a `source/` directory:

```text
registry/hex-ui/hero/hero-6/
├── meta.json
└── source/
    ├── app/hero/page.tsx        # Preview page (also imported by the site)
    └── components/              # Block components
        ├── app-hero.tsx
        └── ...
```

- The preview page at `source/app/<category>/page.tsx` is what the site renders at `/view/<slug>` and what users see when they install the block. Keep it self-contained and import only from the sibling `components/` folder or from `@/components/ui`.
- Component files live in `source/components/`. Use relative imports between them (e.g. `./cta-buttons`), as shown in existing blocks.

### 2. Add a `meta.json` file

Every block needs a `meta.json` with at least a `title` and `description`. The generator reads this file to build the site's block metadata.

```json
{
  "title": "Hero-6",
  "description": "A centered hero section with a product mockup",
  "installCommand": "pnpm dlx shadcn@latest add https://hexui.sh/r/hero-6.json",
  "v0Url": "https://v0.dev/chat/import?url=https://hexui.sh/r/hero-6.json"
}
```

`installCommand` and `v0Url` are optional — when omitted, the generator fills in sensible defaults based on the slug. The generator also supports optional `previewPath`, `codePath`, `files`, and `reference` fields, but the existing blocks only rely on `title`, `description`, `installCommand`, and `v0Url`.

### 3. Register the item in `registry.json`

Add a new entry to the `items` array in the root [`registry.json`](./registry.json). This is the definition the shadcn CLI reads when a user runs `pnpm dlx shadcn@latest add`.

```json
{
  "name": "hero-6",
  "type": "registry:block",
  "title": "Hero-6",
  "description": "A centered hero section with a product mockup",
  "registryDependencies": ["button"],
  "dependencies": ["lucide-react"],
  "files": [
    {
      "path": "registry/hex-ui/hero/hero-6/source/app/hero/page.tsx",
      "type": "registry:page",
      "target": "app/hero/page.tsx"
    },
    {
      "path": "registry/hex-ui/hero/hero-6/source/components/app-hero.tsx",
      "type": "registry:component"
    }
  ],
  "categories": ["hero"]
}
```

- **`dependencies`** — npm packages the block requires (e.g. `lucide-react`, `motion`).
- **`registryDependencies`** — other registry items the block depends on, referenced by their registry name (e.g. `button`, `accordion`, `@coss/select`). These resolve to other entries in `registry.json` or to configured external registries in `components.json`.
- **`files`** — each file the CLI should copy into the user's project, with its `type` (`registry:page`, `registry:component`, `registry:ui`, `registry:file`) and optional `target`.
- **`categories`** — the category the block belongs to (matches the folder name under `registry/hex-ui/`).

### 4. Generate the registry files

After adding or changing a block, run the generator:

```bash
pnpm generate
```

This script (`scripts/generate-block-registry.mjs`) scans `registry/hex-ui/` and writes three files:

- `content/blocks/registry.json` — block metadata used by the site navigation and block pages.
- `app/(view)/view/[slug]/preview-map.ts` — imports each block's preview page so it can be rendered at `/view/<slug>`.
- `components/block-category-preview-map.ts` — maps each category to its preview component.

These files are clearly marked with `// THIS FILE IS AUTO-GENERATED by \`pnpm generate\`. DO NOT EDIT MANUALLY.` **Never edit them by hand** — always re-run `pnpm generate` instead.

### 5. (Optional) Add a category preview

The block category index pages use preview components defined in `components/block-category-previews.tsx`. If you add a brand-new category and want a custom preview (rather than the generic fallback), add a new `<Name>CategoryPreview` function in that file. The generator detects exported functions matching the `*CategoryPreview` pattern and wires them up automatically in `components/block-category-preview-map.ts`.

### 6. Verify the block

- Run `pnpm dev` and open `/blocks/<category>` to confirm the block appears in the listing.
- Open `/view/<slug>` (for example `/view/hero-6`) to confirm the preview renders correctly on desktop and mobile, and in both Light Mode and Dark Mode.
- Open the block's detail page (for example `/blocks/hero/hero-6`) to confirm the code viewer shows the expected files.
- Verify the block can be installed through the CLI in a fresh project:

  ```bash
  pnpm dlx shadcn@latest add https://hexui.sh/r/hero-6.json
  ```

  When developing locally, you can point the CLI at your local registry route served at `/r/<slug>.json`.

### Adding documentation for a block

Block pages on the site are generated from the registry metadata and the block's source files — there is no separate MDX file required for each block. If your block introduces a new concept or needs usage notes, consider adding or updating a page under `content/docs/` instead (see [Documentation Guidelines](#documentation-guidelines)).

## Component Guidelines

Follow the patterns already used in the codebase. When in doubt, look at an existing block or component and match its style.

- **Use TypeScript** for all new components and pages.
- **Follow existing naming conventions and file organization.** Block component files are `kebab-case.tsx` and export named functions (e.g. `app-hero.tsx` exports `AppHero`).
- **Reuse existing UI components** from `components/ui/` (button, card, dialog, input, tabs, etc.) instead of reimplementing primitives.
- **Avoid duplicated code and unnecessary abstractions.** Extract a shared component only when it's genuinely reused.
- **Follow existing Tailwind CSS patterns.** Hex UI uses Tailwind CSS v4 with design tokens defined in `app/globals.css`. Use semantic color utilities such as `text-foreground`, `bg-card`, and `text-muted-foreground` so blocks adapt to Light Mode and Dark Mode automatically.
- **Support `className` where appropriate.** Accept a `className` prop and merge it with internal classes using the `cn()` helper from `@/lib/utils`:

  ```tsx
  import { cn } from "@/lib/utils"

  export function MyComponent({ className }: { className?: string }) {
    return <div className={cn("flex w-full flex-col", className)} />
  }
  ```

- **Support both desktop and mobile layouts.** Use responsive utilities (`md:`, `lg:`, …) and test at common breakpoints.
- **Consider keyboard navigation and screen readers.** Use semantic HTML, meaningful focus states, and ARIA attributes where appropriate. Interactive elements should be reachable and operable from the keyboard.
- **Verify both Light Mode and Dark Mode.** Every block should look correct in both themes.
- **Prioritize reusability and practical usage**, not only visual appearance. Blocks should be easy to install, read, and customize.
- **Avoid unnecessary dependencies.** Prefer the libraries already in `package.json`. Hex UI is built on [Base UI](https://base-ui.com) (`@base-ui/react`), [Radix UI](https://www.radix-ui.com), [Motion](https://motion.dev), and [Lucide](https://lucide.dev) icons. If a new dependency is truly required, justify it in your Pull Request description.

## Documentation Guidelines

When you add or change a component, block, or workflow, update the related documentation so it stays accurate. Documentation lives in `content/docs/` as MDX files with frontmatter:

```mdx
---
title: My Guide
description: A short summary used in navigation and metadata.
---

Content goes here.
```

- The `title` and `description` frontmatter fields drive the navigation label and page metadata.
- The file's path under `content/docs/` determines its URL. For example, `content/docs/get-started/introduction.mdx` is served at `/docs/introduction`.
- You can import and use site components inside MDX (for example `CodeBlockCommand` from `@/components/code-block-command`).

When adding or changing a block or component, verify the documentation covers (where applicable):

- Installation steps
- Usage examples
- A preview or demo
- Required dependencies
- Props or configuration
- Mobile behavior
- Accessibility considerations

Only include sections that match the existing documentation structure — don't force headings that don't fit.

## Commit Convention

Hex UI follows the [Conventional Commits](https://www.conventionalcommits.org/) format:

```text
type(scope): description
```

Common types:

| Type       | Use it for                                                          |
| ---------- | ------------------------------------------------------------------- |
| `feat`     | A new feature or block                                               |
| `fix`      | A bug fix                                                            |
| `refactor` | Code changes that neither fix a bug nor add a feature                |
| `docs`     | Documentation changes                                                |
| `style`    | Formatting or visual tweaks that don't change behavior               |
| `test`     | Adding or updating tests                                             |
| `build`    | Changes to the build system or dependencies                          |
| `ci`       | Changes to CI configuration                                          |
| `chore`    | Routine maintenance, tooling, or repo tasks                          |

Examples:

```text
feat(registry): add a new hero block
fix(docs): prevent code examples from overflowing on mobile
refactor(components): simplify button group styles
docs(contributing): add contribution guidelines
fix(blocks): correct sidebar alignment on small screens
chore(deps): upgrade lucide-react
```

Keep commit messages **short**, written in the **imperative mood** ("add", not "added" or "adds"), and **specific**.

## Before Submitting a Pull Request

Run the checks below before opening a Pull Request. Only commands defined in `package.json` are listed.

```bash
pnpm generate
pnpm lint
pnpm build
```

- `pnpm generate` — regenerates the registry metadata and preview maps.
- `pnpm lint` — runs ESLint over the codebase.
- `pnpm build` — runs the Next.js production build, which also performs TypeScript type checking.

Hex UI does not currently provide dedicated `format` or `test` scripts. Follow the existing code style and manually verify behavior on a few blocks before submitting.

Pre-submission checklist:

- [ ] `pnpm generate` has been run and generated files are up to date.
- [ ] `pnpm lint` passes with no errors.
- [ ] `pnpm build` passes with no type or build errors.
- [ ] No unnecessary files, debug code, or `console.log` statements are included.
- [ ] No unrelated changes are bundled into the same Pull Request.
- [ ] New dependencies have a clear justification in the Pull Request description.
- [ ] The change has been tested on **desktop** and **mobile** viewports.
- [ ] The change has been tested in **Light Mode** and **Dark Mode**.
- [ ] Keyboard interaction has been tested (focus, Tab/Shift+Tab, Escape, Enter/Space).
- [ ] Related documentation has been updated.
- [ ] Generated registry files (`content/blocks/registry.json`, `preview-map.ts`, `block-category-preview-map.ts`) are up to date and have not been hand-edited.
- [ ] Existing functionality has not been broken.

## Pull Request Guidelines

- **Keep each Pull Request focused on one purpose.** A PR should address a single bug, feature, or refinement.
- **Clearly describe what changed and why.** Reference the Issue your PR closes (for example `Closes #123`).
- **Link related Issues** so reviewers can see the full context.
- **Include screenshots or videos for UI changes.** Show both desktop and mobile, and both Light Mode and Dark Mode where relevant.
- **Clearly document breaking changes**, including any steps users need to take when upgrading.
- **Respond to review feedback** and be open to iterating. Push follow-up commits rather than force-pushing over reviewed commits when possible.
- **Avoid large unrelated refactors** in the same PR. Open a separate PR for them.

## Reporting Bugs

A good bug report helps us reproduce and fix the issue quickly. Please include:

- **A summary of the issue** — what happened, in one or two sentences.
- **Reproduction steps** — the exact actions needed to trigger the bug.
- **Expected behavior** — what you expected to happen.
- **Actual behavior** — what happened instead.
- **Screenshots or videos** — especially helpful for visual or layout issues.
- **Browser and operating system** — e.g. Chrome 124 on macOS 14, Safari on iOS 17.
- **Project or package version** — the version of Hex UI or the specific block you're using.
- **Relevant code or a minimal reproduction** — a link to a repo, a CodeSandbox, or the smallest code sample that reproduces the issue.

## Requesting Features or Blocks

Before proposing a new feature, component, or block, please check existing Issues to avoid duplicates. A useful request includes:

- **The problem being solved** — what's currently difficult or impossible.
- **The intended use case** — who needs it and how they'd use it.
- **Why existing functionality is insufficient** — what's missing from the current blocks.
- **A proposed design or API** — sketches, wireframes, or a rough component structure.
- **Relevant screenshots or reference links** — examples from other sites or libraries.
- **Whether you're willing to implement it** — so we can coordinate and support you.

## Ask for Help
For any help or questions, please open a new [issue](https://github.com/ri0n-dev/hex-ui/issues)