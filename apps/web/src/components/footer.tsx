import Link from 'next/link'
import { MapPin, Instagram, Facebook } from 'lucide-react'

const CATEGORIES = [
  { href: '/directory?category=art-gallery', label: 'Art Galleries' },
  { href: '/directory?category=boutique', label: 'Boutiques' },
  { href: '/directory?category=outdoor-gear', label: 'Outdoor Gear' },
  { href: '/directory?category=vintage-antique', label: 'Vintage & Antique' },
  { href: '/directory?category=jewelry-artisan', label: 'Jewelry & Artisan' },
  { href: '/directory?category=gift-shop', label: 'Gift Shops' },
  { href: '/directory?category=market', label: 'Markets' },
]

const LINKS = [
  { href: '/directory', label: 'Full Directory' },
  { href: '/categories', label: 'Browse Categories' },
  { href: '/blog', label: 'Salida Shopping Guide' },
  { href: '/pricing', label: 'List Your Shop' },
  { href: '/request-listing', label: 'Request a Listing' },
  { href: '/add-listing', label: 'Add Your Business' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-gold font-semibold text-lg mb-3 min-h-[44px] w-fit">
              <MapPin className="w-5 h-5 shrink-0" strokeWidth={2} />
              <span>Shop Salida</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-4">
              The independent guide to shopping in Salida, Colorado —
              home to Colorado&apos;s largest Certified Creative District.
            </p>
            <p className="text-muted text-xs">
              Salida, CO 81201
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-foreground font-semibold text-sm mb-3">Shop by Category</h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.href}>
                  <Link
                    href={cat.href}
                    className="text-muted hover:text-gold text-sm transition-colors min-h-[44px] flex items-center"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-foreground font-semibold text-sm mb-3">Directory</h3>
            <ul className="space-y-2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-gold text-sm transition-colors min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Creative District callout */}
          <div>
            <h3 className="text-foreground font-semibold text-sm mb-3">Creative District</h3>
            <p className="text-muted text-sm leading-relaxed mb-4">
              Salida is home to Colorado&apos;s largest Colorado Creative Industries
              Certified Creative District — over 100 working artists and 50+
              arts businesses in walkable downtown Salida.
            </p>
            <Link
              href="/blog/salida-creative-district-largest-in-colorado"
              className="text-gold hover:text-gold-light text-sm font-medium transition-colors min-h-[44px] flex items-center w-fit"
            >
              Learn more &rarr;
            </Link>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            &copy; {new Date().getFullYear()} Shop Salida. Independent local business directory.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted">
            <Link href="/privacy" className="hover:text-gold transition-colors min-h-[44px] flex items-center">Privacy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors min-h-[44px] flex items-center">Terms</Link>
            <Link href="/admin" className="hover:text-gold transition-colors min-h-[44px] flex items-center">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
