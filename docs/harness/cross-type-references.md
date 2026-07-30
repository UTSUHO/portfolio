# Cross-Type References

This document describes the unified `related` field format used across **projects**, **library**, and **notes**. It allows any entry to reference any other entry, regardless of type.

## Source Layout

Each type has a dedicated source location. External or archived Markdown files (e.g. `docs/data/PROJECT_ARCHIVE/*.MD`) are first converted into the corresponding source file, then the hardcoded data modules are updated incrementally.

| Type    | Source file               | Hardcoded data module | Conversion harness                                             |
| ------- | ------------------------- | --------------------- | -------------------------------------------------------------- |
| project | `content/projects/{id}.md` | `lib/data/projects.ts` | `docs/harness/project-markdown-conversion.md`                  |
| library | `content/library/{slug}.md` | `lib/data/library.ts` | `docs/harness/library-markdown-conversion.md`                  |
| note    | `content/notes/{slug}.md` | `lib/data/notes.ts`   | (notes keep full Markdown rendering; no conversion harness yet) |

Projects, library, and notes now all read from hardcoded TypeScript modules. The Markdown files in `content/` remain archive mirrors. Always update the TypeScript entry and the Markdown source together.

When a conversion is requested, the user must explicitly specify the target type (`project` or `library`). The agent must then follow the corresponding harness:

- **project** → `docs/harness/project-markdown-conversion.md`
- **library** → `docs/harness/library-markdown-conversion.md`

## Overview

Previously, references were type-locked:

- projects used `relatedIds: string[]`
- library used `relatedSlugs: string[]`
- notes had no reference field at all

Now all three types share a single `related` field with an explicit type prefix:

```yaml
related:
  - "project:01"
  - "library:realtime-collaborative-whiteboard"
  - "note:portfolio-interface-v2"
```

## Reference Format

Each reference has the form `{type}:{key}`.

| Type      | Key field | Example                                  |
| --------- | --------- | ---------------------------------------- |
| `project` | `id`      | `"project:01"`, `"project:11"`           |
| `library` | `slug`    | `"library:realtime-collaborative-whiteboard"` |
| `note`    | `slug`    | `"note:portfolio-interface-v2"`          |

The parser also accepts an explicit object form, which is useful in TypeScript files:

```ts
{ type: 'project', key: '01' }
{ type: 'library', key: 'realtime-collaborative-whiteboard' }
{ type: 'note', key: 'portfolio-interface-v2' }
```

Invalid references are silently filtered out at build time; they will not crash the page.

## Per-Type Examples

### Project (`content/projects/*.md`)

Add the `related` field to the YAML frontmatter:

```yaml
---
id: "11"
title: "CAD 模型面片标注工具"
# ... other fields ...
related:
  - "project:12"
  - "library:api-disruptor"
  - "note:building-with-webgl"
---
```

### Library (`lib/data/library.ts`)

Library entries are currently hardcoded in TypeScript. Use the object form:

```ts
{
  id: 'lib-05',
  slug: 'api-disruptor',
  // ... other fields ...
  related: [
    { type: 'project', key: '11' },
    { type: 'library', key: 'codequeen' },
    { type: 'library', key: 'touhou-m1-comedy-series' }
  ]
}
```

### Note (`lib/data/notes.ts`)

Notes are also hardcoded in TypeScript. Use the object form:

```ts
{
  slug: 'building-with-webgl',
  title: 'Building with WebGL: What I Learned',
  // ... other fields ...
  related: [
    { type: 'project', key: '11' }
  ]
}
```

## Cross-Type Reference Harness

The harness uses the real converted entries in the repo. It exercises all three content types in one reference cycle:

- Project source: `content/projects/11.md`
  - related: `project:12`, `library:api-disruptor`, `note:building-with-webgl`
- Library source: `content/library/api-disruptor.md`
  - TypeScript entry: `lib/data/library.ts` (`api-disruptor`)
  - related: `{ type: 'project', key: '11' }`, `{ type: 'library', key: 'codequeen' }`, `{ type: 'library', key: 'touhou-m1-comedy-series' }`
- Note source: `content/notes/building-with-webgl.md`
  - TypeScript entry: `lib/data/notes.ts` (`building-with-webgl`)
  - related: `{ type: 'project', key: '11' }`

Use this harness as the primary validation case whenever changing the `related` parser, resolver, or rendering components.

## ID / Key Mapping

- **project**: the numeric string `id` defined in `content/projects/*.md` frontmatter (e.g. `01`, `11`).
- **library**: the kebab-case `slug` defined in `lib/data/library.ts`.
- **note**: the kebab-case `slug` defined in `lib/data/notes.ts`.

## Common Mistakes

| Mistake                                | Why it fails                                              |
| -------------------------------------- | --------------------------------------------------------- |
| Using `relatedIds` or `relatedSlugs`   | These old field names are no longer read.                 |
| Missing type prefix (`"01"`)           | The parser expects `"project:01"` and rejects bare keys.  |
| Using project slug instead of id       | Projects are looked up by `id`, not slug.                 |
| Using library/note title instead of slug | Library and notes are looked up by `slug`.               |
| Typo in type (`"projects"`)            | Only `project`, `library`, and `note` are valid.          |

## How It Is Rendered

Resolved references appear at the bottom of the detail page in a panel titled **RELATED** (or **RELATED ARCHIVES** on library pages). Each card shows:

- a type label (`PROJECT`, `ARCHIVE`, or `NOTE`)
- the entry title
- a secondary line (category/year, type/category, or category/date)

## Validation

1. Save the file.
2. Run `npx next build`.
3. If the build succeeds, the references are syntactically valid.
4. Open the detail page in a browser and scroll to the related section to confirm the links appear.

Because invalid references are filtered silently, always visually verify that the expected cards render.

## Migration Checklist

When adding or updating references:

- [ ] Convert the external Markdown file to the correct source location (`content/projects`, `content/library`, or `content/notes`).
- [ ] For library/note entries, also update the hardcoded entry in `lib/data/library.ts` or `lib/data/notes.ts`.
- [ ] The field name is `related`.
- [ ] Each item uses one of `project`, `library`, or `note` as the type.
- [ ] The key matches the target entry's `id` (projects) or `slug` (library/notes).
- [ ] `npx next build` completes without type errors.
- [ ] The related cards render correctly in the browser.
