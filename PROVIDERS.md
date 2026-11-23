# Use Oz Manuscript with your assistant

Write and revise a book chapter by chapter, keep passage notes, and check continuity across a private manuscript.

## ChatGPT and Codex

[Download the ChatGPT and Codex package](https://raw.githubusercontent.com/OpZero-sh/oz-manuscript-plugin/downloads/oz-manuscript.zip). It includes the product skills, remote connection and product icon.

For a publisher or developer setup, open the OpenAI developer dashboard, choose **Upload plugin**, upload the one-connection ZIP and connect the declared MCP endpoint. People with an existing directory listing can install it directly in ChatGPT. For an OAuth-protected service select OAuth and complete its browser sign-in. Choose no authentication for a public service. The builder is not in this repository. To rebuild the archives, clone [OpZero-sh/plugins](https://github.com/OpZero-sh/plugins) beside this checkout and run `python3 ../plugins/tools/build_openai.py ../plugin-zips` from this checkout.

[OpenAI package guide](https://developers.openai.com/plugins/build/plugins) · [Upload and connection setup](https://developers.openai.com/plugins/deploy/submission)

## Claude

In Claude Code run `/plugin marketplace add OpZero-sh/plugins`, then `/plugin install oz-manuscript@opzero`. In Claude chat or Cowork, add the OpZero marketplace if available to your account and connect the services in the installed plugin’s **Connectors** tab.

## Grok Build

From a checkout of this repository, run `grok plugin validate .` and `grok plugin install .`. View installed capabilities with `grok plugin details oz-manuscript`. Grok Build reads the Claude-compatible plugin, its skills and MCP configuration. [Grok Build plugins](https://docs.x.ai/build/features/skills-plugins-marketplaces)

## Grok API

The example script is not in this repository. Clone [OpZero-sh/plugins](https://github.com/OpZero-sh/plugins) beside this checkout, then preview a request from this checkout with Python 3. Add `XAI_API_KEY` in your environment and omit `--dry-run` to send it. Use `--model` to select a model enabled for your account. The example requests a focused set of product tools; its tool list is in [grok-servers.json](integrations/grok-servers.json).

```sh
python3 ../plugins/tools/grok_example.py --dry-run 'Find where Mara first learns her father'"'"'s name. Compare that scene with chapter eight and quote both passages.'
```

For authenticated connections, obtain a current end-user OAuth access token for each named OpZero service in your application’s sign-in flow. Supply the unprefixed token in `OZ_MANUSCRIPT_ACCESS_TOKEN`. Your application manages consent, refresh and storage. The example attaches each token only to its own MCP server.

[Remote MCP tools in the xAI API](https://docs.x.ai/developers/tools/remote-mcp)

## Muse Code

From the repository root, validate and install the native plugin. Its skills load with the plugin. Set up the signed-in connection below to use them.

```sh
muse plugins validate .
muse plugins install .
```

For signed-in connections, merge the entries from [the settings fragment](integrations/muse-settings.json) into your existing `$XDG_CONFIG_HOME/muse/settings.json` (normally `~/.config/muse/settings.json`). Preserve the rest of your settings and use `schema_version: 1`. Start a fresh process and complete browser sign-in for each connection.

```sh
muse mcp login oz-manuscript
```

[How Muse handles OAuth](https://meta-models.github.io/muse-code-sdk/next/guides/extend/mcp-servers/)

[Muse Code plugins](https://meta-models.github.io/muse-code-sdk/next/guides/plugins/reference/manifest/)
