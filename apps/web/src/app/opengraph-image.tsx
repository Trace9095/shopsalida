import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Shop Salida — Colorado\'s Creative District Directory'
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
          justifyContent: 'flex-end',
          padding: '64px',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at 70% 30%, rgba(124,58,237,0.25) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(45,212,191,0.15) 0%, transparent 50%)',
          }}
        />
        {/* Grid lines */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(rgba(42,42,61,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(42,42,61,0.4) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Logo mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', position: 'relative' }}>
          <div style={{
            width: '48px', height: '48px',
            background: 'rgba(124,58,237,0.15)',
            border: '1px solid rgba(124,58,237,0.4)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ width: '24px', height: '24px', background: '#7C3AED', borderRadius: '50%' }} />
          </div>
          <span style={{ color: '#7B7BA8', fontSize: '18px', fontWeight: 500 }}>shopsalida.com</span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontSize: '68px',
            fontWeight: 700,
            color: '#E2E8F0',
            margin: '0 0 16px',
            lineHeight: 1.05,
            position: 'relative',
            maxWidth: '800px',
          }}
        >
          Shop Salida
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontSize: '28px',
            color: '#7B7BA8',
            margin: '0 0 32px',
            position: 'relative',
            maxWidth: '700px',
          }}
        >
          Colorado&apos;s Creative District — 100+ galleries, boutiques &amp; artisans
        </p>

        {/* Badges */}
        <div style={{ display: 'flex', gap: '12px', position: 'relative' }}>
          {['Art Galleries', 'Boutiques', 'Outdoor Gear', 'Jewelry', 'Vintage'].map((label) => (
            <div
              key={label}
              style={{
                padding: '8px 16px',
                border: '1px solid rgba(124,58,237,0.35)',
                borderRadius: '999px',
                background: 'rgba(124,58,237,0.08)',
                color: '#9B67F5',
                fontSize: '15px',
                fontWeight: 500,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
