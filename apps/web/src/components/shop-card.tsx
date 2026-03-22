import Link from 'next/link'
import { MapPin, Phone, Globe, BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { Shop } from '@/db/schema'

const CATEGORY_LABELS: Record<string, string> = {
  'art-gallery': 'Art Gallery',
  boutique: 'Boutique',
  'outdoor-gear': 'Outdoor Gear',
  'vintage-antique': 'Vintage & Antique',
  'gift-shop': 'Gift Shop',
  'jewelry-artisan': 'Jewelry & Artisan',
  market: 'Market',
  'home-decor': 'Home & Decor',
  'food-specialty': 'Food & Specialty',
  'books-music': 'Books & Music',
}

// Category fallback images — shown when a listing has no heroImageUrl
const CATEGORY_FALLBACK: Record<string, string> = {
  'art-gallery':     '/images/categories/art-gallery.svg',
  boutique:          '/images/categories/boutique.svg',
  'outdoor-gear':    '/images/categories/outdoor-gear.svg',
  'vintage-antique': '/images/categories/vintage-antique.svg',
  'gift-shop':       '/images/categories/gift-shop.svg',
  'jewelry-artisan': '/images/categories/jewelry-artisan.svg',
  market:            '/images/categories/market.svg',
  'home-decor':      '/images/categories/home-decor.svg',
  'food-specialty':  '/images/categories/food-specialty.svg',
  'books-music':     '/images/categories/books-music.svg',
}

const TIER_STYLES = {
  free: { badge: null, ring: '' },
  premium: {
    badge: 'Premium',
    ring: 'ring-1 ring-gold/30',
  },
  sponsored: {
    badge: 'Sponsored',
    ring: 'ring-1 ring-gold/60',
  },
}

interface ShopCardProps {
  shop: Shop
  compact?: boolean
}

export function ShopCard({ shop, compact = false }: ShopCardProps) {
  const tier = TIER_STYLES[shop.tier as keyof typeof TIER_STYLES] ?? TIER_STYLES.free
  const isFeaturedPartner = shop.tags?.includes('featured partner')

  return (
    <Link
      href={`/directory/${shop.slug}`}
      className={cn(
        'group block rounded-lg bg-surface border border-border transition-all duration-200',
        'hover:border-gold/40 hover:bg-surface-hover',
        tier.ring
      )}
    >
      {/* Hero image */}
      {!compact && (
        <div className="relative h-40 rounded-t-lg overflow-hidden bg-surface-hover">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shop.heroImageUrl ?? CATEGORY_FALLBACK[shop.category] ?? '/images/categories/outdoor-gear.svg'}
            alt={shop.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Tier badge */}
          {(tier.badge || isFeaturedPartner) && (
            <div className={cn(
              'absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-semibold',
              shop.tier === 'sponsored'
                ? 'bg-gold text-background'
                : 'bg-surface/90 text-gold border border-gold/40'
            )}>
              {isFeaturedPartner ? 'Featured Partner' : tier.badge}
            </div>
          )}
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors leading-tight line-clamp-1">
            {shop.name}
          </h3>
          {shop.isClaimed && (
            <BadgeCheck className="w-4 h-4 text-gold shrink-0 mt-0.5" />
          )}
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-muted bg-surface-hover px-2 py-0.5 rounded">
            {CATEGORY_LABELS[shop.category] ?? shop.category}
          </span>
          {compact && (tier.badge || isFeaturedPartner) && (
            <span className={cn(
              'text-xs px-2 py-0.5 rounded font-medium',
              shop.tier === 'sponsored'
                ? 'bg-gold/20 text-gold'
                : 'bg-surface-hover text-gold/80'
            )}>
              {isFeaturedPartner ? 'Featured Partner' : tier.badge}
            </span>
          )}
        </div>

        <p className="text-muted text-sm leading-relaxed line-clamp-2 mb-3">
          {shop.shortDescription}
        </p>

        <div className="flex flex-wrap gap-3 text-xs text-muted">
          {shop.address && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 shrink-0" />
              {shop.address}
            </span>
          )}
          {shop.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 shrink-0" />
              {shop.phone}
            </span>
          )}
          {shop.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 shrink-0" />
              Website
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
