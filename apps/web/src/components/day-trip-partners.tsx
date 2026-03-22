import { Calendar, Phone, ExternalLink } from 'lucide-react'

const ADVENTURE_PARTNERS = [
  {
    name: 'Royal Gorge Rafting',
    tagline: "Colorado's #1 Whitewater",
    phone: '(719) 275-7238',
    href: 'https://royalgorgerafting.net',
  },
  {
    name: 'Royal Gorge Zipline',
    tagline: '1,200 Ft Above the Gorge',
    phone: '(719) 275-7238',
    href: 'https://royalgorgeziplinetours.com',
  },
  {
    name: 'RG Vacation Rentals',
    tagline: 'Airstreams & Yurts',
    phone: '(719) 275-7238',
    href: 'https://royalgorgevacationrentals.com',
  },
]

export function DayTripPartners() {
  return (
    <div className="mt-16 rounded-xl bg-surface border border-border overflow-hidden">
      <div className="px-6 pt-6 pb-4 border-b border-border">
        <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-1">Featured Partners</p>
        <p className="text-foreground text-lg font-bold">Day Trip from Salida</p>
        <p className="text-muted text-sm mt-1">
          Take the scenic drive east on US-50 to the Royal Gorge — world-class rafting, ziplines, and glamping just 45 minutes away.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        {ADVENTURE_PARTNERS.map((partner) => (
          <div key={partner.name} className="p-5 flex flex-col gap-3">
            <div>
              <p className="text-foreground font-semibold text-sm">{partner.name}</p>
              <p className="text-muted text-xs mt-0.5">{partner.tagline}</p>
            </div>
            <div className="flex gap-2 mt-auto">
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 min-h-[44px] rounded-lg bg-gold text-background text-xs font-semibold hover:bg-gold-light transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book Now
              </a>
              <a
                href={`tel:${partner.phone.replace(/[^0-9]/g, '')}`}
                className="flex items-center justify-center gap-1 px-3 min-h-[44px] rounded-lg border border-border text-muted hover:text-foreground hover:border-gold/40 transition-colors text-xs"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                {partner.phone}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1">
          <p className="text-foreground text-sm font-medium">Canon City dining after the adventure</p>
          <p className="text-muted text-xs">
            Whitewater Bar &amp; Grill (719) 269-1009 &bull; Whitewater Rooftop Social (719) 451-7241
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <a
            href="https://whitewaterbar.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 min-h-[44px] rounded-lg border border-border text-muted hover:text-gold hover:border-gold/40 text-xs transition-colors"
          >
            WWBG <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://wwrooftopsocial.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 min-h-[44px] rounded-lg border border-border text-muted hover:text-gold hover:border-gold/40 text-xs transition-colors"
          >
            Rooftop Social <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
