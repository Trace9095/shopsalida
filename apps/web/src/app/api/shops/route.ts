import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { shops } from '@/db/schema'
import { eq, and, ilike, or } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const search = searchParams.get('q')

    let query = db.select({
      id: shops.id,
      slug: shops.slug,
      name: shops.name,
      shortDescription: shops.shortDescription,
      category: shops.category,
      tier: shops.tier,
      address: shops.address,
      phone: shops.phone,
      website: shops.website,
      heroImageUrl: shops.heroImageUrl,
      isClaimed: shops.isClaimed,
      isFeatured: shops.isFeatured,
    }).from(shops)

    const conditions = [eq(shops.isActive, true)]
    if (category) conditions.push(eq(shops.category, category))
    if (search) conditions.push(or(
      ilike(shops.name, `%${search}%`),
      ilike(shops.shortDescription, `%${search}%`)
    )!)

    const results = await query.where(and(...conditions))
    return NextResponse.json({ shops: results })
  } catch (err) {
    console.error('shops route error', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
