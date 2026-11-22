---
name: write-manuscript
description: Draft, revise, annotate or export a book-length manuscript in Oz Manuscript. Use when the user asks to start a manuscript, add or edit a chapter, see an outline with word counts, leave notes on a passage, reorder chapters, or export the whole manuscript.
---

# Write and revise a manuscript

Oz Manuscript (MCP server `oz-manuscript`) stores manuscripts per user. A manuscript is an ordered list of chapters written in Markdown, plus notes anchored to chapters. Manuscript and chapter ids are lowercase letters, digits and hyphens.

## Choosing a tool

| Request | Tool |
|---|---|
| See which manuscripts exist | `list_manuscripts` |
| Start a manuscript | `create_manuscript` |
| Chapters in order, with word and note counts | `get_outline` |
| Read a chapter, a section of it, or a page of it | `read_chapter` |
| Add a new chapter | `add_chapter` |
| Change a passage, or append to a chapter | `edit_chapter` |
| Replace a chapter's whole text, or rename it | `write_chapter` |
| Change chapter order | `reorder_chapters` |
| Comment on a passage without changing it | `add_note` |
| See open or resolved notes | `list_notes` |
| Close a note | `resolve_note` |
| Compile the manuscript, or a chapter range, into one Markdown document | `export_manuscript` |
| Write by hand in the editor view | `open_editor` |
| Remove a chapter or a manuscript | `delete_chapter`, `delete_manuscript` |

## Rules

1. Start from `get_outline`. Read one chapter at a time; a long chapter comes back as a section map, and `read_chapter` then takes a section or a page. Do not load a whole book into the conversation.
2. Keep the `revision` each read returns and pass it as `if_revision` on `write_chapter` and `edit_chapter`. A write against a stale revision is refused and nothing is written; reread and retry.
3. Prefer `edit_chapter` for a targeted change. `find` must match exactly once; widen it with surrounding text, or pass `all: true` to replace every occurrence.
4. When the user requests feedback in the conversation, give it there. For feedback the user wants saved in the manuscript, use `add_note` with a quoted passage.
5. `reorder_chapters` takes the full list of chapter ids in the new order.
6. `delete_chapter` and `delete_manuscript` are permanent, and deleting a chapter deletes its notes. Confirm with the user first.
