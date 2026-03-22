import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { addListingRequests } from '@/db/schema'
import { getResend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { businessName, ownerName, email, phone, address, website, category, tier, message } = body

    if (!businessName || !email || !category) {
      return NextResponse.json({ error: 'Business name, email, and category are required' }, { status: 400 })
    }

    await db.insert(addListingRequests).values({
      businessName: businessName.trim(),
      ownerName: ownerName?.trim() ?? '',
      email: email.toLowerCase().trim(),
      phone: phone?.trim() ?? '',
      address: address?.trim() ?? '',
      website: website?.trim() ?? '',
      category,
      tier: tier ?? 'premium',
      message: message?.trim() ?? '',
    })

    const resend = getResend()

    // Confirmation to submitter
    await resend.emails.send({
      from: 'Shop Salida <hello@shopsalida.com>',
      to: email.toLowerCase().trim(),
      subject: `Listing request received — ${businessName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
          <h1 style="font-size: 20px; font-weight: 700; color: #E2E8F0; margin: 0 0 16px;">We received your request!</h1>
          <p style="color: #E2E8F0;">Thanks for submitting <strong>${businessName}</strong> to the Shop Salida directory. Our team will review and reach out within 2 business days.</p>
          <p style="color: #7B7BA8; font-size: 13px; margin-top: 24px;">Questions? Reply to this email or visit <a href="https://shopsalida.com" style="color: #7C3AED;">shopsalida.com</a></p>
        </div>
      `,
    })

    // CEO notification
    if (process.env.RESEND_CEO_EMAIL) {
      await resend.emails.send({
        from: 'Shop Salida <hello@shopsalida.com>',
        to: process.env.RESEND_CEO_EMAIL,
        subject: `New listing request: ${businessName} (${tier ?? 'premium'})`,
        html: `
          <p><strong>Business:</strong> ${businessName}</p>
          <p><strong>Owner:</strong> ${ownerName ?? 'N/A'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone ?? 'N/A'}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Tier:</strong> ${tier ?? 'free'}</p>
          <p><strong>Address:</strong> ${address ?? 'N/A'}</p>
          <p><strong>Website:</strong> ${website ?? 'N/A'}</p>
          <p><strong>Message:</strong> ${message ?? 'N/A'}</p>
        `,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('listings/request error', err)
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
  }
}
