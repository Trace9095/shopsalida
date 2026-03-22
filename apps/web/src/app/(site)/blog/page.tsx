export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { db } from '@/lib/db'
import { blogPosts } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { Calendar, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Salida Shopping Guide — Articles & Tips',
  description:
    'Expert guides to shopping, galleries, and exploring the Salida Creative District in Colorado. Discover the best shops, artisans, and hidden gems in downtown Salida.',
}

export default async function BlogPage() {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.isPublished, true))
    .orderBy(desc(blogPosts.publishedAt))

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-foreground mb-2">Salida Shopping Guide</h1>
        <p className="text-muted leading-relaxed">
          Insider guides to galleries, boutiques, artisans, and outdoor gear in
          Colorado&apos;s most creative mountain town.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group block rounded-xl bg-surface border border-border p-6 hover:border-gold/40 hover:bg-surface-hover transition-all"
            >
              <div className="flex items-center gap-2 text-xs text-muted mb-3">
                <Calendar className="w-3 h-3" />
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'Salida Guide'}
              </div>
              <h2 className="text-foreground font-bold text-xl mb-2 group-hover:text-gold transition-colors">
                {post.title}
              </h2>
              <p className="text-muted leading-relaxed mb-4">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-gold text-sm font-medium group-hover:gap-2 transition-all">
                Read article <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted text-center py-12">
          Articles coming soon — check back shortly.
        </p>
      )}

      {/* Cross-link */}
      <div className="mt-16 rounded-xl bg-surface border border-border p-6 text-center">
        <p className="text-muted text-sm mb-2">After shopping in Salida, take the scenic drive east.</p>
        <p className="text-foreground font-semibold mb-4">Royal Gorge is just 45 minutes east of downtown Salida on US-50.</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a href="https://royalgorgerafting.net" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors min-h-[44px] flex items-center">
            Royal Gorge Rafting →
          </a>
          <a href="https://royalgorgeziplinetours.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors min-h-[44px] flex items-center">
            Zipline Tours →
          </a>
          <a href="https://epicadventures.co" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-light transition-colors min-h-[44px] flex items-center">
            Epic Adventures →
          </a>
        </div>
      </div>
    </div>
  )
}
