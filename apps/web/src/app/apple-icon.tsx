import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: 'linear-gradient(135deg, #7C3AED 0%, #2DD4BF 100%)',
          borderRadius: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '50% 50% 0 0 / 60% 60% 0 0', position: 'relative' }} />
          <div style={{ width: '8px', height: '24px', background: 'white', borderRadius: '4px' }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
