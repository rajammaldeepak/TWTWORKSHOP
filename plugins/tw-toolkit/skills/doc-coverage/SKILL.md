---
name: doc-coverage
description: Use when the user asks what's missing from a piece of documentation, wants a documentation-completeness or gap check, or asks "is this doc ready to publish?" for API references, feature guides, CLI/config guides, or release notes.
---

# Documentation Coverage Check

When invoked, assess how complete a piece of technical documentation is against the expected shape for its content type, and report concrete gaps — not a style review (that's a separate check-style pass).

## Step 1 — Identify the doc type

Look at the file's structure and content to classify it as one of:
- **API reference** (endpoint/method docs)
- **Feature/task guide** (how to accomplish something)
- **CLI or configuration reference** (commands, flags, parameters)
- **Release notes / changelog**

If it doesn't clearly fit one type, ask the user which it's meant to be rather than guessing.

## Step 2 — Check against the type's expected elements

**API reference** needs: a one-line purpose statement, HTTP method + path (or equivalent), auth/permissions required, request parameters with type and required/optional status, a request example, a response example (success case), and at least one error case.

**Feature/task guide** needs: a statement of what the reader will accomplish and why, prerequisites, numbered steps (each one action, imperative verb), an expected-result statement per major step or at the end, and a "what to do if it doesn't work" or troubleshooting note.

**CLI/config reference** needs: syntax line, a table or list of every flag/parameter with type, default value, and description, at least one full usage example, and notes on any interactions between flags (e.g., mutually exclusive options).

**Release notes** needs: a version/date header, entries grouped by New/Improved/Fixed, and no unexplained internal jargon.

## Step 3 — Report gaps

List missing or thin elements as a checklist (✅ present / ❌ missing / ⚠️ present but thin), with a one-line note on why each missing element matters to the reader. Do not rewrite the document — flag gaps and let the user decide whether the command `/tw-toolkit:check-style` or manual editing is the next step.

## Step 4 — Give a verdict

End with one of: **Ready to publish**, **Needs minor additions**, or **Not ready** — plus the single highest-priority gap to fix first.
