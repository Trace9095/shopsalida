import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Star, Crown, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'List Your Salida Business — Pricing',
  description:
    'Get your Salida shop in front of thousands of visitors. Premium at $99/mo, Sponsored at $199/mo. No free tier — every listing gets full directory placement.',
}

const TIERS = [
  {
    id: 'premium',
    label: 'Premium',
    price: '$99',
    per: '/mo',
    tagline: 'Full business profile with priority placement',
    icon: Star,
    highlight: true,
    cta: 'Get Premium',
    href: '/request-listing?tier=premium',
    features: [
      'Business name, address, category & map pin',
      'Phone number & website link',
      'Rich description & photo gallery (up to 10 photos)',
      'Detailed hours & seasonal notes',
      'Instagram & social media links',
      'Priority placement in category results',
      'Booking / reservation link',
      'Verified owner badge',
      'Review highlights display',
    ],
  },
  {
    id: 'sponsored',
    label: 'Sponsored',
    price: '$199',
    per: '/mo',
    tagline: 'Maximum visibility — homepage + top of every category',
    icon: Crown,
    highlight: false,
    cta: 'Get Sponsored',
    href: '/request-listing?tier=sponsored',
    features: [
      'Everything in Premium',
      'Homepage featured rotation slot',
      'Top of every relevant category page',
      'Highlighted in directory search results',
      'Sponsored badge on listing',
      'Monthly analytics report',
      'Social media mention from Shop Salida',
      'Priority customer support',
      'Dedicated account manager',
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-3">
          Salida&apos;s Premier Business Directory
        </p>
        <h1 className="text-4xl font-bold text-foreground mb-3">
          List Your Salida Business
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
          Get your shop in front of thousands of visitors exploring downtown Salida.
          Every listing includes full directory placement — choose the tier that fits your goals.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {TIERS.map(({ id, label, price, per, tagline, icon: Icon, highlight, cta, href, features }) => (
          <div
            key={id}
            className={`rounded-xl border p-7 flex flex-col ${
              highlight
                ? 'bg-gold/5 border-gold/40 ring-1 ring-gold/30'
                : 'bg-surface border-border'
            }`}
          >
            {highlight && (
              <div className="text-center mb-4">
                <span className="inline-block px-3 py-0.5 rounded-full bg-gold text-background text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </span>
              </div>
            )}
            <div className="mb-5">
              <Icon className={`w-7 h-7 mb-3 ${highlight ? 'text-gold' : 'text-muted'}`} />
              <h2 className="text-foreground text-2xl font-bold mb-1">{label}</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-4xl font-bold ${highlight ? 'text-gold' : 'text-foreground'}`}>
                  {price}
                </span>
                {per && <span className="text-muted text-sm">{per}</span>}
              </div>
              <p className="text-muted text-sm">{tagline}</p>
            </div>

            <ul className="space-y-2.5 mb-7 flex-1">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span className="text-muted">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href={href}
              className={`flex items-center justify-center gap-2 min-h-[52px] rounded-lg font-semibold text-sm transition-colors ${
                highlight
                  ? 'bg-gold text-background hover:bg-gold-light'
                  : 'bg-surface-hover border border-border text-foreground hover:border-gold/40'
              }`}
            >
              {cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>

      {/* What's included note */}
      <div className="rounded-xl bg-surface border border-border p-6 mb-12 text-center">
        <p className="text-foreground font-semibold mb-2">Every listing is curated and verified</p>
        <p className="text-muted text-sm leading-relaxed max-w-xl mx-auto">
          Shop Salida is a premium directory — not a free-for-all. Every listing is reviewed
          before going live to ensure accuracy and quality for our visitors.
          Month-to-month, cancel anytime.
        </p>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-foreground text-xl font-bold text-center mb-6">
          Common Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'What do I need to get started?',
              a: 'Your business name, address, category, and contact info. We\'ll review your submission and have you live within 1–2 business days.',
            },
            {
              q: 'Is there a contract or commitment?',
              a: 'No contract — Premium and Sponsored listings are month-to-month Stripe subscriptions. Cancel anytime with no penalty.',
            },
            {
              q: 'Can I upgrade from Premium to Sponsored?',
              a: 'Absolutely. Contact us at hello@shopsalida.com and we\'ll handle the upgrade within 24 hours.',
            },
            {
              q: 'How do I claim an existing listing?',
              a: 'If your business is already in our directory, use the "Claim This Listing" button on your listing page to verify ownership and upgrade.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'All major credit cards via Stripe — Visa, Mastercard, American Express, and Discover.',
            },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-lg bg-surface border border-border p-5">
              <h3 className="text-foreground font-semibold text-sm mb-2">{q}</h3>
              <p className="text-muted text-sm leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA bottom */}
      <div className="text-center mt-12">
        <p className="text-muted text-sm mb-4">Questions? Email us at hello@shopsalida.com</p>
        <Link
          href="/request-listing?tier=premium"
          className="inline-flex items-center gap-2 px-7 min-h-[52px] rounded-lg bg-gold text-background font-semibold hover:bg-gold-light transition-colors"
        >
          Get Listed for $99/mo
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
