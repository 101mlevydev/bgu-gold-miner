# DISCOVERY — BGU Gold Miner (מכרה הזהב) · Product & UX/UI

> **How to use this doc.** Product-vision & UX/UI questions only (no tech). Each has my
> **Recommendation + why**, and an **Answer** slot — confirm ("✅") or redirect. Unanswered =
> agreed. Your answers drive the deep design/spec pass.

**The app in one line:** mine ₪ with a claw each level, buy real Be'er Sheva assets between
levels, rise to **Boss of Be'er Sheva**. **Emotional target: delight/pride.** **Context: phone,
idle minutes, playful.**

---

## A. Vision & positioning

🎯 *Changes:* the fantasy and how much "tycoon" vs "arcade" we lean into.

**QA.1 — The core fantasy — "fun claw game with a Be'er Sheva skin," or "rise from broke fresher
to owning the city"?**
- *Recommendation:* **The rags-to-Boss fantasy, powered by a juicy claw loop.** — *why:* the
  ownership arc gives a reason to keep playing and a clear win — more memorable than a high-score
  toy.
- **Answer:** as rec

**QA.2 — Is the goal mainly *fun*, or also a sneaky *orientation* tool (learn Be'er Sheva)?**
- *Recommendation:* **Fun first; orientation is a happy side-effect**, not framed as educational.
  — *why:* "edutainment" framing kills the fun and the pitch.
- **Answer:** as rec

**QA.3 — What is it explicitly NOT?**
- *Recommendation:* Not a deep management sim, not a long campaign — a **snackable arcade with a
  light tycoon spine.** — *why:* scope honesty; protects the claw feel.
- **Answer:** as rec

---

## B. User & context

🎯 *Changes:* session length, save model, difficulty.

**QB.1 — Target session length?**
- *Recommendation:* **2–4 minutes per sit-down** (a level + a shop visit), resumable. — *why:*
  fits "between classes" idle time; respects attention.
- **Answer:** as rec. make sure it can save the state and come back later to the same user. no complicated login or something.

**QB.2 — One continuous campaign saved across sessions, or quick one-off runs?**
- *Recommendation:* **A saved campaign** (your city persists) **plus an optional quick-play.** —
  *why:* persistence is what makes the Boss arc land.
- **Answer:** as rec

**QB.3 — How long should reaching "Boss of Be'er Sheva" take in total?**
- *Recommendation:* **~15–25 minutes of play across the districts** for the full arc. — *why:*
  long enough to feel earned, short enough to actually finish (and to demo the ending).
- **Answer:** yes, but make it a bit challeging

---

## C. The magic moment

🎯 *Changes:* the polish budget split between claw, shop, and coronation.

**QC.1 — The single best feeling — the *grab* (juicy claw), the *buy* (owning Café Lola), or the
*crown* (becoming Boss)?**
- *Recommendation:* **The grab is the moment-to-moment joy; the crown is the payoff.** Budget
  juice to both. — *why:* arcade games live or die on the core grab feel; the crown rewards the
  journey.
- **Answer:** ▮as rec

**QC.2 — First 10 seconds for a new player?**
- *Recommendation:* **Straight into an easy level — drop the claw, grab a falafel, see ₪ pop —
  before any menu/story.** — *why:* fun-first hooks faster than exposition.
- **Answer:** as rec with a short explanation and tutorial

**QC.3 — How big a deal is the Boss coronation (quiet "you win" vs full celebration screen)?**
- *Recommendation:* **A proper celebration** — crown, confetti, "👑 בוס של באר שבע", final stats,
  share-card. — *why:* it's the emotional climax and the demo's ending beat.
- **Answer:** yes. big celebration

---

## D. Journey, screen by screen

🎯 *Changes:* navigation between mining, shopping, and the map.

**QD.1 — How do players move between mine → shop → next level: auto-flow, or a hub/map screen?**
- *Recommendation:* **A district map hub** you return to after each level, with the shop accessible
  from it. — *why:* the map visualizes progress and ownership — it sells the tycoon fantasy.
- **Answer:** ▮as rec

**QD.2 — Should owned assets be *visible on the map* (your city fills in as you buy)?**
- *Recommendation:* **Yes — owned spots light up / get your flag.** — *why:* visible ownership is
  the single most satisfying progress signal.
- **Answer:** ▮yes

**QD.3 — Is there a story/intro framing ("you arrive in Be'er Sheva with ₪0"), or pure
gameplay?**
- *Recommendation:* **One charming intro card, skippable**, then play. — *why:* a little framing
  sells the fantasy without gating the fun.
- **Answer:** ▮as rec

---

## E. UX & interactions (the claw)

🎯 *Changes:* the core game feel.

**QE.1 — Claw control: tap-to-drop on a swinging claw (timing), or aim-then-fire (precision)?**
- *Recommendation:* **Swinging claw, tap-to-drop** (classic, one-thumb, timing-based). — *why:*
  instantly understood, mobile-perfect, and the timing tension is the fun.
- **Answer:** as rec

**QE.2 — The risk/reward of heavy items reeling slowly — keep it, and how punishing?**
- *Recommendation:* **Keep it; moderate** — heavy prizes are tempting but eat clock. — *why:* it's
  the core decision that creates skill expression.
- **Answer:** ▮as rec

**QE.3 — Obstacles: do they just cost points/time, or actively get in the way (block good
items)?**
- *Recommendation:* **Both — placed to tempt mis-grabs near prizes.** — *why:* makes *selective*
  grabbing a skill, not just spamming.
- **Answer:** as rec

**QE.4 — How much "juice" (screen shake, pops, sound, slow-mo on a big grab)?**
- *Recommendation:* **Generous but tasteful** — pops + shake + SFX on every grab, a little slow-mo
  on jackpots. — *why:* juice is most of the perceived quality in an arcade game.
- **Answer:** as rec

---

## F. UI look & feel / art direction

🎯 *Changes:* the entire art pipeline and identity.

**QF.1 — Art style: flat cartoon/vector, retro pixel-art, or playful photo-collage of real
Be'er Sheva places?**
- *Recommendation:* **Flat cartoon/vector with a warm desert palette.** — *why:* fast to produce
  consistently, scales crisply on phones, and dodges the licensing/ugliness risk of real photos.
- **Answer:** ▮ *(photo-collage is charming but risky/slow — say if you want it)* as rec

**QF.2 — Should items be recognizable *caricatures* of the real places (a little Café Lola sign, a
mini Aranne library), or abstract icons?**
- *Recommendation:* **Recognizable caricatures** for the named landmarks; simple icons for generic
  loot. — *why:* recognition is the local charm.
- **Answer:** recognizable caricatures of real places and real names

**QF.3 — Overall vibe: cute & wholesome, or cheeky & meme-y?**
- *Recommendation:* **Cheeky-but-wholesome** — winks (a sweating Hamsin sun, a crying מועד ב'
  scroll) without meanness. — *why:* matches the suite's affectionate-insider tone.
- **Answer:** ▮as rec

**QF.4 — Reference games for the feel (any you like)?**
- *Recommendation:* **Gold Miner (the classic) + the juice of a hyper-casual mobile hit + Monopoly
  for the asset-board energy.** — *why:* familiar, juicy, ownership-driven.
- **Answer:** ▮ *(name any)* as rec

---

## G. Content & tone

🎯 *Changes:* the item/asset/obstacle naming and humor.

**QG.1 — How punny/jokey should item & obstacle names be (vs straight)?**
- *Recommendation:* **Punny and local** ("747 מושלם", "חניה ביום ראשון", "חמסין מהגיהנום"). —
  *why:* names are free comedy and reinforce locality.
- **Answer:** ▮yes. also, you can choose between a באר שבעי לבוש כמו סטודנט או באר שבעית לבושה בפיגמה וכפכפי פרווה 

**QG.2 — The asset list (what you buy) — confirm the tiered Be'er Sheva set (dorm → Café Lola →
Old City pub → bar → BIG/Grand Canyon → flagship), or swap/add specific places you love?**
- *Recommendation:* **Use the researched tiered set; you add 3–5 personal Be'er Sheva favorites
  to make it feel authentic.** — *why:* insider specificity is the charm; you know the best spots.
