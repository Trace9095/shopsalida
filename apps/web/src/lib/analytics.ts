import { track } from '@vercel/analytics'

function gaEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag
  if (gtag) {
    gtag('event', eventName, params)
  }
}

export function trackListingView(listingId: string, businessName: string, category: string) {
  track('listing_view', { listing_id: listingId, name: businessName, category })
  gaEvent('listing_view', { item_id: listingId, item_name: businessName, item_category: category })
}

export function trackListingClickPhone(listingId: string, businessName: string) {
  track('listing_click_phone', { listing_id: listingId, name: businessName })
  gaEvent('listing_click_phone', { item_id: listingId, item_name: businessName, contact_method: 'phone' })
}

export function trackListingClickWebsite(listingId: string, businessName: string, url: string) {
  track('listing_click_website', { listing_id: listingId, name: businessName, url })
  gaEvent('listing_click_website', { item_id: listingId, item_name: businessName, link_url: url })
}

export function trackListingClickDirections(listingId: string, businessName: string) {
  track('listing_click_directions', { listing_id: listingId, name: businessName })
  gaEvent('listing_click_directions', { item_id: listingId, item_name: businessName, contact_method: 'directions' })
}

export function trackListingClaim(businessName: string) {
  track('listing_claim', { name: businessName })
  gaEvent('listing_claim', { item_name: businessName })
}

export function trackListingPurchase(listingId: string, businessName: string, tier: string, value: number) {
  track('listing_purchase', { listing_id: listingId, name: businessName, tier })
  gaEvent('purchase', {
    transaction_id: `listing_${listingId}_${Date.now()}`,
    value,
    currency: 'USD',
    items: [{ item_id: listingId, item_name: businessName, item_category: tier, price: value, quantity: 1 }],
  })
}

export function trackCategorySearch(category: string) {
  track('category_search', { category })
  gaEvent('category_search', { search_category: category })
}

export function trackSearchQuery(query: string) {
  track('search_query', { query })
  gaEvent('search', { search_term: query })
}

export function trackCTA(name: string, props?: Record<string, string>) {
  track('cta_click', { name, ...props })
  gaEvent('cta_click', { cta_name: name, cta_source: props?.source || 'unknown' })
}

export function trackFormSubmit(formName: string) {
  track('form_submit', { form: formName })
  gaEvent('form_submit', { form_name: formName })
}

export function trackPhoneCall(source: string) {
  track('phone_call', { source })
  gaEvent('phone_call', { call_source: source })
}

export function trackExternalLink(name: string, url: string) {
  track('external_link', { name, url })
  gaEvent('external_link', { link_name: name, link_url: url })
}

export function trackScrollDepth(depth: number, page: string) {
  track('scroll_depth', { depth: String(depth), page })
  gaEvent('scroll_depth', { scroll_percentage: depth, page_path: page })
}

export function trackPageEngagement(page: string, timeOnPage: number) {
  track('page_engagement', { page, seconds: String(timeOnPage) })
  gaEvent('page_engagement', { page_path: page, engagement_time: timeOnPage })
}
