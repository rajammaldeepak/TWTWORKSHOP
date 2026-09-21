# Connecting to a remote MCP server (no plugin required)

You don't need to install the `tw-toolkit` plugin to use a remote MCP server — you can connect directly.

**One-line CLI command:**

```
claude mcp add deepwiki --transport http https://mcp.deepwiki.com/mcp
```

**Or drop this project-level `.mcp.json`** (already in this folder) into your project root — Claude Code will pick it up automatically and prompt you to approve it on first use.

Once connected, ask something like: "Using DeepWiki, summarize the architecture of `torvalds/linux`."
