import type { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import AdminNav from './admin-nav'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Admin — Shop Salida', robots: { index: false } }

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdmin()
  if (!admin) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-background">
      <AdminNav adminEmail={admin.email} />
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
