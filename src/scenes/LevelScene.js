import Phaser from 'phaser'
import Claw from '../game/Claw.js'
import { loadProfile } from '../state.js'

// First playable mine level: claw + weighted item field + ₪ scoring + timer + target.
// (GameOver/Shop/Map/juice come in later steps; this proves the core loop.)

const EMOJI = {
  psychometric747: '🎯', scholarship: '💰', dorms: '🛏️', perfectGrade: '💯',
  parkingPermit: '🅿️', goodGrade: '📗', marketFind: '🛍️', busOnTime: '🚌',
  falafel: '🥙', coffee: '☕',
  moedBet: '📝', hamsin: '🌡️', parkingTicket: '🧾', missedBus: '🚍',
  trainDelay: '🚆', aromaPricey: '💸'
}

const PIT = { x0: 90, x1: 630, y0: 330, y1: 1150 }
const ITEM_COUNT = 12

export default class LevelScene extends Phaser.Scene {
  constructor() {
    super('Level')
  }

  create() {
    const W = this.scale.width
    this.profile = loadProfile()
    const levels = this.registry.get('levels')
    const district =
      levels.districts.find((d) => d.id === this.profile.currentDistrict) || levels.districts[0]
    const def = district.levels[this.profile.levelIndex] || district.levels[0]

    this.target = def.target
    this.timeLeft = def.time
    this.obstacleRate = def.obstacleRate
    this.money = 0
    this.reached = false
    this.over = false

    // pools
    const all = this.registry.get('collectibles').items
    this.valuables = all.filter((i) => i.kind === 'valuable')
    this.obstacles = all.filter((i) => i.kind === 'obstacle')

    // background + pit
    this.add.rectangle(0, 0, W, this.scale.height, 0xfff7ea).setOrigin(0)
    this.add.rectangle(0, PIT.y0 - 20, W, this.scale.height, 0xf4e2c4).setOrigin(0)

    // HUD
    this.add.rectangle(0, 0, W, 150, 0xd9743b).setOrigin(0)
    this.add
      .text(W / 2, 36, district.label, {
        fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '26px', color: '#fff7ea'
      })
      .setOrigin(0.5)
    this.moneyText = this.add
      .text(W - 24, 100, '', { fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '40px', color: '#ffffff', fontStyle: 'bold' })
      .setOrigin(1, 0.5)
    this.timerText = this.add
      .text(W / 2, 100, '', { fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '40px', color: '#ffffff', fontStyle: 'bold' })
      .setOrigin(0.5)
    this.targetText = this.add
      .text(24, 100, '', { fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '34px', color: '#fff7ea' })
      .setOrigin(0, 0.5)
    this.refreshHud()

    // items
    this.items = []
    for (let i = 0; i < ITEM_COUNT; i++) this.spawnItem()

    // claw
    this.claw = new Claw(this, W / 2, 150)
    this.claw.onGrabTest = (x, y, r) => this.grabTest(x, y, r)
    this.claw.onCollect = (item) => this.collect(item)

    // input
    this.input.on('pointerdown', () => this.claw.drop())
    this.input.keyboard.on('keydown-SPACE', () => this.claw.drop())

    // timer
    this.tickEvent = this.time.addEvent({ delay: 1000, loop: true, callback: () => this.tick() })
  }

  update(time, delta) {
    if (!this.over && this.claw) this.claw.update(delta)
  }

  refreshHud() {
    this.moneyText.setText(`💰 ${this.money}`)
    this.timerText.setText(`⏱️ ${Math.max(0, this.timeLeft)}`)
    this.targetText.setText(`🎯 ${this.target}`)
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
    const size = 30 + (data.weight || 1) * 8
    const txt = this.add.text(x, y, EMOJI[data.id] || '❓', { fontSize: `${size}px` }).setOrigin(0.5)
    this.items.push({ txt, data, alive: true })
  }

  grabTest(x, y, r) {
    let best = null
    let bestD = r
    for (const it of this.items) {
      if (!it.alive) continue
      const d = Phaser.Math.Distance.Between(x, y, it.txt.x, it.txt.y)
      if (d < bestD) {
        bestD = d
        best = it
      }
    }
    if (best) best.alive = false
    return best
  }

  collect(item) {
    const v = item.data.value || 0
    this.money += v
    if (item.data.timeBonus) this.timeLeft += item.data.timeBonus
    if (item.data.timePenalty) this.timeLeft = Math.max(0, this.timeLeft - item.data.timePenalty)

    // float a +/- popup
    const pop = this.add
      .text(item.txt.x, item.txt.y, (v >= 0 ? '+' : '') + v, {
        fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '34px', fontStyle: 'bold',
        color: v >= 0 ? '#2e9e5b' : '#c0473b'
      })
      .setOrigin(0.5)
    this.tweens.add({ targets: pop, y: pop.y - 60, alpha: 0, duration: 700, onComplete: () => pop.destroy() })

    item.txt.destroy()
    this.items = this.items.filter((it) => it !== item)
    this.spawnItem()

    if (!this.reached && this.money >= this.target) {
      this.reached = true
      this.targetText.setColor('#0a3')
    }
    this.refreshHud()
  }

  tick() {
    if (this.over) return
    this.timeLeft -= 1
    this.refreshHud()
    if (this.timeLeft <= 0) this.endLevel()
  }

  endLevel() {
    this.over = true
    if (this.tickEvent) this.tickEvent.remove()
    this.input.removeAllListeners()
    const W = this.scale.width
    const win = this.money >= this.target
    this.add.rectangle(0, 0, W, this.scale.height, 0x000000, 0.55).setOrigin(0)
    this.add
      .text(W / 2, 520, win ? '🎉 עברת את השלב!' : '⏰ נגמר הזמן', {
        fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '52px', color: '#fff7ea', fontStyle: 'bold'
      })
      .setOrigin(0.5)
    this.add
      .text(W / 2, 600, `💰 ${this.money} / 🎯 ${this.target}`, {
        fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '36px', color: '#ffffff'
      })
      .setOrigin(0.5)
    const btn = this.add
      .text(W / 2, 720, win ? '↩ לתפריט (חנות בקרוב)' : '↩ נסה שוב', {
        fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '34px', color: '#ffcb3d', fontStyle: 'bold'
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
    btn.on('pointerdown', () => this.scene.start(win ? 'Menu' : 'Level'))
  }
}
