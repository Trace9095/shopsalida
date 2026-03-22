import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Salida Shopping Guide — Articles & Tips'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ background: '#0A0A0F', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(248,113,113,0.15) 0%, transparent 60%)' }} />
        <p style={{ color: '#F87171', fontSize: '20px', fontWeight: 600, margin: '0 0 16px', position: 'relative', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Shop Salida Blog</p>
        <h1 style={{ fontSize: '66px', fontWeight: 700, color: '#E2E8F0', margin: '0 0 20px', lineHeight: 1.05, position: 'relative', maxWidth: '900px' }}>Salida Shopping Guide</h1>
        <p style={{ fontSize: '26px', color: '#7B7BA8', margin: 0, position: 'relative', maxWidth: '700px' }}>Insider guides to galleries, boutiques &amp; outdoor adventure in Colorado&apos;s most creative mountain town.</p>
      </div>
    ),
    { ...size }
  )
}
