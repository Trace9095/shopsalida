'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { MapPin, CheckCircle, Loader, ArrowLeft, Store, Crown } from 'lucide-react'

const TIERS = [
  {
    id: 'premium',
    label: 'Premium Listing',
    price: '$99/mo',
    features: [
      'Featured placement in directory',
      'Full business profile with gallery',
      'Business hours & contact info',
      'Priority in search results',
      'Performance analytics',
    ],
  },
  {
    id: 'sponsored',
    label: 'Sponsored Listing',
    price: '$199/mo',
    features: [
      'Everything in Premium',
      'Homepage spotlight placement',
      'Category page featured banner',
      'Bold badge + highlighted card',
      'Dedicated support',
    ],
  },
]

export default function ClaimPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [shop, setShop] = useState<{ name: string; category: string; address: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [tier, setTier] = useState<'free' | 'premium' | 'sponsored'>('premium')
  const [form, setForm] = useState({ name: '', email: '', phone: '', business: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadShop() {
      try {
        const res = await fetch(`/api/shops/${slug}`)
        if (res.ok) {
          const data = await res.json()
          setShop(data.shop)
        }
      } catch {}
      setLoading(false)
    }
    loadShop()
  }, [slug])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      if (tier === 'free') {
        // Submit free claim request
        const res = await fetch('/api/claims', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, ...form }),
        })
        if (!res.ok) throw new Error((await res.json()).error ?? 'Failed to submit')
        setDone(true)
      } else {
        // Start Stripe checkout for paid tiers
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tier, slug, email: form.email }),
        })
        if (!res.ok) throw new Error((await res.json()).error ?? 'Failed to start checkout')
        const { url } = await res.json()
        if (url) window.location.href = url
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[80dvh] flex items-center justify-center">
        <Loader className="w-6 h-6 animate-spin text-violet" />
      </div>
    )
  }

  if (done) {
    return (
      <div className="min-h-[80dvh] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <CheckCircle className="w-14 h-14 text-success mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Request Submitted</h1>
          <p className="text-muted mb-6">
            We&apos;ll review your claim and reach out within 1-2 business days.
          </p>
          <Link
            href={`/directory/${slug}`}
            className="inline-flex items-center gap-2 text-violet hover:text-violet-light transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to listing
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Back link */}
      <Link
        href={`/directory/${slug}`}
        className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors text-sm mb-8 min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to listing
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-violet/10 flex items-center justify-center shrink-0">
            <Store className="w-5 h-5 text-violet" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Claim This Listing</h1>
            {shop && (
              <p className="text-muted text-sm flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" /> {shop.name}
              </p>
            )}
          </div>
        </div>
        <p className="text-muted">
          Own or manage this business? Verify ownership and choose a plan to take control of your listing.
        </p>
      </div>

      {/* Tier selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {/* Free tier */}
        <button
          onClick={() => setTier('free')}
          className={`rounded-xl border p-4 text-left transition-all ${
            tier === 'free'
              ? 'border-violet bg-violet/5 ring-1 ring-violet/30'
              : 'border-border bg-surface hover:border-violet/30'
          }`}
        >
          <p className="font-semibold text-foreground mb-1">Basic (Free)</p>
          <p className="text-2xl font-bold text-foreground mb-2">$0<span className="text-sm text-muted font-normal">/mo</span></p>
          <ul className="text-xs text-muted space-y-1">
            <li>Basic business profile</li>
            <li>Name, address, category</li>
            <li>Standard directory placement</li>
          </ul>
        </button>

        {TIERS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTier(t.id as 'premium' | 'sponsored')}
            className={`rounded-xl border p-4 text-left transition-all relative ${
              tier === t.id
                ? 'border-violet bg-violet/5 ring-1 ring-violet/30'
                : 'border-border bg-surface hover:border-violet/30'
            }`}
          >
            {t.id === 'sponsored' && (
              <div className="absolute -top-2 -right-2">
                <span className="bg-teal text-background text-xs font-bold px-2 py-0.5 rounded-full">
                  Best
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5 mb-1">
              <Crown className="w-3.5 h-3.5 text-violet" />
              <p className="font-semibold text-foreground">{t.label}</p>
            </div>
            <p className="text-2xl font-bold text-foreground mb-2">
              {t.price.split('/')[0]}<span className="text-sm text-muted font-normal">/mo</span>
            </p>
            <ul className="text-xs text-muted space-y-1">
              {t.features.slice(0, 3).map((f) => (
                <li key={f} className="flex items-start gap-1">
                  <span className="text-teal mt-0.5">✓</span> {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      {/* Claim form */}
      <form onSubmit={handleSubmit} className="rounded-xl bg-surface border border-border p-6 space-y-4">
        <h2 className="font-semibold text-foreground">Your Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-muted mb-1.5">Your Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jane Smith"
              className="w-full h-11 px-3 rounded-lg bg-surface-hover border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-violet/50"
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1.5">Email Address</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full h-11 px-3 rounded-lg bg-surface-hover border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-violet/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-muted mb-1.5">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="(719) 555-0100"
              className="w-full h-11 px-3 rounded-lg bg-surface-hover border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-violet/50"
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1.5">Role at Business</label>
            <input
              type="text"
              required
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
              placeholder="Owner / Manager"
              className="w-full h-11 px-3 rounded-lg bg-surface-hover border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-violet/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-muted mb-1.5">Additional Notes (optional)</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Any info to verify ownership (website, social, etc.)"
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-surface-hover border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-violet/50 resize-none"
          />
        </div>

        {error && <p className="text-destructive text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 min-h-[44px] rounded-lg bg-violet text-white font-semibold text-sm hover:bg-violet-light transition-colors disabled:opacity-60"
        >
          {submitting ? (
            <><Loader className="w-4 h-4 animate-spin" /> Processing...</>
          ) : tier === 'free' ? (
            'Submit Claim Request'
          ) : (
            <>
              <Crown className="w-4 h-4" />
              Continue to Payment — {TIERS.find((t) => t.id === tier)?.price}
            </>
          )}
        </button>

        <p className="text-xs text-muted text-center">
          {tier === 'free'
            ? 'Our team reviews all claims within 1-2 business days.'
            : 'Secure checkout via Stripe. Cancel anytime.'}
        </p>
      </form>
    </div>
  )
}
