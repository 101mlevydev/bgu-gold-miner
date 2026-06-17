# Step 12 — SaveManager (localStorage profile, no login)

**Phase:** Systems · **Status:** todo · **Depends on:** 10

## Goal
Persist the whole run for the same user with zero login.

## Do
- `src/systems/SaveManager.js` — `goldminer:save:v1` = `{money, ownedAssets, currentDistrict,
  levelIndex, bossPoints, upgrades, character}`; debounced writes; hydrate on boot; New-game reset
  (confirm); version + migrator.

## Files
- `src/systems/SaveManager.js`

## Done-when
- [ ] Progress (₪, assets, district, boss, character) survives reload; reset clears it.

## Verify
- Browser MCP: play, reload mid-run → state restored; handle empty/corrupt save gracefully. Commit.
