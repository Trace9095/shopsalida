import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { subscriptions, shops } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const slug = session.metadata?.slug
        const tier = session.metadata?.tier as 'premium' | 'sponsored' | undefined
        if (slug && tier && session.customer && session.subscription) {
          // Mark shop as claimed + set tier
          await db.update(shops)
            .set({ tier, isClaimed: true, stripeCustomerId: session.customer as string })
            .where(eq(shops.slug, slug))

          await db.insert(subscriptions).values({
            shopSlug: slug,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            tier,
            status: 'active',
          })
        }
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription
        await db.update(subscriptions)
          .set({ status: sub.status })
          .where(eq(subscriptions.stripeSubscriptionId, sub.id))
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription
        await db.update(subscriptions)
          .set({ status: 'canceled' })
          .where(eq(subscriptions.stripeSubscriptionId, sub.id))
        // Downgrade shop to free
        const [row] = await db.select().from(subscriptions).where(eq(subscriptions.stripeSubscriptionId, sub.id)).limit(1)
        if (row?.shopSlug) {
          await db.update(shops).set({ tier: 'free' }).where(eq(shops.slug, row.shopSlug))
        }
        break
      }

      case 'invoice.paid': {
        const inv = event.data.object as Stripe.Invoice
        const subId = typeof inv.subscription === 'string' ? inv.subscription : inv.subscription?.id
        if (subId) {
          await db.update(subscriptions)
            .set({ status: 'active' })
            .where(eq(subscriptions.stripeSubscriptionId, subId))
        }
        break
      }

      case 'invoice.payment_failed': {
        const inv = event.data.object as Stripe.Invoice
        const subId = typeof inv.subscription === 'string' ? inv.subscription : inv.subscription?.id
        if (subId) {
          await db.update(subscriptions)
            .set({ status: 'past_due' })
            .where(eq(subscriptions.stripeSubscriptionId, subId))
        }
        break
      }
    }
  } catch (err) {
    console.error('stripe webhook handler error', event.type, err)
    return NextResponse.json({ error: 'Handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
