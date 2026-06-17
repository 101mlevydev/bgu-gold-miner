import Phaser from 'phaser'
import Claw from '../game/Claw.js'
import { shake, burst, popText } from '../game/JuiceFx.js'
import { loadProfile, saveProfile } from '../state.js'
import { resolvePerks } from '../systems/perks.js'
import { sfx } from '../lib/audio.js'

// Mine level: claw + crafted item tokens + ₪ scoring + crafted tokens + juice.
// COMPLETION-BASED (no timer): reach the ₪ target to win; obstacles cost a heart;
// lose all hearts → retry. Base 3 hearts (+heart perks).

const EMOJI = {
  psychometric747: '🎯', scholarship: '💰', dorms: '🛏️', perfectGrade: '💯',
  parkingPermit: '🅿️', goodGrade: '📗', marketFind: '🛍️', busOnTime: '🚌',
  falafel: '🥙', coffee: '☕',
  moedBet: '📝', hamsin: '🌡️', parkingTicket: '🧾', missedBus: '🚍',
  trainDelay: '🚆', aromaPricey: '💸'
}

const PIT = { x0: 95, x1: 625, y0: 360, y1: 1150 }
const ITEM_COUNT = 12
const BASE_HEARTS = 3

export default class LevelScene extends Phaser.Scene {
  constructor() {
    super('Level')
  }

