'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Loader, LogIn } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error((await res.json()).error ?? 'Invalid credentials')
      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-violet font-bold text-xl mb-2">
            <MapPin className="w-5 h-5" />
            Shop Salida Admin
          </div>
          <p className="text-muted text-sm">Sign in to manage the directory</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl bg-surface border border-border p-6 space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1.5">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="CEO@epicai.ai"
              className="w-full h-11 px-3 rounded-lg bg-surface-hover border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-violet/50"
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1.5">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              className="w-full h-11 px-3 rounded-lg bg-surface-hover border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-violet/50"
            />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 min-h-[44px] rounded-lg bg-violet text-white font-semibold text-sm hover:bg-violet-light transition-colors disabled:opacity-60"
          >
            {loading ? <><Loader className="w-4 h-4 animate-spin" /> Signing in...</> : <><LogIn className="w-4 h-4" /> Sign In</>}
          </button>
        </form>
      </div>
    </div>
  )
}
