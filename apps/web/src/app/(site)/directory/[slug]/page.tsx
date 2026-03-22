export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Globe, Phone, MapPin, Instagram, ExternalLink, Calendar, ArrowLeft } from 'lucide-react'
import { db } from '@/lib/db'
import { shops, shopImages, shopHours, reviews } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { ClaimBanner } from '@/components/claim-banner'
import { HoursDisplay } from '@/components/hours-display'
import { LocalBusinessJsonLd } from '@/components/json-ld'

const APP_URL = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://shopsalida.com'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [shop] = await db.select().from(shops).where(eq(shops.slug, slug)).limit(1)
  if (!shop) return {}

  return {
    title: `${shop.name} — ${shop.city}, CO`,
    description: shop.shortDescription,
    openGraph: {
      title: `${shop.name} | Shop Salida`,
      description: shop.shortDescription,
      url: `${APP_URL}/directory/${shop.slug}`,
      ...(shop.heroImageUrl && { images: [{ url: shop.heroImageUrl }] }),
    },
    alternates: { canonical: `${APP_URL}/directory/${shop.slug}` },
  }
}

export default async function ShopPage({ params }: Props) {
  const { slug } = await params

  const [shop] = await db
    .select()
    .from(shops)
    .where(and(eq(shops.slug, slug), eq(shops.isActive, true)))
    .limit(1)

  if (!shop) notFound()

  const [images, hours, approvedReviews] = await Promise.all([
    db.select().from(shopImages).where(eq(shopImages.shopId, shop.id)),
    db.select().from(shopHours).where(eq(shopHours.shopId, shop.id)),
    db
      .select()
      .from(reviews)
      .where(and(eq(reviews.shopId, shop.id), eq(reviews.isApproved, true)))
      .limit(10),
  ])

  // Track view (fire-and-forget)
  void db
    .update(shops)
    .set({ viewCount: (shop.viewCount ?? 0) + 1 })
    .where(eq(shops.id, shop.id))

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

  return (
    <>
      <LocalBusinessJsonLd
        shop={shop}
        hours={hours}
        url={`${APP_URL}/directory/${shop.slug}`}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back */}
        <Link
          href="/directory"
          className="inline-flex items-center gap-1.5 text-muted hover:text-foreground text-sm mb-6 transition-colors min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>

        {/* Hero Image */}
        {(shop.heroImageUrl || images.length > 0) && (
          <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8 bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={shop.heroImageUrl ?? images[0]?.url}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title row */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs bg-surface border border-border px-2 py-0.5 rounded text-muted">
                  {CATEGORY_LABELS[shop.category] ?? shop.category}
                </span>
                {shop.tier === 'sponsored' && (
                  <span className="text-xs bg-gold text-background px-2 py-0.5 rounded font-semibold">
                    Sponsored
                  </span>
                )}
                {shop.tier === 'premium' && (
                  <span className="text-xs bg-surface border border-gold/40 text-gold px-2 py-0.5 rounded font-medium">
                    Premium
                  </span>
                )}
                {shop.isClaimed && (
                  <span className="text-xs text-success flex items-center gap-1">
                    Verified
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{shop.name}</h1>
              <p className="text-muted text-lg leading-relaxed">{shop.shortDescription}</p>
            </div>

            {/* Description */}
            {shop.description && (
              <div className="prose prose-invert max-w-none">
                <p className="text-muted leading-relaxed whitespace-pre-line">{shop.description}</p>
              </div>
            )}

            {/* Tags */}
            {shop.tags && shop.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {shop.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded bg-surface border border-border text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Photo Gallery */}
            {images.length > 1 && (
              <div>
                <h3 className="text-foreground font-semibold mb-3">Photos</h3>
                <div className="grid grid-cols-3 gap-2">
                  {images.slice(0, 9).map((img) => (
                    <div key={img.id} className="aspect-square rounded-lg overflow-hidden bg-surface">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.url}
                        alt={img.altText ?? shop.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {approvedReviews.length > 0 && (
              <div>
                <h3 className="text-foreground font-semibold mb-3">Reviews</h3>
                <div className="space-y-3">
                  {approvedReviews.map((review) => (
                    <div key={review.id} className="rounded-lg bg-surface border border-border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm text-foreground">{review.authorName}</p>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={i < review.rating ? 'text-gold' : 'text-border'}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-muted text-sm leading-relaxed">{review.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Claim Banner */}
            <ClaimBanner
              shopSlug={shop.slug}
              shopName={shop.name}
              isClaimed={shop.isClaimed}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Contact Card */}
            <div className="rounded-lg bg-surface border border-border p-5 space-y-3">
              <h3 className="text-foreground font-semibold">Contact</h3>
              {shop.address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${shop.name} ${shop.address} ${shop.city} CO`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-muted hover:text-gold transition-colors min-h-[44px]"
                >
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    {shop.address}
                    {shop.addressLine2 && <>, {shop.addressLine2}</>}
                    <br />
                    {shop.city}, {shop.state} {shop.zip}
                  </span>
                </a>
              )}
              {shop.phone && (
                <a
                  href={`tel:${shop.phone}`}
                  className="flex items-center gap-2 text-sm text-muted hover:text-gold transition-colors min-h-[44px]"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  {shop.phone}
                </a>
              )}
              {shop.website && (
                <a
                  href={shop.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted hover:text-gold transition-colors min-h-[44px]"
                >
                  <Globe className="w-4 h-4 shrink-0" />
                  Visit Website
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              )}
              {shop.instagramHandle && (
                <a
                  href={`https://instagram.com/${shop.instagramHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted hover:text-gold transition-colors min-h-[44px]"
                >
                  <Instagram className="w-4 h-4 shrink-0" />
                  @{shop.instagramHandle}
                </a>
              )}
              {shop.bookingUrl && (
                <a
                  href={shop.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 min-h-[44px] rounded-md bg-gold text-background text-sm font-semibold hover:bg-gold-light transition-colors w-full justify-center"
                >
                  <Calendar className="w-4 h-4" />
                  Book / Reserve
                </a>
              )}
            </div>

            {/* Map Link */}
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${shop.name} Salida CO`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-11 rounded-lg border border-border text-muted hover:text-gold hover:border-gold/40 text-sm transition-colors"
            >
              <MapPin className="w-4 h-4" />
              View on Google Maps
            </a>

            {/* Hours */}
            {hours.length > 0 && (
              <div className="rounded-lg bg-surface border border-border p-5">
                <HoursDisplay hours={hours} />
              </div>
            )}

            {/* Upgrade prompt for unclaimed listings */}
            {!shop.isClaimed && (
              <div className="rounded-lg border border-gold/20 bg-gold/5 p-4 text-center">
                <p className="text-gold text-sm font-semibold mb-1">Claim & Upgrade This Listing</p>
                <p className="text-muted text-xs mb-3">
                  Add photos, hours, booking links, and priority placement. Listings from $99/mo.
                </p>
                <Link
                  href={`/claim/${shop.slug}`}
                  className="inline-flex items-center gap-1 px-4 min-h-[44px] rounded-md bg-gold text-background text-xs font-semibold hover:bg-gold-light transition-colors"
                >
                  Claim This Listing
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sister Sites Cross-link */}
        <div className="mt-16 rounded-xl bg-surface border border-border p-6">
          <p className="text-muted text-xs uppercase tracking-wider font-semibold mb-2">Explore More of Colorado</p>
          <p className="text-foreground font-semibold mb-3">
            After shopping in Salida, take the scenic drive to Royal Gorge — just 1 hour east.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a href="https://royalgorgerafting.net" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors min-h-[44px] flex items-center gap-1">
              Royal Gorge Rafting <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://royalgorgeziplinetours.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors min-h-[44px] flex items-center gap-1">
              Royal Gorge Zipline <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://royalgorgevacationrentals.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors min-h-[44px] flex items-center gap-1">
              Royal Gorge Vacation Rentals <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
