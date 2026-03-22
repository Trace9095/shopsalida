import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { shops } from '@/db/schema'
import { eq } from 'drizzle-orm'

interface Props {
  params: Promise<{ slug: string }>
}

export async function GET(_req: NextRequest, { params }: Props) {
  const { slug } = await params
  try {
    const [shop] = await db.select({
      name: shops.name,
      category: shops.category,
      address: shops.address,
    }).from(shops).where(eq(shops.slug, slug)).limit(1)

    if (!shop) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ shop })
  } catch (err) {
    console.error('shops/[slug] error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
