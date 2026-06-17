# Step 08 — Grab + weight-scaled retract

**Phase:** Core (claw) · **Status:** todo · **Depends on:** 07

## Goal
The claw grabs an item and reels it back; heavier = slower (risk vs the clock).

## Do
- Overlap detection on the claw tip vs item bodies; attach first overlapped item.
- `RETRACTING` with `duration = base * item.weight`; on return → resolve (Step 09 hands scoring).
- Hook perk constants (reel base, magnet radius) read from PerkResolver (stub ok until Step 14).

## Files
- `src/game/Claw.js` (extend), `src/game/Item.js`

## Done-when
- [ ] Claw grabs an item, reels it back at a weight-scaled speed, and releases it for scoring.

## Verify
- Browser MCP: grab a light vs heavy item; confirm visibly different reel speed. Commit
  `step 08: grab+retract`.
