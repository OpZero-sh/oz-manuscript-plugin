# Reading long chapters, revisions and limits

Reference for the `oz-manuscript` server. Taken from the server's tool definitions and its public documentation page.

## Identifiers

- A manuscript id and a chapter id are lowercase letters, digits and hyphens. The server makes each one from the title when the manuscript or chapter is created. A second item with the same title gets a number on the end.
- Wherever a tool takes `chapter`, it accepts the chapter id or the chapter's position in the book as a string, such as `"3"`.
- `reorder_chapters` is the exception. Its `order` list takes chapter ids only.
- A note id looks like `note-` followed by ten characters.

## What `read_chapter` returns

Every result has `manuscript`, `chapter` (the id), `number`, `title`, `words`, `revision` and a `mode`.

| `mode` | When | Extra fields |
|---|---|---|
| `whole` | The chapter has about 1,500 words or fewer, or `whole: true` was passed, or the chapter is empty | `text` |
| `map` | The chapter is longer and has more than one headed section, and no `section` or `page` was asked for | `sections`: rows of `number`, `heading`, `words`, `opening` |
| `part` | A `section` or `page` was asked for, or the chapter is long and has no headings | `section` (number or null), `page`, `pages`, `text` |

Sections are split at Markdown headings of any level. Text before the first heading is a section named `(opening)`. Headings inside code fences are ignored.

`section` accepts the number from the map or the heading text. Heading text is matched without regard to case, first exactly and then as a part of a heading.

A page holds about 2,000 words and breaks between paragraphs. `page` starts at 1. Asking for a page past the end is an error that states how many pages there are.

## Revisions

- Every chapter read returns `revision`. Every chapter write returns the new one.
- `if_revision` on `write_chapter` or `edit_chapter` makes the write land only if the chapter still has that revision. Otherwise the answer is a revision conflict, nothing is written, and the message gives the current revision.
- `edit_chapter` also guards itself: if another write lands while it is running, it is refused.
- A rename with `write_chapter` (a `title` and no `text`) does not change the chapter text or its revision.
- A save in the editor view changes the revision like any other write.

## Result fields worth using

| Tool | Fields |
|---|---|
| `list_manuscripts` | `manuscripts`: rows of `id`, `title`, `author`, `chapters`, `words`, `updatedAt`. Newest first. |
| `get_outline` | `manuscript`: `id`, `title`, `author`, `description`, `words`, `updatedAt`, and `chapters`: rows of `number`, `id`, `title`, `words`, `openNotes`, `updatedAt` |
| `add_chapter` | `chapter` (new id), `number`, `title`, `words`, `revision` |
| `edit_chapter` | `mode` (`replace` or `append`), `replacements`, `words`, `revision` |
| `write_chapter` | `chapter`, `title`, `words`, `revision` |

## Limits

| Limit | Value |
|---|---|
| Characters in one chapter | 1,000,000 |
| Chapters in one manuscript | 500 |
| Notes in one manuscript | 2,000 |
| Title of a manuscript or chapter, and author | 200 characters |
| Manuscript description | 2,000 characters |
| Note text | 4,000 characters |
| Quoted passage on a note | 2,000 characters |
| Resolution text | 2,000 characters |

## Storage and privacy

Manuscripts are stored in private file storage on OpZero, keyed to the signed in account. Only that account can read or change them. They are kept until the user deletes them. A deleted chapter or manuscript cannot be restored.
