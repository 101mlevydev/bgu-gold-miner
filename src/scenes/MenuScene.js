import Phaser from 'phaser'
import { CHARACTERS } from '../systems/CharacterManager.js'
import { loadProfile, saveProfile, resetProfile, hasSave } from '../state.js'
import { setMuted } from '../lib/audio.js'

const C = {
  ink: '#3a2a1a',
  terra: '#d9743b',
  terraD: '#b4521f',
  teal: '#1e8a7a',
  tealD: '#146357',
  sun: '#f4b740',
  cream: '#fff7ea'
}

// BGU suite cross-promo. Fill each url with the app's hub sandbox URL at launch
// (one-line swap). Empty url = pill rendered but inert (not clickable).
const SUITE = [
  { id: 'nuschaon', name: 'נוסחאון',      emoji: '📄', url: '' },
  { id: 'gold',     name: 'מכרה הזהב',     emoji: '⛏️', url: '' },
  { id: 'desk',     name: 'מתחת לשולחן',   emoji: '🎮', url: '' },
  { id: 'beit',     name: 'בית הסטודנט',   emoji: '🏠', url: '' }
]
const SELF_ID = 'gold'

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu')
    this.cards = []
  }

  create() {
    const profile = loadProfile()
    const cx = this.scale.width / 2

    this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xfff7ea).setOrigin(0)

    this.add
      .text(cx, 250, '⛏️ מכרה הזהב', {
        fontFamily: 'Heebo, system-ui, sans-serif',
        fontSize: '76px',
        color: C.terraD,
        fontStyle: 'bold'
      })
      .setOrigin(0.5)
    this.add
      .text(cx, 340, 'תהפוך לבוס של באר שבע', {
        fontFamily: 'Heebo, system-ui, sans-serif',
        fontSize: '34px',
        color: C.ink
      })
      .setOrigin(0.5)

    // Character select
    this.add
      .text(cx, 470, 'בחר דמות', {
        fontFamily: 'Heebo, system-ui, sans-serif',
        fontSize: '30px',
        color: C.terra,
        fontStyle: 'bold'
      })
      .setOrigin(0.5)

    const positions = [cx + 150, cx - 150]
    CHARACTERS.forEach((ch, i) => {
      this.cards.push(this.makeCard(positions[i], 640, ch))
    })
    this.refreshCards(profile.character)

    // Buttons
    this.makeButton(cx, 880, 'משחק חדש', C.teal, C.tealD, () => {
      const p = resetProfile()
      p.character = profile.character
      saveProfile()
      this.scene.start('Map')
    })

    if (hasSave()) {
      this.makeButton(cx, 980, 'המשך', C.terra, C.terraD, () => this.scene.start('Map'))
    }

    // Suite cross-promo (Menu only — never during gameplay)
    this.makeSuiteFooter(cx, this.scale.height - 90)

    // Mute toggle (audio wired in Step 17)
    const muted = this.registry.get('muted') || false
    setMuted(muted)
    const mute = this.add
      .text(60, 60, muted ? '🔇' : '🔊', { fontSize: '40px' })
      .setInteractive({ useHandCursor: true })
    mute.on('pointerdown', () => {
      const now = !this.registry.get('muted')
      this.registry.set('muted', now)
      this.sound.mute = now
      setMuted(now)
      mute.setText(now ? '🔇' : '🔊')
    })
  }

  makeCard(x, y, ch) {
    const bg = this.add.rectangle(x, y, 240, 200, 0xffffff).setStrokeStyle(4, 0xe2c79c)
    const emoji = this.add.text(x, y - 30, ch.emoji, { fontSize: '64px' }).setOrigin(0.5)
    const label = this.add
      .text(x, y + 50, ch.label, {
        fontFamily: 'Heebo, system-ui, sans-serif',
        fontSize: '28px',
        color: C.ink,
        fontStyle: 'bold'
      })
      .setOrigin(0.5)
    const note = this.add
      .text(x, y + 85, ch.note, {
        fontFamily: 'Heebo, system-ui, sans-serif',
        fontSize: '18px',
        color: '#8a6f55',
        align: 'center',
        wordWrap: { width: 220 }
      })
      .setOrigin(0.5)
    bg.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
      const profile = loadProfile()
      profile.character = ch.id
      saveProfile()
      this.refreshCards(ch.id)
    })
    return { id: ch.id, bg, emoji, label, note }
  }

  refreshCards(selectedId) {
    this.cards.forEach((c) => {
      const sel = c.id === selectedId
      c.bg.setStrokeStyle(4, sel ? 0x1e8a7a : 0xe2c79c)
      c.bg.setFillStyle(sel ? 0xeafff6 : 0xffffff)
    })
  }

  makeSuiteFooter(cx, y) {
    this.add
      .text(cx, y - 34, 'עוד כלים לחיי בן-גוריון 👇', {
        fontFamily: 'Heebo, system-ui, sans-serif',
        fontSize: '22px',
        color: '#8a6f55',
        fontStyle: 'bold'
      })
      .setOrigin(0.5)

    const others = SUITE.filter((a) => a.id !== SELF_ID)
    const gap = 14
    const pills = others.map((a) => {
      const live = !!a.url
      const t = this.add
        .text(0, y, `${a.emoji} ${a.name}`, {
          fontFamily: 'Heebo, system-ui, sans-serif',
          fontSize: '20px',
          color: live ? C.tealD : '#a9967f',
          backgroundColor: '#ffffff',
          padding: { x: 12, y: 6 }
        })
        .setOrigin(0.5)
      if (live) {
        t.setInteractive({ useHandCursor: true })
        t.on('pointerup', () => window.open(a.url, '_blank', 'noopener'))
      }
      return t
    })

    // center the row horizontally
    const widths = pills.map((t) => t.width)
    const total = widths.reduce((s, w) => s + w, 0) + gap * (pills.length - 1)
    let x = cx - total / 2
    pills.forEach((t, i) => {
      t.x = x + widths[i] / 2
      x += widths[i] + gap
    })
  }

  makeButton(x, y, text, fill, shadow, onClick) {
    const w = 360
    const h = 70
    const sh = this.add.rectangle(x, y + 5, w, h, Phaser.Display.Color.HexStringToColor(shadow).color).setOrigin(0.5)
    const bg = this.add
      .rectangle(x, y, w, h, Phaser.Display.Color.HexStringToColor(fill).color)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
    const label = this.add
      .text(x, y, text, {
        fontFamily: 'Heebo, system-ui, sans-serif',
        fontSize: '32px',
        color: '#ffffff',
        fontStyle: 'bold'
      })
      .setOrigin(0.5)
    bg.on('pointerdown', () => {
      bg.y = y + 3
      label.y = y + 3
    })
    bg.on('pointerup', () => {
      bg.y = y
      label.y = y
      onClick()
    })
    bg.on('pointerout', () => {
      bg.y = y
      label.y = y
    })
    return { sh, bg, label }
  }
}