- **Answer:** ▮ *(list any must-include places)* האוניברסיטה, רינגלבלום, מצדה, הגרנד קניון, הפורום, הלשכה של רוביק דנילוביץ (הבוס) טוטו טרנר, סורוקה, פארק הסופרים, הבלוק, בנג׳י , פרינדס, וכו... תבדוק עליהם באינטרנט אםן צריך

**QG.3 — Two items weren't verified (a BGU-specific parking ticket; Aroma on/near campus). Keep,
drop, or replace?**
- *Recommendation:* **Keep parking ticket (universal); replace Aroma with a verified campus coffee
  spot if you know one.** — *why:* accuracy where it's cheap to get right.
- **Answer:** keep both. 

---

## H. Onboarding & first run

🎯 *Changes:* how players learn the two layers (mine + economy).

**QH.1 — Teach the claw and the economy separately (level 1 = just mining, shop introduced after),
or all at once?**
- *Recommendation:* **Staggered — level 1 pure mining, then unlock the shop with a one-line
  prompt.** — *why:* one new concept at a time; avoids overwhelm.
- **Answer:** ▮as rec
**QH.2 — Any tutorial text, or fully learn-by-doing?**
- *Recommendation:* **Minimal inline prompts only** ("הקש כדי להפיל את הטופר"). — *why:* arcade
  controls are self-evident; keep it playful.
