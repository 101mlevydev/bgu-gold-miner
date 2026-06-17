import { saveProfile } from '../state.js'

// The Asset Store: reads the static `assets` catalog from the registry; handles
// affordability + buying. Owning an asset grants its perk + boss points (see perks.js).

export function availableAssets(catalog, profile) {
  const owned = new Set(profile.ownedAssets)
  return catalog.assets.filter((a) => !owned.has(a.id))
}

export function canAfford(profile, asset) {
  return profile.money >= asset.price
}

export function buy(profile, asset) {
  if (profile.money < asset.price) return false
  profile.money -= asset.price
  profile.ownedAssets.push(asset.id)
  profile.bossPoints += asset.bossPoints || 0
  saveProfile()
  return true
}
