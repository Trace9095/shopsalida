import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'List Your Salida Business — Pricing Plans'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ background: '#0A0A0F', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse at 60% 50%, rgba(45,212,191,0.18) 0%, transparent 55%)' }} />
        <p style={{ color: '#2DD4BF', fontSize: '20px', fontWeight: 600, margin: '0 0 16px', position: 'relative', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Shop Salida</p>
        <h1 style={{ fontSize: '64px', fontWeight: 700, color: '#E2E8F0', margin: '0 0 24px', lineHeight: 1.05, position: 'relative' }}>List Your Business</h1>
        <div style={{ display: 'flex', gap: '20px', position: 'relative' }}>
          {[{ label: 'Free', price: '$0', color: '#7B7BA8' }, { label: 'Premium', price: '$99', color: '#9B67F5' }, { label: 'Sponsored', price: '$199', color: '#2DD4BF' }].map(({ label, price, color }) => (
            <div key={label} style={{ flex: 1, padding: '24px', borderRadius: '16px', border: `1px solid ${color}40`, background: `${color}08`, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ color, fontSize: '16px', fontWeight: 600, margin: 0 }}>{label}</p>
              <p style={{ color: '#E2E8F0', fontSize: '40px', fontWeight: 700, margin: 0 }}>{price}<span style={{ fontSize: '18px', color: '#7B7BA8' }}>/mo</span></p>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
