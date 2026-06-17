# DESIGN-SPEC — BGU Gold Miner (מכרה הזהב)

> The deep build spec: **what it takes, the components, how it works, how it's designed, and the
> finalized stack.** Builds on PRD.md / ARCHITECTURE.md and folds in the DISCOVERY answers +
> verified Be'er Sheva content research.

---

## 0. Locked decisions (from discovery + research)

- **Fantasy:** rags-to-Boss, powered by a juicy claw loop. Fun first; orientation is a side
  effect. Snackable arcade + light tycoon spine.
- **Sessions:** 2–4 min each, **saved & resumable for the same user with NO login** (local
  profile). Full Boss arc ~15–25 min, tuned **a bit more challenging**.
- **Onboarding:** straight into an easy level, with a **short tutorial** in **authentic, cool
  Hebrew slang (must not read as AI-written)**.
- **Climax:** **big** Boss coronation (crown, confetti, stats, share-card).
- **Map:** district-map hub; **owned assets visibly light up** as you buy them; skippable intro
  card.
- **Claw:** swinging claw, **tap-to-drop** (one-thumb, timing). Heavy items reel slower
  (moderate). Obstacles both cost and block. **Generous-but-tasteful juice** (pops, shake, SFX,
  slow-mo on jackpots).
- **Art:** flat cartoon/vector, warm desert palette; **recognizable caricatures of real places
  with real names**; cheeky-but-wholesome.
- **Character select:** player picks one of two Be'er Sheva archetypes (see §6.4):
  **"הסטודנט"** (a BGU guy in classic student garb) or **"הבאר-שבעית"** (a girl in pajama pants +
  fur slippers / כפכפי פרווה).
- **Responsive:** mobile + tablet/iPad + laptop (see §3).

---

## 1. The finalized stack

| Layer | Choice | Role |
|---|---|---|
| Build/dev | **Vite** | static output, HMR, CSP-safe |
| Engine | **Phaser 3** | scenes, asset loader, **Arcade physics**, tweens, **multi-touch**, scaling |
| Physics | **Phaser Arcade** | claw = swing tween + extend tween + overlap check + weight-scaled retract |
| Scaling | **Phaser Scale Manager** (`FIT` + portrait-safe) | one canvas that adapts phone→laptop |
| Render | **WebGL → Canvas auto-fallback** | survives a WebGL-blocked iframe |
| Audio | WebAudio (mute toggle, unlock-on-gesture) | juice SFX |
| Persistence | **localStorage** | save profile (₪, assets, district, boss, character) + top-10 |

> Claw model retained as **Arcade tween-extend**, not a Matter rope simulation — lower risk,
> better "feel" control, smaller. Matter rope is an optional stretch upgrade only.

---

## 2. Scenes (information architecture)

| Scene | Job |
|---|---|
| **BootScene** | load `collectibles.json` / `assets.json` / `levels.json` + sprites/audio; hydrate save |
| **MenuScene** | title (RTL), Continue / New game, **character select**, leaderboard, mute |
| **IntroScene** | one skippable charming card ("הגעת לבאר שבע עם ₪0…") |
| **MapScene** | district hub: progress, **owned assets lit up**, Boss meter, "play next" + Shop |
| **LevelScene** | the mine: claw state machine, item field, HUD (₪ / timer / target), difficulty ramp |
| **ShopScene** | Asset Store: affordable assets/upgrades, buy → perk + boss-points + save |
| **BossWinScene** | **big** coronation (crown, confetti, stats, share-card) |
| **GameOverScene** | missed target → friendly instant retry (keep ₪/assets) |
| **TutorialOverlay** | inline slang prompts during the first level (not a separate scene) |

---

## 3. Responsive / adaptive design (the new mandate)

A single Phaser canvas that adapts; gameplay identical across devices.

- **Design resolution:** portrait base (e.g., 720×1280) with `Scale.FIT` + `CENTER_BOTH`, safe-area
  insets respected. The claw and HUD anchor to a responsive layout grid, not absolute pixels.
- **Phone (portrait):** primary target. One-thumb tap anywhere to drop; big HUD; bottom-anchored
  controls.
- **Tablet/iPad:** same portrait canvas, scaled up; more breathing room; touch identical. Landscape
  shows a gentle "turn to portrait" hint (or letterboxes — TBD low-risk).
- **Laptop/desktop:** canvas centered with a framed backdrop; **click = tap**, optional **Space =
  drop**; keyboard mute/restart. Pointer hover affordances on menus/shop.
- **Input abstraction:** a single `dropInput` event fed by touch, mouse, and keyboard so scenes
  don't branch on device.

Save profile is shared across devices *per browser* (localStorage), so resuming works on whatever
they reopen.

---

## 4. Component / system inventory

**Game objects (LevelScene)**
- `Claw` — state machine: `SWINGING → DROPPING → GRABBING → RETRACTING → SCORING`; reads perks for
  reel speed / magnet radius.
- `Item` — a collectible or obstacle instance (sprite, value, weight, rarity, sfx).
- `ItemSpawner` — weighted spawn from `collectibles.json`; refill on grab; seed obstacles near
  prizes.
- `Hud` — ₪, timer, target, combo; RTL, LTR numerals.
- `JuiceFx` — pops, screen shake, score popups, slow-mo on jackpots.

**Systems (persist across scenes)**
- `SaveManager` — load/save profile; debounced; New-game reset (confirm); version + migrator.
- `EconomyManager` — ₪ balance; income (grabs, multipliers, passive); purchase validation.
- `AssetStore` — reads `assets.json`; filters by district + affordability; buy → own + bossPoints +
  perk.
- `ProgressionManager` — reads `levels.json`; target checks; district gating
  (`unlockRequiresAssets`); bossPoints vs goal → triggers `BossWinScene`.
