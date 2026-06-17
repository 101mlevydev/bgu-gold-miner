# Step 06 — MenuScene + character select

**Phase:** Core · **Status:** ⏳ authored — pending run/verify · **Depends on:** 05

## Goal
Title screen with New/Continue, a leaderboard peek, mute, and the two-character chooser.

## Do
- `src/scenes/MenuScene.js` (RTL): title, **Continue** (if save exists) / **New game**, mute toggle.
- `src/systems/CharacterManager.js` — pick **הסטודנט** or **הבאר-שבעית** (pajama + fur slippers);
  selection saved to profile; cosmetic only.
- Skippable intro card hook (IntroScene or overlay) before first level.

## Files
- `src/scenes/MenuScene.js`, `src/systems/CharacterManager.js`

## Done-when
- [ ] Menu renders RTL; choosing a character persists it; New game → (stub) LevelScene.

## Verify
- Browser MCP: pick each character, confirm it sticks across reload. Commit `step 06: menu + characters`.
