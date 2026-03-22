import { db } from '@/lib/db'
import { shops } from '@/db/schema'
import { desc } from 'drizzle-orm'
import Link from 'next/link'
import { Store, Crown, CheckCircle, XCircle, ExternalLink, Plus } from 'lucide-react'

export default async function AdminShopsPage() {
  const allShops = await db.select().from(shops).orderBy(desc(shops.createdAt))

  const tierBadge = (tier: string) => {
    if (tier === 'sponsored') return <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-teal/10 text-teal border border-teal/20">Sponsored</span>
    if (tier === 'premium') return <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-violet/10 text-violet border border-violet/20">Premium</span>
    return <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-surface-hover text-muted border border-border">Free</span>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Shops</h1>
          <p className="text-muted text-sm mt-1">{allShops.length} total listings</p>
        </div>
        <Link
          href="/admin/shops/new"
          className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-lg bg-violet text-white font-semibold text-sm hover:bg-violet-light transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Shop
        </Link>
      </div>

      <div className="rounded-xl bg-surface border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-hover">
                <th className="text-left px-4 py-3 text-muted font-medium">Business</th>
                <th className="text-left px-4 py-3 text-muted font-medium hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-muted font-medium">Tier</th>
                <th className="text-left px-4 py-3 text-muted font-medium hidden sm:table-cell">Status</th>
                <th className="text-left px-4 py-3 text-muted font-medium hidden lg:table-cell">Claimed</th>
                <th className="text-right px-4 py-3 text-muted font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allShops.map((shop) => (
                <tr key={shop.id} className="border-b border-border hover:bg-surface-hover transition-colors last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{shop.name}</p>
                    <p className="text-muted text-xs mt-0.5">{shop.address}</p>
                  </td>
                  <td className="px-4 py-3 text-muted hidden md:table-cell capitalize">
                    {shop.category.replace(/-/g, ' ')}
                  </td>
                  <td className="px-4 py-3">{tierBadge(shop.tier)}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {shop.isActive
                      ? <span className="flex items-center gap-1 text-success text-xs"><CheckCircle className="w-3 h-3" /> Active</span>
                      : <span className="flex items-center gap-1 text-destructive text-xs"><XCircle className="w-3 h-3" /> Inactive</span>
                    }
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {shop.isClaimed
                      ? <span className="text-success text-xs">Claimed</span>
                      : <span className="text-muted text-xs">Unclaimed</span>
                    }
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/directory/${shop.slug}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 text-violet hover:text-violet-light transition-colors text-xs min-h-[44px] px-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {allShops.length === 0 && (
            <div className="text-center py-12">
              <Store className="w-8 h-8 text-muted mx-auto mb-2" />
              <p className="text-muted">No shops yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
