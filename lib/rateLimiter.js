const store = new Map()

export function checkRateLimit(ip, maxRequests = 5, windowMs = 60 * 60 * 1000) {
  const now = Date.now()

  if (!store.has(ip)) {
    store.set(ip, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  const record = store.get(ip)

  if (now > record.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: maxRequests - record.count }
}
