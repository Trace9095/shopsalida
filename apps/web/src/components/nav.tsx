'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { MapPin, Menu, X, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/cn'

const NAV_LINKS = [
  { href: '/directory', label: 'Directory' },
  { href: '/categories', label: 'Categories' },
  { href: '/blog', label: 'Guide' },
  { href: '/pricing', label: 'List Your Shop' },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 border-b border-border">
      <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between h-[64px]">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-gold font-semibold text-lg min-h-[44px]"
          onClick={() => setOpen(false)}
        >
          <MapPin className="w-5 h-5 shrink-0" strokeWidth={2} />
          <span>Shop Salida</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-4 min-h-[44px] flex items-center text-sm font-medium rounded-md transition-colors',
                pathname === link.href
                  ? 'text-gold bg-surface'
                  : 'text-muted hover:text-foreground hover:bg-surface'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/request-listing"
            className="ml-2 px-4 min-h-[44px] flex items-center gap-2 text-sm font-medium rounded-md bg-gold text-background hover:bg-gold-light transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Add Your Business
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-md text-muted hover:text-foreground hover:bg-surface transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'px-4 py-3 min-h-[44px] flex items-center text-sm font-medium rounded-md transition-colors',
                  pathname === link.href
                    ? 'text-gold bg-surface'
                    : 'text-muted hover:text-foreground hover:bg-surface'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/request-listing"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 min-h-[44px] flex items-center gap-2 text-sm font-medium rounded-md bg-gold text-background hover:bg-gold-light transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Add Your Business
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
