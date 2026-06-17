# Step 17 — Juice pass + audio

**Phase:** Polish · **Status:** todo · **Depends on:** 10, 16

## Goal
Make it *feel* great — most of the perceived quality.

## Do
- `src/game/JuiceFx.js` — grab pops, score popups, screen shake, **slow-mo on jackpots**,
  purchase celebration.
- `src/lib/audio.js` — SFX on grab/miss/jackpot/buy; **mute toggle**; **unlock audio on first
  gesture** (autoplay policy).

## Files
- `src/game/JuiceFx.js`, `src/lib/audio.js`

## Done-when
- [ ] Every grab/buy/win has a satisfying pop + sound; mute works; audio unlocks on gesture.

## Verify
- Browser MCP: confirm juice + sound; toggle mute. Commit `step 17: juice+audio`.
