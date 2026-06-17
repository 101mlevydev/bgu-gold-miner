# Step 07 — Claw: swing + drop + extend

**Phase:** Core (claw) · **Status:** todo · **Depends on:** 05

## Goal
The core control: a swinging claw that drops/extends on input. (Feel-critical — prototype here.)

## Do
- `src/game/Claw.js` — state machine `SWINGING → DROPPING → …`; angle tween for the swing;
  tap/click/Space drops → extend the claw tip along the aimed vector (tween) to max length or hit.
- Unified `dropInput` event (touch + mouse + keyboard).

## Files
- `src/game/Claw.js` (used by LevelScene)

## Done-when
- [ ] Claw swings smoothly; input extends it along the current angle and retracts if it hits
      nothing; feels responsive on touch.

## Verify
- **Test on an emulated phone (browser MCP touch) AND desktop click.** Tune swing speed/extend.
  Commit `step 07: claw swing+drop`.
