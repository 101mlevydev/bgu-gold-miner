# ROADMAP — BGU Gold Miner (מכרה הזהב)

**Status:** Draft for review (v2 — adds economy/progression/boss)
**Assumption:** small team, time-compressed hackathon. Effort blocks, not wall-clock.

**Guiding principle:** **mine-first.** A juicy, playable claw level is the spine. The economy,
districts, and boss arc layer on top — each can ship thin and still read as a tycoon. Protect
Layer A.

---

## 0. Pre-flight
- [ ] Confirm `collectibles.json` (esp. parking-ticket & Aroma — verify).
- [ ] Confirm `assets.json` tiers/prices/perks and `levels.json` districts/targets.
- [ ] Decide art direction: **emoji/glyph MVP** (recommended) vs custom sprite atlas.
- [ ] Decide claw model: **Arcade tween-extend** (recommended) vs Matter rope (stretch).
- [ ] Scaffold: `npm create vite@latest bgu-gold-miner`; add `phaser`; register scenes.

---

## 1. Build order

### Block 1 — Boot & shell
- [ ] Vite + Phaser; `<html dir="rtl" lang="he">`; mobile-portrait canvas.
- [ ] BootScene loads the 3 JSON files + placeholder assets; MenuScene (New/Continue).
- **Exit:** menu → empty LevelScene transition on phone + desktop.

### Block 2 — Claw + grab (CORE FUN, Layer A)
- [ ] Swinging claw; tap to drop (extend tween along angle); overlap grab; weight-scaled retract.
- **Exit:** aim, drop, grab one item, reel it back — *feels* right on touch.

### Block 3 — Mine level: ₪, timer, target
- [ ] ItemSpawner (weighted from `collectibles.json`); refill; obstacles near prizes.
- [ ] ₪ scoring (value, penalties, time bonus); HUD ₪ + timer + **target** (RTL).
- [ ] Target reached → level complete; timer out below target → GameOverScene.
- **Exit:** a full level plays to a win/lose against a money target.

### Block 4 — Economy (Layer B)
- [ ] SaveManager: persist ₪/owned/district/boss; hydrate on boot; New-game reset (confirm).
- [ ] ShopScene: list affordable assets/upgrades from `assets.json`; buy → deduct ₪, own, add
      bossPoints, register perk.
- [ ] PerkResolver: apply owned perks at level start (reel speed, +time, multiplier, insurance).
- **Exit:** finish a level → buy an asset → next level reflects the perk; all persists on reload.

### Block 5 — Progression & boss
- [ ] MapScene: districts, progress, ownership; gate next district on target + `unlockRequiresAssets`.
- [ ] Boss meter (bossPoints vs goal) → BossWinScene coronation (בוס של באר שבע).
- **Exit:** play through ≥2 districts and reach the win screen.

### Block 6 — Juice, leaderboard & content
- [ ] Grab pop + score popup; screen shake; purchase celebration; SFX; mute + audio unlock.
- [ ] Difficulty ramp; combo bonus; power-ups (dynamite/strength/magnet/clover).
- [ ] Local leaderboard (top-10) on the menu.
- [ ] Final content pass: tuned `collectibles.json` / `assets.json` / `levels.json`.
- [ ] (Stretch) passive income tick, daily seed, claw skins, shareable Boss card.

---

## 2. Component reuse / shared-with-suite notes
- Standalone repo. The **localStorage save/leaderboard helper** mirrors the persistence pattern in
  Daf Nuschaot and Under the Desk — copy the small helper, don't link.
- RTL HUD/shell CSS can be copied from Daf Nuschaot.
- Phaser + the economy/progression systems are unique to this app.

---

## 3. Testing strategy (sandbox-aware)
- **Touch first** (Block 2): claw must feel right on a real phone, not just mouse.
- **Economy math:** verify ₪ can-afford checks, perk application, and boss-meter math; test
  buying with exactly enough / not enough ₪.
- **Save integrity:** mid-run reload restores ₪/owned/district/boss; handle empty/corrupt save.
- **Local CSP rehearsal:** serve `vite build` behind strict CSP; confirm Phaser + bundled
  audio/sprites load (no CDN).
- **Renderer fallback:** disable WebGL → Canvas fallback runs.
- **Offline:** load once, kill network, full campaign playable.
- **Balance pass:** ensure ~1–2 good runs afford the next step (no grind), targets beatable.

---

## 4. Demo script (target: "get" the loop in ~2 min)
1. Open → New game → District 1 (Campus). Drop the claw, grab the **קוביה (dorm)** for a jackpot
   — screen shake + sound.
2. Snag a **Hamsin** → ₪ drops (relatable groan). Race the clock to the money target.
3. Level complete → **Asset Store**: buy your first asset (e.g., a falafel stand) → boss meter
   nudges up, perk shown.
4. Next level is visibly easier/richer thanks to the perk. Point at the **Boss meter**.
5. One-liner: "Mine ₪, buy up Be'er Sheva, become the Boss — all client-side, no server."

---

## 5. Risk register
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Two-layer scope overruns time | Med | High | Mine loop is MVP; economy ships thin (few assets, one perk type) and still reads as tycoon. |
| Claw doesn't feel good on touch | Med | High | Prototype feel in Block 2 on a real phone. |
| Economy unbalanced (grind/too easy) | Med | Med | Balance pass; tune targets/prices in data, not code. |
| Rope physics rabbit hole | Med | Med | Arcade tween-extend; Matter is stretch only. |
| WebGL/audio blocked in iframe | Low | Med | Canvas fallback; gesture-unlock + mute. |
| Content generic/off | Med | Med | Local assets + ownership + juice; user confirms data. |

---

## 6. Definition of done (hackathon)
- A stranger plays a level, buys an asset, sees the boss meter move, and understands the loop —
  unassisted, in ~2 minutes.
- Progression across ≥2 districts to a Boss win; full run saves/restores; local leaderboard works.
- Runs offline, under strict CSP, on phone + desktop, fully RTL.
- Zero backend, zero network post-load, zero paywall code.
