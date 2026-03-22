import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Zap, Star, Crown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'List Your Salida Business — Pricing',
  description:
    'Get your Salida shop in front of thousands of visitors. Free basic listings, Premium at $99/mo, and Sponsored at $199/mo.',
}

const TIERS = [
  {
    id: 'free',
    label: 'Basic',
    price: 'Free',
    tagline: 'Get found by Salida shoppers',
    icon: Zap,
    highlight: false,
    cta: 'Request Free Listing',
    href: '/request-listing',
    features: [
      'Business name, address & category',
      'Phone & website link',
      'Basic hours of operation',
      'Listed in directory search',
      'Salida map location',
    ],
  },
  {
    id: 'premium',
    label: 'Premium',
    price: '$99',
    per: '/mo',
    tagline: 'Stand out with a full business profile',
    icon: Star,
    highlight: true,
    cta: 'Get Premium',
    href: '/request-listing?tier=premium',
    features: [
      'Everything in Basic',
      'Rich description & photo gallery (up to 10 photos)',
      'Detailed hours & seasonal notes',
      'Instagram & social media links',
      'Priority placement in category results',
      'Booking / reservation link',
      'Review highlights display',
      'Verified owner badge',
    ],
  },
  {
    id: 'sponsored',
    label: 'Sponsored',
    price: '$199',
    per: '/mo',
    tagline: 'Maximum visibility across all of Salida',
    icon: Crown,
    highlight: false,
    cta: 'Get Sponsored',
    href: '/request-listing?tier=sponsored',
    features: [
      'Everything in Premium',
      'Homepage feature rotation slot',
      'Top of every relevant category page',
      'Highlighted in search results',
      'Sponsored banner on listing',
      'Monthly analytics report',
      'Social media mention from Shop Salida',
      'Priority customer support',
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-3">
          List Your Salida Business
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
          Get your shop in front of thousands of visitors exploring downtown Salida.
          Free basic listings — premium tiers add photos, priority placement, and more.
        </p>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {TIERS.map(({ id, label, price, per, tagline, icon: Icon, highlight, cta, href, features }) => (
          <div
            key={id}
            className={`rounded-xl border p-6 flex flex-col ${
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
            <div className="mb-4">
              <Icon className={`w-7 h-7 mb-3 ${highlight ? 'text-gold' : 'text-muted'}`} />
              <h2 className="text-foreground text-xl font-bold mb-1">{label}</h2>
              <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-3xl font-bold ${highlight ? 'text-gold' : 'text-foreground'}`}>
                  {price}
                </span>
                {per && <span className="text-muted text-sm">{per}</span>}
              </div>
              <p className="text-muted text-sm">{tagline}</p>
            </div>

            <ul className="space-y-2.5 mb-6 flex-1">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span className="text-muted">{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href={href}
              className={`flex items-center justify-center min-h-[48px] rounded-lg font-semibold text-sm transition-colors ${
                highlight
                  ? 'bg-gold text-background hover:bg-gold-light'
                  : 'bg-surface-hover border border-border text-foreground hover:border-gold/40'
              }`}
            >
              {cta}
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-foreground text-xl font-bold text-center mb-6">
          Common Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'Can I start free and upgrade later?',
              a: 'Yes — submit a free basic listing and upgrade to Premium or Sponsored at any time through your account dashboard.',
            },
            {
              q: 'What do I need to get started?',
              a: 'Just your business name, address, category, and contact info. Premium and Sponsored tiers let you add photos, hours, and more after signup.',
            },
            {
              q: 'Is there a contract or commitment?',
              a: 'Premium and Sponsored listings are month-to-month subscriptions. Cancel anytime — your basic listing remains in the directory.',
            },
            {
              q: 'How do I claim an existing listing?',
              a: 'If your business is already in our directory, use the "Claim This Listing" button on your listing page to verify ownership.',
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
          href="/request-listing"
          className="inline-flex items-center gap-2 px-6 min-h-[48px] rounded-lg bg-gold text-background font-semibold hover:bg-gold-light transition-colors"
        >
          Start with a Free Listing
        </Link>
      </div>
    </div>
  )
}
