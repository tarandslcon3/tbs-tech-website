import { checkRateLimit } from '@/lib/rateLimiter'
import { sanitizeInput } from '@/lib/sanitize'

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'

  const { allowed } = checkRateLimit(`chat:${ip}`, 10, 60 * 60 * 1000)
  if (!allowed) {
    return Response.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }

  const lead = {
    trade: sanitizeInput(body.trade || ''),
    goal: sanitizeInput(body.goal || ''),
    size: sanitizeInput(body.size || ''),
    contact: sanitizeInput(body.contact || ''),
    timestamp: new Date().toISOString(),
    ip,
  }

  console.log('[chat-lead]', JSON.stringify(lead))

  // TODO: Connect to Zapier or email via NEXT_PUBLIC_ZAPIER_WEBHOOK env var

  return Response.json({ success: true })
}
