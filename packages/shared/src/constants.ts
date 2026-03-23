import type { ShopCategory } from './types'

// ─── Category Metadata ────────────────────────────────────────────────────────

export const CATEGORIES: Record<
  ShopCategory,
  { label: string; description: string; color: string }
> = {
  'art-gallery': {
    label: 'Art Galleries',
    description: 'Original art, prints, sculpture, and mixed media',
    color: '#9B59B6',
  },
  boutique: {
    label: 'Boutiques & Clothing',
    description: 'Fashion, accessories, and curated apparel',
    color: '#E74C3C',
  },
  'outdoor-gear': {
    label: 'Outdoor Gear',
    description: 'Adventure equipment, apparel, and rentals',
    color: '#27AE60',
  },
  'vintage-antique': {
    label: 'Vintage & Antique',
    description: 'Timeless finds, collectibles, and restored pieces',
    color: '#E67E22',
  },
  'gift-shop': {
    label: 'Gift Shops',
    description: 'Souvenirs, local goods, and perfect presents',
    color: '#3498DB',
  },
  'jewelry-artisan': {
    label: 'Jewelry & Artisan',
    description: 'Handcrafted jewelry, metalwork, and artisan goods',
    color: '#D4A853',
  },
  market: {
    label: 'Markets & Pop-ups',
    description: 'Farmers markets, artisan fairs, and seasonal events',
    color: '#1ABC9C',
  },
  'home-decor': {
    label: 'Home & Decor',
    description: 'Furnishings, ceramics, textiles, and interior goods',
    color: '#8E44AD',
  },
  'food-specialty': {
    label: 'Food & Specialty',
    description: 'Local provisions, wine, chocolate, and gourmet goods',
    color: '#C0392B',
  },
  'books-music': {
    label: 'Books & Music',
    description: 'Independent bookshops, vinyl, and music',
    color: '#2C3E50',
  },
}

// ─── Salida Creative District ─────────────────────────────────────────────────

export const CREATIVE_DISTRICT_INFO = {
  name: "Salida Creative District",
  tagline: "Colorado's Largest Certified Creative District",
  description:
    "Salida is home to the largest Colorado Creative Industries Certified Creative District, " +
    "with over 100 working artists and more than 50 arts-related businesses within a walkable " +
    "downtown footprint. The creative district spans F Street, Sackett Avenue, and surrounding " +
    "blocks of historic downtown Salida.",
  galleryCount: 50,
  artistCount: 100,
  url: "https://salidacreativedistrict.com",
}

// ─── App Config ───────────────────────────────────────────────────────────────

export const APP_CONFIG = {
  name: "Shop Salida",
  tagline: "Discover Downtown Salida's Finest Local Shops",
  description:
    "Your complete guide to shopping in Salida, Colorado — galleries, boutiques, " +
    "outdoor gear, vintage finds, artisan makers, and more.",
  url: "https://shopsalida.com",
  location: "Salida, Colorado",
}

// ─── Listing Tiers / Pricing ──────────────────────────────────────────────────

export type ListingTier = 'free' | 'premium' | 'sponsored'

export const LISTING_TIERS: Record<
  ListingTier,
  {
    label: string
    price: number   // cents/month; 0 = unclaimed placeholder
    priceLabel: string
    tagline: string
    badge: string | null
    features: string[]
    stripePriceId?: string
  }
> = {
  free: {
    label: 'Unclaimed',
    price: 0,
    priceLabel: 'Unclaimed',
    tagline: 'Claim this listing to manage your profile',
    badge: null,
    features: [
      'Business name & address only',
      'Upgrade to Premium ($99/mo) for full profile',
    ],
  },
  premium: {
    label: 'Premium',
    price: 9900, // $99/mo
    priceLabel: '$99/mo',
    tagline: 'Stand out with a full business profile',
    badge: 'Premium',
    features: [
      'Everything in Basic',
      'Rich description & photo gallery (up to 10 photos)',
      'Detailed hours & seasonal notes',
      'Instagram / social links',
      'Priority placement in category results',
      'Booking / reservation link',
      'Review highlights display',
      '"Claim This Listing" verification badge',
    ],
  },
  sponsored: {
    label: 'Sponsored',
    price: 19900, // $199/mo
    priceLabel: '$199/mo',
    tagline: 'Maximum visibility — the whole Salida audience',
    badge: 'Sponsored',
    features: [
      'Everything in Premium',
      'Homepage feature rotation slot',
      'Top of every relevant category page',
      'Highlighted in search results',
      'Sponsored banner on listing page',
      'Monthly performance analytics report',
      'Social media mention from @ShopSalida',
      'Priority customer support',
    ],
  },
}
