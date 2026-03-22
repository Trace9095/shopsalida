'use client'

import Link from 'next/link'
import { BadgeCheck, ChevronRight } from 'lucide-react'

interface ClaimBannerProps {
  shopSlug: string
  shopName: string
  isClaimed: boolean
}

export function ClaimBanner({ shopSlug, shopName, isClaimed }: ClaimBannerProps) {
  if (isClaimed) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/20 text-success text-sm">
        <BadgeCheck className="w-4 h-4 shrink-0" />
        <span>This listing has been claimed and verified by the owner.</span>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-gold/30 bg-gold/5 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-foreground font-medium text-sm mb-1">
            Is this your business?
          </p>
          <p className="text-muted text-sm">
            Claim this listing to update information, add photos, and unlock premium features.
          </p>
        </div>
        <Link
          href={`/claim/${shopSlug}`}
          className="shrink-0 inline-flex items-center gap-1.5 px-4 min-h-[44px] rounded-md bg-gold text-background text-sm font-semibold hover:bg-gold-light transition-colors"
        >
          Claim Listing
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
