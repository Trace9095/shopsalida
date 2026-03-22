/**
 * schema.ts — Drizzle ORM schema for Shop Salida (Neon PostgreSQL)
 */

import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  serial,
  uuid,
  unique,
  index,
} from 'drizzle-orm/pg-core'

// ─── Admins ───────────────────────────────────────────────────────────────────

export const admins = pgTable('admins', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// ─── Users (listing owners) ───────────────────────────────────────────────────

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  stripeCustomerId: text('stripe_customer_id').unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// ─── Magic Link Tokens ────────────────────────────────────────────────────────

export const magicLinkTokens = pgTable('magic_link_tokens', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  tokenHash: text('token_hash').notNull().unique(),
  usedAt: timestamp('used_at'),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ─── Shops ────────────────────────────────────────────────────────────────────

export const shops = pgTable(
  'shops',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    slug: text('slug').notNull().unique(),
    name: text('name').notNull(),
    shortDescription: text('short_description').notNull().default(''),
    description: text('description').notNull().default(''),
    category: text('category').notNull(),
    tier: text('tier').notNull().default('free'), // 'free' | 'premium' | 'sponsored'
    // Contact
    address: text('address').notNull().default(''),
    addressLine2: text('address_line_2'),
    city: text('city').notNull().default('Salida'),
    state: text('state').notNull().default('CO'),
    zip: text('zip').notNull().default('81201'),
    phone: text('phone'),
    website: text('website'),
    email: text('email'),
    // Social
    instagramHandle: text('instagram_handle'),
    facebookUrl: text('facebook_url'),
    // Media
    heroImageUrl: text('hero_image_url'),
    logoUrl: text('logo_url'),
    // Content
    tags: text('tags').array().notNull().default([]),
    bookingUrl: text('booking_url'),
    // Status
    isActive: boolean('is_active').notNull().default(true),
    isFeatured: boolean('is_featured').notNull().default(false),
    isClaimed: boolean('is_claimed').notNull().default(false),
    claimedByUserId: uuid('claimed_by_user_id').references(() => users.id, { onDelete: 'set null' }),
    // Stripe
    stripeSubscriptionId: text('stripe_subscription_id'),
    stripeCustomerId: text('stripe_customer_id'),
    // Counters
    viewCount: integer('view_count').notNull().default(0),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (t) => ({
    categoryIdx: index('shops_category_idx').on(t.category),
    tierIdx: index('shops_tier_idx').on(t.tier),
    slugIdx: index('shops_slug_idx').on(t.slug),
    featuredIdx: index('shops_featured_idx').on(t.isFeatured),
  })
)

// ─── Shop Images ──────────────────────────────────────────────────────────────

export const shopImages = pgTable('shop_images', {
  id: serial('id').primaryKey(),
  shopId: uuid('shop_id').notNull().references(() => shops.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  altText: text('alt_text'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ─── Shop Hours ───────────────────────────────────────────────────────────────

export const shopHours = pgTable(
  'shop_hours',
  {
    id: serial('id').primaryKey(),
    shopId: uuid('shop_id').notNull().references(() => shops.id, { onDelete: 'cascade' }),
    dayOfWeek: integer('day_of_week').notNull(), // 0=Sun … 6=Sat
    openTime: text('open_time'), // "10:00"
    closeTime: text('close_time'), // "18:00"
    isClosed: boolean('is_closed').notNull().default(false),
    seasonalNote: text('seasonal_note'),
  },
  (t) => ({
    shopDayUnique: unique('shop_hours_shop_day_unique').on(t.shopId, t.dayOfWeek),
  })
)

// ─── Subscriptions ────────────────────────────────────────────────────────────

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  shopSlug: text('shop_slug').notNull(),
  stripeSubscriptionId: text('stripe_subscription_id').notNull().unique(),
  stripeCustomerId: text('stripe_customer_id').notNull(),
  tier: text('tier').notNull(), // 'premium' | 'sponsored'
  status: text('status').notNull(), // active | canceled | past_due
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// ─── Claim Requests ───────────────────────────────────────────────────────────

export const claimRequests = pgTable('claim_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  shopSlug: text('shop_slug').notNull(),
  claimantName: text('claimant_name').notNull(),
  claimantEmail: text('claimant_email').notNull(),
  claimantPhone: text('claimant_phone'),
  role: text('role'),
  message: text('message'),
  status: text('status').notNull().default('pending'), // pending | approved | rejected
  reviewedAt: timestamp('reviewed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ─── Reviews ──────────────────────────────────────────────────────────────────

export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  shopId: uuid('shop_id').notNull().references(() => shops.id, { onDelete: 'cascade' }),
  authorName: text('author_name').notNull(),
  rating: integer('rating').notNull(), // 1–5
  body: text('body').notNull(),
  isApproved: boolean('is_approved').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ─── Add Listing Requests ─────────────────────────────────────────────────────

export const addListingRequests = pgTable('add_listing_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  businessName: text('business_name').notNull(),
  ownerName: text('owner_name').notNull().default(''),
  email: text('email').notNull(),
  phone: text('phone'),
  address: text('address'),
  website: text('website'),
  category: text('category').notNull(),
  tier: text('tier').notNull().default('free'),
  message: text('message'),
  status: text('status').notNull().default('pending'), // pending | approved | rejected
  reviewedAt: timestamp('reviewed_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  heroImageUrl: text('hero_image_url'),
  metaDescription: text('meta_description'),
  tags: text('tags').array().notNull().default([]),
  isPublished: boolean('is_published').notNull().default(false),
  publishedAt: timestamp('published_at'),
  authorName: text('author_name').notNull().default('Shop Salida'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

// ─── Type exports ─────────────────────────────────────────────────────────────

export type Admin = typeof admins.$inferSelect
export type NewAdmin = typeof admins.$inferInsert
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Shop = typeof shops.$inferSelect
export type NewShop = typeof shops.$inferInsert
export type ShopImage = typeof shopImages.$inferSelect
export type ShopHours = typeof shopHours.$inferSelect
export type Subscription = typeof subscriptions.$inferSelect
export type ClaimRequest = typeof claimRequests.$inferSelect
export type Review = typeof reviews.$inferSelect
export type AddListingRequest = typeof addListingRequests.$inferSelect
export type BlogPost = typeof blogPosts.$inferSelect
