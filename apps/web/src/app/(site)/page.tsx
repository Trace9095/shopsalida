import Link from 'next/link'
import { MapPin, ArrowRight, Star, Store, Palette, Mountain } from 'lucide-react'
import { db } from '@/lib/db'
import { shops } from '@/db/schema'
import { eq, desc, and } from 'drizzle-orm'
import { ShopCard } from '@/components/shop-card'
import { WebsiteJsonLd, FaqJsonLd } from '@/components/json-ld'

const CATEGORY_HIGHLIGHTS = [
  {
    slug: 'art-gallery',
    label: "Art Galleries",
    desc: "Colorado's largest Creative District",
    icon: Palette,
    color: 'text-art',
  },
  {
    slug: 'boutique',
    label: "Boutiques",
    desc: "Curated fashion & accessories",
    icon: Store,
    color: 'text-boutique',
  },
  {
    slug: 'outdoor-gear',
    label: "Outdoor Gear",
    desc: "Arkansas River to the 14ers",
    icon: Mountain,
    color: 'text-outdoor',
  },
  {
    slug: 'jewelry-artisan',
    label: "Jewelry & Artisan",
    desc: "Handcrafted Colorado gems",
    icon: Star,
    color: 'text-jewelry',
  },
]

async function getFeaturedShops() {
  return db
    .select()
    .from(shops)
    .where(and(eq(shops.isFeatured, true), eq(shops.isActive, true)))
    .orderBy(desc(shops.tier))
    .limit(6)
}

async function getSponsoredShops() {
  return db
    .select()
    .from(shops)
    .where(and(eq(shops.tier, 'sponsored'), eq(shops.isActive, true)))
    .limit(3)
}

export default async function HomePage() {
  const [featured, sponsored] = await Promise.all([getFeaturedShops(), getSponsoredShops()])

  return (
    <>
      <WebsiteJsonLd />
      <FaqJsonLd />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative px-4 pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-medium mb-6">
            <MapPin className="w-3 h-3" />
            Salida, Colorado — Downtown Creative District
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
            Discover Downtown
            <br />
            <span className="text-gold">Salida&apos;s Best Shops</span>
          </h1>
          <p className="text-muted text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Home to{' '}
            <strong className="text-foreground">Colorado&apos;s largest Creative District</strong>
            {' '}— 100+ working artists, 50+ galleries, boutiques, outdoor gear, vintage finds,
            and artisan makers in walkable downtown Salida.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/directory"
              className="inline-flex items-center gap-2 px-6 min-h-[48px] rounded-lg bg-gold text-background font-semibold hover:bg-gold-light transition-colors text-base"
            >
              Browse All Shops
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-6 min-h-[48px] rounded-lg border border-border text-foreground font-medium hover:bg-surface transition-colors text-base"
            >
              Browse by Category
            </Link>
          </div>
        </div>
      </section>

      {/* ── Category Grid ─────────────────────────────────────────────────── */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CATEGORY_HIGHLIGHTS.map(({ slug, label, desc, icon: Icon, color }) => (
              <Link
                key={slug}
                href={`/directory?category=${slug}`}
                className="group flex flex-col gap-2 p-4 rounded-lg bg-surface border border-border hover:border-gold/30 hover:bg-surface-hover transition-all min-h-[100px]"
              >
                <Icon className={`w-6 h-6 ${color}`} />
                <div>
                  <p className="text-foreground font-medium text-sm group-hover:text-gold transition-colors">{label}</p>
                  <p className="text-muted text-xs mt-0.5">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Creative District Banner ──────────────────────────────────────── */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-xl bg-gradient-to-r from-gold/10 to-surface border border-gold/20 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-2">
                  Colorado&apos;s Largest Certified Creative District
                </p>
                <h2 className="text-foreground text-2xl md:text-3xl font-bold mb-2">
                  Salida Creative District
                </h2>
                <p className="text-muted leading-relaxed max-w-xl">
                  More than 100 working artists and 50+ arts businesses are concentrated within
                  Salida&apos;s walkable downtown — making it the most vibrant arts community
                  per capita in Colorado. Galleries, studios, jewelry makers, and artisan shops
                  line historic F Street and surrounding blocks.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <div className="text-center p-4 rounded-lg bg-surface border border-border">
                  <p className="text-gold text-3xl font-bold">100+</p>
                  <p className="text-muted text-xs mt-1">Working Artists</p>
                </div>
                <Link
                  href="/blog/salida-creative-district-largest-in-colorado"
                  className="inline-flex items-center justify-center gap-2 px-4 min-h-[44px] rounded-lg border border-gold/40 text-gold text-sm font-medium hover:bg-gold/10 transition-colors"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sponsored Listings ────────────────────────────────────────────── */}
      {sponsored.length > 0 && (
        <section className="px-4 pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-foreground text-xl font-bold">Sponsored Listings</h2>
                <p className="text-muted text-sm mt-0.5">Featured businesses in Salida</p>
              </div>
              <Link
                href="/pricing"
                className="text-gold text-sm font-medium hover:text-gold-light transition-colors min-h-[44px] flex items-center"
              >
                Become Sponsored
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sponsored.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Featured Shops ────────────────────────────────────────────────── */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-foreground text-xl font-bold">Featured Shops</h2>
              <p className="text-muted text-sm mt-0.5">Explore Salida&apos;s best local businesses</p>
            </div>
            <Link
              href="/directory"
              className="inline-flex items-center gap-1 text-gold text-sm font-medium hover:text-gold-light transition-colors min-h-[44px]"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
          {featured.length === 0 && (
            <div className="text-center py-12 text-muted">
              <Store className="w-8 h-8 mx-auto mb-3 opacity-50" />
              <p>Shops loading soon — check back shortly.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-foreground text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "What is the Salida Creative District?",
                a: "The Salida Creative District is Colorado's largest Colorado Creative Industries Certified Creative District, with over 100 working artists and 50+ arts businesses in walkable downtown Salida.",
              },
              {
                q: "When is the Salida ArtWalk?",
                a: "The Salida ArtWalk is held the first full weekend of June, July, August, and September. FIRSTfriday gallery openings also happen monthly year-round.",
              },
              {
                q: "How do I list my business?",
                a: "Submit your business through the 'Request a Listing' page. Basic listings are free. Premium ($99/mo) and Sponsored ($199/mo) tiers unlock enhanced profiles and priority placement.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-lg bg-surface border border-border p-5">
                <h3 className="text-foreground font-semibold mb-2">{q}</h3>
                <p className="text-muted text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="px-4 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-foreground text-2xl font-bold mb-3">Own a Salida business?</h2>
          <p className="text-muted mb-6 leading-relaxed">
            Get your shop in front of thousands of visitors and locals exploring downtown Salida.
            Basic listings are free — premium tiers start at $99/mo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/request-listing"
              className="inline-flex items-center gap-2 px-6 min-h-[48px] rounded-lg bg-gold text-background font-semibold hover:bg-gold-light transition-colors"
            >
              Request Free Listing
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 min-h-[48px] rounded-lg border border-border text-foreground font-medium hover:bg-surface transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
