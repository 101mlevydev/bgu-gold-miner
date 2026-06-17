# Step 04 — Seed data files

**Phase:** Content · **Status:** ✅ done (3 JSON catalogs authored, Hebrew checked) · **Depends on:** 02

## Goal
Populate the three static catalogs with verified content (DESIGN-SPEC §6).

## Do
- `public/collectibles.json` — premium/mid/small ₪ items + obstacles (חמסין, מועד ב', דו"ח חניה,
  פספוס אוטובוס, עיכוב רכבת, אָרומה). Fields: `id,label,kind,value,weight,rarity,timeBonus,sprite,sfx`.
- `public/assets.json` — tiered Be'er Sheva assets (T1 dorm/falafel/shuk → T5 BGU + **לשכת רוביק
  דנילוביץ' = win**). Fields: `id,label,district,tier,price,bossPoints,perk,sprite`.
- `public/levels.json` — districts (קמפוס מרקוס → העיר העתיקה → מרכז העיר → הקניונים → השלטון),
  per-level `target/time/obstacleRate`, `unlockRequiresAssets`, `bossMeterGoal`. Tune **slightly
  challenging**.

## Files
- `public/collectibles.json`, `public/assets.json`, `public/levels.json`

## Done-when
- [ ] All three parse as valid JSON; tiers/districts match DESIGN-SPEC; mayor's office is the
      flagship win asset.

## Verify
- Lint/parse the JSON; spot-check counts. Commit `step 04: seed data`.
