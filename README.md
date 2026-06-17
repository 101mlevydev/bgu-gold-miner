# BGU Gold Miner — מכרה הזהב של בן-גוריון

> A claw-drop arcade **with a tycoon layer**. Mine ₪ from the pit each level, then spend it
> buying real Be'er Sheva assets — a falafel stand, Café Lola, a bar in the Old City, a unit in
> the Grand Canyon mall — and climb districts until you're crowned **בוס של באר שבע** (Boss of
> Be'er Sheva).

**Role in the suite:** the crowd-pleaser with depth. The claw loop hooks you in seconds; the
economy + boss progression gives it a reason to keep playing and a clear win condition — a
love-letter to Be'er Sheva you can *own*.

---

## At a glance

| | |
|---|---|
| **Audience** | New / incoming BGU students (orientation vibe) |
| **Language / direction** | Hebrew, **RTL** UI (HUD, shop, map) |
| **Backend** | **None.** Static site, all logic in-browser. |
| **Persistence** | `localStorage` (run progress, ₪, owned assets, boss meter, local leaderboard) |
| **Content** | Static `collectibles.json` · `assets.json` · `levels.json` |
| **Core stack** | Vite + **Phaser 3** (Arcade physics + tweens) |
| **Deploy** | `vite build` → static, cloned & hosted by the BGU hub sandbox |
| **Paywall** | Out of our scope — the hub gates payment; we assume "in the app = paid" |
| **Device** | **Mobile-first** (touch), works on desktop |

---

## The progression in one picture

```
 mine a level ──collect ₪──▶ hit the money target before the timer
      ▲                                   │ advance
      │                                   ▼
 new district ◀──unlocks── ASSET STORE (spend ₪ on Be'er Sheva assets)
                                          │ assets grant perks + boss-points
                                          ▼
                               BOSS METER fills ──▶ 👑 בוס של באר שבע
```

---

> 🏆 **Built to win.** Held to the suite-wide **[QUALITY-BAR.md](../QUALITY-BAR.md)** —
> top-quality, demo-flawless, zero rough edges. Signature moments: the **jackpot grab** + the
> **Boss coronation**.

## Documents

1. **[PRD.md](./PRD.md)** — concept, ICP, the two-layer loop (mine + economy), districts, asset
   tiers, win condition, judging, paywall note.
2. **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Phaser scenes, claw mechanics, the three data
   files, economy/progression/save systems, sandbox/CSP notes.
3. **[ROADMAP.md](./ROADMAP.md)** — build order (playable claw → economy → boss), testing, demo
   script, risk register.

---

## The one-sentence pitch

> "Mine your way through Be'er Sheva — grab the dorm spot and the falafel, dodge the Hamsin and
> מועד ב', buy up the city block by block, and become the Boss of Be'er Sheva."

---

## Status

📄 **Design phase.** Docs only — no code yet.

## Open content TODOs (tracked, non-blocking)
- Confirm/extend `collectibles.json` (esp. parking-ticket & Aroma, unverified in research).
- Confirm `assets.json` tiers/prices and `levels.json` districts & money targets.
- Decide art direction (emoji/icon set vs custom pixel sprites) — see ARCHITECTURE §assets.
