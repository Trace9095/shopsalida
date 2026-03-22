import { ImageResponse } from 'next/og'
import { db } from '@/lib/db'
import { blogPosts } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const dynamic = 'force-dynamic'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function OG({ params }: Props) {
  const { slug } = await params
  const [post] = await db.select({ title: blogPosts.title, excerpt: blogPosts.excerpt }).from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1)

  return new ImageResponse(
    (
      <div style={{ background: '#0A0A0F', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '64px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse at 40% 30%, rgba(124,58,237,0.2) 0%, transparent 55%)' }} />
        <p style={{ color: '#7B7BA8', fontSize: '18px', margin: '0 0 16px', position: 'relative' }}>Shop Salida · Salida Shopping Guide</p>
        <h1 style={{ fontSize: '58px', fontWeight: 700, color: '#E2E8F0', margin: '0 0 20px', lineHeight: 1.1, position: 'relative', maxWidth: '900px' }}>
          {post?.title ?? 'Salida Shopping Guide'}
        </h1>
        {post?.excerpt && (
          <p style={{ fontSize: '22px', color: '#7B7BA8', margin: '0 0 32px', position: 'relative', maxWidth: '750px', lineHeight: 1.4 }}>
            {post.excerpt.slice(0, 120)}{post.excerpt.length > 120 ? '...' : ''}
          </p>
        )}
        <p style={{ color: '#9B67F5', fontSize: '18px', margin: 0, position: 'relative' }}>shopsalida.com/blog</p>
      </div>
    ),
    { ...size }
  )
}
