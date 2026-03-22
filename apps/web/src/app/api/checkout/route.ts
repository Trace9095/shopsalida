import { NextRequest, NextResponse } from 'next/server'
import { getStripe, STRIPE_PRICE_IDS } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { tier, slug, email } = await req.json()

    if (!tier || !slug || !email) {
      return NextResponse.json({ error: 'tier, slug, and email required' }, { status: 400 })
    }

    const priceId = tier === 'sponsored' ? STRIPE_PRICE_IDS.sponsored : STRIPE_PRICE_IDS.premium
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'https://shopsalida.com'
    const stripe = getStripe()

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/directory/${slug}?claimed=true`,
      cancel_url: `${baseUrl}/claim/${slug}`,
      metadata: { slug, tier },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('checkout error', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
