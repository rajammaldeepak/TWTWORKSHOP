# TWTWORKSHOP — a sample Claude Code marketplace for technical writers

A working **reference marketplace** built to show how the pieces fit together — a marketplace that lists a plugin, and a plugin that bundles a command, a skill, an agent, a hook, and (remote) MCP servers — plus a standalone script and a sample doc to test everything on.

## The hierarchy at a glance

```
TWTWORKSHOP/                          ← THIS REPO = a marketplace
├── .claude-plugin/
│   └── marketplace.json              ← the catalog (lists plugins)
├── plugins/
│   └── tw-toolkit/                   ← a PLUGIN (the installable bundle)
│       ├── .claude-plugin/plugin.json ← plugin manifest
│       ├── commands/                  ← COMMANDS (/tw-toolkit:check-style)
│       │   ├── check-style.md
│       │   └── release-notes.md
│       ├── skills/                    ← SKILL (auto-invoked SKILL.md)
│       │   └── doc-coverage/SKILL.md
│       ├── agents/                    ← AGENT (delegated subagent)
│       │   └── doc-auditor.md
│       ├── hooks/                     ← HOOK (event handler)
│       │   └── hooks.json
│       └── .mcp.json                  ← MCP SERVERS (remote, no setup)
├── examples/
│   └── remote-mcp/                    ← connect to an online MCP server (no plugin)
│       ├── .mcp.json
│       └── README.md
├── scripts/
│   └── check-links.mjs                ← a simple standalone SCRIPT
└── sample-docs/
    └── device-onboarding.md           ← a flawed doc to test everything on
```

> **Marketplace ≠ plugin.** The marketplace is the *catalog*; the plugin is the *thing you install*. One marketplace can list many plugins.

## Use it

```
/plugin marketplace add rajammaldeepak/TWTWORKSHOP   ← add the catalog
/plugin install tw-toolkit@twtworkshop                ← install the plugin
```

`twtworkshop` is the marketplace `name` from `marketplace.json` (not the repo name). After installing:

| Component    | How you use it                                                            |
| ------------ | --------------------------------------------------------------------------|
| Command      | `/tw-toolkit:check-style sample-docs/device-onboarding.md`                |
| Command      | `/tw-toolkit:release-notes <changelog or git log>`                        |
| Skill        | `doc-coverage` — auto-invoked when you ask "what's missing in this doc?"  |
| Agent        | `doc-auditor` — delegated for a full doc-set audit                        |
| MCP (remote) | Ask: "Using DeepWiki, summarize the architecture of repo X"               |

## The MCP servers are remote and safe

This repo uses **online, hosted** MCP servers so there's nothing to install or run — both are **read-only with no login or API key**:

| Server                           | URL                                 | What it does                                       |
| --------------------------------- | ------------------------------------| --------------------------------------------------- |
| **DeepWiki** (Cognition/Devin)    | `https://mcp.deepwiki.com/mcp`      | Ask questions about any public GitHub repo's docs  |
| **Claude Code Docs** (Anthropic)  | `https://code.claude.com/docs/mcp`  | Search the official Claude Code documentation      |

Installing the `tw-toolkit` plugin connects them automatically. To connect **without** the plugin, see [`examples/remote-mcp/`](./examples/remote-mcp).

## Try the standalone script (no install needed)

```
node scripts/check-links.mjs README.md
```

Dependency-free Markdown link checker (Node 18+). Reports broken http(s) links and missing relative files.

## Build your own marketplace (the 5-minute loop)

1. Create a GitHub repo.
2. Add `.claude-plugin/marketplace.json` at the root.
3. Add a plugin folder with `.claude-plugin/plugin.json` and your skills/commands.
4. Commit and push.
5. Share two lines: `/plugin marketplace add you/your-repo` and `/plugin install your-plugin@your-marketplace`.

This repo is the worked example.
