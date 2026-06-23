export function sanitizeInput(input) {
  if (typeof input !== 'string') return ''
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[&<>"']/g, (char) => {
      const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;' }
      return map[char]
    })
    .trim()
    .slice(0, 1000)
}
