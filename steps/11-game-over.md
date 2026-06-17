# Step 11 — GameOverScene + instant retry

**Phase:** Core · **Status:** todo · **Depends on:** 10

## Goal
Friendly failure: retry instantly, keep ₪/assets (no punishment).

## Do
- `src/scenes/GameOverScene.js` — show result; **retry level** (keep profile) / back to map.

## Files
- `src/scenes/GameOverScene.js`

## Done-when
- [ ] Failing a level offers instant retry; ₪/assets unchanged.

## Verify
- Browser MCP: fail → retry → resources intact. Commit `step 11: game over`.
