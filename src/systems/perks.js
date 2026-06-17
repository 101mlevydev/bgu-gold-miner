// Folds owned assets into gameplay modifiers, applied at the start of each level.
export function resolvePerks(profile, catalog) {
  const owned = new Set(profile.ownedAssets)
  const p = { timeBonus: 0, reelMult: 1, incomeMult: 1, magnet: 0, insurance: 0, passiveIncome: 0 }
  for (const a of catalog.assets) {
    if (!owned.has(a.id) || !a.perk) continue
    const { type, value } = a.perk
    if (type === 'time') p.timeBonus += value
    else if (type === 'clawSpeed') p.reelMult *= value
    else if (type === 'incomeMult') p.incomeMult *= value
    else if (type === 'magnet') p.magnet += value
    else if (type === 'insurance') p.insurance += value
    else if (type === 'passiveIncome') p.passiveIncome += value
  }
  return p
}

// Hebrew description of an asset's perk, for the shop UI.
export function perkLabel(perk) {
  if (!perk) return ''
  const { type, value } = perk
  switch (type) {
    case 'time': return `+${value} שניות לשעון`
    case 'clawSpeed': return 'טופר מהיר יותר'
    case 'incomeMult': return `×${value} הכנסה`
    case 'insurance': return `הגנה מ-${value} מכשולים`
    case 'passiveIncome': return `+${value}₪ בכל שלב`
    default: return ''
  }
}
