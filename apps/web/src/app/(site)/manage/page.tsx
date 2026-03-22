'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowRight, Loader, ExternalLink, ArrowLeft } from 'lucide-react'

export default function ManagePage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/manage/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong')
        return
      }
      if (data.url) window.location.href = data.url
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-muted hover:text-foreground text-sm mb-10 transition-colors min-h-[44px]"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to home
      </Link>

      <div className="mb-8">
        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-5">
          <ExternalLink className="w-6 h-6 text-gold" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Manage Your Listing</h1>
        <p className="text-muted leading-relaxed">
          Enter the email address you used when you subscribed to access the billing portal — update payment, change plan, or cancel anytime.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl bg-surface border border-border p-6 space-y-4">
        <div>
          <label className="block text-sm text-muted mb-1.5" htmlFor="email">
            Subscription Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-11 pl-10 pr-4 rounded-lg bg-surface-hover border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
            />
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
            <><Loader className="w-4 h-4 animate-spin" /> Redirecting...</>
          ) : (
            <>Open Billing Portal <ArrowRight className="w-4 h-4" /></>
          )}
        </button>

        <p className="text-xs text-muted text-center">
          You&apos;ll be redirected to Stripe&apos;s secure billing portal.
        </p>
      </form>

      <div className="mt-8 rounded-xl bg-surface border border-border p-5 space-y-3">
        <p className="text-foreground font-semibold text-sm">What you can do in the portal</p>
        <ul className="text-muted text-sm space-y-1.5">
          <li>— Update credit card or payment method</li>
          <li>— Upgrade from Premium to Sponsored</li>
          <li>— Download invoices and billing history</li>
          <li>— Cancel your subscription (effective end of billing period)</li>
        </ul>
      </div>

      <p className="text-muted text-xs text-center mt-8">
        Questions? Email{' '}
        <a href="mailto:hello@shopsalida.com" className="text-gold hover:text-gold-light transition-colors">
          hello@shopsalida.com
        </a>
      </p>
    </div>
  )
}
