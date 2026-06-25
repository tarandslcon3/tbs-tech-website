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
  }

  const timestamp = new Date().toISOString()
  console.log('[TBS Tech Services chat-lead]', timestamp, JSON.stringify(lead))

  const apiKey = process.env.JOTFORM_API_KEY
  if (!apiKey) {
    return Response.json({ success: true })
  }

  try {
    const emailMatch = lead.contact.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)
    const email = emailMatch ? emailMatch[0] : 'no-email@chatbot.lead'

    // Extract first name from contact string (first word before any comma/email/space)
    const nameMatch = lead.contact.replace(emailMatch?.[0] || '', '').trim()
    const firstName = nameMatch.split(/[\s,]+/)[0] || 'Chat'

    const message = [
      `Source: TBS Tech Services Chatbot`,
      `Submitted: ${timestamp}`,
      ``,
      `Industry: ${lead.trade || 'Not specified'}`,
      `Goal: ${lead.goal || 'Not specified'}`,
      `Business size: ${lead.size || 'Not specified'}`,
      `Contact provided: ${lead.contact || 'Not provided'}`,
    ].join('\n')

    const params = new URLSearchParams()
    params.set('apiKey', apiKey)
    params.set('submission[3][first]', firstName)
    params.set('submission[3][last]', 'Chat Lead')
    params.set('submission[4]', email)
    params.set('submission[5]', 'Via Chatbot')
    params.set('submission[6]', 'Chat Bot Lead')
    params.set('submission[7]', lead.trade || 'Unknown')
    params.set('submission[9]', message)

    const res = await fetch('https://api.jotform.com/form/261737577809069/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    })

    if (!res.ok) throw new Error(`Jotform returned ${res.status}`)
    return Response.json({ success: true })
  } catch (err) {
    console.error('[chat-lead] Jotform forward failed:', err)
    return Response.json({ error: 'Submission failed' }, { status: 500 })
  }
}