  create() {
    const W = this.scale.width
    const H = this.scale.height
    this.profile = loadProfile()
    const levels = this.registry.get('levels')
    const district =
      levels.districts.find((d) => d.id === this.profile.currentDistrict) || levels.districts[0]
    const def = district.levels[this.profile.levelIndex] || district.levels[0]

    this.target = def.target
    this.obstacleRate = def.obstacleRate
    this.money = 0
    this.over = false

    // perks from owned assets
    this.perks = resolvePerks(this.profile, this.registry.get('assets'))
    this.maxHearts = BASE_HEARTS + (this.perks.hearts || 0)
    this.hearts = this.maxHearts
    this.incomeMult = this.perks.incomeMult
    this.insurance = this.perks.insurance
    this.grabRadius = 52 + this.perks.magnet

    const all = this.registry.get('collectibles').items
    this.valuables = all.filter((i) => i.kind === 'valuable')
    this.obstacles = all.filter((i) => i.kind === 'obstacle')

    // crafted background + dig pit
    const bg = this.add.graphics()
    bg.fillGradientStyle(0xfff7ea, 0xfff7ea, 0xead2a8, 0xdcc096, 1)
    bg.fillRect(0, 0, W, H)
    const pit = this.add.graphics()
    pit.fillStyle(0xf4e2c4, 1)
    pit.fillRoundedRect(40, PIT.y0 - 60, W - 80, H - (PIT.y0 - 60) + 40, { tl: 28, tr: 28, bl: 0, br: 0 })
    pit.lineStyle(3, 0xe0c79a, 1)
    pit.strokeRoundedRect(40, PIT.y0 - 60, W - 80, 200, { tl: 28, tr: 28, bl: 0, br: 0 })

    // HUD
    const hud = this.add.graphics()
    hud.fillStyle(0xd9743b, 1)
    hud.fillRoundedRect(-12, -12, W + 24, 162, { tl: 0, tr: 0, bl: 26, br: 26 })
    this.add.text(W / 2, 36, district.label, {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '26px', color: '#fff7ea'
    }).setOrigin(0.5)
    this.moneyText = this.add.text(W - 26, 100, '', {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '42px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(1, 0.5)
    this.heartsText = this.add.text(W / 2, 100, '', { fontSize: '34px' }).setOrigin(0.5)
    this.targetText = this.add.text(26, 100, '', {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '34px', color: '#fff7ea'
    }).setOrigin(0, 0.5)
    this.refreshHud()

    // items
    this.items = []
    for (let i = 0; i < ITEM_COUNT; i++) this.spawnItem()

    // claw
    this.claw = new Claw(this, W / 2, 152)
    this.claw.onGrabTest = (x, y, r) => this.grabTest(x, y, r)
    this.claw.onCollect = (item) => this.collect(item)
    this.claw.clawSpeedMult = this.perks.reelMult

    this.input.on('pointerdown', () => this.claw.drop())
    this.input.keyboard.on('keydown-SPACE', () => this.claw.drop())
  }

  update(time, delta) {
    if (!this.over && this.claw) this.claw.update(delta)
  }

  refreshHud() {
    this.moneyText.setText(`💰 ${this.money}`)
    this.targetText.setText(`🎯 ${this.target}`)
    this.heartsText.setText('❤️'.repeat(this.hearts) + '🤍'.repeat(this.maxHearts - this.hearts))
  }

  weightedPick(list) {
    const total = list.reduce((s, it) => s + (it.rarity || 0.1), 0)
    let r = Math.random() * total
    for (const it of list) {
      r -= it.rarity || 0.1
      if (r <= 0) return it
    }
    return list[list.length - 1]
  }

  spawnItem() {
    const isObstacle = Math.random() < this.obstacleRate
    const data = this.weightedPick(isObstacle ? this.obstacles : this.valuables)
    const x = Phaser.Math.Between(PIT.x0, PIT.x1)
    const y = Phaser.Math.Between(PIT.y0, PIT.y1)
    const display = this.makeToken(data, x, y)
    const item = { display, data, alive: true }
    item.pulse = this.tweens.add({
      targets: display, scale: { from: 0.95, to: 1.05 }, yoyo: true, repeat: -1,
      duration: 1300 + Math.random() * 600, ease: 'Sine.InOut', delay: Math.random() * 800
    })
    this.items.push(item)
  }

  makeToken(data, x, y) {
    const good = data.kind === 'valuable'
    const r = 30 + (data.weight || 1) * 7
    const shadow = this.add.circle(0, 5, r, 0x000000, 0.12)
    const back = this.add.circle(0, 0, r, good ? 0xffffff : 0xf6d2cb, 1).setStrokeStyle(4, good ? 0xe0a96b : 0xc0473b)
    const hi = this.add.circle(-r * 0.32, -r * 0.32, r * 0.34, 0xffffff, 0.5)
    const emoji = this.add.text(0, 0, EMOJI[data.id] || '❓', { fontSize: `${Math.round(r * 1.05)}px` }).setOrigin(0.5)
    return this.add.container(x, y, [shadow, back, hi, emoji]).setSize(r * 2, r * 2)
  }

  grabTest(x, y, r) {
    let best = null
    let bestD = this.grabRadius || r
    for (const it of this.items) {
      if (!it.alive) continue
      const d = Phaser.Math.Distance.Between(x, y, it.display.x, it.display.y)
      if (d < bestD) { bestD = d; best = it }
    }
    if (best) {
      best.alive = false
      if (best.pulse) best.pulse.stop()
      best.display.setScale(1)
    }
    return best
  }

  collect(item) {
    const good = item.data.kind === 'valuable'
    const { x, y } = item.display

    if (good) {
      const v = Math.round((item.data.value || 0) * (this.incomeMult || 1))
      const jackpot = v >= 400
      this.money += v
      sfx(jackpot ? 'jackpot' : 'good')
      shake(this, jackpot ? 0.018 : 0.007, jackpot ? 260 : 130)
      burst(this, x, y, jackpot ? 0xffcb3d : 0xf4b740, jackpot ? 16 : 9)
      popText(this, x, y, `+${v}`, '#2e9e5b')
    } else if (this.insurance > 0) {
      this.insurance -= 1
      sfx('good')
      burst(this, x, y, 0x1e8a7a, 8)
      popText(this, x, y, '🛡️', '#1e8a7a')
    } else {
      this.hearts -= 1
      sfx('bad')
      shake(this, 0.014, 200)
      burst(this, x, y, 0xc0473b, 8)
      popText(this, x, y, '💔', '#c0473b')
    }

    this.tweens.killTweensOf(item.display)
    item.display.destroy()
    this.items = this.items.filter((it) => it !== item)
    this.spawnItem()
    this.refreshHud()

    if (this.money >= this.target) this.endLevel(true)
    else if (this.hearts <= 0) this.endLevel(false)
  }

  endLevel(win) {
    if (this.over) return
    this.over = true
    this.input.removeAllListeners()
    const W = this.scale.width
    const H = this.scale.height
    if (win) {
      this.profile.money += this.money
      saveProfile()
      sfx('jackpot')
    }

    this.add.rectangle(0, 0, W, H, 0x000000, 0.55).setOrigin(0).setDepth(70)
    const panel = this.add.graphics().setDepth(71)
    panel.fillStyle(0xfff7ea, 1)
    panel.fillRoundedRect(W / 2 - 280, 440, 560, 360, 28)
    this.add.text(W / 2, 520, win ? '🎉 עברת את השלב!' : '💔 נגמרו הלבבות', {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '50px', color: '#b4521f', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(72)
    this.add.text(W / 2, 610, `💰 ${this.money} / 🎯 ${this.target}`, {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '36px', color: '#3a2a1a'
    }).setOrigin(0.5).setDepth(72)
    const btn = this.add.text(W / 2, 720, win ? '▶ לחנות הנכסים' : '↩ עוד ניסיון', {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '34px', color: '#1e8a7a', fontStyle: 'bold'
    }).setOrigin(0.5).setDepth(72).setInteractive({ useHandCursor: true })
    btn.on('pointerdown', () => this.scene.start(win ? 'Shop' : 'Level'))
  }
}
