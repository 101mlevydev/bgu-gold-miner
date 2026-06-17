import Phaser from 'phaser'
import { loadProfile } from '../state.js'
import { getCharacter } from '../systems/CharacterManager.js'

// Animated Be'er Sheva "board": each district is a zone card holding its real
// landmarks as icons. Owned assets light up gold with a flag + pulse; cards and
// nodes animate in. Routes to Level / Shop.

const ASSET_EMOJI = {
  dormRoom: '🛏️', falafelStand: '🥙', shukStall: '🛒', benji: '🍺', friends: '🍻',
  parkHaSofrim: '🌳', grandCanyon: '🏬', ringelblum: '🍸', masada: '🎶', cafeLola: '🎨',
  ashanHazman: '📚', soroka: '🏥', fringeTheater: '🎭', oldCity: '🏛️', turnerStadium: '🏟️',
  bgu: '🎓', mayorOffice: '👑'
}
const ZONE_TINT = {
  campus: 0xeaf6f2, 'old-city': 0xf4ecf7, center: 0xfdf3e3, malls: 0xeaf0f7, rule: 0xfdeede
}

export default class MapScene extends Phaser.Scene {
  constructor() {
    super('Map')
  }

  create() {
    const W = this.scale.width
    const H = this.scale.height
    const profile = loadProfile()
    const levels = this.registry.get('levels')
    const catalog = this.registry.get('assets')
    const owned = new Set(profile.ownedAssets)
    const ownedCount = profile.ownedAssets.length
    const ch = getCharacter(profile.character)

    const groups = {}
    catalog.assets.forEach((a) => { (groups[a.district] = groups[a.district] || []).push(a) })

    // background
    const bg = this.add.graphics()
    bg.fillGradientStyle(0xfff7ea, 0xfff7ea, 0xead2a8, 0xdcc096, 1)
    bg.fillRect(0, 0, W, H)

    // header
    this.add.text(W / 2, 56, '🗺️ באר שבע', {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '50px', color: '#b4521f', fontStyle: 'bold'
    }).setOrigin(0.5)
    this.add.text(W / 2, 112, `💰 ${profile.money} ₪`, {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '32px', color: '#3a2a1a', fontStyle: 'bold'
    }).setOrigin(0.5)

    const goal = catalog.bossMeterGoal || 120
    const pct = Math.min(1, profile.bossPoints / goal)
    this.add.text(W / 2, 162, `👑 ${Math.round(pct * 100)}% לשלטון על העיר`, {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '24px', color: '#b4521f'
    }).setOrigin(0.5)
    const meterBg = this.add.graphics()
    meterBg.fillStyle(0xffffff, 0.7); meterBg.fillRoundedRect(W / 2 - 280, 186, 560, 22, 11)
    const meterFill = this.add.graphics()
    meterFill.fillStyle(0xffcb3d, 1); meterFill.fillRoundedRect(W / 2 - 280, 186, 4, 22, 11)
    this.tweens.add({
      targets: { v: 0 }, v: pct, duration: 900, ease: 'Cubic.Out',
      onUpdate: (tw, t) => { meterFill.clear(); meterFill.fillStyle(0xffcb3d, 1); meterFill.fillRoundedRect(W / 2 - 280, 186, Math.max(4, 560 * t.v), 22, 11) }
    })

    // district zone cards
    const top = 250
    const cardH = 158
    const gap = 14
    let nodeDelay = 250
    levels.districts.forEach((d, i) => {
      const y = top + i * (cardH + gap)
      const locked = ownedCount < (d.unlockRequiresAssets || 0)
      const isCurrent = d.id === profile.currentDistrict

      const card = this.add.container(0, y)
      const g = this.add.graphics()
      g.fillStyle(ZONE_TINT[d.id] || 0xf4e2c4, 1)
      g.fillRoundedRect(40, 0, W - 80, cardH, 22)
      if (isCurrent) { g.lineStyle(5, 0x1e8a7a, 1); g.strokeRoundedRect(40, 0, W - 80, cardH, 22) }
      card.add(g)

      const label = this.add.text(W - 70, 30, d.label, {
        fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '30px',
        color: locked ? '#a89372' : '#3a2a1a', fontStyle: 'bold'
      }).setOrigin(1, 0)
      card.add(label)

      if (isCurrent) {
        const tok = this.add.text(W - 66, 96, ch.emoji, { fontSize: '40px' }).setOrigin(1, 0.5)
        card.add(tok)
        this.tweens.add({ targets: tok, y: 86, yoyo: true, repeat: -1, duration: 700, ease: 'Sine.InOut' })
      }

      // landmark nodes (right → left for RTL)
      const assets = (groups[d.id] || [])
      assets.forEach((a, j) => {
        const nx = W - 150 - j * 78
        const ny = 96
        const has = owned.has(a.id)
        const node = this.add.container(nx, ny)
        const sh = this.add.circle(0, 4, 26, 0x000000, 0.12)
        const back = this.add.circle(0, 0, 26, has ? 0xffcb3d : 0xffffff, has ? 1 : 0.85)
          .setStrokeStyle(3, has ? 0xb4521f : 0xd8bd8d)
        const ico = this.add.text(0, 0, ASSET_EMOJI[a.id] || '📍', { fontSize: '26px' }).setOrigin(0.5)
        node.add([sh, back, ico])
        if (has) {
          const flag = this.add.text(16, -22, '🚩', { fontSize: '20px' }).setOrigin(0.5)
          node.add(flag)
          this.tweens.add({ targets: node, scale: { from: 1, to: 1.08 }, yoyo: true, repeat: -1, duration: 1100, ease: 'Sine.InOut', delay: Math.random() * 600 })
        }
        node.setScale(0).setAlpha(0)
        card.add(node)
        this.tweens.add({ targets: node, scale: 1, alpha: 1, duration: 340, ease: 'Back.Out', delay: nodeDelay })
        nodeDelay += 60
      })

      if (locked) {
        const lock = this.add.graphics()
        lock.fillStyle(0x3a2a1a, 0.28); lock.fillRoundedRect(40, 0, W - 80, cardH, 22)
        card.add(lock)
        const lt = this.add.text((W) / 2, cardH / 2, `🔒 דרושים ${d.unlockRequiresAssets} נכסים`, {
          fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '24px', color: '#fff7ea', fontStyle: 'bold'
        }).setOrigin(0.5)
        card.add(lt)
      }

      // card entrance
      card.setAlpha(0); card.x = i % 2 === 0 ? -30 : 30
      this.tweens.add({ targets: card, alpha: 1, x: 0, duration: 380, ease: 'Cubic.Out', delay: i * 110 })
    })

    // actions
    this.makeButton(W / 2 + 150, H - 80, '⛏️ שחק שלב', 0x1e8a7a, 0x146357, () => this.scene.start('Level'))
    this.makeButton(W / 2 - 150, H - 80, '🏪 חנות', 0xd9743b, 0xb4521f, () => this.scene.start('Shop'))
  }

  makeButton(x, y, text, fill, shadow, onClick) {
    const w = 280; const h = 72
    this.add.rectangle(x, y + 5, w, h, shadow).setOrigin(0.5)
    const bg = this.add.rectangle(x, y, w, h, fill).setOrigin(0.5).setInteractive({ useHandCursor: true })
    const label = this.add.text(x, y, text, {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '30px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5)
    bg.on('pointerdown', () => { bg.y = y + 3; label.y = y + 3 })
    bg.on('pointerup', () => { bg.y = y; label.y = y; onClick() })
    bg.on('pointerout', () => { bg.y = y; label.y = y })
  }
}
