# Step 09 — ItemSpawner + resolution

**Phase:** Core · **Status:** todo · **Depends on:** 08

## Goal
Populate the pit with weighted items; resolve a grabbed item's effect.

## Do
- `src/game/ItemSpawner.js` — weighted-random spawn from `collectibles.json` by `rarity`; refill
  on grab; seed obstacles near high-value items.
- `src/game/scoring.js` — apply `value` (+₪) / obstacle penalty / `timeBonus`; emit events for HUD
  + juice.

## Files
- `src/game/ItemSpawner.js`, `src/game/scoring.js`

## Done-when
- [ ] Pit stays populated; grabbing a valuable adds ₪, an obstacle penalizes; obstacles cluster
      near prizes.

## Verify
- Browser MCP: grab several items; confirm correct ₪/penalty per `collectibles.json`. Commit.
