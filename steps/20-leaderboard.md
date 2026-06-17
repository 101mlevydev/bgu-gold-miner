# Step 20 — Leaderboard

**Phase:** Polish · **Status:** todo · **Depends on:** 12

## Goal
Local top-10 bragging rights.

## Do
- `src/lib/leaderboard.js` — `goldminer:scores:v1`, top-10 sort/slice; initials entry on a big run;
  render on MenuScene.

## Files
- `src/lib/leaderboard.js`

## Done-when
- [ ] Scores persist + sort; board shows on the menu; survives reload.

## Verify
- Browser MCP: post scores, reorder, reload. Commit `step 20: leaderboard`.
