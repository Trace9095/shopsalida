import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { admins } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { setAdminSessionCookie } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET ?? 'changeme-32-chars-minimum-secret!')

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    const [admin] = await db.select().from(admins).where(eq(admins.email, email.toLowerCase())).limit(1)
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const valid = await bcrypt.compare(password, admin.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await new SignJWT({ sub: admin.id, email: admin.email, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .sign(JWT_SECRET)

    await setAdminSessionCookie(token)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('admin/auth error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
