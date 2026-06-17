# Step 14 — PerkResolver

**Phase:** Economy · **Status:** ⏳ done (perks.js applied at level start) — pending run verify · **Depends on:** 13

## Goal
Owned assets/upgrades actually change gameplay next level.

## Do
- `src/systems/PerkResolver.js` — fold owned perks into level constants: `passiveIncome`, `time`,
  `clawSpeed`, `incomeMult`, `insurance`, `magnet`. LevelScene reads these at start.

## Files
- `src/systems/PerkResolver.js` (consumed by LevelScene + Claw)

## Done-when
- [ ] Buying a +time / faster-claw / multiplier asset is measurably reflected in the next level.

## Verify
- Browser MCP: buy a perk → start level → confirm the constant changed. Commit `step 14: perks`.
