# Step 05 — BootScene

**Phase:** Core · **Status:** ⏳ authored — pending run/verify · **Depends on:** 03, 04

## Goal
Load all JSON + assets with a progress indicator, then hand off to the menu.

## Do
- `src/scenes/BootScene.js` — preload the 3 JSON catalogs + sprites/audio; show a loading bar;
  hydrate the save profile (Step 12 stub ok); transition to MenuScene.

## Files
- `src/scenes/BootScene.js`

## Done-when
- [ ] Assets/JSON load; loading bar shows; transitions to a (stub) MenuScene; no console errors.

## Verify
- Browser MCP: reload, confirm load → menu transition. Commit `step 05: boot scene`.
