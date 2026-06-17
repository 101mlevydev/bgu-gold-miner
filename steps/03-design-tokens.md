# Step 03 — Design tokens + RTL base + asset pipeline

**Phase:** Setup · **Status:** ✅ done (tokens + RTL base in `src/styles/base.css`) · **Depends on:** 02

## Goal
Encode the approved design into reusable tokens; set up local asset loading.

## Do
- `src/styles/tokens.(css|js)` — palette, type scale, spacing from the approved mockup.
- RTL base styles; a HUD overlay container layered over the Phaser canvas.
- `public/assets/` for sprites/audio (bundled locally, no CDN). Placeholder emoji/glyph atlas if
  no real art yet.
- A tiny `Copy` module stub (`src/lib/copy.js`) — central Hebrew strings (filled at Step 18).

## Files
- `src/styles/tokens.*`, `src/lib/copy.js`, `public/assets/.gitkeep`

## Done-when
- [ ] Tokens match the approved mockup; a sample sprite/text renders in the chosen palette, RTL.

## Verify
- Browser MCP screenshot vs the mockup; colors/type match. Commit `step 03: design tokens`.
