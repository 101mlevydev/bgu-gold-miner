// Asset-free SFX via the Web Audio API (synthesized tones) — keeps the game
// fully static/zero-backend (no audio files to bundle). Unlocks on first gesture
// because every sfx() call follows a tap. Respects a global mute.
let ctx = null
let muted = false

export function setMuted(m) {
  muted = !!m
}
export function isMuted() {
  return muted
}

function ac() {
  if (!ctx) {
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)()
    } catch {
      return null
    }
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(freq, dur, type = 'sine', gain = 0.18, when = 0) {
  const c = ac()
  if (!c) return
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = type
  o.frequency.value = freq
  o.connect(g)
  g.connect(c.destination)
  const t = c.currentTime + when
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(gain, t + 0.012)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.start(t)
  o.stop(t + dur + 0.03)
}

export function sfx(kind) {
  if (muted) return
  switch (kind) {
    case 'good': tone(880, 0.12, 'sine', 0.16); break
    case 'jackpot': [660, 880, 1100, 1320].forEach((f, i) => tone(f, 0.13, 'triangle', 0.17, i * 0.07)); break
    case 'bad': tone(150, 0.22, 'square', 0.14); break
    case 'buy': tone(520, 0.08, 'square', 0.15); tone(780, 0.12, 'square', 0.15, 0.08); break
    case 'click': tone(440, 0.05, 'sine', 0.12); break
    default: break
  }
}
