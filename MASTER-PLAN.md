# MASTER-PLAN — BGU Gold Miner (מכרה הזהב)

> The orchestrator. Build this app from empty repo → finished product by executing the step files
> in `./steps/` **in order, one at a time**. Each step file is a small, self-contained task with
> its own done-when + verify. This plan is the index + the rules; the steps are the work.

**Source of truth for detail:** `DESIGN-SPEC.md` · `PRD.md` · `ARCHITECTURE.md`.

---

## Locked context (decided with the owner)
- Build **first** of the suite. **Full execution** (scaffold, run builds, browser-verify, git
  branch per app). **Proceed on assumptions**; owner reviews at the two **gates** below.
- Assumptions until told otherwise: BGU hub serves static files in a **sandboxed iframe** under a
  **strict CSP**; **"in app = paid"** (no paywall code). Hebrew **RTL**.
- Stack: Vite + **Phaser 3** (Arcade physics), localStorage, all assets bundled locally.

## Approval gates (these pause the run)
- **Step 01 — DESIGN GATE** ⛔ produce visual mockups → owner approves the look BEFORE any UI/art.
- **Step 18 — COPY GATE** ⛔ Hebrew slang copy drafted → owner/native speaker approves (must not
  read as AI).
Everything else runs autonomously between/after the gates.

## How to execute (rules)
1. Do steps **in numeric order**. Open the step file, do it, run its **Verify**, tick its
   **Done-when**, mark its `Status: done`, then move on.
2. At a **GATE**, produce the artifact and **STOP for owner approval**; resume only when approved.
3. After each step: `git add -A && git commit` on the app branch with `step NN: <title>`.
4. Self-verify with the **`run`/`verify`** skills + browser MCP (Playwright/Chrome). Simulate the
   sandbox with a **strict-CSP local serve**.
5. If a Verify fails → fix → re-verify before advancing. If blocked → stop and report.
6. Finish when the **Definition of Done** is fully green.

## Definition of Done
> **Inherits [QUALITY-BAR.md](../QUALITY-BAR.md).** "Builds and runs" is the floor. Craft, juice,
> feel, native-Hebrew copy, and a flawless rehearsed demo are **gates**, not extras.
- [ ] Meets the QUALITY-BAR standard (visual craft · motion/juice · audio · feel · 60fps · no console errors).
- [ ] `npm run build` → static output; loads with no console errors; runs under strict CSP & offline.
- [ ] Character select → play a mine level (claw swing/drop/grab, weight-scaled reel, ₪/timer/target).
- [ ] Shop: buy a Be'er Sheva asset → perk applies next level → owned asset **lights up on the map**.
- [ ] Progression across ≥2 districts → buying the **mayor's office** triggers the **Boss
      coronation** (big celebration).
- [ ] Save/resume the same profile with **no login**; local leaderboard works.
- [ ] **Responsive** on phone, iPad/tablet, laptop; touch + mouse + keyboard inputs.
- [ ] Generous juice (pops/shake/SFX/slow-mo); Hebrew **RTL** UI; **native-reviewed slang copy**.
- [ ] Seed `collectibles.json` / `assets.json` / `levels.json` populated with verified content;
      no paywall code.
- [ ] Demo script runs in ~2 min (DESIGN-SPEC).

## Step index
| # | Step | Gate |
|---|---|---|
| 01 | Design gate — visual mockups | ⛔ approve |
| 02 | Scaffold (Vite + Phaser) + git + env check | |
| 03 | Design tokens + RTL base + asset/placeholder pipeline | |
| 04 | Seed data files (collectibles / assets / levels) | |
| 05 | BootScene (load JSON + assets) | |
| 06 | MenuScene + character select | |
| 07 | Claw — swing + drop + extend | |
| 08 | Grab + weight-scaled retract | |
| 09 | ItemSpawner + collectible/obstacle resolution | |
| 10 | LevelScene — ₪ / timer / target / HUD | |
| 11 | GameOverScene + instant retry | |
| 12 | SaveManager (localStorage profile, no login) | |
| 13 | ShopScene + AssetStore (buy flow) | |
| 14 | PerkResolver (apply perks at level start) | |
| 15 | MapScene — districts + owned-assets light up + boss meter | |
| 16 | Progression gating + BossWinScene (celebration) | |
| 17 | Juice pass + audio (mute/unlock) | |
| 18 | Copy gate — tutorial + Hebrew slang | ⛔ approve |
| 19 | Responsive (Scale manager + input abstraction + devices) | |
| 20 | Leaderboard | |
| 21 | Final — CSP/offline rehearsal + acceptance + demo | |

## What the owner must do
- **Approve Step 01 mockups** (the look) and **Step 18 copy** (the slang). Everything else is
  autonomous.
- Optional later: hand over real art (sprites) to replace MVP emoji/glyph placeholders; provide
  the BGU hub's real CSP/iframe facts if they differ from the assumptions.
