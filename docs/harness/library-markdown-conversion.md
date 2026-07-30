# Library Markdown Conversion

This document describes how project archives (`docs/data/PROJECT_ARCHIVE/*.MD`) are converted into library entries, and how the corresponding Markdown source (`content/library/{slug}.md`) and hardcoded TypeScript entry (`lib/data/library.ts`) must be kept aligned.

## Source Layout

| Type | Archive source | Markdown source | Hardcoded data module |
| ---- | -------------- | --------------- | --------------------- |
| library | `docs/data/PROJECT_ARCHIVE/{NAME}.MD` | `content/library/{slug}.md` | `lib/data/library.ts` |

The detail page (`/library/[slug]`) reads from `lib/data/library.ts`. The Markdown file is the canonical archive mirror and must stay in sync with the TypeScript entry.

## Section Mapping

Every library entry uses six canonical sections. Source headings are mapped to these ids:

| Canonical id | Acceptable source headings |
| ------------ | -------------------------- |
| `overview` | PROJECT OVERVIEW, 项目概述, Overview |
| `scenario` | DESIGN MOTIVATION, 设计动机, Problem, Background |
| `solution` | SOLUTION, 解决方案, Approach |
| `architecture` | ARCHITECTURE, 架构, System Design, Architecture |
| `challenges` | ENGINEERING HIGHLIGHTS, 工程挑战, Challenges, Trade-offs |
| `outcome` | PROJECT VALUE, 项目价值, Outcome, Results |

## Content Extraction Rules

Map archive content to `LibrarySection` fields declared in `lib/data/types/library.ts`:

1. **First paragraph under a heading** → `section.body`. Keep it to one or two sentences; do not include lists, diagrams, or flow text.
2. **Entry summary** (`entry.summary`) → a one-line elevator pitch, independent from any section body. It should be shorter and more focused than `section.body` and must not be copied from the `overview` section verbatim.
3. **Unordered / ordered lists** → `section.bullets` (string array). Strip leading `-`, `*`, `1.` and any inline bold markers if they duplicate the bullet label.
4. **Text pipelines using `→` or arrows** → `section.diagram`. A short pipeline can be a single-line string; longer diagrams can use template literals with real line breaks.
5. **Mermaid blocks** → `heroSlides[].definition` (type `mermaid`) when they illustrate the whole entry; otherwise `section.diagram`.
6. **Labeled key/value pairs** (e.g. repeated `Label: Value`) → `section.table`.
7. **Fenced code blocks** (non-Mermaid) → `section.codeBlock`.

## Newline & Escaping Rules

- **Never** write `\n` or `join('\n')` in migration scripts or TypeScript source. In a JS/TS string literal, `\n` becomes the two visible characters `\` and `n`, which the detail page renders as text.
- Use real line breaks inside Markdown files.
- Use arrays (`bullets: [...]`) for lists in TypeScript; do not concatenate list items with `\n`.
- For multi-line `diagram` or `codeBlock` strings in TypeScript, use template literals with actual line breaks, or keep them as single-line flows when the component renders them in a `<pre>`.

## Pix Harness

Pix is the primary validation case for these rules.

### Input excerpt

See [`fixtures/pix-archive-excerpt.md`](fixtures/pix-archive-excerpt.md) for the relevant sections of `docs/data/PROJECT_ARCHIVE/PIX.MD`.

### Expected Markdown output

See [`fixtures/pix-library-expected.md`](fixtures/pix-library-expected.md) for the clean archive mirror that should land in `content/library/pix.md`.

### Expected TypeScript output

See [`fixtures/pix-library-expected.ts`](fixtures/pix-library-expected.ts) for the Pix entry in `lib/data/library.ts`.

Key takeaways from the Pix conversion:

- The six modules under `## Architecture` become `section.bullets`.
- The text execution flow becomes `section.diagram`.
- The four engineering challenges become `section.bullets`.
- The Harness pipeline under `## PROJECT VALUE` becomes `section.diagram`.
- The Mermaid diagrams live in `heroSlides` and are rendered by `TechnicalHeroVisual`.

## Common Mistakes

| Mistake | Why it fails |
| ------- | ------------ |
| Using `\n` inside `section.body` | The detail page renders `body` as plain text, so `\n` appears as visible characters. |
| Putting list items inside `body` | Lists in `body` are not rendered as `<ul>`; use `section.bullets`. |
| Concatenating bullets with `join('\n')` | Produces the same visible `\n` pollution. Use an array. |
| Forgetting to update `content/library/{slug}.md` | The Markdown source is the archive mirror; it must stay aligned with `lib/data/library.ts`. |

## How It Is Rendered

`app/library/_components/library-detail.tsx` renders each section like this:

- `section.body` → plain text inside `<p>`
- `section.bullets` → `<ul>` with an accent square marker
- `section.diagram` → `<pre>` monospace block
- `section.table` → `LibraryMetaTable`
- `section.codeBlock` → `<pre>` monospace block

Because `body` is not parsed as Markdown, structure must be explicit in the data shape.

## Validation

1. Save the files.
2. Run `npx next build`.
3. Open `/library/pix` and any other affected entries in a browser.
4. Confirm that lists render as bullets, flows render as diagram blocks, and no `\n` characters are visible.
5. Search `.next/server/app/library/{slug}.html` for `\n`; there should be no literal backslash-n sequences inside rendered `body` text.
6. Search the source for `body:.*\\n` in `lib/data/library.ts` and confirm there are no matches.

## Migration Checklist

When converting a new archive into a library entry:

- [ ] Map each heading to the correct canonical section id.
- [ ] Keep `section.body` to one or two sentences.
- [ ] Write `entry.summary` as a separate one-line pitch; do not reuse `overview.body`.
- [ ] Move lists into `section.bullets` as arrays.
- [ ] Move arrow flows into `section.diagram`.
- [ ] Move Mermaid blocks into `heroSlides` or `section.diagram`.
- [ ] Update both `content/library/{slug}.md` and `lib/data/library.ts`.
- [ ] Ensure no `\n` literals appear in `section.body` or the Markdown source.
- [ ] Run `npx next build` and visually verify the detail page.
