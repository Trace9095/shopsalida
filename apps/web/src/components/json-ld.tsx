import type { Shop, ShopHours } from '@/db/schema'

const DAY_MAP: Record<number, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
}

interface LocalBusinessJsonLdProps {
  shop: Shop
  hours?: ShopHours[]
  url: string
}

export function LocalBusinessJsonLd({ shop, hours = [], url }: LocalBusinessJsonLdProps) {
  const openingHours = hours
    .filter((h) => !h.isClosed && h.openTime && h.closeTime)
    .map((h) => `${DAY_MAP[h.dayOfWeek]} ${h.openTime}-${h.closeTime}`)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: shop.name,
    description: shop.description || shop.shortDescription,
    url: shop.website || url,
    telephone: shop.phone ?? undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: shop.address,
      addressLocality: shop.city,
      addressRegion: shop.state,
      postalCode: shop.zip,
      addressCountry: 'US',
    },
    ...(openingHours.length > 0 && { openingHours }),
    ...(shop.heroImageUrl && { image: shop.heroImageUrl }),
    ...(shop.instagramHandle && {
      sameAs: [`https://instagram.com/${shop.instagramHandle}`],
    }),
  }

  // JSON.stringify of internal schema data — no user input, safe for JSON-LD injection
  const jsonString = JSON.stringify(schema)

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data from internal schema only, no user input
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  )
}

export function WebsiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shop Salida',
    description:
      "Colorado's largest Creative District shopping guide — galleries, boutiques, outdoor gear, and artisan makers in downtown Salida, CO.",
    url: 'https://shopsalida.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://shopsalida.com/directory?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  const jsonString = JSON.stringify(schema)

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static schema data
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  )
}

export function FaqJsonLd() {
  const faqs = [
    {
      q: "What is the Salida Creative District?",
      a: "The Salida Creative District is Colorado's largest Colorado Creative Industries Certified Creative District, with over 100 working artists and 50+ arts businesses in walkable downtown Salida, Colorado.",
    },
    {
      q: "What are the best galleries in downtown Salida?",
      a: "Downtown Salida has dozens of galleries including Absolute Gallery, The Decker Gallery, Artyard Gallery, and Spirit of the Rockies — all within walking distance on F Street.",
    },
    {
      q: "When is the Salida ArtWalk?",
      a: "The Salida ArtWalk is held the first full weekend of June, July, August, and September. FIRSTfriday gallery openings also happen monthly year-round.",
    },
    {
      q: "How do I list my Salida business on Shop Salida?",
      a: "Submit your business through our Request a Listing page. Premium listings start at $99/mo and Sponsored listings at $199/mo, with enhanced profiles and priority placement.",
    },
    {
      q: "Is parking available in downtown Salida?",
      a: "Yes — downtown Salida has free street parking along F Street and surrounding blocks, plus a public parking lot near Riverside Park. The entire downtown is very walkable once parked.",
    },
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  const jsonString = JSON.stringify(schema)

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static FAQ data
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  )
}
