# Step 16 — Progression gating + BossWinScene

**Phase:** Progression · **Status:** ⏳ done (progression.js + BossWinScene) — pending run verify · **Depends on:** 13

## Goal
Districts unlock by progress; buying the mayor's office wins the game with a big celebration.

## Do
- `src/systems/ProgressionManager.js` — district unlock = target met + `unlockRequiresAssets`;
  track bossPoints vs `bossMeterGoal`; **buying לשכת רוביק דנילוביץ' fills the meter → win**.
- `src/scenes/BossWinScene.js` — **big** coronation: crown, confetti, final stats, share-card.
- Anti-dead-end: earlier levels always replayable for ₪.

## Files
- `src/systems/ProgressionManager.js`, `src/scenes/BossWinScene.js`

## Done-when
- [ ] Play ≥2 districts → reach the Boss win → big celebration screen; no dead-ends.

## Verify
- Browser MCP: progress to the win (temporarily lower goal to test fast). Commit `step 16: boss`.