- **Answer:** make sure it is written in simple cool hebrew slang that wont seem ai

---

## I. Edge & failure UX

🎯 *Changes:* how losing/getting-stuck feels.

**QI.1 — Failing a level (missed the ₪ target) — retry instantly, or lose progress/resources?**
- *Recommendation:* **Instant friendly retry, keep your ₪/assets.** — *why:* punishment kills
  casual fun; the goal is "one more try," not frustration.
- **Answer:** as rec

**QI.2 — Can a player get *stuck* (can't afford the next district)? How do we prevent a
dead-end?**
- *Recommendation:* **Always allow replaying earlier levels to earn ₪; tune so this is rare.**
  *why:* no dead-ends in a feel-good game.
- **Answer:** ▮as rec

---

## J. Scope & priorities

🎯 *Changes:* what survives time pressure.

**QJ.1 — If only ONE layer ships polished — the claw arcade, or the economy/boss arc?**
- *Recommendation:* **The claw arcade** (with a thin economy). — *why:* a great claw loop is fun
  alone; a great economy with a bad claw is not.
- **Answer:** as rec

**QJ.2 — Rank to cut first (1=keep, 5=cut first): power-ups · district map art · passive income ·
share-card · combo bonuses.**
- *Recommendation:* keep **map art** & **combos**; cut **share-card → passive income → power-ups**
  first. — *why:* protect feel and progress legibility over extras.
- **Answer:** ▮ as rec

---

## K. Success & demo feel

🎯 *Changes:* the demo script.

**QK.1 — The demo "wow" — a juicy jackpot grab, buying a recognizable place, or a fast-forward to
the crown?**
- *Recommendation:* **Jackpot grab → buy Café Lola (room reacts to the local reference) → tease
  the crown.** — *why:* shows feel + locality + goal in ~45s.
- **Answer:** ▮as rec

**QK.2 — One sentence: how should a judge feel?**
- *Recommendation:* "This is adorable and I want to own Be'er Sheva." — *why:* delight + the hook
  of the goal.
- **Answer:** ▮as rec

---

### Done? Confirm/edit above. Pair with `PRODUCT-VISION.md` and the other two `DISCOVERY.md` files.
