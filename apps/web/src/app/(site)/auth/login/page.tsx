'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Send, CheckCircle, Loader } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Failed to send link')
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80dvh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-gold font-semibold text-lg mb-4 min-h-[44px]">
            <MapPin className="w-5 h-5" />
            Shop Salida
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Sign in to your account</h1>
          <p className="text-muted text-sm mt-1">We&apos;ll email you a magic link to sign in</p>
        </div>

        {sent ? (
          <div className="rounded-xl bg-success/10 border border-success/20 p-6 text-center">
            <CheckCircle className="w-10 h-10 text-success mx-auto mb-3" />
            <p className="text-foreground font-semibold mb-1">Check your email</p>
            <p className="text-muted text-sm">We sent a sign-in link to <strong className="text-foreground">{email}</strong></p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-xl bg-surface border border-border p-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-muted mb-1.5">Email address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 px-3 rounded-lg bg-surface-hover border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>
            {error && <p className="text-destructive text-xs">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 min-h-[44px] rounded-lg bg-gold text-background font-semibold text-sm hover:bg-gold-light transition-colors disabled:opacity-60"
            >
              {loading ? <><Loader className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Magic Link</>}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
