import { NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimiter'
import { sanitizeInput } from '@/lib/sanitize'

export async function POST(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1'

  const { allowed } = checkRateLimit(ip, 5, 60 * 60 * 1000)

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in an hour.' },
      { status: 429 }
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const data = {
    businessName: sanitizeInput(body.businessName || ''),
    tradeType: sanitizeInput(body.tradeType || ''),
    phone: sanitizeInput(body.phone || ''),
    email: sanitizeInput(body.email || ''),
  }

  if (!data.businessName || !data.tradeType || !data.phone || !data.email) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }

  const validTrades = ['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'Other']
  if (!validTrades.includes(data.tradeType)) {
    return NextResponse.json({ error: 'Invalid trade type.' }, { status: 400 })
  }

  console.log('[LeadForge Demo Request]', JSON.stringify(data))

  return NextResponse.json({ success: true })
}
