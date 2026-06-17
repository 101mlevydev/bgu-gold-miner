# Step 13 — ShopScene + AssetStore (buy flow)

**Phase:** Economy · **Status:** ⏳ done (ShopScene + assetStore) — pending run verify · **Depends on:** 12

## Goal
Spend ₪ on Be'er Sheva assets between levels.

## Do
- `src/systems/EconomyManager.js` — balance + can-afford validation.
- `src/systems/AssetStore.js` — read `assets.json`; filter by district + affordability; buy →
  deduct ₪, add to `ownedAssets`, add `bossPoints`, register `perk`, save.
- `src/scenes/ShopScene.js` — list affordable assets/upgrades; buy interaction + confirmation.

## Files
- `src/systems/EconomyManager.js`, `src/systems/AssetStore.js`, `src/scenes/ShopScene.js`

## Done-when
- [ ] Can buy an affordable asset; ₪ deducted; ownership + bossPoints recorded + saved; can't
      overspend.

## Verify
- Browser MCP: buy with exactly-enough and not-enough ₪. Commit `step 13: shop`.
