---
name: review-with-notes
description: Give feedback on a manuscript as notes anchored to quoted passages, without changing the text, and work through existing notes. Use when someone says "leave notes on chapter 3", "mark where the pacing drags", "give me feedback but do not change anything", "what notes are open", "show the notes on this chapter", "resolve that note", or "go through my notes with me".
---

# Review a manuscript with notes

A note in Oz Manuscript (MCP server `oz-manuscript`) is a comment kept beside a chapter. It can quote the passage it is about. It stays open until it is resolved. Notes never change chapter text, which makes them the right tool when an author wants feedback and not edits.

## When to use

- The author asks for feedback, a critique or a read through to be saved in the manuscript.
- The author says not to change the text.
- The author wants to see, work through or close notes.

If the author asks for your opinion in the conversation, give it there. Save notes only when they want the feedback kept with the book. If you are unsure which they want, ask once.

## Tools

| Request | Tool | Arguments |
|---|---|---|
| Leave a note | `add_note` | `manuscript`, `chapter`, `note`, optional `quote` |
| See notes | `list_notes` | `manuscript`, optional `chapter`, `status` |
| Close a note | `resolve_note` | `manuscript`, `note_id`, optional `resolution` |

`chapter` is a chapter id or a position such as `"3"`. `status` is `open` (the default), `resolved` or `all`.

## Leave feedback as notes

1. Read the chapter with `read_chapter`, a section at a time if it is long.
2. Decide what is worth a note. A few notes that matter are better than many that do not. One note per issue.
3. For each, call `add_note` with:
   - `quote`: the exact passage the note is about, copied from the stored text. Keep it short, a phrase or a sentence, and long enough to find. The server refuses a quote that does not occur in the chapter. Line breaks and spacing may differ. Words and punctuation may not.
   - `note`: what you noticed and, where useful, one concrete option. Write to the author, plainly. Up to 4,000 characters.
4. Leave `quote` out for a comment on the chapter as a whole.
5. Tell the author how many notes you left and on which chapters. Do not change any text.

## Writing a useful note

- Say what the reader experiences at that point, then why, then one way to address it.
- Separate a slip (a typo, a name spelled two ways, a date that contradicts an earlier chapter) from a judgment (pacing, tone, motivation). Say which it is.
- Ask a question when you cannot tell what the author intended. Do not guess and correct.
- Respect choices that are clearly deliberate: dialect, fragments, an unreliable narrator.
- No praise for its own sake, and no rewriting of the passage inside the note unless the author asked for alternatives.

## Work through existing notes

1. `list_notes` with `manuscript`. Add `chapter` to see one chapter. Each note has `id`, `chapter`, `quote`, `note` and `status`.
2. Present them in chapter order, grouped by chapter.
3. For each note the author acts on:
   - If they want the text changed, make the edit with the `write-manuscript` skill, then resolve the note.
   - If they decide to leave the text as it is, resolve the note with their reason.
4. `resolve_note` with `note_id` and a `resolution` of a sentence saying how it was settled. The note is kept and shows under resolved notes.

Resolve a note only when the author says it is settled. An edit that touches the quoted passage does not close the note for you.

## Problems

- "The quote does not occur in chapter ...": copy the passage again from a fresh read, or note the chapter as a whole.
- "No note ...": list notes and use the id shown.
- "Note ... is already resolved": nothing to do. Tell the author.
- A manuscript holds up to 2,000 notes. Near that number, resolve or consolidate before adding more.

## Examples

"Read chapter 3 of The Salt Road and leave notes on passages where the pacing drags. Do not change the text."
`read_chapter`, then one `add_note` per slow passage with `quote` and a short reason. Reply with the count and a one line summary of each.

"What notes are still open on my novel?"
`list_notes` with the default status. Group by chapter and show the quote and the note.

"I fixed the timeline problem in chapter 5. Close that note."
`list_notes` for the chapter, find the note, `resolve_note` with a `resolution` that says what the author did.

## Limits

- Notes cannot be edited, reopened or deleted with these tools. To correct a note, resolve it with an explanation and add a new one.
- Deleting a chapter deletes its notes.
- Notes are not included in an export.
- A note keeps the text it quoted. If that passage is later edited, the quote in the note no longer matches the chapter.
