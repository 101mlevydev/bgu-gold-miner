# Step 21 — Final: CSP/offline rehearsal + acceptance + demo

**Phase:** Acceptance · **Status:** todo · **Depends on:** all

## Goal
Prove the finished product against the Definition of Done.

## Do
- Build (`npm run build`); serve `dist/` behind a **strict CSP** header; confirm Phaser + bundled
  audio/sprites load (no CDN) and **WebGL→Canvas fallback** works.
- **Offline test:** load once, kill network, full campaign playable.
- Balance pass on `levels.json` for the "a bit challenging" feel + no dead-ends.
- Walk the **demo script** (DESIGN-SPEC): jackpot grab → buy Café Lola → tease the crown.

## Files
- (config) CSP serve script; tuning in `public/levels.json`

## Done-when
- [ ] Every **MASTER-PLAN Definition of Done** box is checked.

## Verify
- Browser MCP under strict CSP + offline; run the full demo. Final commit `step 21: acceptance`.
