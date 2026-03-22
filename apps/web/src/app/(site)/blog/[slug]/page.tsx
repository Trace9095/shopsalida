export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import { blogPosts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react'
import { DayTripPartners } from '@/components/day-trip-partners'

const APP_URL = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://shopsalida.com'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1)
  if (!post) return {}
  return {
    title: post.title,
    description: post.metaDescription ?? post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, url: `${APP_URL}/blog/${post.slug}` },
    alternates: { canonical: `${APP_URL}/blog/${post.slug}` },
  }
}

function renderMarkdown(content: string): string {
  return content.split('\n').map((line) => {
    if (line.startsWith('# ')) return `<h1 class="text-3xl font-bold text-foreground mt-8 mb-4">${line.slice(2)}</h1>`
    if (line.startsWith('## ')) return `<h2 class="text-2xl font-bold text-foreground mt-8 mb-3">${line.slice(3)}</h2>`
    if (line.startsWith('### ')) return `<h3 class="text-xl font-semibold text-foreground mt-6 mb-2">${line.slice(4)}</h3>`
    if (line.startsWith('- ')) return `<li class="text-muted leading-relaxed ml-4 list-disc">${line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`
    if (line === '') return '<br />'
    return `<p class="text-muted leading-relaxed mb-4">${line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')}</p>`
  }).join('')
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1)
  if (!post || !post.isPublished) notFound()
  const html = renderMarkdown(post.content)
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-muted hover:text-foreground text-sm mb-8 transition-colors min-h-[44px]">
        <ArrowLeft className="w-4 h-4" /> Back to Guide
      </Link>
      <article>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => <span key={tag} className="text-xs px-2 py-0.5 rounded bg-surface border border-border text-muted">{tag}</span>)}
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-3 text-xs text-muted mb-8 pb-6 border-b border-border">
          <Calendar className="w-3 h-3" />
          {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}
          <span>·</span><span>{post.authorName}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <DayTripPartners />
      <div className="mt-8 text-center">
        <Link href="/directory" className="inline-flex items-center gap-2 px-5 min-h-[44px] rounded-lg bg-gold text-background text-sm font-semibold hover:bg-gold-light transition-colors">Browse the Directory</Link>
      </div>
    </div>
  )
}
