import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Shop Directory — Salida, Colorado Creative District'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '64px',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse at 60% 40%, rgba(45,212,191,0.2) 0%, transparent 55%), radial-gradient(ellipse at 20% 70%, rgba(124,58,237,0.2) 0%, transparent 50%)' }} />
        <p style={{ color: '#2DD4BF', fontSize: '20px', fontWeight: 600, margin: '0 0 16px', position: 'relative', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Shop Salida</p>
        <h1 style={{ fontSize: '72px', fontWeight: 700, color: '#E2E8F0', margin: '0 0 20px', lineHeight: 1.05, position: 'relative', maxWidth: '900px' }}>
          Shop Directory
        </h1>
        <p style={{ fontSize: '28px', color: '#7B7BA8', margin: '0 0 40px', position: 'relative' }}>
          Discover every gallery, boutique &amp; artisan in downtown Salida, CO
        </p>
        <div style={{ display: 'flex', gap: '16px', position: 'relative' }}>
          {['Art Galleries', 'Boutiques', 'Outdoor Gear', 'Vintage', 'Jewelry'].map((cat) => (
            <div key={cat} style={{ padding: '8px 18px', borderRadius: '999px', border: '1px solid rgba(45,212,191,0.3)', background: 'rgba(45,212,191,0.06)', color: '#2DD4BF', fontSize: '15px' }}>{cat}</div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
