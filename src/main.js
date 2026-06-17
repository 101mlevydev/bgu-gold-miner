import Phaser from 'phaser'
import './styles/base.css'
import BootScene from './scenes/BootScene.js'
import MenuScene from './scenes/MenuScene.js'
import LevelScene from './scenes/LevelScene.js'
import MapScene from './scenes/MapScene.js'
import ShopScene from './scenes/ShopScene.js'
import BossWinScene from './scenes/BossWinScene.js'

// Portrait design resolution; Phaser scales this to fit any device (Step 19).
export const GAME_W = 720
export const GAME_H = 1280

const config = {
  type: Phaser.AUTO, // WebGL with automatic Canvas fallback (sandbox-safe)
  parent: 'game',
  backgroundColor: '#fff7ea',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_W,
    height: GAME_H
  },
  physics: {
    default: 'arcade',
    arcade: { gravity: { y: 0 }, debug: false }
  },
  scene: [BootScene, MenuScene, MapScene, LevelScene, ShopScene, BossWinScene]
}

// eslint-disable-next-line no-new
new Phaser.Game(config)
