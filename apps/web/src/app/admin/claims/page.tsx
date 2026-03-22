import { db } from '@/lib/db'
import { claimRequests, addListingRequests } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { FileCheck, Store } from 'lucide-react'

export default async function AdminClaimsPage() {
  const [claims, listings] = await Promise.all([
    db.select().from(claimRequests).orderBy(desc(claimRequests.createdAt)),
    db.select().from(addListingRequests).orderBy(desc(addListingRequests.createdAt)),
  ])

  const statusBadge = (status: string) => {
    if (status === 'approved') return <span className="px-2 py-0.5 rounded-full text-xs bg-success/10 text-success border border-success/20">Approved</span>
    if (status === 'rejected') return <span className="px-2 py-0.5 rounded-full text-xs bg-destructive/10 text-destructive border border-destructive/20">Rejected</span>
    return <span className="px-2 py-0.5 rounded-full text-xs bg-warning/10 text-warning border border-warning/20">Pending</span>
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Claims & Requests</h1>
        <p className="text-muted text-sm mt-1">Review ownership claims and listing requests</p>
      </div>

      {/* Claim requests */}
      <section>
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileCheck className="w-4 h-4 text-violet" />
          Claim Requests ({claims.length})
        </h2>
        <div className="rounded-xl bg-surface border border-border overflow-hidden">
          {claims.length === 0 ? (
            <p className="text-muted text-sm p-6">No claim requests</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-hover">
                    <th className="text-left px-4 py-3 text-muted font-medium">Claimant</th>
                    <th className="text-left px-4 py-3 text-muted font-medium">Listing</th>
                    <th className="text-left px-4 py-3 text-muted font-medium hidden md:table-cell">Role</th>
                    <th className="text-left px-4 py-3 text-muted font-medium">Status</th>
                    <th className="text-left px-4 py-3 text-muted font-medium hidden lg:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.map((c) => (
                    <tr key={c.id} className="border-b border-border last:border-0 hover:bg-surface-hover transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">{c.claimantName}</p>
                        <p className="text-muted text-xs">{c.claimantEmail}</p>
                      </td>
                      <td className="px-4 py-3 text-muted">{c.shopSlug}</td>
                      <td className="px-4 py-3 text-muted hidden md:table-cell">{c.role || '—'}</td>
                      <td className="px-4 py-3">{statusBadge(c.status)}</td>
                      <td className="px-4 py-3 text-muted text-xs hidden lg:table-cell">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Listing requests */}
      <section>
        <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Store className="w-4 h-4 text-teal" />
          Listing Requests ({listings.length})
        </h2>
        <div className="rounded-xl bg-surface border border-border overflow-hidden">
          {listings.length === 0 ? (
            <p className="text-muted text-sm p-6">No listing requests</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-hover">
                    <th className="text-left px-4 py-3 text-muted font-medium">Business</th>
                    <th className="text-left px-4 py-3 text-muted font-medium hidden md:table-cell">Category</th>
                    <th className="text-left px-4 py-3 text-muted font-medium hidden md:table-cell">Tier</th>
                    <th className="text-left px-4 py-3 text-muted font-medium">Contact</th>
                    <th className="text-left px-4 py-3 text-muted font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map((r) => (
                    <tr key={r.id} className="border-b border-border last:border-0 hover:bg-surface-hover transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">{r.businessName}</p>
                        <p className="text-muted text-xs">{r.address || 'No address'}</p>
                      </td>
                      <td className="px-4 py-3 text-muted capitalize hidden md:table-cell">
                        {r.category.replace(/-/g, ' ')}
                      </td>
                      <td className="px-4 py-3 capitalize text-muted hidden md:table-cell">{r.tier}</td>
                      <td className="px-4 py-3">
                        <p className="text-foreground text-xs">{r.ownerName}</p>
                        <p className="text-muted text-xs">{r.email}</p>
                      </td>
                      <td className="px-4 py-3">{statusBadge(r.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
