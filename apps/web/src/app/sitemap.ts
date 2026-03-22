import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { shops, blogPosts } from '@/db/schema'
import { eq } from 'drizzle-orm'

const BASE = 'https://shopsalida.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [activeShops, publishedPosts] = await Promise.all([
    db.select({ slug: shops.slug, updatedAt: shops.updatedAt }).from(shops).where(eq(shops.isActive, true)),
    db.select({ slug: blogPosts.slug, publishedAt: blogPosts.publishedAt }).from(blogPosts).where(eq(blogPosts.isPublished, true)),
  ])

  const static_pages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/directory`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/request-listing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    // Category pages
    { url: `${BASE}/directory?category=art-gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/directory?category=boutique`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/directory?category=outdoor-gear`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/directory?category=vintage-antique`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/directory?category=jewelry-artisan`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/directory?category=gift-shop`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE}/directory?category=home-decor`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE}/directory?category=market`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
  ]

  const shop_pages: MetadataRoute.Sitemap = activeShops.map(({ slug, updatedAt }) => ({
    url: `${BASE}/directory/${slug}`,
    lastModified: updatedAt ?? new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const blog_pages: MetadataRoute.Sitemap = publishedPosts.map(({ slug, publishedAt }) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: publishedAt ?? new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...static_pages, ...shop_pages, ...blog_pages]
}