- `PerkResolver` — folds owned assets/upgrades into level constants (reel base, +time,
  incomeMult, insurance count, magnet radius).
- `CharacterManager` — selected archetype → player sprite + flavor voice lines.
- `Leaderboard` — local top-10.
- `AudioBus` — mute + unlock-on-gesture.
- `Copy` — central Hebrew slang strings (single source for the "not-AI" voice; see §8).

---

## 5. How it works — key flows

**New game:** Menu → **character select** → Intro (skippable) → MapScene (District 1 unlocked).

**A mine level:** LevelScene starts → `PerkResolver` sets constants → claw swings → tap drops →
overlap grabs → weight-scaled retract → `EconomyManager` banks ₪ → HUD updates → on **target met**
before timer → level complete → MapScene; on **timer out below target** → GameOverScene (instant
retry, keep ₪/assets).

**Shop:** from MapScene → ShopScene → buy asset → ₪ deducted, asset owned (**lights up on map**),
bossPoints added, perk registered, save written.

**Progression:** district unlock requires target + `unlockRequiresAssets`. **Buying the mayor's
office (לשכת רוביק דנילוביץ') is the flagship purchase that fills the Boss meter → BossWinScene
(crowned Boss of Be'er Sheva).**

**Anti-dead-end:** earlier levels are always replayable to earn ₪; tuning keeps a stall rare.

---

## 6. Content (verified)

### 6.1 Collectibles (₪ sources) — `collectibles.json`
Premium (big ₪ + time bonus): **747 פסיכומטרי מושלם**, premium parking permit, perfect grade,
dorm spot (קוביה). Mid: good grade, psychometric points. Small/frequent: **פלאפל, קפה, חניה
פנויה, מציאה בשוק**.

### 6.2 Obstacles (cost ₪/time) — kept per your call
**חמסין** (heatwave), **מועד ב'** (makeup exam), **דו"ח חניה** (parking ticket — *kept*), missed
last bus, Be'er Sheva North train delay, **קפה אָרומה** flavor item *(kept per your call)*.

### 6.3 Assets (the economy) — `assets.json`, verified tiers
| Tier | Assets | Perk theme |
|---|---|---|
| **T1** | dorm room (קוביה), falafel stand, shuk stall | +passive ₪ |
| **T2** | הגרנד קניון, פארק הסופרים, בנג'י, פרינדס | +time |
| **T3** | רינגלבלום, מצדה, סורוקה, קפה לולה, עשן הזמן | faster claw / reel |
| **T4** | אצטדיון טוטו טרנר, תיאטרון הקצה, העיר העתיקה (district) | income multiplier |
| **T5** | **BGU campus**, **לשכת רוביק דנילוביץ' = the crown / win** | endgame boss-points |

*(Dropped as unverified: הפורום, הבלוק. Easy to add later if you confirm them.)*

### 6.4 Playable characters — `CharacterManager`
- **"הסטודנט"** — a BGU student archetype (hoodie, backpack, iced coffee).
- **"הבאר-שבעית"** — a local girl in pajama pants + **כפכפי פרווה** (fur slippers).
Each is purely cosmetic (sprite + a few flavor voice lines) — no balance impact. Selection saved
in the profile.

---

## 7. Economy / progression detail
- **Tuning knobs live in JSON** (`value`, `weight`, `rarity`, `timeBonus`, asset `price`,
  `bossPoints`, `perk`, level `target`/`time`/`obstacleRate`, `bossMeterGoal`). Balancing = data,
  not code.
- **Difficulty:** per your note, slightly steeper targets + rising `obstacleRate` per district so
  the ~15–25 min arc feels earned.
- **Perk types:** `passiveIncome`, `time`, `clawSpeed`, `incomeMult`, `insurance`, `magnet`.

---

## 8. Copy & tone (the "not-AI" voice)
- A single `Copy` module holds all strings so the slang stays consistent and human.
- Register: **cool, casual, Be'er Sheva student Hebrew** — short, punchy, a little cheeky. Examples
  of the *flavor* (final wording to be written/checked by a native speaker, not literal):
  tutorial nudge ≈ "תקיש כדי להפיל את הטופר 🪝", jackpot ≈ "איזה תותח!", obstacle ≈ "אוף, חמסין".
- **Action item:** have a native BGU student do a copy pass; AI-sounding Hebrew is an explicit
  no-go.

---

## 9. What it will take (build breakdown)

| # | Block | Components/systems | Risk |
|---|---|---|---|
| 1 | Boot + menu + character select | BootScene, MenuScene, CharacterManager, SaveManager | low |
| 2 | **Claw + grab feel** | Claw, Item, input abstraction, JuiceFx (basic) | **high** (core) |
| 3 | Mine level: ₪/timer/target | ItemSpawner, Hud, EconomyManager | med |
| 4 | Economy | ShopScene, AssetStore, PerkResolver, SaveManager | med |
| 5 | Progression + boss | MapScene (lit assets), ProgressionManager, BossWinScene | med |
| 6 | Juice + leaderboard | JuiceFx (full), AudioBus, Leaderboard | med |
| 7 | Responsive + content + copy | Scale layout, JSON content, Copy slang pass | med |

**Critical path:** Block 2 (claw feel) is the make-or-break — prototype it on a real phone first.
The economy/boss layers can ship thin and still read as a tycoon.

---

## 10. Open items
- Native-Hebrew **copy pass** (anti-AI voice).
- Confirm/skip הפורום & הבלוק (currently dropped).
- Art production: ~25 item sprites + ~12 asset caricatures + 2 character sprites (emoji/glyph
  placeholders acceptable for MVP).
- Final balance tuning of `levels.json` for the "a bit more challenging" feel.
