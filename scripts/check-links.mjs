#!/usr/bin/env node
// Dependency-free Markdown link checker (Node 18+).
// Usage: node scripts/check-links.mjs <file.md>
// Reports broken http(s) links and missing relative file links.

import fs from "node:fs";
import path from "node:path";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/check-links.mjs <file.md>");
  process.exit(1);
}

const text = fs.readFileSync(file, "utf8");
const baseDir = path.dirname(file);

// Matches [label](target) but skips links inside fenced code blocks.
const codeBlockRanges = [];
{
  const fenceRe = /```[\s\S]*?```/g;
  let m;
  while ((m = fenceRe.exec(text))) {
    codeBlockRanges.push([m.index, m.index + m[0].length]);
  }
}
function inCodeBlock(idx) {
  return codeBlockRanges.some(([s, e]) => idx >= s && idx < e);
}

const linkRe = /\[[^\]]*\]\(([^)]+)\)/g;
const links = [];
let match;
while ((match = linkRe.exec(text))) {
  if (inCodeBlock(match.index)) continue;
  links.push(match[1].trim());
}

if (links.length === 0) {
  console.log(`No links found in ${file}.`);
  process.exit(0);
}

let brokenCount = 0;

async function checkHttp(url) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (!res.ok) {
      // Some servers reject HEAD; retry with GET before flagging.
      const getRes = await fetch(url, { method: "GET", redirect: "follow" });
      if (!getRes.ok) return `HTTP ${getRes.status}`;
      return null;
    }
    return null;
  } catch (err) {
    return err.message || "request failed";
  }
}

function checkLocal(target) {
  const clean = target.split("#")[0];
  if (!clean) return null; // pure anchor link, skip
  const resolved = path.resolve(baseDir, clean);
  return fs.existsSync(resolved) ? null : "file not found";
}

const results = [];
for (const link of links) {
  if (/^https?:\/\//i.test(link)) {
    results.push({ link, type: "http" });
  } else if (!/^(mailto:|tel:)/i.test(link)) {
    results.push({ link, type: "local" });
  }
}

for (const r of results) {
  const problem =
    r.type === "http" ? await checkHttp(r.link) : checkLocal(r.link);
  if (problem) {
    brokenCount++;
    console.log(`BROKEN  ${r.link}  (${problem})`);
  }
}

console.log(
  `\nChecked ${results.length} link(s) in ${file}: ${brokenCount} broken.`
);
process.exit(brokenCount > 0 ? 1 : 0);
