import Phaser from 'phaser'
import { loadProfile, saveProfile } from '../state.js'
import { availableAssets, canAfford, buy } from '../systems/assetStore.js'
import { resolvePerks, perkLabel } from '../systems/perks.js'
import { advance } from '../systems/progression.js'
import { burst, popText } from '../game/JuiceFx.js'

// Between-levels Asset Store: spend ₪ on Be'er Sheva assets (perks + boss points).
export default class ShopScene extends Phaser.Scene {
  constructor() {
    super('Shop')
  }

  create() {
    const W = this.scale.width
    const H = this.scale.height
    this.profile = loadProfile()
    this.catalog = this.registry.get('assets')
    this.levels = this.registry.get('levels')

    // passive income accrues once per shop visit
    const perks = resolvePerks(this.profile, this.catalog)
    if (perks.passiveIncome > 0) {
      this.profile.money += perks.passiveIncome
      saveProfile()
    }

    const bg = this.add.graphics()
    bg.fillGradientStyle(0xfff7ea, 0xfff7ea, 0xead2a8, 0xdcc096, 1)
    bg.fillRect(0, 0, W, H)

    this.add
      .text(W / 2, 70, '🏪 חנות הנכסים', {
        fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '52px', color: '#b4521f', fontStyle: 'bold'
      })
      .setOrigin(0.5)
    this.walletText = this.add
      .text(W / 2, 140, '', {
        fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '40px', color: '#3a2a1a', fontStyle: 'bold'
      })
      .setOrigin(0.5)

    // boss meter
    const goal = this.catalog.bossMeterGoal || 120
    const pct = Math.min(1, this.profile.bossPoints / goal)
    this.add.text(W / 2, 210, `👑 ${Math.round(pct * 100)}%`, {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '30px', color: '#b4521f'
    }).setOrigin(0.5)
    const meter = this.add.graphics()
    meter.fillStyle(0xffffff, 0.7); meter.fillRoundedRect(W / 2 - 280, 240, 560, 26, 13)
    meter.fillStyle(0xffcb3d, 1); meter.fillRoundedRect(W / 2 - 280, 240, 560 * pct, 26, 13)

    this.renderList()

    // continue
    this.makeButton(W / 2, H - 120, '🗺️ חזרה למפה', 0x1e8a7a, 0x146357, () => {
      advance(this.profile, this.levels)
      saveProfile()
      this.scene.start('Map')
    })

    this.refreshWallet()
  }

  refreshWallet() {
    this.walletText.setText(`💰 ${this.profile.money} ₪`)
  }

  renderList() {
    const W = this.scale.width
    if (this.listGroup) this.listGroup.forEach((o) => o.destroy())
    this.listGroup = []

    const affordable = availableAssets(this.catalog, this.profile)
      .filter((a) => canAfford(this.profile, a))
      .sort((a, b) => a.price - b.price)
      .slice(0, 5)

    if (affordable.length === 0) {
      const t = this.add
        .text(W / 2, 520, 'אין מספיק ₪ — תחזור לכרות עוד קצת 😉', {
          fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '30px', color: '#8a6f55'
        })
        .setOrigin(0.5)
      this.listGroup.push(t)
      return
    }

    affordable.forEach((asset, i) => {
      const y = 330 + i * 132
      const card = this.add.graphics()
      card.fillStyle(0x000000, 0.1); card.fillRoundedRect(W / 2 - 312, y - 52 + 4, 624, 112, 20)
      card.fillStyle(0xffffff, 1); card.fillRoundedRect(W / 2 - 312, y - 52, 624, 112, 20)
      const label = this.add.text(W / 2 + 296, y - 18, asset.label, {
        fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '32px', color: '#3a2a1a', fontStyle: 'bold'
      }).setOrigin(1, 0.5)
      const perk = this.add.text(W / 2 + 296, y + 22, perkLabel(asset.perk), {
        fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '24px', color: '#8a6f55'
      }).setOrigin(1, 0.5)
      const priceChip = this.add.text(W / 2 - 296, y - 18, `${asset.price} ₪`, {
        fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '26px', color: '#5a3b00', fontStyle: 'bold',
        backgroundColor: '#f4b740', padding: { x: 12, y: 6 }
      }).setOrigin(0, 0.5)
      const buyBtn = this.add.text(W / 2 - 296, y + 24, '🛒 קנה', {
        fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '26px', color: '#ffffff', fontStyle: 'bold',
        backgroundColor: '#1e8a7a', padding: { x: 18, y: 8 }
      }).setOrigin(0, 0.5).setInteractive({ useHandCursor: true })
      buyBtn.on('pointerdown', () => this.tryBuy(asset, W / 2, y))
      this.listGroup.push(card, label, perk, priceChip, buyBtn)
    })
  }

  tryBuy(asset, x, y) {
    if (buy(this.profile, asset)) {
      burst(this, x, y, 0xffcb3d, 14)
      popText(this, x, y, `קנית! ${asset.label}`, '#2e9e5b')
      this.refreshWallet()
      if (asset.win) {
        this.time.delayedCall(450, () => this.scene.start('BossWin'))
      } else {
        this.time.delayedCall(250, () => this.scene.restart())
      }
    }
  }

  makeButton(x, y, text, fill, shadow, onClick) {
    const w = 380; const h = 76
    this.add.rectangle(x, y + 5, w, h, shadow).setOrigin(0.5)
    const bg = this.add.rectangle(x, y, w, h, fill).setOrigin(0.5).setInteractive({ useHandCursor: true })
    const label = this.add.text(x, y, text, {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '34px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5)
    bg.on('pointerdown', () => { bg.y = y + 3; label.y = y + 3 })
    bg.on('pointerup', () => { bg.y = y; label.y = y; onClick() })
    bg.on('pointerout', () => { bg.y = y; label.y = y })
  }
}
