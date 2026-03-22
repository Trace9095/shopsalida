import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { magicLinkTokens } from '@/db/schema'
import { getResend } from '@/lib/resend'
import { randomBytes, createHash } from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Generate token
    const token = randomBytes(32).toString('hex')
    const tokenHash = createHash('sha256').update(token).digest('hex')
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000) // 30 min

    await db.insert(magicLinkTokens).values({
      email: normalizedEmail,
      tokenHash,
      expiresAt,
    })

    const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'https://shopsalida.com'
    const magicLink = `${baseUrl}/auth/verify?token=${token}`

    const resend = getResend()
    await resend.emails.send({
      from: 'Shop Salida <hello@shopsalida.com>',
      to: normalizedEmail,
      subject: 'Sign in to Shop Salida',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
          <div style="margin-bottom: 24px;">
            <h1 style="font-size: 20px; font-weight: 700; color: #E2E8F0; margin: 0 0 4px;">Shop Salida</h1>
            <p style="font-size: 13px; color: #7B7BA8; margin: 0;">Salida, Colorado&apos;s Creative District Directory</p>
          </div>
          <p style="font-size: 16px; color: #E2E8F0; margin: 0 0 24px;">Click the button below to sign in:</p>
          <a href="${magicLink}" style="display: inline-block; background: #7C3AED; color: #fff; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 15px;">Sign In to Shop Salida</a>
          <p style="font-size: 13px; color: #7B7BA8; margin: 24px 0 0;">This link expires in 30 minutes. If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    })

    // CEO notification
    if (process.env.RESEND_CEO_EMAIL) {
      await resend.emails.send({
        from: 'Shop Salida <hello@shopsalida.com>',
        to: process.env.RESEND_CEO_EMAIL,
        subject: `New sign-in: ${normalizedEmail}`,
        html: `<p>New magic link requested for <strong>${normalizedEmail}</strong>.</p>`,
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('auth/login error', err)
    return NextResponse.json({ error: 'Failed to send magic link' }, { status: 500 })
  }
}
