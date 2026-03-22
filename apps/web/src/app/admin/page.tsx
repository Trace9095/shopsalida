import { db } from '@/lib/db'
import { shops, claimRequests, addListingRequests, subscriptions, blogPosts } from '@/db/schema'
import { eq, count, and } from 'drizzle-orm'
import Link from 'next/link'
import { Store, FileCheck, Crown, BookOpen, TrendingUp } from 'lucide-react'

export default async function AdminDashboard() {
  const [
    [{ total: totalShops }],
    [{ total: activeShops }],
    [{ total: sponsoredShops }],
    [{ total: premiumShops }],
    [{ total: pendingClaims }],
    [{ total: pendingListings }],
    [{ total: activeSubs }],
    [{ total: totalPosts }],
  ] = await Promise.all([
    db.select({ total: count() }).from(shops),
    db.select({ total: count() }).from(shops).where(eq(shops.isActive, true)),
    db.select({ total: count() }).from(shops).where(eq(shops.tier, 'sponsored')),
    db.select({ total: count() }).from(shops).where(eq(shops.tier, 'premium')),
    db.select({ total: count() }).from(claimRequests).where(eq(claimRequests.status, 'pending')),
    db.select({ total: count() }).from(addListingRequests).where(eq(addListingRequests.status, 'pending')),
    db.select({ total: count() }).from(subscriptions).where(eq(subscriptions.status, 'active')),
    db.select({ total: count() }).from(blogPosts),
  ])

  const mrr = (sponsoredShops * 199) + (premiumShops * 99)

  const stats = [
    { label: 'Total Listings', value: totalShops.toString(), sub: `${activeShops} active`, icon: Store, href: '/admin/shops', color: 'text-violet' },
    { label: 'Sponsored', value: sponsoredShops.toString(), sub: '$199/mo each', icon: Crown, href: '/admin/shops?tier=sponsored', color: 'text-teal' },
    { label: 'Premium', value: premiumShops.toString(), sub: '$99/mo each', icon: Crown, href: '/admin/shops?tier=premium', color: 'text-violet-light' },
    { label: 'MRR', value: `$${mrr.toLocaleString()}`, sub: `${activeSubs} active subs`, icon: TrendingUp, href: '/admin/shops', color: 'text-success' },
    { label: 'Pending Claims', value: pendingClaims.toString(), sub: 'Need review', icon: FileCheck, href: '/admin/claims', color: pendingClaims > 0 ? 'text-warning' : 'text-muted' },
    { label: 'Listing Requests', value: pendingListings.toString(), sub: 'Awaiting approval', icon: Store, href: '/admin/shops', color: pendingListings > 0 ? 'text-warning' : 'text-muted' },
    { label: 'Blog Posts', value: totalPosts.toString(), sub: 'Published articles', icon: BookOpen, href: '/admin/blog', color: 'text-coral' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted text-sm mt-1">Shop Salida directory overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, sub, icon: Icon, href, color }) => (
          <Link
            key={label}
            href={href}
            className="rounded-xl bg-surface border border-border p-4 hover:border-violet/30 hover:bg-surface-hover transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <p className="text-muted text-xs">{label}</p>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <p className={`text-2xl font-bold ${color} mb-1`}>{value}</p>
            <p className="text-muted text-xs">{sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-surface border border-border p-5">
          <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-violet" /> Pending Actions
          </h2>
          {pendingClaims > 0 || pendingListings > 0 ? (
            <div className="space-y-2">
              {pendingClaims > 0 && (
                <Link href="/admin/claims" className="flex items-center justify-between p-2 rounded-lg bg-warning/10 border border-warning/20 hover:bg-warning/20 transition-colors">
                  <span className="text-sm text-foreground">{pendingClaims} claim{pendingClaims !== 1 ? 's' : ''} to review</span>
                  <span className="text-xs text-warning">Review →</span>
                </Link>
              )}
              {pendingListings > 0 && (
                <Link href="/admin/shops" className="flex items-center justify-between p-2 rounded-lg bg-warning/10 border border-warning/20 hover:bg-warning/20 transition-colors">
                  <span className="text-sm text-foreground">{pendingListings} listing request{pendingListings !== 1 ? 's' : ''}</span>
                  <span className="text-xs text-warning">Review →</span>
                </Link>
              )}
            </div>
          ) : (
            <p className="text-muted text-sm">No pending actions</p>
          )}
        </div>

        <div className="rounded-xl bg-surface border border-border p-5">
          <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-teal" /> Revenue Summary
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Sponsored ({sponsoredShops})</span>
              <span className="text-foreground font-medium">${(sponsoredShops * 199).toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Premium ({premiumShops})</span>
              <span className="text-foreground font-medium">${(premiumShops * 99).toLocaleString()}/mo</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-semibold">
              <span className="text-muted">Total MRR</span>
              <span className="text-success">${mrr.toLocaleString()}/mo</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-surface border border-border p-5">
          <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Store className="w-4 h-4 text-violet" /> Quick Links
          </h2>
          <div className="space-y-2">
            {[
              { label: 'Manage Shops', href: '/admin/shops' },
              { label: 'Review Claims', href: '/admin/claims' },
              { label: 'Manage Blog', href: '/admin/blog' },
              { label: 'View Directory →', href: '/directory' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="block text-sm text-muted hover:text-violet transition-colors py-1 min-h-[44px] flex items-center"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
