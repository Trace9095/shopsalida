import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// Shopping bag favicon — SVG path, Satori-compatible (no clipPath)
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#7C3AED',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
          {/* Handle (U-shape arc) */}
          <path
            d="M6 9 L6 6 Q6 2 10 2 Q14 2 14 6 L14 9"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Bag body */}
          <rect x="2" y="8" width="16" height="13" rx="2" fill="white" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
