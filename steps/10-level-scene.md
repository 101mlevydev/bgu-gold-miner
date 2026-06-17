# Step 10 — LevelScene (₪ / timer / target / HUD)

**Phase:** Core · **Status:** ⏳ first pass authored & builds — needs run verify · **Depends on:** 09

## Goal
A complete, playable mine level against a money target on a timer.

## Do
- `src/scenes/LevelScene.js` — wires Claw + ItemSpawner + scoring; HUD (₪, timer, **target**,
  combo) RTL with LTR numerals; difficulty ramp within the level; **target met → level complete**;
  **timer out below target → GameOverScene**.

## Files
- `src/scenes/LevelScene.js`, `src/game/Hud.js`

## Done-when
- [ ] A full level plays start→finish; reaching target completes it; running out fails it.

## Verify
- Browser MCP: play a full level both win + lose paths. Commit `step 10: level scene`.
