import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { claimRequests } from '@/db/schema'
import { getResend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const { slug, name, email, phone, business, message } = await req.json()
    if (!slug || !name || !email) {
      return NextResponse.json({ error: 'slug, name, and email required' }, { status: 400 })
    }

    await db.insert(claimRequests).values({
      shopSlug: slug,
      claimantName: name.trim(),
      claimantEmail: email.toLowerCase().trim(),
      claimantPhone: phone?.trim() ?? '',
      role: business?.trim() ?? '',
      message: message?.trim() ?? '',
    })

    const resend = getResend()

    if (process.env.RESEND_CEO_EMAIL) {
      await resend.emails.send({
        from: 'Shop Salida <hello@shopsalida.com>',
        to: process.env.RESEND_CEO_EMAIL,
        subject: `New claim request: ${slug} from ${name}`,
        html: `
          <p><strong>Listing:</strong> ${slug}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone ?? 'N/A'}</p>
          <p><strong>Role:</strong> ${business ?? 'N/A'}</p>
          <p><strong>Message:</strong> ${message ?? 'N/A'}</p>
        `,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('claims error', err)
    return NextResponse.json({ error: 'Failed to submit claim' }, { status: 500 })
  }
}
