// Minimal profile state backed by localStorage (no login).
// Full SaveManager (debounce, migration) arrives in Step 12; this is the shared store.
const KEY = 'goldminer:save:v1'

const defaultProfile = () => ({
  version: 1,
  money: 0,
  ownedAssets: [],
  currentDistrict: 'campus',
  levelIndex: 0,
  bossPoints: 0,
  upgrades: {},
  character: 'student'
})

let profile = null

export function loadProfile() {
  if (profile) return profile
  try {
    const raw = localStorage.getItem(KEY)
    profile = raw ? { ...defaultProfile(), ...JSON.parse(raw) } : defaultProfile()
  } catch {
    profile = defaultProfile()
  }
  return profile
}

export function saveProfile() {
  try {
    localStorage.setItem(KEY, JSON.stringify(profile))
  } catch {
    /* storage blocked — keep playing in-memory */
  }
}

export function resetProfile() {
  profile = defaultProfile()
  saveProfile()
  return profile
}

export function hasSave() {
  try {
    return !!localStorage.getItem(KEY)
  } catch {
    return false
  }
}
