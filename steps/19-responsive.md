# Step 19 — Responsive (scale + input + devices)

**Phase:** Polish · **Status:** ⏳ mostly done (Scale.FIT portrait + touch/mouse/Space input) — device verify pending · **Depends on:** 10

## Goal
One canvas that plays well on phone, iPad/tablet, and laptop.

## Do
- Phaser Scale Manager (`FIT` + `CENTER_BOTH`), portrait base, safe-area insets; responsive HUD
  anchors (not absolute px).
- Input abstraction: touch tap / mouse click / Space all feed `dropInput`.
- Desktop framing/backdrop; gentle "turn to portrait" hint on phone landscape.

## Files
- `src/main.js` (scale config), `src/lib/input.js`, layout anchors across scenes

## Done-when
- [ ] Plays correctly on emulated phone, tablet, and laptop; all input methods drop the claw.

## Verify
- Browser MCP at 3 viewport sizes + touch & click & key. Commit `step 19: responsive`.
