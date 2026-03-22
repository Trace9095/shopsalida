import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { magicLinkTokens, users } from '@/db/schema'
import { eq, and, gt } from 'drizzle-orm'
import { createUserSession, setUserSessionCookie } from '@/lib/auth'
import { createHash } from 'crypto'

interface Props {
  searchParams: Promise<{ token?: string }>
}

export default async function VerifyPage({ searchParams }: Props) {
  const { token } = await searchParams
  if (!token) redirect('/auth/login')

  const tokenHash = createHash('sha256').update(token).digest('hex')

  const [row] = await db
    .select()
    .from(magicLinkTokens)
    .where(
      and(
        eq(magicLinkTokens.tokenHash, tokenHash),
        gt(magicLinkTokens.expiresAt, new Date())
      )
    )
    .limit(1)

  if (!row || row.usedAt) {
    return (
      <div className="min-h-[80dvh] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-destructive text-lg font-semibold mb-2">Invalid or expired link</p>
          <p className="text-muted text-sm mb-4">This sign-in link has already been used or has expired.</p>
          <a href="/auth/login" className="text-gold hover:text-gold-light text-sm transition-colors">
            Request a new link
          </a>
        </div>
      </div>
    )
  }

  // Mark token used
  await db
    .update(magicLinkTokens)
    .set({ usedAt: new Date() })
    .where(eq(magicLinkTokens.id, row.id))

  // Upsert user
  const existing = await db.select().from(users).where(eq(users.email, row.email)).limit(1)
  let userId: string

  if (existing.length > 0) {
    userId = existing[0]!.id
  } else {
    const [newUser] = await db.insert(users).values({ email: row.email }).returning({ id: users.id })
    userId = newUser!.id
  }

  const sessionToken = await createUserSession({ userId, email: row.email, isAdmin: false })
  await setUserSessionCookie(sessionToken)
  redirect('/dashboard')
}
