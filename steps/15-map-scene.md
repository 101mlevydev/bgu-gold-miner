# Step 15 — MapScene (districts + owned assets light up + boss meter)

**Phase:** Progression · **Status:** todo · **Depends on:** 13

## Goal
The tycoon hub that sells the fantasy: a city map that fills in as you buy.

## Do
- `src/scenes/MapScene.js` — districts from `levels.json`; **owned assets light up / get your
  flag**; show ₪, the **Boss meter**, current target; entry points to next level + Shop.

## Files
- `src/scenes/MapScene.js`

## Done-when
- [ ] Map shows districts + progress; owned assets are visibly lit; boss meter reflects bossPoints.

## Verify
- Browser MCP: buy an asset → return to map → it's lit; meter moved. Commit `step 15: map`.
