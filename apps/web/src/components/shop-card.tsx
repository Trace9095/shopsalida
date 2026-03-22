import Link from 'next/link'
import { MapPin, Phone, Globe, Star, BadgeCheck } from 'lucide-react'
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

  return (
    <Link
      href={`/directory/${shop.slug}`}
      className={cn(
        'group block rounded-lg bg-surface border border-border transition-all duration-200',
        'hover:border-gold/40 hover:bg-surface-hover',
        tier.ring
      )}
    >
      {/* Hero image placeholder */}
      {!compact && (
        <div className="relative h-40 rounded-t-lg overflow-hidden bg-surface-hover">
          {shop.heroImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={shop.heroImageUrl}
              alt={shop.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <MapPin className="w-8 h-8 text-border" />
            </div>
          )}
          {/* Tier badge */}
          {tier.badge && (
            <div className={cn(
              'absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-semibold',
              shop.tier === 'sponsored'
                ? 'bg-gold text-background'
                : 'bg-surface/90 text-gold border border-gold/40'
            )}>
              {tier.badge}
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
          {compact && tier.badge && (
            <span className={cn(
              'text-xs px-2 py-0.5 rounded font-medium',
              shop.tier === 'sponsored'
                ? 'bg-gold/20 text-gold'
                : 'bg-surface-hover text-gold/80'
            )}>
              {tier.badge}
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
