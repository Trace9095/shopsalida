import { db } from '@/lib/db'
import { blogPosts } from '@/db/schema'
import { desc } from 'drizzle-orm'
import Link from 'next/link'
import { BookOpen, CheckCircle, XCircle, Calendar } from 'lucide-react'

export default async function AdminBlogPage() {
  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-muted text-sm mt-1">{posts.length} articles</p>
        </div>
      </div>

      <div className="rounded-xl bg-surface border border-border overflow-hidden">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-8 h-8 text-muted mx-auto mb-2" />
            <p className="text-muted">No blog posts yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <div key={post.id} className="flex items-start justify-between gap-4 px-4 py-4 hover:bg-surface-hover transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-semibold text-foreground truncate">{post.title}</h2>
                    {post.isPublished
                      ? <CheckCircle className="w-4 h-4 text-success shrink-0" />
                      : <XCircle className="w-4 h-4 text-muted shrink-0" />
                    }
                  </div>
                  <p className="text-muted text-sm truncate">{post.excerpt}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted">
                    <span className="font-mono">/blog/{post.slug}</span>
                    {post.publishedAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="text-violet hover:text-violet-light text-sm transition-colors min-h-[44px] flex items-center px-2 shrink-0"
                >
                  View →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 rounded-xl bg-violet/5 border border-violet/20 p-4">
        <p className="text-sm text-muted">
          Blog posts are managed via the <code className="text-violet bg-violet/10 px-1 py-0.5 rounded text-xs">seed.ts</code> script.
          Run <code className="text-violet bg-violet/10 px-1 py-0.5 rounded text-xs">npx tsx scripts/seed.ts</code> to refresh content.
        </p>
      </div>
    </div>
  )
}
