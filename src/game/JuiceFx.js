import Phaser from 'phaser'

// Game-feel helpers (QUALITY-BAR §3: everything responds; impact = feedback).

export function shake(scene, intensity = 0.008, duration = 160) {
  scene.cameras.main.shake(duration, intensity)
}

// Radial particle burst (no texture needed — tweened circles).
export function burst(scene, x, y, colorNum = 0xf4b740, count = 10) {
  for (let i = 0; i < count; i++) {
    const ang = (Math.PI * 2 * i) / count + Math.random() * 0.5
    const dist = 36 + Math.random() * 48
    const p = scene.add
      .circle(x, y, Phaser.Math.Between(4, 9), colorNum, 1)
      .setDepth(50)
    scene.tweens.add({
      targets: p,
      x: x + Math.cos(ang) * dist,
      y: y + Math.sin(ang) * dist,
      alpha: 0,
      scale: 0.2,
      duration: 420 + Math.random() * 200,
      ease: 'Cubic.Out',
      onComplete: () => p.destroy()
    })
  }
}

// A floating score popup with a satisfying scale-in.
export function popText(scene, x, y, str, colorHex) {
  const t = scene.add
    .text(x, y, str, {
      fontFamily: 'Heebo, system-ui, sans-serif',
      fontSize: '42px',
      fontStyle: 'bold',
      color: colorHex,
      stroke: '#ffffff',
      strokeThickness: 4
    })
    .setOrigin(0.5)
    .setDepth(60)
    .setScale(0.3)
  scene.tweens.add({ targets: t, scale: 1, duration: 170, ease: 'Back.Out' })
  scene.tweens.add({
    targets: t,
    y: y - 90,
    alpha: 0,
    duration: 780,
    delay: 140,
    ease: 'Cubic.Out',
    onComplete: () => t.destroy()
  })
}
