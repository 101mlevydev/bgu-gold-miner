import Phaser from 'phaser'
import { loadProfile, resetProfile } from '../state.js'
import { getCharacter } from '../systems/CharacterManager.js'
import { sfx } from '../lib/audio.js'

const SHARE_URL_OVERRIDE = ''
function shareUrl(extra = '') { const base = SHARE_URL_OVERRIDE || (location.origin + location.pathname); return base + extra }

// The payoff: crowned Boss of Be'er Sheva (bought the mayor's office).
export default class BossWinScene extends Phaser.Scene {
  constructor() {
    super('BossWin')
  }

  create() {
    const W = this.scale.width
    const H = this.scale.height
    const profile = loadProfile()
    const ch = getCharacter(profile.character)

    const bg = this.add.graphics()
    bg.fillGradientStyle(0x2a1c0e, 0x2a1c0e, 0x5a3a18, 0x5a3a18, 1)
    bg.fillRect(0, 0, W, H)
    sfx('jackpot')

    // confetti rain
    const confetti = ['🎉', '✨', '🎊', '⭐', '👑']
    this.time.addEvent({
      delay: 220, loop: true, callback: () => {
        const e = this.add.text(Phaser.Math.Between(40, W - 40), -40,
          Phaser.Utils.Array.GetRandom(confetti), { fontSize: '40px' }).setDepth(5)
        this.tweens.add({
          targets: e, y: H + 60, angle: Phaser.Math.Between(-180, 180),
          duration: Phaser.Math.Between(2200, 3600), ease: 'Cubic.In',
          onComplete: () => e.destroy()
        })
      }
    })

    const crown = this.add.text(W / 2, 360, '👑', { fontSize: '150px' }).setOrigin(0.5)
    this.tweens.add({ targets: crown, scale: { from: 0.9, to: 1.08 }, yoyo: true, repeat: -1, duration: 700, ease: 'Sine.InOut' })

    this.add.text(W / 2, 520, 'בוס של באר שבע!', {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '64px', color: '#ffcb3d', fontStyle: 'bold'
    }).setOrigin(0.5)
    this.add.text(W / 2, 600, `${ch.emoji} קנית את לשכת ראש העיר 🏛️`, {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '32px', color: '#fff7ea'
    }).setOrigin(0.5)
    this.add.text(W / 2, 670, `💰 ${profile.money} ₪  ·  🏠 ${profile.ownedAssets.length} נכסים`, {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '28px', color: '#e8d2a6'
    }).setOrigin(0.5)

    this.makeButton(W / 2, 850, '↩ לתפריט', 0xd9743b, 0xb4521f, () => this.scene.start('Menu'))
    this.makeButton(W / 2, 960, '🔁 משחק חדש', 0x1e8a7a, 0x146357, () => {
      resetProfile()
      this.scene.start('Menu')
    })
    this.makeButton(W / 2, 1070, '📤 שתף', 0x25a35a, 0x18713d, () => {
      const msg = 'נהייתי בוס של באר שבע 👑 בא לך לנסות לעקוף אותי?'
      window.open('https://wa.me/?text=' + encodeURIComponent(msg + ' ' + shareUrl()), '_blank')
    })
  }

  makeButton(x, y, text, fill, shadow, onClick) {
    const w = 360; const h = 74
    this.add.rectangle(x, y + 5, w, h, shadow).setOrigin(0.5)
    const bg = this.add.rectangle(x, y, w, h, fill).setOrigin(0.5).setInteractive({ useHandCursor: true })
    const label = this.add.text(x, y, text, {
      fontFamily: 'Heebo, system-ui, sans-serif', fontSize: '32px', color: '#ffffff', fontStyle: 'bold'
    }).setOrigin(0.5)
    bg.on('pointerup', () => onClick())
  }
}
