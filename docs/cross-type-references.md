# Cross-Type References

This document describes the unified `related` field format used across **projects**, **library**, and **notes**. It allows any entry to reference any other entry, regardless of type.

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
id: "01"
title: "东方斑樱汉化 Madarazakura"
# ... other fields ...
related:
  - "project:03"
  - "project:11"
  - "library:games-collection"
  - "note:portfolio-interface-v2"
---
```

### Library (`lib/data/library.ts`)

Library entries are currently hardcoded in TypeScript. Use the object form:

```ts
{
  id: 'lib-01',
  slug: 'realtime-collaborative-whiteboard',
  // ... other fields ...
  related: [
    { type: 'library', key: 'distributed-mesh-network-system' },
    { type: 'library', key: 'internal-tools-catalog' },
    { type: 'project', key: '11' },
    { type: 'note', key: 'distributed-systems-consistency' }
  ]
}
```

### Note (`lib/data/notes.ts`)

Notes are also hardcoded in TypeScript. Use the object form:

```ts
{
  slug: 'portfolio-interface-v2',
  title: 'Portfolio Interface v2.0 Deployed',
  // ... other fields ...
  related: [
    { type: 'project', key: '05' },
    { type: 'library', key: 'design-system-documentation' }
  ]
}
```

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

- [ ] The field name is `related`.
- [ ] Each item uses one of `project`, `library`, or `note` as the type.
- [ ] The key matches the target entry's `id` (projects) or `slug` (library/notes).
- [ ] `npx next build` completes without type errors.
- [ ] The related cards render correctly in the browser.
