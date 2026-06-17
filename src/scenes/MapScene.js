import Phaser from 'phaser'
import { loadProfile } from '../state.js'

// The tycoon hub: a stylized Be'er Sheva board. Districts list their assets as dots;
// owned ones light up gold with a flag. Boss meter on top. Routes to Level / Shop.
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

    // group assets by district
    const groups = {}
    catalog.assets.forEach((a) => {
      ;(groups[a.district] = groups[a.district] || []).push(a)
    })

    const bg = this.add.graphics()
    bg.fillGradientStyle(0xfff7ea, 0xfff7ea, 0xead2a8, 0xdcc096, 1)
    bg.fillRect(0, 0, W, H)

    this.add.text(W / 2, 64, '🗺️ באר שבע', {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '54px', color: '#b4521f', fontStyle: 'bold'
    }).setOrigin(0.5)
    this.add.text(W / 2, 124, `💰 ${profile.money} ₪`, {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '34px', color: '#3a2a1a', fontStyle: 'bold'
    }).setOrigin(0.5)

    // boss meter
    const goal = catalog.bossMeterGoal || 120
    const pct = Math.min(1, profile.bossPoints / goal)
    this.add.text(W / 2, 184, `👑 ${Math.round(pct * 100)}% לשלטון על העיר`, {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '26px', color: '#b4521f'
    }).setOrigin(0.5)
    const meter = this.add.graphics()
    meter.fillStyle(0xffffff, 0.7); meter.fillRoundedRect(W / 2 - 280, 210, 560, 24, 12)
    meter.fillStyle(0xffcb3d, 1); meter.fillRoundedRect(W / 2 - 280, 210, 560 * pct, 24, 12)

    // district rows
    levels.districts.forEach((d, i) => {
      const y = 320 + i * 150
      const locked = ownedCount < (d.unlockRequiresAssets || 0)
      const isCurrent = d.id === profile.currentDistrict

      const row = this.add.graphics()
      row.fillStyle(isCurrent ? 0xffffff : 0xf4e2c4, locked ? 0.5 : 1)
      row.fillRoundedRect(40, y - 56, W - 80, 112, 18)
      if (isCurrent) { row.lineStyle(4, 0x1e8a7a, 1); row.strokeRoundedRect(40, y - 56, W - 80, 112, 18) }

      this.add.text(W - 64, y - 26, d.label, {
        fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '30px',
        color: locked ? '#a89372' : '#3a2a1a', fontStyle: 'bold'
      }).setOrigin(1, 0.5)

      if (locked) {
        this.add.text(W - 64, y + 18, `🔒 דרושים ${d.unlockRequiresAssets} נכסים`, {
          fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '20px', color: '#a89372'
        }).setOrigin(1, 0.5)
      }

      const assets = (groups[d.id] || []).slice(0, 7)
      assets.forEach((a, j) => {
        const dx = 90 + j * 64
        const has = owned.has(a.id)
        this.add.circle(dx, y, 22, has ? 0xffcb3d : 0xffffff, 1)
          .setStrokeStyle(3, has ? 0xb4521f : 0xd8bd8d)
        if (has) this.add.text(dx, y - 26, '🚩', { fontSize: '20px' }).setOrigin(0.5)
      })
    })

    // actions
    this.makeButton(W / 2 + 150, H - 110, '⛏️ שחק שלב', 0x1e8a7a, 0x146357, () => this.scene.start('Level'))
    this.makeButton(W / 2 - 150, H - 110, '🏪 חנות', 0xd9743b, 0xb4521f, () => this.scene.start('Shop'))
  }

  makeButton(x, y, text, fill, shadow, onClick) {
    const w = 280; const h = 76
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
