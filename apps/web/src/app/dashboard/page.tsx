export const dynamic = 'force-dynamic'

import { redirect } from 'next/navigation'
import { requireUser } from '@/lib/auth'
import Link from 'next/link'
import { Store, Crown, ArrowRight } from 'lucide-react'

export const metadata = { title: 'Dashboard — Shop Salida' }

export default async function DashboardPage() {
  const user = await requireUser()
  if (!user) redirect('/auth/login')

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
        <p className="text-muted text-sm mt-1">{user.email}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/directory"
          className="rounded-xl bg-surface border border-border p-6 hover:border-violet/40 hover:bg-surface-hover transition-all group"
        >
          <Store className="w-8 h-8 text-violet mb-4" />
          <h2 className="font-semibold text-foreground mb-1">Browse Directory</h2>
          <p className="text-muted text-sm mb-4">Explore all shops in Salida&apos;s Creative District.</p>
          <span className="inline-flex items-center gap-1 text-violet text-sm group-hover:gap-2 transition-all">
            Browse <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          href="/request-listing"
          className="rounded-xl bg-surface border border-border p-6 hover:border-violet/40 hover:bg-surface-hover transition-all group"
        >
          <Crown className="w-8 h-8 text-teal mb-4" />
          <h2 className="font-semibold text-foreground mb-1">List Your Business</h2>
          <p className="text-muted text-sm mb-4">Add your Salida shop to our directory.</p>
          <span className="inline-flex items-center gap-1 text-teal text-sm group-hover:gap-2 transition-all">
            Get Listed <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>

      <div className="mt-6">
        <form action="/api/auth/logout" method="post">
          <button
            type="submit"
            className="text-muted hover:text-destructive transition-colors text-sm min-h-[44px]"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  )
}
