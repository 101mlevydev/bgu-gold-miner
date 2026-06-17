// The claw: swings, drops on input, grabs the first item it reaches, and reels it
// back — heavier items retract slower (risk vs the clock). Pure geometry + tweenless
// update loop (no Arcade bodies) for predictable feel; tuning constants up top.
const MIN_LEN = 70
const MAX_LEN = 1040
const SWING_MAX_ANGLE = 0.95 // radians from straight-down
const SWING_SPEED = 0.0032 // oscillation rate
const DROP_SPEED = 1.7 // px per ms
const BASE_RETRACT = 1.25 // px per ms (divided by item weight)
const GRAB_RADIUS = 52

export default class Claw {
  constructor(scene, pivotX, pivotY) {
    this.scene = scene
    this.px = pivotX
    this.py = pivotY
    this.state = 'swing' // swing | drop | retract
    this.angle = 0
    this.len = MIN_LEN
    this.swingT = 0
    this.attached = null
    this.clawSpeedMult = 1 // perk hook (Step 14)

    this.rope = scene.add.graphics()
    this.tip = scene.add.text(pivotX, pivotY + MIN_LEN, '🪝', { fontSize: '52px' }).setOrigin(0.5)

    // callbacks supplied by the scene
    this.onGrabTest = () => null // (x, y) => item | null
    this.onCollect = () => {} // (item) => void
    this.redraw()
  }

  tipPos() {
    return {
      x: this.px + Math.sin(this.angle) * this.len,
      y: this.py + Math.cos(this.angle) * this.len
    }
  }

  drop() {
    if (this.state === 'swing') this.state = 'drop'
  }

  isBusy() {
    return this.state !== 'swing'
  }

  update(delta) {
    if (this.state === 'swing') {
      this.swingT += delta * SWING_SPEED
      this.angle = SWING_MAX_ANGLE * Math.sin(this.swingT)
      this.len = MIN_LEN
    } else if (this.state === 'drop') {
      this.len += DROP_SPEED * this.clawSpeedMult * delta
      const { x, y } = this.tipPos()
      const hit = this.onGrabTest(x, y, GRAB_RADIUS)
      if (hit) {
        this.attached = hit
        this.state = 'retract'
        // squash the claw on the catch (game feel)
        this.scene.tweens.add({
          targets: this.tip, scaleX: 1.35, scaleY: 0.7, yoyo: true, duration: 110, ease: 'Quad.Out'
        })
      } else if (this.len >= MAX_LEN) {
        this.state = 'retract'
      }
    } else if (this.state === 'retract') {
      const w = this.attached ? this.attached.data.weight || 1 : 1
      this.len -= (BASE_RETRACT * this.clawSpeedMult / w) * delta
      if (this.attached) {
        const { x, y } = this.tipPos()
        this.attached.display.setPosition(x, y + 30)
      }
      if (this.len <= MIN_LEN) {
        this.len = MIN_LEN
        if (this.attached) {
          const item = this.attached
          this.attached = null
          this.onCollect(item)
        }
        this.state = 'swing'
      }
    }
    this.redraw()
  }

  redraw() {
    const { x, y } = this.tipPos()
    this.rope.clear()
    this.rope.lineStyle(6, 0x3a2a1a, 0.55)
    this.rope.lineBetween(this.px, this.py, x, y)
    this.tip.setPosition(x, y)
  }
}
