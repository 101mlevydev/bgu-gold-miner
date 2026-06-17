# PRD — BGU Gold Miner (מכרה הזהב)

**Document owner:** Product
**Status:** Draft for review (v2 — adds level/economy/boss progression)
**Phase:** Pre-build (planning)

---

## 1. Problem & opportunity

Starting university in a new city is disorienting. New BGU students don't yet know Be'er Sheva —
the good spots, the local in-jokes (Hamsin, מועד ב', the Bedouin market on Thursdays), or where
they fit. Orientation is dry PDFs and a campus map.

**Opportunity:** turn "getting to know — and conquering — Be'er Sheva" into an addictive
**claw-mining tycoon**. The classic gold-miner loop is instantly fun; we wrap it in a
progression where you **earn ₪, buy real Be'er Sheva assets, and rise to Boss of the city**. The
game doubles as a playful orientation *and* a satisfying campaign with a clear goal.

### Why it earns its place
- **Instant fun + a reason to continue.** The claw hooks players in seconds; the economy/boss
  arc keeps them.
- **Hyper-local charm you can own.** Buying Café Lola, the Old City pub, the Grand Canyon mall —
  strong identity, real pride.
- **Low demo risk.** Single-player, no network, no multiplayer fragility.
- **Clear win condition** (Boss of Be'er Sheva) → a satisfying demo arc, not an endless loop.

---

## 2. Ideal Customer Profile (ICP)

**Primary:** incoming / first-year BGU student (*שנה א'*), 18–22, just arrived, mobile-native,
wants to belong and to learn the city. Plays in short bursts; enjoys a light progression hook.

**Jobs to be done**
- "Give me a fun break that *goes somewhere*."
- "Make me feel part of Be'er Sheva" (recognition → ownership of local landmarks).
- "Let me chase a goal and beat friends' progress."

**Secondary:** returning students (local pride/nostalgia), orientation staff (icebreaker),
open-day visitors.

**Anti-persona:** someone wanting a deep simulation/management sim — this is a snackable arcade
with a light tycoon spine, not a city-builder.

---

## 3. The two-layer core loop

**Layer A — the mine (per level, real-time):**
1. **Aim.** The claw swings above a field of items.
2. **Drop.** Tap/click to extend the claw along the current angle.
3. **Grab & reel.** Grab the first item touched; **heavier/more-valuable items reel slower** —
   risk vs the ticking timer.
4. **Bank ₪.** Valuable items add ₪ (+ small time bonus for premium); obstacles cost ₪/time.
5. **Goal:** reach the level's **money target** before the timer ends → level complete.

**Layer B — the economy (between levels, menu):**
6. **Spend ₪ in the Asset Store** on Be'er Sheva assets and upgrades.
7. **Assets grant perks** (passive income, faster claw, more time, obstacle insurance) **and
   boss-points**.
8. **Owning enough across districts unlocks the next district** and fills the **Boss meter**.
9. **Fill the Boss meter → win: בוס של באר שבע.** 👑

**Skill + strategy:** timing drops and choosing heavy-prize vs many-cheap under the clock (Layer
A), plus deciding which assets/upgrades to buy for the best return (Layer B).

---

## 4. Districts & progression

Levels are grouped into **districts** themed on real Be'er Sheva areas, each with rising money
targets and tougher obstacle mixes:

| # | District | Vibe | Sample assets unlocked |
|---|---|---|---|
| 1 | **קמפוס מרקוס** (Campus) | tutorial-easy | dorm room (קוביה), campus coffee cart |
| 2 | **העיר העתיקה** (Old City) | nightlife | Café Lola, an Old City pub |
| 3 | **מרכז העיר** (City Center) | bustle | shuk stall, falafel stand, food truck |
| 4 | **הקניונים** (Malls) | big money | a shop in BIG, a unit in Grand Canyon |
| 5 | **השלטון** (Citywide) | endgame | flagship assets → crown |

Advancing a district requires hitting level targets **and** owning a minimum set of that
district's assets — money must be *spent*, not just hoarded.

---

## 5. Asset tiers (the economy content)

Real Be'er Sheva / BGU assets, tiered by price; each grants boss-points + a passive perk. Final
list lives in `assets.json` (see ARCHITECTURE).

| Tier | Examples | Typical perk |
|---|---|---|
| **T1 (cheap)** | shuk stall · falafel stand · dorm room (קוביה ג'/ד') | +passive ₪ per level |
| **T2** | Café Lola · food truck · Old City pub | +time on the clock |
| **T3** | a bar/club · a shop in BIG | faster claw / stronger reel |
| **T4** | unit in Grand Canyon mall · building near campus | income multiplier |
| **T5 (boss)** | flagship landmark(s) | big boss-points → crown |

**Collectibles in the mine (₪ sources, from `collectibles.json`):**
- *Premium:* 747 psychometric, premium parking permit, perfect grade → big ₪ + time bonus.
- *Mid:* dorm spot, good grade, psychometric points.
- *Small:* falafel, coffee, parking spot, market find.

**Obstacles (cost ₪/time):** Hamsin · מועד ב' · missed last bus · Be'er Sheva North train delay ·
parking ticket *(verify)*. Aroma presence *(verify)*.

**Power-ups (grabbed or shop-bought):** dynamite (clear an obstacle), strength drink (faster
reel), magnet (pull nearby ₪), +time, lucky clover (value boost).

> **Content TODO / verify with user:** parking-ticket as BGU-specific & Aroma's on-campus
> presence weren't fully verified; all else verified. Prices/targets are tuning data, easily
> edited.

**Tuning principle:** seed obstacles near tempting prizes so good play is *selective*; price
assets so the player must replay/optimize a little to afford the next district (without grinding).

---

## 6. Feature set

### Must-have (MVP)
- Mine scene: swinging claw, drop, grab, weight-scaled reel, ₪ scoring, timer, **money target**.
- **Level progression** across ≥2 districts with rising targets.
- **Asset Store** between levels: buy assets/upgrades with ₪; perks apply next level.
- **Boss meter** + win screen (בוס של באר שבע).
- Save full run to localStorage (₪, owned assets, district, boss progress) + local leaderboard.
- Mobile touch + desktop; Hebrew RTL HUD/shop/map; basic SFX.

### Should-have
- District map screen showing progress/ownership.
- Juice: screen shake, grab pop, score popups, asset-purchase celebration.
- Difficulty ramp within levels; combo bonus for consecutive valuable grabs.
- Power-ups (dynamite/strength/magnet/clover).

### Could-have (stretch)
- Passive income tick between levels from owned assets.
- "Challenge of the day" deterministic level.
- Cosmetic claw skins; shareable "Boss" card image.

### Won't-have
- Accounts, online/global leaderboard, multiplayer, any server, payment logic.

---

## 7. Success & judging criteria

| Judging dimension | How this app scores |
|---|---|
| **Fun / wow** | Juicy claw loop + a satisfying buy-the-city arc. |
| **Identity / fit** | Owning real Be'er Sheva assets — strong local pride. |
| **Depth / replay** | Economy + districts + boss goal → reason to keep playing. |
| **Feasibility** | Single-player, no network → low risk. |
| **Polish** | Juice + clean RTL HUD/shop. |

**Demo metric:** a judge plays one mine level, buys their first asset, sees the boss meter move,
and *gets* the loop — within ~2 minutes, unassisted.

---

## 8. Paywall placement (informational — not our code)

Classic arcade gate: free core; when the timer expires, "Insert Coin (paywall) to continue the
run / unlock the next district." **We implement none of it.** We assume **"in the app = paid"** —
the full campaign runs, continues/levels are free, progress saves locally. The hub owns payment.
Listed only to show *where* a gate would conceptually sit.

---

## 9. Risks (product)
- **Two layers = more scope.** *Mitigation:* the mine loop is the MVP spine; the economy can ship
  thin (a few assets, one perk type) and still read as a tycoon. Protect Layer A first.
- **Feels grindy / pace off.** *Mitigation:* tune targets/prices so ~1–2 good runs afford the
  next step; no hard grind.
- **Generic claw game.** *Mitigation:* local assets + ownership + juice are the differentiator.
- **Content accuracy/offense.** Keep references affectionate & verified; user confirms data.
