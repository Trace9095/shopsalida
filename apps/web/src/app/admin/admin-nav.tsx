'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { MapPin, LayoutDashboard, Store, FileCheck, BookOpen, LogOut } from 'lucide-react'

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/shops', label: 'Shops', icon: Store },
  { href: '/admin/claims', label: 'Claims', icon: FileCheck },
  { href: '/admin/blog', label: 'Blog', icon: BookOpen },
]

export default function AdminNav({ adminEmail }: { adminEmail: string }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <nav className="bg-surface border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2 text-violet font-bold min-h-[44px]">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Shop Salida Admin</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-3 min-h-[44px] text-sm rounded-lg transition-colors ${
                    active ? 'text-violet bg-violet/10' : 'text-muted hover:text-foreground hover:bg-surface-hover'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-muted text-xs hidden sm:block">{adminEmail}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-muted hover:text-destructive transition-colors text-sm min-h-[44px] min-w-[44px] px-2 rounded-lg hover:bg-surface-hover"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
