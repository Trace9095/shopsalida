export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/lib/db'
import { shops } from '@/db/schema'
import { eq, and, ilike, or, desc } from 'drizzle-orm'
import { ShopCard } from '@/components/shop-card'
import { Search, SlidersHorizontal } from 'lucide-react'

const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories' },
  { value: 'art-gallery', label: 'Art Galleries' },
  { value: 'boutique', label: 'Boutiques' },
  { value: 'outdoor-gear', label: 'Outdoor Gear' },
  { value: 'vintage-antique', label: 'Vintage & Antique' },
  { value: 'gift-shop', label: 'Gift Shops' },
  { value: 'jewelry-artisan', label: 'Jewelry & Artisan' },
  { value: 'market', label: 'Markets' },
  { value: 'home-decor', label: 'Home & Decor' },
  { value: 'food-specialty', label: 'Food & Specialty' },
  { value: 'books-music', label: 'Books & Music' },
]

export const metadata: Metadata = {
  title: 'Business Directory — All Salida Shops',
  description:
    'Browse every shop, gallery, boutique, and business in downtown Salida, Colorado. ' +
    'Filter by category to find art galleries, outdoor gear, vintage stores, jewelers, and more.',
}

interface Props {
  searchParams: Promise<{ category?: string; q?: string }>
}

export default async function DirectoryPage({ searchParams }: Props) {
  const { category, q } = await searchParams

  const conditions = [eq(shops.isActive, true)]
  if (category) conditions.push(eq(shops.category, category))
  if (q) {
    conditions.push(
      or(
        ilike(shops.name, `%${q}%`),
        ilike(shops.shortDescription, `%${q}%`)
      )!
    )
  }

  const results = await db
    .select()
    .from(shops)
    .where(and(...conditions))
    .orderBy(desc(shops.tier), desc(shops.isFeatured))

  const selectedCategory = CATEGORY_OPTIONS.find((c) => c.value === category)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {selectedCategory?.value
            ? selectedCategory.label
            : 'Salida Business Directory'}
        </h1>
        <p className="text-muted">
          {results.length} {results.length === 1 ? 'business' : 'businesses'} in downtown Salida, CO
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <form className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          <input
            type="search"
            name="q"
            defaultValue={q ?? ''}
            placeholder="Search shops..."
            className="w-full pl-10 pr-4 h-11 rounded-lg bg-surface border border-border text-foreground placeholder:text-muted text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
          />
          {category && <input type="hidden" name="category" value={category} />}
        </form>
        <div className="flex gap-2 flex-wrap">
          {CATEGORY_OPTIONS.map((opt) => (
            <Link
              key={opt.value}
              href={opt.value ? `/directory?category=${opt.value}` : '/directory'}
              className={`px-3 h-11 flex items-center rounded-lg text-sm font-medium transition-colors border ${
                (category ?? '') === opt.value
                  ? 'bg-gold text-background border-gold'
                  : 'bg-surface border-border text-muted hover:text-foreground hover:border-gold/40'
              }`}
            >
              {opt.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted">
          <SlidersHorizontal className="w-8 h-8 mx-auto mb-3 opacity-40" />
          <p className="font-medium mb-1">No shops found</p>
          <p className="text-sm">Try a different category or search term.</p>
          <Link href="/directory" className="mt-4 inline-block text-gold text-sm hover:text-gold-light transition-colors min-h-[44px] flex items-center justify-center">
            Clear filters
          </Link>
        </div>
      )}

      {/* Add listing CTA */}
      <div className="mt-16 text-center border border-border rounded-xl p-8 bg-surface">
        <p className="text-foreground font-semibold mb-2">Don&apos;t see your business?</p>
        <p className="text-muted text-sm mb-4">Get your Salida shop in front of thousands of visitors. Listings start at $99/mo.</p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 px-5 min-h-[44px] rounded-lg bg-gold text-background text-sm font-semibold hover:bg-gold-light transition-colors"
        >
          View Listing Plans
        </Link>
      </div>
    </div>
  )
}
