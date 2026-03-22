// ─── Shop Types ───────────────────────────────────────────────────────────────

export type ShopCategory =
  | 'art-gallery'
  | 'boutique'
  | 'outdoor-gear'
  | 'vintage-antique'
  | 'gift-shop'
  | 'jewelry-artisan'
  | 'market'
  | 'home-decor'
  | 'food-specialty'
  | 'books-music'

export type ShopTier = 'free' | 'featured' | 'premium'

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export interface HoursEntry {
  open: string  // e.g. "10:00"
  close: string // e.g. "18:00"
  closed?: boolean
}

export type WeeklyHours = Partial<Record<DayOfWeek, HoursEntry>>

export interface ShopListing {
  id: string
  slug: string
  name: string
  description: string
  shortDescription: string
  category: ShopCategory
  tier: ShopTier
  address: string
  phone?: string
  website?: string
  email?: string
  instagramHandle?: string
  facebookUrl?: string
  hours?: WeeklyHours
  tags: string[]
  imageUrl?: string
  logoUrl?: string
  isActive: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

// ─── Auth Types ───────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string
  email: string
  name?: string
  isAdmin: boolean
  plan: ShopTier
  createdAt: string
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T = void> {
  success: boolean
  data?: T
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}
