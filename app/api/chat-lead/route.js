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
  }

  console.log('[chat-lead]', JSON.stringify(lead))

  // Forward to Jotform so it appears in the dashboard and triggers the email notification
  const apiKey = process.env.JOTFORM_API_KEY
  if (apiKey) {
    try {
      const message = [
        `Industry: ${lead.trade || 'Not specified'}`,
        `Goal: ${lead.goal || 'Not specified'}`,
        `Business size: ${lead.size || 'Not specified'}`,
        `Contact: ${lead.contact || 'Not provided'}`,
      ].join('\n')

      // Extract email if present in contact field (simple heuristic)
      const emailMatch = lead.contact.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)
      const email = emailMatch ? emailMatch[0] : 'no-email@chatbot.lead'

      const params = new URLSearchParams({
        apiKey,
        'submission[1]': 'Chat Bot Lead',
        'submission[2]': email,
        'submission[4]': 'Unknown',
        'submission[5]': `Chat Bot - ${lead.trade || 'General'}`,
        'submission[6]': lead.trade || 'Not Sure',
        'submission[7]': message,
      })

      await fetch('https://api.jotform.com/form/261737577809069/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      })
    } catch (err) {
      console.error('[chat-lead] Jotform forward failed:', err)
    }
  }

  return Response.json({ success: true })
}
