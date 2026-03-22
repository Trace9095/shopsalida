import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/lib/db'
import { shops } from '@/db/schema'
import { eq, count, and } from 'drizzle-orm'

export const metadata: Metadata = {
  title: 'Shop Categories — Salida, Colorado',
  description:
    'Browse Salida shops by category: art galleries, boutiques, outdoor gear, vintage, jewelry, gift shops, and more in downtown Salida, CO.',
}

const ALL_CATEGORIES = [
  {
    slug: 'art-gallery',
    label: 'Art Galleries',
    description: 'Original artwork, prints, sculpture, ceramics, and mixed media from over 100 local and regional artists in Colorado\'s largest Creative District.',
    color: 'border-[#9B59B6]/30 bg-[#9B59B6]/5',
    textColor: 'text-[#9B59B6]',
  },
  {
    slug: 'boutique',
    label: 'Boutiques & Clothing',
    description: 'Curated women\'s fashion, outdoor apparel, bohemian clothing, and accessories from independent boutiques lining historic F Street.',
    color: 'border-[#E74C3C]/30 bg-[#E74C3C]/5',
    textColor: 'text-[#E74C3C]',
  },
  {
    slug: 'outdoor-gear',
    label: 'Outdoor Gear',
    description: 'Equipment and apparel for Arkansas River whitewater, 14er hiking, mountain biking, rock climbing, and all-season Colorado adventure.',
    color: 'border-[#27AE60]/30 bg-[#27AE60]/5',
    textColor: 'text-[#27AE60]',
  },
  {
    slug: 'vintage-antique',
    label: 'Vintage & Antique',
    description: 'Multi-dealer markets and curated vintage shops with furniture, Colorado memorabilia, clothing, jewelry, and one-of-a-kind finds.',
    color: 'border-[#E67E22]/30 bg-[#E67E22]/5',
    textColor: 'text-[#E67E22]',
  },
  {
    slug: 'gift-shop',
    label: 'Gift Shops',
    description: 'Colorado-made souvenirs, handmade bath products, local artisan food, photography prints, and unique gifts for every budget.',
    color: 'border-[#3498DB]/30 bg-[#3498DB]/5',
    textColor: 'text-[#3498DB]',
  },
  {
    slug: 'jewelry-artisan',
    label: 'Jewelry & Artisan',
    description: 'Handcrafted jewelry in sterling silver and gold, Colorado sapphires, turquoise, custom commissions, and artisan studio work.',
    color: 'border-gold/30 bg-gold/5',
    textColor: 'text-gold',
  },
  {
    slug: 'market',
    label: 'Markets & Pop-ups',
    description: 'Salida Farmers Market, artisan fairs, and seasonal pop-up markets featuring local growers, makers, and small businesses.',
    color: 'border-[#1ABC9C]/30 bg-[#1ABC9C]/5',
    textColor: 'text-[#1ABC9C]',
  },
  {
    slug: 'home-decor',
    label: 'Home & Decor',
    description: 'Mountain-inspired furniture, lighting, ceramics, textiles, and interior accents for Colorado homes.',
    color: 'border-[#8E44AD]/30 bg-[#8E44AD]/5',
    textColor: 'text-[#8E44AD]',
  },
  {
    slug: 'food-specialty',
    label: 'Food & Specialty',
    description: 'Curated wine shops, craft spirits, gourmet chocolates, local honey, and artisan food products made or sourced in Chaffee County.',
    color: 'border-[#C0392B]/30 bg-[#C0392B]/5',
    textColor: 'text-[#C0392B]',
  },
  {
    slug: 'books-music',
    label: 'Books & Music',
    description: 'Independent bookshops, vinyl records, and music stores in the heart of Salida\'s creative community.',
    color: 'border-[#2C3E50]/30 bg-[#2C3E50]/5',
    textColor: 'text-muted',
  },
]

async function getCategoryCounts() {
  const rows = await db
    .select({ category: shops.category, count: count() })
    .from(shops)
    .where(eq(shops.isActive, true))
    .groupBy(shops.category)
  return Object.fromEntries(rows.map((r) => [r.category, r.count]))
}

export default async function CategoriesPage() {
  const counts = await getCategoryCounts()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">Browse by Category</h1>
        <p className="text-muted">
          Explore everything downtown Salida has to offer — from world-class galleries
          to outdoor adventure outfitters.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ALL_CATEGORIES.map(({ slug, label, description, color, textColor }) => {
          const n = counts[slug] ?? 0
          return (
            <Link
              key={slug}
              href={`/directory?category=${slug}`}
              className={`group rounded-xl border p-6 transition-all hover:ring-1 hover:ring-gold/20 ${color}`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className={`font-bold text-lg group-hover:underline ${textColor}`}>{label}</h2>
                {n > 0 && (
                  <span className="text-xs text-muted bg-background/50 border border-border px-2 py-0.5 rounded shrink-0">
                    {n} {n === 1 ? 'listing' : 'listings'}
                  </span>
                )}
              </div>
              <p className="text-muted text-sm leading-relaxed">{description}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
