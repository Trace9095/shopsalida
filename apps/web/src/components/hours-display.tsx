import type { ShopHours } from '@/db/schema'

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function formatTime(t: string | null): string {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  const ampm = h! >= 12 ? 'PM' : 'AM'
  const hour = h! % 12 || 12
  return m === 0 ? `${hour} ${ampm}` : `${hour}:${String(m).padStart(2, '0')} ${ampm}`
}

interface HoursDisplayProps {
  hours: ShopHours[]
}

export function HoursDisplay({ hours }: HoursDisplayProps) {
  if (!hours.length) return null

  const today = new Date().getDay()
  const sorted = [...hours].sort((a, b) => a.dayOfWeek - b.dayOfWeek)

  return (
    <div>
      <h3 className="text-foreground font-semibold mb-3">Hours</h3>
      <div className="space-y-1.5">
        {sorted.map((h) => {
          const isToday = h.dayOfWeek === today
          return (
            <div
              key={h.id}
              className={`flex justify-between text-sm py-1 px-2 rounded ${
                isToday ? 'bg-gold/10 text-gold font-medium' : 'text-muted'
              }`}
            >
              <span>{DAY_NAMES[h.dayOfWeek]}</span>
              <span>
                {h.isClosed
                  ? 'Closed'
                  : h.openTime && h.closeTime
                  ? `${formatTime(h.openTime)} – ${formatTime(h.closeTime)}`
                  : 'Hours vary'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
