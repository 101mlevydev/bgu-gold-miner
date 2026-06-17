// District/level progression + the win condition (buying the mayor's office).
export function ownedCount(profile) {
  return profile.ownedAssets.length
}

export function isBossWon(profile) {
  return profile.ownedAssets.includes('mayorOffice')
}

// Advance to the next level; cross to the next district when its asset requirement
// is met; otherwise loop the current district so the player can keep earning ₪.
export function advance(profile, levels) {
  const ds = levels.districts
  const idx = Math.max(0, ds.findIndex((d) => d.id === profile.currentDistrict))
  const cur = ds[idx]
  if (profile.levelIndex < cur.levels.length - 1) {
    profile.levelIndex += 1
    return
  }
  const next = ds[idx + 1]
  if (next && profile.ownedAssets.length >= next.unlockRequiresAssets) {
    profile.currentDistrict = next.id
    profile.levelIndex = 0
  } else {
    profile.levelIndex = 0 // replay current district to earn toward the next
  }
}
