import { ImageResponse } from 'next/og'
import { db } from '@/lib/db'
import { shops } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateImageMetadata({ params }: Props) {
  const { slug } = await params
  const [shop] = await db.select({ name: shops.name }).from(shops).where(eq(shops.slug, slug)).limit(1)
  return [{ id: slug, alt: shop ? `${shop.name} — Shop Salida` : 'Shop Salida Listing' }]
}

export default async function OG({ params }: Props) {
  const { slug } = await params
  const [shop] = await db.select({
    name: shops.name,
    category: shops.category,
    address: shops.address,
    tier: shops.tier,
    shortDescription: shops.shortDescription,
  }).from(shops).where(eq(shops.slug, slug)).limit(1)

  const name = shop?.name ?? 'Salida Business'
  const category = shop?.category?.replace(/-/g, ' ') ?? 'shop'
  const description = shop?.shortDescription ?? 'A great shop in Salida\'s Creative District'
  const isFeatured = shop?.tier === 'sponsored' || shop?.tier === 'premium'

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '64px',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse at 70% 20%, rgba(124,58,237,0.3) 0%, transparent 55%)' }} />

        {isFeatured && (
          <div style={{
            position: 'absolute', top: '40px', right: '64px',
            padding: '8px 20px', borderRadius: '999px',
            background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.4)',
            color: '#9B67F5', fontSize: '16px', fontWeight: 600,
          }}>
            {shop?.tier === 'sponsored' ? 'Sponsored' : 'Premium'} Listing
          </div>
        )}

        <p style={{ color: '#7B7BA8', fontSize: '18px', margin: '0 0 12px', position: 'relative', textTransform: 'capitalize', letterSpacing: '0.04em' }}>
          Shop Salida · {category}
        </p>
        <h1 style={{ fontSize: '68px', fontWeight: 700, color: '#E2E8F0', margin: '0 0 20px', lineHeight: 1.05, position: 'relative', maxWidth: '850px' }}>
          {name}
        </h1>
        <p style={{ fontSize: '24px', color: '#7B7BA8', margin: '0 0 32px', position: 'relative', maxWidth: '750px', lineHeight: 1.4 }}>
          {description}
        </p>
        <p style={{ color: '#2DD4BF', fontSize: '18px', margin: 0, position: 'relative' }}>shopsalida.com</p>
      </div>
    ),
    { ...size }
  )
}
