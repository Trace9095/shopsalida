'use client'

import type { Metadata } from 'next'
import { useState } from 'react'
import { CheckCircle, Send, Loader } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const CATEGORIES = [
  'art-gallery', 'boutique', 'outdoor-gear', 'vintage-antique',
  'gift-shop', 'jewelry-artisan', 'market', 'home-decor',
  'food-specialty', 'books-music',
]
const CATEGORY_LABELS: Record<string, string> = {
  'art-gallery': 'Art Gallery',
  boutique: 'Boutique & Clothing',
  'outdoor-gear': 'Outdoor Gear',
  'vintage-antique': 'Vintage & Antique',
  'gift-shop': 'Gift Shop',
  'jewelry-artisan': 'Jewelry & Artisan',
  market: 'Market / Pop-up',
  'home-decor': 'Home & Decor',
  'food-specialty': 'Food & Specialty',
  'books-music': 'Books & Music',
}

export default function RequestListingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/listings/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error ?? 'Submission failed')
      }
      trackEvent('claim_listing', { tier: String(data.desiredTier ?? 'premium'), city: 'Salida' })
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <CheckCircle className="w-14 h-14 text-success mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-3">Request Submitted!</h1>
        <p className="text-muted leading-relaxed">
          Thanks! We&apos;ll review your listing and send you a confirmation email within 24 hours.
          Free listings are live within 1 business day.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Request a Listing</h1>
        <p className="text-muted leading-relaxed">
          Get your Salida business in front of thousands of visitors.
          Premium listings start at <strong className="text-foreground">$99/mo</strong>.
          Sponsored placement at $199/mo. Month-to-month, cancel anytime.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Business Info */}
        <div className="rounded-lg bg-surface border border-border p-5 space-y-4">
          <h2 className="text-foreground font-semibold">Business Information</h2>

          <div>
            <label className="block text-sm text-muted mb-1.5" htmlFor="businessName">
              Business Name <span className="text-destructive">*</span>
            </label>
            <input
              id="businessName"
              name="businessName"
              type="text"
              required
              placeholder="e.g. Absolute Gallery"
              className="w-full h-11 px-3 rounded-lg bg-surface-hover border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5" htmlFor="category">
              Category <span className="text-destructive">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              className="w-full h-11 px-3 rounded-lg bg-surface-hover border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
            >
              <option value="">Select a category...</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5" htmlFor="address">
              Street Address <span className="text-destructive">*</span>
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              placeholder="e.g. 228 F Street, Salida, CO 81201"
              className="w-full h-11 px-3 rounded-lg bg-surface-hover border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-1.5" htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(719) 555-0100"
                className="w-full h-11 px-3 rounded-lg bg-surface-hover border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1.5" htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="url"
                placeholder="https://yourbusiness.com"
                className="w-full h-11 px-3 rounded-lg bg-surface-hover border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5" htmlFor="description">
              Short Description (1-2 sentences)
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="What makes your shop special?"
              className="w-full px-3 py-2.5 rounded-lg bg-surface-hover border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-lg bg-surface border border-border p-5 space-y-4">
          <h2 className="text-foreground font-semibold">Your Contact Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted mb-1.5" htmlFor="contactName">
                Your Name <span className="text-destructive">*</span>
              </label>
              <input
                id="contactName"
                name="contactName"
                type="text"
                required
                placeholder="Jane Smith"
                className="w-full h-11 px-3 rounded-lg bg-surface-hover border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>
            <div>
              <label className="block text-sm text-muted mb-1.5" htmlFor="contactEmail">
                Email <span className="text-destructive">*</span>
              </label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                required
                placeholder="jane@yourbusiness.com"
                className="w-full h-11 px-3 rounded-lg bg-surface-hover border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>
          </div>
        </div>

        {/* Desired Tier */}
        <div className="rounded-lg bg-surface border border-border p-5 space-y-3">
          <h2 className="text-foreground font-semibold">Listing Tier</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { value: 'premium', label: 'Premium', price: '$99/mo', desc: 'Photos, hours, priority' },
              { value: 'sponsored', label: 'Sponsored', price: '$199/mo', desc: 'Homepage feature' },
            ].map((tier) => (
              <label key={tier.value} className="cursor-pointer">
                <input type="radio" name="desiredTier" value={tier.value} defaultChecked={tier.value === 'premium'} className="sr-only peer" />
                <div className="rounded-lg border border-border p-3 peer-checked:border-gold peer-checked:bg-gold/5 transition-all">
                  <p className="text-foreground font-semibold text-sm">{tier.label}</p>
                  <p className="text-gold text-sm font-medium">{tier.price}</p>
                  <p className="text-muted text-xs mt-0.5">{tier.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 min-h-[48px] rounded-lg bg-gold text-background font-semibold hover:bg-gold-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader className="w-4 h-4 animate-spin" /> Submitting...</>
          ) : (
            <><Send className="w-4 h-4" /> Submit for Review</>
          )}
        </button>
      </form>
    </div>
  )
}
