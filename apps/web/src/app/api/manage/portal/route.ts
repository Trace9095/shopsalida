import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { shops, subscriptions } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const stripe = getStripe()
    const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'https://shopsalida.com'

    // Look up customer in Stripe by email
    const customers = await stripe.customers.list({ email: email.toLowerCase().trim(), limit: 1 })

    let customerId: string | undefined = customers.data[0]?.id

    // Fallback: look in our shops table for matching stripeCustomerId
    if (!customerId) {
      const [shop] = await db
        .select({ stripeCustomerId: shops.stripeCustomerId })
        .from(shops)
        .where(eq(shops.stripeCustomerId, email))
        .limit(1)
      if (shop?.stripeCustomerId) {
        customerId = shop.stripeCustomerId
      }
    }

    if (!customerId) {
      return NextResponse.json(
        { error: 'No active subscription found for that email address. Please use the email you used to subscribe.' },
        { status: 404 }
      )
    }

    // Verify they have an active subscription in our DB
    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.stripeCustomerId, customerId))
      .limit(1)

    if (!sub) {
      return NextResponse.json(
        { error: 'No subscription found for that email. If you just subscribed, please wait a few minutes and try again.' },
        { status: 404 }
      )
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${baseUrl}/manage`,
    })

    return NextResponse.json({ url: portalSession.url })
  } catch (err) {
    console.error('manage/portal error', err)
    return NextResponse.json({ error: 'Failed to create portal session' }, { status: 500 })
  }
}
