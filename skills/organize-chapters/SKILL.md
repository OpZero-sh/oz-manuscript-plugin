---
name: organize-chapters
description: Restructure a manuscript in Oz Manuscript by reordering, inserting, renaming, splitting, merging or deleting chapters, or delete a whole manuscript. Use when someone says "move this chapter before that one", "reorder my chapters", "insert a chapter after chapter 2", "rename chapter 4", "split this chapter in two", "merge these chapters", "delete this chapter", or "delete this manuscript".
---

# Organize the chapters of a manuscript

Structure changes in Oz Manuscript (MCP server `oz-manuscript`). Reordering and renaming are safe: no text changes. Splitting and merging move text between chapters and need care. Deleting is permanent.

## Before any structure change

Call `get_outline` and work from what it returns: chapter numbers, ids, titles and word counts. Chapter positions shift as soon as you add, move or delete one, so refer to chapters by id once you have the outline, and fetch the outline again after each change.

## Reorder

`reorder_chapters` with `manuscript` and `order`: every chapter id of the manuscript, exactly once, in the new order.

- Use ids, not positions.
- Leaving one out, repeating one or naming one that does not exist is refused, and the message says which.
- Chapter text is not touched.

Show the author the new order as a numbered list before you call it when more than one chapter moves.

## Insert a chapter

`add_chapter` with `manuscript`, `title`, optional `text`, and `position`: 1 for first, or leave it out to add at the end. A position more than one past the last chapter is refused.

## Rename a chapter

`write_chapter` with `manuscript`, `chapter`, `title` and `if_revision`, and no `text`. The text stays as it is. The chapter id does not change when the title does. In Claude Code this plugin's hook requires `if_revision` on every `write_chapter` call, so read the chapter first even for a rename.

There is no tool to rename a manuscript or change its author or description.

## Split a chapter

1. `read_chapter` with `whole: true` and keep `revision`. Agree the split point with the author and quote the sentence where the second part begins.
2. `add_chapter` with the second part as `text`, a title from the author, and `position` one after the original.
3. Read the new chapter back and check it is complete.
4. Only then remove the second part from the original: `write_chapter` on the original with the first part as `text` and `if_revision`.

Create first, cut second. If anything fails between the two, the text exists twice instead of nowhere.

## Merge two chapters

1. Read both chapters in full and keep the revision of the one you will keep.
2. `edit_chapter` on the kept chapter with `append` set to the other chapter's text and `if_revision`.
3. Read the merged chapter and check the join and the word count.
4. Notes do not move. `list_notes` for the chapter that will be removed and tell the author which notes will be lost. Offer to add them again on the merged chapter.
5. Ask before deleting the now redundant chapter. Then `delete_chapter`.

## Delete a chapter or a manuscript

Both are permanent. There is no undo and no trash.

1. Say exactly what will be deleted: title, id, word count, and for a chapter how many notes go with it (`get_outline` shows open notes; `list_notes` with `status: "all"` shows every note).
2. Offer an export first (`export-manuscript`) so the author has a copy.
3. Wait for a clear yes that names the chapter or manuscript.
4. `delete_chapter` with `manuscript` and `chapter`, or `delete_manuscript` with `manuscript`.

A request such as "clean up the draft" or "remove the weak chapters" is not enough to delete. Ask which ones. In Claude Code this plugin's hook asks for confirmation before either delete runs.

## Problems

- "Chapter ... appears more than once in order", "Not chapters of ...", "The order leaves out ...": rebuild `order` from a fresh outline.
- "Position N is past the end": use the last valid position given in the message.
- "Manuscript ... already has 500 chapters": that is the most one manuscript holds.
- "Revision conflict ...": the chapter changed. Read again before continuing a split or merge.

## Examples

"Move the chapter Harbour Lights before Departure."
`get_outline`. Build `order` with the id of Harbour Lights ahead of the id of Departure and the rest unchanged. `reorder_chapters`. Reply with the new numbered order.

"Split chapter 6 where Mara leaves the town."
Read it whole, confirm the sentence, `add_chapter` at position 7 with the second half, verify, then `write_chapter` on chapter 6 with the first half.

"Delete chapter 9."
Outline, state title, words and notes, offer an export, wait for yes, `delete_chapter`.

## What to tell the user

The new chapter order as a numbered list after any change that moves chapters, and for a delete exactly what was removed.
