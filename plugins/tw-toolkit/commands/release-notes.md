---
description: Draft customer-facing release notes from a changelog or git log
argument-hint: <changelog text, or "git log" to read recent commits>
---

Using the input below, draft release notes for a documentation audience (not developers):

Input: $ARGUMENTS

Rules:
- Group entries under **New features**, **Improvements**, and **Fixes** — omit any heading with nothing under it.
- Rewrite each raw commit/changelog line into one plain, user-facing sentence describing what changed and why it matters to the reader — never just copy the commit message verbatim.
- Drop purely internal changes (refactors, CI, test-only commits, dependency bumps) unless they fix a user-visible bug.
- Order items within each group by user impact, most significant first.
- Keep each bullet to one line.

If the input looks like a request to read git history rather than pasted text, run `git log --oneline -20` first and use that output as the source material.
