---
name: write-manuscript
description: Start a book in Oz Manuscript, draft and add chapters, read a chapter or a section of it, and revise a passage. Use when someone says "start a new manuscript", "add a chapter", "append this to chapter three", "show me the outline with word counts", "read chapter 4", "replace the paragraph that begins", "rewrite this scene", or "open the manuscript editor".
---

# Write and revise a manuscript

Oz Manuscript (MCP server `oz-manuscript`) keeps book length writing in the signed in user's private storage. A manuscript has a title, an author and an ordered list of chapters. Each chapter is Markdown. The book stays there between conversations, so the author never has to paste it back in.

Feedback as notes is in `review-with-notes`. Reordering, renaming, splitting and deleting chapters is in `organize-chapters`. Compiling the book into one document is in `export-manuscript`.

## The author's text comes first

This is someone's own book. Change only what they asked you to change, in the smallest way that does it. When they ask what you think, tell them in the conversation or leave a note. Do not rewrite a passage to show them. Never tidy, reformat or "improve" text outside the request.

## Tools

| Request | Tool | Key arguments |
|---|---|---|
| Which manuscripts exist | `list_manuscripts` | none |
| Start a manuscript | `create_manuscript` | `title`, optional `author`, `description` |
| Chapters in order with word and open note counts | `get_outline` | `manuscript` |
| Read a chapter, a section or a page | `read_chapter` | `manuscript`, `chapter`, optional `section`, `page`, `whole` |
| Add a new chapter | `add_chapter` | `manuscript`, `title`, optional `text`, `position` |
| Change a passage, or add to the end | `edit_chapter` | `manuscript`, `chapter`, `find` with `replace`, or `append`, and `if_revision` |
| Replace a chapter's whole text | `write_chapter` | `manuscript`, `chapter`, `text`, `if_revision` |
| Write by hand in the editor view | `open_editor` | optional `manuscript`, `chapter` |

`manuscript` is an id such as `the-salt-road`, as `list_manuscripts` returns it. `chapter` is a chapter id from the outline, or its position as a string such as `"3"`.

How long chapters are read, how revisions work, and the limits are in [references/reading-and-revisions.md](references/reading-and-revisions.md).

## Steps

### Find the book

Call `list_manuscripts`. Match the title the user gave. If two manuscripts fit, ask which one. Then call `get_outline`: it is the cheap way to see a whole book and it returns no chapter text.

### Start a book

`create_manuscript` with `title`, and `author` and `description` if the user gave them. The result carries the new id. It never replaces an existing manuscript: a second book with the same title gets an id with a number on the end. Then `add_chapter` for the first chapter.

### Read

1. `read_chapter` with `manuscript` and `chapter`. A chapter of up to about 1,500 words comes back whole.
2. A longer chapter with headings comes back as a section map: each section's number, heading, word count and opening words. Call again with `section` set to the number or the heading text.
3. A section or an unheaded chapter longer than about 2,000 words comes back one page at a time. Pass `page` to read on. The result says how many pages there are.
4. Keep the `revision` from the read. Every answer carries it.

Read one chapter at a time, and only the chapters the task needs. Do not load a whole book into the conversation. Pass `whole: true` only when the user needs the entire chapter at once and it is of reasonable length.

### Revise a passage

1. Read the chapter, or the section that holds the passage, and keep `revision`.
2. Call `edit_chapter` with `find` copied exactly from the stored text, `replace` with the new text, and `if_revision`.
3. `find` must occur exactly once in the chapter. If it occurs more often, add neighboring words until it is unique. Pass `all: true` only when the author wants every occurrence changed, such as a renamed character, and tell them how many were replaced.
4. An empty `replace` deletes the passage.

### Add to a chapter

`edit_chapter` with `append` and `if_revision`. The text is added at the end as a new paragraph. Do not send `find` and `append` in one call.

### Rewrite a whole chapter

`write_chapter` with the complete new `text` and `if_revision`. The previous text is overwritten and cannot be brought back, so use it only when the author asked for a full rewrite or supplied the new chapter themselves. For anything smaller, use `edit_chapter`.

### Open the editor

`open_editor` shows an editing view in hosts that support MCP Apps: chapter navigation, an editing area with save, word counts and the open notes of the chapter. With no arguments it lists manuscripts. Use it when the author wants to write by hand. After they have been in the editor, read the chapter again before you change it: their saves give it a new revision.

## Revisions

Pass the `revision` from your last read as `if_revision` on every `edit_chapter` and `write_chapter`. If the chapter changed since that read, the write is refused and nothing is written. Read the chapter again, look at what changed, and reapply your change to the new text. Do not retry blind.

In Claude Code this plugin's hook blocks an `edit_chapter` or `write_chapter` call that has no `if_revision`, and tells you to read the chapter first.

## Problems

- "No manuscript with id ...": list manuscripts and use the id shown.
- "No chapter ...": the message lists the chapters. Use an id or a position from it.
- "The find text does not occur ...": it must match the stored text exactly, including punctuation and line breaks. Read again and copy it.
- "The find text occurs N times ...": widen `find`.
- "Revision conflict ...": read again and reapply.
- Chapter text over the limit: split it into more chapters.

## What to tell the user

The chapter and what changed, in a sentence, with the new word count the tool returned. For a new book or chapter, its title and id. Do not paste the chapter back unless asked.

## Examples

"Start a new manuscript called The Salt Road and add a first chapter titled Departure with this opening scene."
`create_manuscript`, then `add_chapter` with `title` and `text`. Reply with the manuscript id and the chapter's word count.

"In chapter 2, replace the paragraph that begins 'The harbour was empty' with this revision."
`read_chapter` on `"2"`. Find the paragraph and copy it exactly. `edit_chapter` with `find`, `replace` and `if_revision`. Reply with the new word count.

"Show me the outline of my novel with the word count of each chapter."
`list_manuscripts`, then `get_outline`. Reply with a numbered list of titles and word counts and the total.

## Limits

- A chapter holds up to one million characters. A manuscript holds up to 500 chapters and 2,000 notes.
- There is no version history. An overwritten or deleted chapter cannot be restored. Suggest an export before a large rewrite.
- Word counts are counts of whitespace separated words in the Markdown, so headings and markup count too.
- The editor view needs a client that supports MCP Apps. Elsewhere the tools work as text.
