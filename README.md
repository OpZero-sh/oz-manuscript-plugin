# Oz Manuscript

Keep a book in order while you work on the sentence in front of you. Oz Manuscript gives you ordered chapters, passage notes and a continuity editor that can follow one detail across a book. Your manuscript stays in your signed-in OpZero account across conversations.

[Connect with Claude, ChatGPT, Muse Code, or Grok](PROVIDERS.md)

> “Find where Mara first learns her father's name. Compare that scene with chapter eight and quote both passages.”

> “Append this paragraph to chapter three, then export chapters one through three as a single Markdown document.”

## Use it in Claude Code

```sh
claude plugin marketplace add OpZero-sh/plugins
claude plugin install oz-manuscript@opzero
```

Open `/mcp` and sign in to **oz-manuscript** with OpZero. Use `/oz-manuscript:write-manuscript` to start a book, revise a passage, save an editorial note or export chapters. The **continuity-editor** agent has read-only access to the manuscript tools it needs to compare chapters and return evidence.

For chapter edits, the plugin includes a local hook that requires the revision from the most recent read. The server checks that revision at save time. If your editor has a newer draft, Claude rereads it before applying the requested change. The hook uses Node.js on your PATH and runs only for this plugin's edit and rewrite tools.

[Oz Manuscript and account documentation](https://oz-manuscript.mcp.opzero.sh/)
