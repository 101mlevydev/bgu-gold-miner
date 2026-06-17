import Phaser from 'phaser'
import { loadProfile } from '../state.js'

// Loads the static JSON catalogs (no binary assets yet — items render as emoji/text
// in the MVP), then hands off to the Menu.
export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot')
  }

  preload() {
    // public/ is served at the root by Vite; base './' keeps paths relative when built.
    this.load.json('collectibles', 'collectibles.json')
    this.load.json('assets', 'assets.json')
    this.load.json('levels', 'levels.json')

    const { width, height } = this.scale
    this.add
      .text(width / 2, height / 2 - 40, '⛏️', { fontSize: '80px' })
      .setOrigin(0.5)
    const bar = this.add
      .text(width / 2, height / 2 + 60, 'טוען…', {
        fontFamily: 'Heebo, system-ui, sans-serif',
        fontSize: '34px',
        color: '#3a2a1a'
      })
      .setOrigin(0.5)
    this.load.on('progress', (p) => bar.setText(`טוען… ${Math.round(p * 100)}%`))
  }

  create() {
    // Cache the catalogs on the registry for any scene to read.
    this.registry.set('collectibles', this.cache.json.get('collectibles'))
    this.registry.set('assets', this.cache.json.get('assets'))
    this.registry.set('levels', this.cache.json.get('levels'))
    loadProfile()
    this.scene.start('Menu')
  }
}
