---
name: export-manuscript
description: Compile an Oz Manuscript book, or a range of its chapters, into a single Markdown document. Use when someone says "export my manuscript", "give me the whole book as one document", "export chapters one through three", "I need a copy of my book", "back up my manuscript", or "compile the draft so I can send it".
---

# Export a manuscript as one document

`export_manuscript` on the `oz-manuscript` server compiles chapters into one Markdown document and returns the text. It reads only. Nothing in the manuscript changes.

## When to use

- The author wants the book, or part of it, as one document.
- The author wants a copy before a risky change such as a large rewrite or a delete.
- The author wants to take the text elsewhere: a word processor, a typesetting tool, an editor or an agent.

## Steps

1. Find the manuscript id with `list_manuscripts` if you do not have it.
2. Call `get_outline` to see chapter count and total words. Use it to decide whether to export the whole book or a range.
3. Call `export_manuscript` with `manuscript`. For part of the book add `from_chapter` and `to_chapter`. These are chapter positions as numbers, counted from 1, and both ends are included.
4. Deliver the result the way the author asked: as a file when you can write files, otherwise as text in the conversation.

## What the document looks like

- A level one heading with the manuscript title.
- A line with "by" and the author, when an author is set.
- Each chapter under a level two heading with its title, in manuscript order.
- Headings inside a chapter are moved one level down so they sit under the chapter heading.
- If a chapter's text opens with a heading that repeats its own title, that heading is dropped so the title is not printed twice.

Notes are not part of the export. Neither is the description.

## Size

The tool returns the whole text in one result. A full book can be very long. Before exporting everything into the conversation:

- If you can write files, save the result to a file and tell the author where it is. Do not also paste it.
- If you cannot, tell the author the word count from the outline and offer to export in ranges of a few chapters.
- Do not summarize or shorten an export. The author asked for their text. Deliver it complete or say that you could not.

## Problems

- "Manuscript ... has no chapters to export yet": there is nothing to compile.
- "Chapter range ... is not valid": the range runs past the last chapter or is reversed. The message gives the chapter count.
- "No manuscript with id ...": list manuscripts and use the id shown.

## Examples

"Export The Salt Road as one markdown document."
`list_manuscripts` for the id, `export_manuscript`. Save as a file if possible and say where. Report chapters and words from the result.

"Export chapters one through three."
`export_manuscript` with `from_chapter: 1` and `to_chapter: 3`.

"Back up my book before I rewrite the ending."
`export_manuscript` for the whole book, saved to a file. Confirm the copy exists before any rewrite starts.

## Limits

- The output is Markdown only. Converting to other formats is done with other tools after the export.
- An export is a copy at one moment. It does not update when the manuscript changes.
- There is no import tool. To bring text in, add chapters with the `write-manuscript` skill.
