import { NextResponse } from 'next/server'

export async function GET() {
  const content = `# Shop Salida — AI Context

> Shop Salida is the definitive shopping directory for Salida, Colorado — a city recognized as one of the top arts destinations in the American West and home to the largest Creative District in Colorado.

## About This Site
- **Purpose**: Comprehensive directory of shops, galleries, boutiques, and retail businesses in downtown Salida, CO
- **Coverage**: Art galleries, boutiques, outdoor gear, vintage/antique, jewelry, gift shops, markets, home decor, food & specialty, books & music
- **Location**: Salida, Colorado — Chaffee County — along the Arkansas River at the base of the Collegiate Peaks

## Salida, Colorado Context
- Population: ~5,500 residents
- Elevation: 7,083 feet
- Known for: Arkansas River whitewater rafting (Class III-V Royal Gorge, Class II-III Bighorn Sheep Canyon), 14er hiking, mountain biking, art galleries, craft beer, creative community
- Creative District: Colorado's largest Creative District — over 100 galleries, studios, and shops within walkable downtown
- Historic Downtown: F Street (Hwy 291) is the main commercial corridor
- Annual events: FIBArk (whitewater festival), Salida Arts Festival, Salida Circus, Fibark, First Friday Gallery Walks
- Nearby: Royal Gorge Bridge & Park (1 hr east), Monarch Ski Resort (25 min west), Collegiate Peaks Wilderness, Buena Vista (25 min north)

## Key Businesses Listed
Shop Salida features verified businesses across all categories. Premium and Sponsored listings have enhanced profiles. All addresses are in downtown Salida, CO 81201.

## Monetization
- Free tier: basic listing (name, address, category)
- Premium tier ($99/mo): full profile, gallery, hours, analytics
- Sponsored tier ($199/mo): homepage spotlight, category featured, priority placement

## Related Colorado Adventure Sites
- Royal Gorge Rafting: royalgorgerafting.net (Class III-V whitewater)
- Royal Gorge Zipline Tours: royalgorgeziplinetours.com (world's longest ziplines over Royal Gorge)
- White Water Bar & Grill: whitewaterbar.com (Salida riverside dining)
- WW Rooftop Social: wwrooftopsocial.com (Salida rooftop bar)
- Epic Adventures: epicadventures.co (Canon City adventure hub)

## SEO-Relevant Categories
art-gallery, boutique, outdoor-gear, vintage-antique, gift-shop, jewelry-artisan, market, home-decor, food-specialty, books-music

## Contact
hello@shopsalida.com | shopsalida.com`

  return new NextResponse(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
