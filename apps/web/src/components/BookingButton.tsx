'use client'

import { trackEvent } from '@/lib/analytics'

interface BookingButtonProps {
  href: string
  businessName: string
  className?: string
  children: React.ReactNode
}

export function BookingButton({ href, businessName, className, children }: BookingButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackEvent('book_now_click', { business: businessName, destination: 'Salida' })}
    >
      {children}
    </a>
  )
}
