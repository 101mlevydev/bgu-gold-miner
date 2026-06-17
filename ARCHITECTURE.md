# ARCHITECTURE — BGU Gold Miner (מכרה הזהב)

**Status:** Draft for review (v2 — adds economy/progression/save)
**Constraint envelope:** zero backend · no DB · no third-party API · static hosting in the BGU
sandbox · Hebrew RTL UI.

---

## 1. System overview

A single static web game. Phaser owns the render loop, input, and physics. A thin layer reads
three static JSON files (collectibles, assets, levels) and reads/writes `localStorage` for the
**full run state** (₪, owned assets, district, boss progress) + leaderboard. No network after
asset load.

```
┌──────────────────────────────────────────────────────────────┐
│ Browser (only runtime)                                         │
│                                                                │
│  collectibles.json ┐                                           │
│  assets.json       ├─load─▶ BootScene ─▶ MenuScene ─▶ MapScene │
│  levels.json       ┘                                  │        │
│                                                       ▼        │
│                                    LevelScene (mine: claw,     │
│                                    items, ₪, timer, target)    │
│                                       │ target reached         │
│                                       ▼                        │
│                                    ShopScene (spend ₪ on       │
│                                    assets/upgrades) ──┐        │
│                                       │ boss meter     │       │
│                                       ▼                ▼       │
│                                   BossWinScene    SaveManager  │
│                                                  (localStorage)│
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Tech stack & rationale

| Concern | Choice | Why |
|---|---|---|
| Build / dev | **Vite** | Static output, fast HMR, CSP-friendly. |
| Engine | **Phaser 3** | Scenes, asset loader, **Arcade physics**, tweens, **multi-touch** — cuts boilerplate. |
| Physics | **Phaser Arcade** (not Matter rope) | Claw = rotating aim + tween-extend + overlap check + weight-scaled retract. Lower risk than a rope simulation. |
| Persistence | **localStorage** | Full run save + top-10 leaderboard. |
| UI/HUD/Shop | Phaser + HTML overlay | RTL HUD (₪, level, target, timer), shop list, map. RTL via HTML overlay or RTL-safe Phaser text. |

---

## 3. Scenes

| Scene | Responsibility |
|---|---|
| **BootScene** | Load 3 JSON files + assets/audio; show progress; hydrate save. |
| **MenuScene** | Title (RTL), Continue/New game, leaderboard, mute. |
| **MapScene** | District map: progress, ownership, current target; "play next level". |
| **LevelScene** | The mine loop: claw state machine, item field, HUD (₪ + timer + target), difficulty ramp. |
| **ShopScene** | Asset Store: list affordable assets/upgrades, buy → apply perk + boss-points + save. |
| **BossWinScene** | Boss meter full → coronation (בוס של באר שבע); final stats; replay. |
| **GameOverScene** | Timer ended below target → retry level / back to map. |

---

## 4. Claw / reel mechanics (Arcade approach)

Claw state machine (unchanged core, now banks ₪ toward a target):
```
SWINGING  → tap → DROPPING
DROPPING  → extend along aimed vector (tween) until overlap or max length
GRABBING  → attach first overlapped item; begin RETRACTING
RETRACTING→ return; duration = base * item.weight  (heavy = slow)
SCORING   → apply ₪ value / obstacle penalty / power-up; check target; respawn item
```
- **Perks modify constants:** owned assets/upgrades adjust `base` reel speed, timer length,
  income multiplier, magnet radius — read from run state at level start.
- **Spawning:** weighted-random from `collectibles.json` by `rarity`; obstacles seeded near
  high-value items.

---

## 5. Data model (three static catalogs + one save)

### 5.1 `public/collectibles.json` — what the claw grabs
```jsonc
{
  "version": "1.0",
  "items": [
    { "id": "dorms", "label": "קוביה (מעונות)", "kind": "valuable",
      "value": 500, "weight": 3, "rarity": 0.05, "timeBonus": 3,
      "sprite": "dorms", "sfx": "jackpot" },
    { "id": "falafel", "label": "פלאפל", "kind": "valuable",
      "value": 40, "weight": 1, "rarity": 0.25, "sprite": "falafel" },
    { "id": "hamsin", "label": "חמסין", "kind": "obstacle",
      "value": -150, "weight": 1, "rarity": 0.12, "sprite": "hamsin", "sfx": "buzz" }
  ]
}
```

### 5.2 `public/assets.json` — what you buy (the economy)
```jsonc
{
  "version": "1.0",
  "assets": [
    {
      "id": "cafe-lola",
      "label": "קפה לולה",
      "district": "old-city",          // ties to levels.json districts
      "tier": 2,
      "price": 1500,                    // ₪
      "bossPoints": 10,
      "perk": { "type": "time", "value": 5 },   // +5s on the clock
      "sprite": "cafe-lola"
    },
    {
      "id": "grand-canyon-unit",
      "label": "חנות בגרנד קניון",
      "district": "malls",
      "tier": 4,
      "price": 6000,
      "bossPoints": 25,
      "perk": { "type": "incomeMult", "value": 1.2 }
    }
  ]
}
```
**Perk types:** `passiveIncome` (₪/level) · `time` (+s) · `clawSpeed` · `incomeMult` · `insurance`
(ignore N obstacles). Pure data — balancing lives here, not in code.

### 5.3 `public/levels.json` — districts & targets
```jsonc
{
  "version": "1.0",
  "districts": [
    { "id": "campus", "label": "קמפוס מרקוס", "order": 1,
      "levels": [ { "target": 800, "time": 60, "obstacleRate": 0.10 } ],
      "unlockRequiresAssets": 0 },
    { "id": "old-city", "label": "העיר העתיקה", "order": 2,
      "levels": [ { "target": 1500, "time": 60, "obstacleRate": 0.15 } ],
      "unlockRequiresAssets": 2 }
  ],
  "bossMeterGoal": 100   // total bossPoints to win
}
```

### 5.4 Save — `localStorage["goldminer:save:v1"]`
```jsonc
{
  "version": 1,
  "money": 2300,
  "ownedAssets": ["dorm-room", "cafe-lola"],
  "currentDistrict": "old-city",
  "levelIndex": 0,
  "bossPoints": 20,
  "upgrades": { "clawSpeed": 1 }
}
```
Plus `localStorage["goldminer:scores:v1"]` = top-10 `[{name, score, ts}]`.

---

## 6. Economy / progression / save systems

- **EconomyManager:** holds ₪; applies income (grabs, passiveIncome, incomeMult); validates
  purchases (can-afford).
- **AssetStore:** reads `assets.json`, filters by current district + affordability; on buy →
  deduct ₪, add to `ownedAssets`, add bossPoints, register perk.
- **ProgressionManager:** reads `levels.json`; checks target reached; gates district unlock on
  `unlockRequiresAssets`; tracks bossPoints vs `bossMeterGoal` → triggers BossWinScene.
- **PerkResolver:** at LevelScene start, folds owned assets/upgrades into the run's constants
  (reel base, timer, multiplier, insurance count, magnet radius).
- **SaveManager:** debounced write of the save object on every meaningful change; hydrate on
  boot; "New game" clears it (confirm). Version + migrator for schema bumps.

---

## 7. Assets & art direction
- **Fast path (MVP):** emoji/icon glyphs + colored shapes (📚 ☕ 🥙 🌡️ 🏪 👑), consistent palette.
  Zero art-pipeline risk.
- **Polish path:** custom pixel/flat sprites in a texture atlas; upgrade items/assets
  incrementally.
- All sprites/audio bundled locally (no CDN) for CSP safety; keep assets lean for fast sandbox
  load.

---

## 8. Zero-backend / "no paywall code" statement
- **No server, no DB, no API, no auth.** Only fetches are same-origin static JSON. Fully offline
  after load.
- **No payment/entitlement/continue-gate code.** The full campaign, all levels, and the shop are
  always available; we assume access = paid. The hub owns monetization.

---

## 9. Sandbox / CSP considerations
- Vite static build, no `eval` → `script-src 'self'` friendly.
- Bundle Phaser, sprites, audio locally — no CDN.
- WebAudio: mute toggle + unlock on first gesture (autoplay policy).
- No outbound network → nothing for `connect-src`. `localStorage` standard.
- **Open question for the hub:** in a sandboxed iframe, confirm WebGL/canvas + audio permitted
  (normally yes with `allow-scripts`). Phaser auto-falls back WebGL → Canvas if WebGL is blocked.

---

## 10. Proposed project structure
```
bgu-gold-miner/
  public/
    collectibles.json  assets.json  levels.json
    assets/              # sprites/atlas, audio
  src/
    main.js              # Phaser config (RTL HUD), scene registration
    scenes/
      BootScene.js  MenuScene.js  MapScene.js
      LevelScene.js ShopScene.js  BossWinScene.js  GameOverScene.js
    game/
      Claw.js            # swing/drop/grab/retract state machine
      ItemSpawner.js     # weighted spawn
      scoring.js
    systems/
      EconomyManager.js  AssetStore.js  ProgressionManager.js
      PerkResolver.js    SaveManager.js
    lib/
      leaderboard.js  audio.js
    styles/app.css       # RTL HUD/shop/map overlay
  index.html             # <html dir="rtl" lang="he">
```

---

## 11. RTL / i18n specifics
- HUD/shop/map in Hebrew, RTL; numbers (₪/timer/target) as LTR within RTL containers.
- Item/asset labels are short Hebrew strings from the JSON catalogs.
- Gameplay is language-light; localization surface = menus + HUD + shop + labels.
