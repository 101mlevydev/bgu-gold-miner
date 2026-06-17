// The two playable Be'er Sheva archetypes (cosmetic only).
export const CHARACTERS = [
  { id: 'student', label: 'הסטודנט', emoji: '🎒', note: 'קלאסי, עם קפה ביד' },
  { id: 'beersheva', label: 'הבאר־שבעית', emoji: '🧖‍♀️', note: 'פיג׳מה וכפכפי פרווה' }
]

export function getCharacter(id) {
  return CHARACTERS.find((c) => c.id === id) || CHARACTERS[0]
}
