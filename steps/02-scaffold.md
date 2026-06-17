# Step 02 — Scaffold + git + env check

**Phase:** Setup · **Status:** ⏳ files authored — `npm install`/`build` pending tooling recovery · **Depends on:** 01 approved

## Goal
A running Vite + Phaser skeleton on a git branch.

## Do
- Verify toolchain: `node -v`, `npm -v`, `git --version`.
- `git init` (if needed); create branch `build/gold-miner`.
- `npm create vite@latest .` (vanilla JS template) in `bgu-gold-miner/`; add `phaser`.
- Phaser game config (portrait base, Scale.FIT, WebGL→Canvas fallback); empty scene registration.
- `index.html` → `<html dir="rtl" lang="he">`.
- `.gitignore` for `node_modules`, `dist`.

## Files
- `package.json`, `vite.config.js`, `index.html`, `src/main.js`, `.gitignore`

## Done-when
- [ ] `npm run dev` serves a blank Phaser canvas with no console errors.
- [ ] `npm run build` produces `dist/` static output.

## Verify
- `run` dev server; browser MCP loads the page; check console clean. Commit `step 02: scaffold`.
