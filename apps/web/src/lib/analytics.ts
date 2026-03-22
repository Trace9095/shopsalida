declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

type EventName =
  | 'claim_listing'
  | 'book_now_click'
  | 'listing_purchase'
  | 'contact_form_submit'
  | 'page_view'

type EventParams = Record<string, string | number | boolean | undefined>

export function trackEvent(name: EventName, params?: EventParams): void {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}

// Google Ads conversion tracking (optional)
export function trackConversion(conversionId: string, params?: EventParams): void {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'conversion', {
    send_to: conversionId,
    ...params,
  })
}
