# Oz Manuscript

Keep a book in order while you work on the sentence in front of you. Oz Manuscript gives you ordered chapters, passage notes and a continuity editor that can follow one detail across a book. Your manuscript stays in your signed in OpZero account across conversations.

[Connect with Claude, ChatGPT, Muse Code, or Grok](PROVIDERS.md)

> “Find where Mara first learns her father's name. Compare that scene with chapter eight and quote both passages.”

> “Append this paragraph to chapter three, then export chapters one through three as a single Markdown document.”

> “Read chapter 3 and leave notes on passages where the pacing drags. Do not change the text.”

## What is in the plugin

### Skills

| Skill | What it does |
|---|---|
| `write-manuscript` | Starts a book, adds chapters, reads a chapter whole or a section at a time, and revises a passage against the revision that was read. |
| `review-with-notes` | Leaves feedback as notes anchored to quoted passages without changing the text, lists notes and resolves them with the author. |
| `organize-chapters` | Reorders, inserts, renames, splits and merges chapters, and deletes a chapter or a manuscript after an explicit confirmation. |
| `export-manuscript` | Compiles the book or a range of chapters into one Markdown document. |

The `write-manuscript` folder holds a `references` file on reading long chapters, revision checks and limits. Claude reads it when it needs it.

### Agent

`continuity-editor` checks one detail across chapters, such as what a character knows, a date or a name, and returns quoted evidence with chapter references. It can only read: its tools are `list_manuscripts`, `get_outline`, `read_chapter` and `list_notes`. It makes no changes to the book.

### Hooks

None. The plugin has no hooks and runs no code on your machine.

The skills carry the safeguards instead. They tell Claude to read a chapter and pass its revision as `if_revision` on every `edit_chapter` and `write_chapter`. The server checks that revision at save time, and if you saved a newer draft in the editor the write is refused and nothing is lost. `delete_chapter` and `delete_manuscript` are permanent, so the skills tell Claude to name what would be deleted and wait for your clear yes.

## What the plugin connects to and sends

- **MCP server.** The plugin connects to one remote server at `https://oz-manuscript.mcp.opzero.sh/mcp`. You sign in with a free OpZero account using OAuth. No API key is stored in the plugin.
- **What is sent.** The server receives what Claude sends to its tools: titles, chapter text, notes and the ids of the manuscript and chapter being worked on. It stores your writing in private storage keyed to your account. Nothing is published or shared with other users.
- **What is not sent.** The plugin has no telemetry and makes no other network calls of its own.

### Optional files for other clients

These files are not run by Claude. They exist so the same product can be used from other assistants. The two scripts that use them are not in this repository. They live in the catalog repository, [OpZero-sh/plugins](https://github.com/OpZero-sh/plugins).

- The catalog's `tools/build_openai.py` builds a ZIP package for ChatGPT and Codex from this repository's skills, license, the product icon and `integrations/openai`. It reads local files and writes ZIP files to the folder you name. It makes no network calls.
- The catalog's `tools/grok_example.py` is a sample for the xAI API. It runs only when you run it. It reads `integrations/grok-servers.json`. With `--dry-run` it prints a request and sends nothing. Without it, the script reads `XAI_API_KEY` from your environment and sends one request to `https://api.x.ai/v1/responses`. If `OZ_MANUSCRIPT_ACCESS_TOKEN` is set, that OpZero access token is included in the request so that xAI can call the Oz Manuscript server for you.
- `integrations/grok-servers.json`, `integrations/muse-settings.json` and the files under `integrations/openai` are configuration for those clients. They contain the same server URL and no credentials.

## Limits

- A chapter holds up to one million characters. A manuscript holds up to 500 chapters and 2,000 notes.
- A deleted chapter or manuscript cannot be restored, and there is no version history. Export before a large rewrite.
- The editor view needs a client that supports MCP Apps. Elsewhere the same tools work as text.

## Use it in Claude Code

```sh
claude plugin marketplace add OpZero-sh/plugins
claude plugin install oz-manuscript@opzero
```

Open `/mcp` and sign in to **oz-manuscript** with OpZero. Use `/oz-manuscript:write-manuscript` to start a book or revise a passage, `/oz-manuscript:review-with-notes` to save editorial notes, `/oz-manuscript:organize-chapters` to restructure, and `/oz-manuscript:export-manuscript` to compile chapters.

[Oz Manuscript and account documentation](https://oz-manuscript.mcp.opzero.sh/)
