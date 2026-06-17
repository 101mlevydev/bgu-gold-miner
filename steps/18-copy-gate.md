# Step 18 — Copy gate (tutorial + Hebrew slang) ⛔ APPROVAL

**Phase:** Gate · **Status:** ⛔ artifact ready (design/copy-review.md) — awaiting native-speaker pass · **Depends on:** 16

## Goal
All player-facing text in authentic, cool Be'er Sheva student Hebrew — **must not read as AI**.

## Do
- Fill `src/lib/copy.js` with every string: tutorial prompts, HUD labels, item/obstacle names,
  shop/boss text, win lines. Punny + local (DESIGN-SPEC §8).
- Add the **short tutorial** (staggered: level 1 mining, shop intro after) using these strings.
- Produce `design/copy-review.md` listing all strings for the owner / a native speaker to edit.

## Files
- `src/lib/copy.js`, `design/copy-review.md`, tutorial wiring

## Done-when
- [ ] All strings centralized; tutorial works; **owner/native speaker approved the slang.**

## Verify
- Present `copy-review.md`; apply edits. ⛔ STOP for approval before final polish. Commit.
