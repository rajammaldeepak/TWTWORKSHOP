---
description: Check a doc file against a plain, consistent technical-writing style
argument-hint: <path-to-doc>
---

Review the file at `$ARGUMENTS` for technical-writing style issues, and report findings grouped under these headings:

1. **Voice & tense** — flag passive voice and inconsistent verb tense (docs should use active voice, present tense, and second person "you" for instructions).
2. **Sentence length** — flag sentences over ~25 words; suggest a split.
3. **Terminology consistency** — flag the same concept referred to by two different terms (e.g., "log in" vs "sign in") within the same file.
4. **Procedural steps** — for any numbered list, confirm each step starts with an imperative verb (e.g., "Click", "Enter", "Run") and describes exactly one action.
5. **Undefined jargon/acronyms** — flag any acronym used before it's spelled out on first use.

For each finding, quote the offending line number and text, explain the issue in one sentence, and suggest a fix. End with a short summary count of issues found per category. Do not rewrite the whole file — only show the specific fixes.
