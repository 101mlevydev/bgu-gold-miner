import Phaser from 'phaser'
import { loadProfile } from '../state.js'
import { getCharacter } from '../systems/CharacterManager.js'

// STUB for Steps 07–10 (claw, spawner, scoring, HUD). Confirms the menu → level
// hand-off and the chosen character; real gameplay replaces this.
export default class LevelScene extends Phaser.Scene {
  constructor() {
    super('Level')
  }

  create() {
    const cx = this.scale.width / 2
    const profile = loadProfile()
    const ch = getCharacter(profile.character)

    this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0xfff7ea).setOrigin(0)
    this.add.text(cx, 360, ch.emoji, { fontSize: '90px' }).setOrigin(0.5)
    this.add
      .text(cx, 480, `יוצאים לכרות, ${ch.label}!`, {
        fontFamily: 'Heebo, system-ui, sans-serif',
        fontSize: '40px',
        color: '#b4521f',
        fontStyle: 'bold'
      })
      .setOrigin(0.5)
    this.add
      .text(cx, 560, '(שלב המכרה — בבנייה: טופר, ניקוד, טיימר)', {
        fontFamily: 'Heebo, system-ui, sans-serif',
        fontSize: '24px',
        color: '#8a6f55'
      })
      .setOrigin(0.5)

    const back = this.add
      .text(cx, 720, '↩ חזרה לתפריט', {
        fontFamily: 'Heebo, system-ui, sans-serif',
        fontSize: '30px',
        color: '#1e8a7a',
        fontStyle: 'bold'
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
    back.on('pointerdown', () => this.scene.start('Menu'))
  }
}
