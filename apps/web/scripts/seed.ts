/**
 * seed.ts — Seeds the Shop Salida database with admin user and Salida shops.
 * Run with: DATABASE_URL=... npx tsx scripts/seed.ts
 */
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import * as schema from '../src/db/schema'

async function main() {
  const DATABASE_URL = process.env['DATABASE_URL']
  if (!DATABASE_URL) throw new Error('DATABASE_URL environment variable is required')

  const db = drizzle(neon(DATABASE_URL), { schema })

  // ── Admin ──────────────────────────────────────────────────────────────────
  const ADMIN_EMAIL = 'CEO@epicai.ai'
  const ADMIN_PASSWORD = 'Trace87223!'
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10)

  const existingAdmin = await db
    .select()
    .from(schema.admins)
    .where(eq(schema.admins.email, ADMIN_EMAIL))
    .limit(1)

  if (existingAdmin.length > 0) {
    await db
      .update(schema.admins)
      .set({ passwordHash, name: 'Trace Hildebrand', updatedAt: new Date() })
      .where(eq(schema.admins.email, ADMIN_EMAIL))
    console.log('✓ Updated admin:', ADMIN_EMAIL)
  } else {
    await db.insert(schema.admins).values({
      email: ADMIN_EMAIL,
      name: 'Trace Hildebrand',
      passwordHash,
    })
    console.log('✓ Created admin:', ADMIN_EMAIL)
  }

  // ── Salida Shops ───────────────────────────────────────────────────────────
  const shopData: (typeof schema.shops.$inferInsert)[] = [
    // ── Art Galleries ──────────────────────────────────────────────────────
    {
      slug: 'absolute-gallery',
      name: 'Absolute Gallery',
      shortDescription: 'Fine art gallery in the heart of Salida\'s Creative District.',
      description:
        'Absolute Gallery showcases exceptional contemporary fine art by regional and national artists. ' +
        'Located in historic downtown Salida, the gallery features rotating exhibitions of paintings, ' +
        'sculpture, and mixed media work year-round. Part of the Salida Creative District — ' +
        'Colorado\'s largest certified creative district.',
      category: 'art-gallery',
      tier: 'sponsored',
      address: '228 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 539-7810',
      website: 'https://absolutegallery.net',
      tags: ['fine art', 'contemporary', 'paintings', 'sculpture', 'creative district'],
      isFeatured: true,
      isClaimed: true,
    },
    {
      slug: 'the-decker-gallery',
      name: 'The Decker Gallery',
      shortDescription: 'Original Colorado landscape paintings and prints.',
      description:
        'The Decker Gallery specializes in original landscape paintings capturing the raw beauty of ' +
        'Colorado — the Arkansas River canyon, the Collegiate Peaks, and the high alpine meadows ' +
        'of Chaffee County. Featuring plein air and studio works by local artists.',
      category: 'art-gallery',
      tier: 'premium',
      address: '218 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['landscape painting', 'Colorado art', 'plein air', 'prints', 'originals'],
      isFeatured: true,
      isClaimed: true,
    },
    {
      slug: 'artyard-gallery',
      name: 'Artyard Gallery',
      shortDescription: 'Outdoor sculpture garden and working artist studios.',
      description:
        'Artyard Gallery is a unique outdoor art experience featuring a sculpture garden, ' +
        'working artist studios, and rotating gallery exhibitions. One of Salida\'s most iconic ' +
        'creative spaces, celebrating sculpture, ceramics, and large-format work in an open-air setting.',
      category: 'art-gallery',
      tier: 'premium',
      address: '9140 W Highway 50',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 539-4998',
      website: 'https://artyardsalida.com',
      tags: ['sculpture', 'ceramics', 'outdoor art', 'studio visits', 'creative district'],
      isFeatured: false,
      isClaimed: true,
    },
    {
      slug: 'spirit-of-the-rockies',
      name: 'Spirit of the Rockies Gallery',
      shortDescription: 'Western and wildlife art celebrating the American West.',
      description:
        'Spirit of the Rockies Gallery brings together the finest Western art, wildlife paintings, ' +
        'and bronze sculpture in Colorado. A destination for collectors and art lovers who appreciate ' +
        'the tradition and beauty of Rocky Mountain art.',
      category: 'art-gallery',
      tier: 'free',
      address: '131 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['western art', 'wildlife', 'bronze', 'Colorado', 'paintings'],
      isFeatured: false,
      isClaimed: false,
    },
    {
      slug: 'the-green-spot',
      name: 'The Green Spot Gallery',
      shortDescription: 'Contemporary art and functional ceramics by local makers.',
      description:
        'The Green Spot is a collective gallery showcasing contemporary art, functional ceramics, ' +
        'handwoven textiles, and artisan jewelry made by Salida\'s own creative community. ' +
        'A perfect stop for unique, locally made gifts and collectibles.',
      category: 'art-gallery',
      tier: 'free',
      address: '120 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['ceramics', 'contemporary', 'textiles', 'local artists', 'gifts'],
      isFeatured: true,
      isClaimed: false,
    },
    // ── Boutiques ──────────────────────────────────────────────────────────
    {
      slug: 'current-boutique-salida',
      name: 'Current Boutique',
      shortDescription: 'Curated women\'s fashion and accessories in downtown Salida.',
      description:
        'Current Boutique brings carefully curated women\'s apparel, accessories, and footwear ' +
        'to downtown Salida. Featuring emerging designers alongside established brands, ' +
        'with a focus on versatile, wearable pieces for mountain-town life and beyond.',
      category: 'boutique',
      tier: 'premium',
      address: '115 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['women\'s fashion', 'accessories', 'boutique', 'clothing', 'designer'],
      isFeatured: true,
      isClaimed: true,
    },
    {
      slug: 'wild-bird-boutique',
      name: 'Wild Bird',
      shortDescription: 'Bohemian clothing and lifestyle goods for the free spirit.',
      description:
        'Wild Bird is the destination for free-spirited fashion in Salida — boho-chic clothing, ' +
        'handmade jewelry, crystals, candles, and lifestyle goods curated for those who live ' +
        'adventurously and authentically.',
      category: 'boutique',
      tier: 'free',
      address: '220 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['bohemian', 'jewelry', 'crystals', 'lifestyle', 'women\'s clothing'],
      isFeatured: false,
      isClaimed: false,
    },
    {
      slug: 'mt-shavano-outfitters',
      name: 'Mt. Shavano Outfitters',
      shortDescription: 'Apparel and gear for Colorado mountain adventures.',
      description:
        'Mt. Shavano Outfitters equips adventurers with quality apparel and gear for hiking, ' +
        'climbing, camping, and exploring the Sawatch Range. Featuring top brands alongside ' +
        'Salida-exclusive apparel celebrating the 14ers above our town.',
      category: 'boutique',
      tier: 'free',
      address: '114 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['outdoor apparel', '14ers', 'Colorado', 'hiking', 'climbing'],
      isFeatured: false,
      isClaimed: false,
    },
    // ── Outdoor Gear ───────────────────────────────────────────────────────
    {
      slug: 'headwaters-outdoor',
      name: 'Headwaters Outdoor Equipment',
      shortDescription: 'Arkansas River valley\'s premier outdoor gear shop.',
      description:
        'Headwaters Outdoor Equipment is the go-to outfitter for river sports, climbing, hiking, ' +
        'and all-season adventure in the Arkansas River valley. Stocking kayaks, SUPs, climbing gear, ' +
        'backpacking essentials, and expert local knowledge since 2003.',
      category: 'outdoor-gear',
      tier: 'sponsored',
      address: '228 N F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 395-4100',
      website: 'https://headwatersoutdoor.com',
      tags: ['kayaking', 'SUP', 'climbing', 'hiking', 'Arkansas River', 'rentals'],
      isFeatured: true,
      isClaimed: true,
    },
    {
      slug: 'salida-paddleboard',
      name: 'Salida Paddleboard Company',
      shortDescription: 'SUP rentals, lessons, and gear on the Arkansas River.',
      description:
        'Salida Paddleboard Company specializes in stand-up paddleboard rentals, guided tours, ' +
        'and lessons on the Arkansas River. Whether you\'re a first-timer or seasoned paddler, ' +
        'they have the gear and expertise to make your river day epic.',
      category: 'outdoor-gear',
      tier: 'premium',
      address: 'Riverside Park, Salida',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['SUP', 'paddleboard', 'rentals', 'Arkansas River', 'lessons'],
      isFeatured: false,
      isClaimed: false,
    },
    // ── Vintage & Antique ──────────────────────────────────────────────────
    {
      slug: 'salida-antique-market',
      name: 'Salida Antique Market',
      shortDescription: 'Multi-dealer antique market with Colorado treasures.',
      description:
        'Salida Antique Market is a sprawling multi-dealer market featuring furniture, ' +
        'vintage clothing, collectibles, Western memorabilia, Victorian jewelry, ' +
        'mid-century modern pieces, and everything in between. New inventory arrives weekly.',
      category: 'vintage-antique',
      tier: 'premium',
      address: '130 W Rainbow Blvd',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['antiques', 'vintage', 'furniture', 'collectibles', 'Western', 'jewelry'],
      isFeatured: true,
      isClaimed: true,
    },
    {
      slug: 'river-curbside-vintage',
      name: 'River Curbside Vintage',
      shortDescription: 'Curated vintage clothing and accessories.',
      description:
        'River Curbside Vintage is Salida\'s spot for carefully curated vintage and secondhand ' +
        'clothing, accessories, and home goods. Each piece is hand-selected for quality, style, ' +
        'and uniqueness — sustainable fashion with serious character.',
      category: 'vintage-antique',
      tier: 'free',
      address: 'F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['vintage clothing', 'secondhand', 'sustainable', 'accessories', 'thrift'],
      isFeatured: false,
      isClaimed: false,
    },
    // ── Gift Shops ─────────────────────────────────────────────────────────
    {
      slug: 'mountain-made-gifts',
      name: 'Mountain Made',
      shortDescription: 'Colorado-made gifts, art, and souvenirs.',
      description:
        'Mountain Made curates the best of Colorado-crafted gifts: locally made pottery, ' +
        'artisan food products, photography prints, jewelry, and clothing celebrating the ' +
        'Arkansas River valley and Salida\'s creative spirit. Perfect gifts for any budget.',
      category: 'gift-shop',
      tier: 'free',
      address: '105 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['Colorado gifts', 'local art', 'pottery', 'souvenirs', 'handmade'],
      isFeatured: false,
      isClaimed: false,
    },
    {
      slug: 'salida-soap-company',
      name: 'Salida Soap Company',
      shortDescription: 'Handcrafted soaps, bath goods, and skincare.',
      description:
        'Salida Soap Company makes small-batch, handcrafted soaps and bath products using ' +
        'natural Colorado ingredients. Scented with local botanicals and alpine herbs, ' +
        'their products make perfect gifts for yourself or someone you love.',
      category: 'gift-shop',
      tier: 'free',
      address: 'Downtown Salida',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['soap', 'bath', 'handmade', 'natural', 'gifts', 'skincare'],
      isFeatured: false,
      isClaimed: false,
    },
    // ── Jewelry & Artisan ──────────────────────────────────────────────────
    {
      slug: 'studio-h-jewelry',
      name: 'Studio H Jewelry',
      shortDescription: 'Handcrafted fine jewelry in sterling silver and gold.',
      description:
        'Studio H Jewelry creates original, handcrafted fine jewelry inspired by the Colorado ' +
        'landscape. Each piece is designed and made in-studio in Salida, using sterling silver, ' +
        '14k gold, and locally sourced gemstones. Custom commissions welcome.',
      category: 'jewelry-artisan',
      tier: 'premium',
      address: '212 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['jewelry', 'sterling silver', 'gold', 'handcrafted', 'custom', 'Colorado'],
      isFeatured: true,
      isClaimed: true,
    },
    {
      slug: 'river-rock-jewelers',
      name: 'River Rock Jewelers',
      shortDescription: 'Fine jewelry and custom design studio downtown.',
      description:
        'River Rock Jewelers offers fine jewelry, engagement rings, and custom design services ' +
        'in downtown Salida. With an on-site studio, they create one-of-a-kind pieces featuring ' +
        'Colorado sapphires, turquoise, and other precious stones.',
      category: 'jewelry-artisan',
      tier: 'free',
      address: 'F Street, Salida',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['fine jewelry', 'engagement rings', 'custom design', 'Colorado sapphires'],
      isFeatured: false,
      isClaimed: false,
    },
    // ── Markets ────────────────────────────────────────────────────────────
    {
      slug: 'salida-farmers-market',
      name: 'Salida Farmers Market',
      shortDescription: 'Saturday morning farmers market — May through October.',
      description:
        'The Salida Farmers Market brings together the best of Chaffee County\'s farmers, ranchers, ' +
        'bakers, and artisans every Saturday morning from May through October. Fresh produce, ' +
        'grass-fed meats, artisan breads, local honey, handmade crafts, and live music.',
      category: 'market',
      tier: 'free',
      address: 'City Park, Salida',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      website: 'https://salidafarmersmarket.com',
      tags: ['farmers market', 'fresh produce', 'artisan', 'Saturday', 'seasonal', 'local food'],
      isFeatured: true,
      isClaimed: false,
    },
    {
      slug: 'salida-artisan-market',
      name: 'Salida Artisan Market',
      shortDescription: 'Year-round artisan market in the Salida Creative District.',
      description:
        'The Salida Artisan Market is a year-round destination for handmade goods from Chaffee ' +
        'County\'s most talented makers — pottery, jewelry, textiles, woodwork, and more. ' +
        'Located in the heart of the Creative District.',
      category: 'market',
      tier: 'free',
      address: 'Salida Creative District',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['artisan market', 'handmade', 'pottery', 'jewelry', 'textiles', 'creative district'],
      isFeatured: false,
      isClaimed: false,
    },
    // ── Home & Decor ───────────────────────────────────────────────────────
    {
      slug: 'the-alpine-home',
      name: 'The Alpine Home',
      shortDescription: 'Curated home goods, furniture, and interior design.',
      description:
        'The Alpine Home is Salida\'s destination for beautifully curated home décor, ' +
        'furniture, lighting, and accessories. Blending rustic mountain aesthetics with ' +
        'contemporary design, the shop offers one-of-a-kind pieces for Colorado homes.',
      category: 'home-decor',
      tier: 'free',
      address: 'F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['home décor', 'furniture', 'interior design', 'mountain style', 'Colorado'],
      isFeatured: false,
      isClaimed: false,
    },
    // ── Featured Partners — Day Trip Adventure (Canon City / Royal Gorge) ──────
    {
      slug: 'royal-gorge-rafting',
      name: 'Royal Gorge Rafting',
      shortDescription: "Colorado's #1 whitewater rafting — Class IV-V through the Royal Gorge canyon.",
      description:
        'Royal Gorge Rafting runs the most legendary whitewater in Colorado — 10 miles of Class IV-V rapids through a canyon with 1,000-foot granite walls. ' +
        'Half-day and full-day trips depart daily April through September. All gear provided, no experience necessary. ' +
        'Just 45 minutes east of Salida on US-50 — the perfect addition to your Salida shopping day.',
      category: 'outdoor-gear',
      tier: 'sponsored',
      address: 'Canon City Area',
      city: 'Canon City',
      state: 'CO',
      zip: '81212',
      phone: '(719) 275-7238',
      website: 'https://royalgorgerafting.net',
      bookingUrl: 'https://royalgorgerafting.net',
      tags: ['rafting', 'whitewater', 'Royal Gorge', 'day trip', 'adventure', 'featured partner'],
      isFeatured: true,
      isClaimed: true,
    },
    {
      slug: 'royal-gorge-zipline-tours',
      name: 'Royal Gorge Zipline Tours',
      shortDescription: "Fly 1,200 feet above the Royal Gorge on Colorado's most spectacular zipline.",
      description:
        'Royal Gorge Zipline Tours sends you soaring over the gorge at up to 1,200 feet above the Arkansas River — ' +
        'the most breathtaking zipline experience in Colorado. Parallel lines offer stunning views of the Royal Gorge suspension bridge ' +
        'and canyon walls. Open seasonally; call ahead for schedules. ' +
        'Just 45 minutes east of Salida on US-50.',
      category: 'outdoor-gear',
      tier: 'sponsored',
      address: 'Canon City Area',
      city: 'Canon City',
      state: 'CO',
      zip: '81212',
      phone: '(719) 275-7238',
      website: 'https://royalgorgeziplinetours.com',
      bookingUrl: 'https://royalgorgeziplinetours.com',
      tags: ['zipline', 'Royal Gorge', 'day trip', 'adventure', 'canyon views', 'featured partner'],
      isFeatured: true,
      isClaimed: true,
    },
    {
      slug: 'royal-gorge-vacation-rentals',
      name: 'Royal Gorge Vacation Rentals',
      shortDescription: 'Airstreams, yurts, and glamping cabins near the Royal Gorge.',
      description:
        'Royal Gorge Vacation Rentals offers unique accommodations near the gorge — vintage Airstreams, furnished yurts, and glamping ' +
        'cabins set among towering pines. The perfect way to turn a Salida day trip into a full Colorado weekend. ' +
        'Book the night and make the most of both Salida shopping and Royal Gorge adventure.',
      category: 'outdoor-gear',
      tier: 'sponsored',
      address: 'Canon City Area',
      city: 'Canon City',
      state: 'CO',
      zip: '81212',
      phone: '(719) 275-7238',
      website: 'https://royalgorgevacationrentals.com',
      bookingUrl: 'https://royalgorgevacationrentals.com',
      tags: ['glamping', 'Airstream', 'yurt', 'vacation rental', 'Royal Gorge', 'featured partner'],
      isFeatured: true,
      isClaimed: true,
    },
    // ── Featured Partners — Dining Near the Gorge (Canon City) ────────────────
    {
      slug: 'whitewater-bar-grill',
      name: 'Whitewater Bar & Grill',
      shortDescription: "Canon City's favorite bar and grill — open April through October.",
      description:
        'Whitewater Bar & Grill is the go-to post-adventure spot in Canon City — great burgers, local Colorado craft beers, ' +
        'and a lively atmosphere that welcomes rafters, hikers, and Salida shoppers alike. ' +
        'Open seasonally April 17 through October 31. ' +
        'Located in downtown Canon City, 45 minutes east of Salida on US-50.',
      category: 'food-specialty',
      tier: 'sponsored',
      address: 'Canon City',
      city: 'Canon City',
      state: 'CO',
      zip: '81212',
      phone: '(719) 269-1009',
      website: 'https://whitewaterbar.com',
      tags: ['bar and grill', 'burgers', 'craft beer', 'Canon City dining', 'featured partner', 'seasonal'],
      isFeatured: true,
      isClaimed: true,
    },
    {
      slug: 'whitewater-rooftop-social',
      name: 'Whitewater Rooftop Social',
      shortDescription: 'Year-round rooftop dining and cocktails in downtown Canon City.',
      description:
        'Whitewater Rooftop Social offers elevated dining and craft cocktails on a rooftop terrace overlooking Canon City and the mountains beyond. ' +
        'Open year-round — the perfect dinner destination after a day of Royal Gorge adventure or Salida shopping. ' +
        '45 minutes east of Salida on US-50.',
      category: 'food-specialty',
      tier: 'sponsored',
      address: 'Canon City',
      city: 'Canon City',
      state: 'CO',
      zip: '81212',
      phone: '(719) 451-7241',
      website: 'https://wwrooftopsocial.com',
      tags: ['rooftop dining', 'cocktails', 'Canon City', 'dinner', 'featured partner', 'year-round'],
      isFeatured: true,
      isClaimed: true,
    },
    // ── Food & Specialty ───────────────────────────────────────────────────
    {
      slug: 'salida-wine-and-spirits',
      name: 'Salida Wine & Spirits',
      shortDescription: 'Curated wine shop and local craft spirits.',
      description:
        'Salida Wine & Spirits offers a thoughtfully curated selection of wines from around the ' +
        'world alongside Colorado craft spirits, local beers, and artisan non-alcoholic beverages. ' +
        'The knowledgeable staff provides expert pairings for every occasion.',
      category: 'food-specialty',
      tier: 'free',
      address: 'Downtown Salida',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['wine', 'spirits', 'craft beer', 'Colorado spirits', 'gifts'],
      isFeatured: false,
      isClaimed: false,
    },
    {
      slug: 'rocky-mountain-chocolate',
      name: 'Rocky Mountain Chocolate',
      shortDescription: 'Hand-dipped chocolates and fudge made fresh daily.',
      description:
        'Rocky Mountain Chocolate in Salida handcrafts gourmet chocolates, fudge, caramel apples, ' +
        'and truffles daily. A must-stop sweet treat in downtown Salida, beloved by locals ' +
        'and visitors alike.',
      category: 'food-specialty',
      tier: 'free',
      address: 'F Street, Salida',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['chocolate', 'fudge', 'candy', 'sweets', 'gifts', 'handmade'],
      isFeatured: false,
      isClaimed: false,
    },
  ]

  let inserted = 0
  let updated = 0
  for (const shop of shopData) {
    const existing = await db
      .select()
      .from(schema.shops)
      .where(eq(schema.shops.slug, shop.slug!))
      .limit(1)
    if (existing.length > 0) {
      await db
        .update(schema.shops)
        .set({ ...shop, updatedAt: new Date() })
        .where(eq(schema.shops.slug, shop.slug!))
      updated++
    } else {
      await db.insert(schema.shops).values(shop)
      inserted++
    }
  }

  console.log(`✓ Shops: ${inserted} inserted, ${updated} updated`)

  // ── Blog Posts ─────────────────────────────────────────────────────────────
  const blogData: (typeof schema.blogPosts.$inferInsert)[] = [
    {
      slug: 'salida-creative-district-largest-in-colorado',
      title: "Inside Salida's Creative District: Colorado's Largest Arts Community",
      excerpt:
        "With over 100 working artists and 50+ arts businesses in a walkable downtown, Salida's Creative District is the most concentrated arts community in Colorado. Here's what makes it special.",
      content: `# Inside Salida's Creative District: Colorado's Largest Arts Community

Nestled in the Arkansas River valley between the towering Sawatch and Mosquito ranges, Salida, Colorado has earned a remarkable distinction: it's home to **Colorado's largest certified Creative District**, as recognized by Colorado Creative Industries.

## What Is the Salida Creative District?

The Salida Creative District encompasses the historic downtown blocks centered around F Street, Sackett Avenue, and the surrounding area of this former railroad town. Within this walkable footprint, you'll find:

- **100+ working artists** with studios open to visitors
- **50+ arts-related businesses** including galleries, craft studios, and artisan shops
- A thriving calendar of arts events, including the famous **Salida ArtWalk** (held the first weekend of each month, June–September)
- Monthly **FIRSTfriday** gallery openings year-round

## The Galleries

Salida's gallery scene is extraordinary for a town of its size (population ~5,000). From **Absolute Gallery** on F Street to the outdoor sculpture experience at **Artyard**, you can spend an entire day gallery-hopping without leaving downtown.

Many galleries represent both local Colorado artists and nationally recognized names. The focus spans traditional Western landscapes, cutting-edge contemporary work, ceramics, sculpture, fiber arts, photography, and everything between.

## Why Salida?

The combination of stunning natural scenery, a historic downtown with affordable studio space (by Colorado standards), and a welcoming creative community has drawn artists here for decades. The Arkansas River's Class V whitewater, world-class mountain biking at Monarch Crest, skiing at Monarch Mountain, and 14er hiking give artists endless inspiration on their doorstep.

## Plan Your Visit

The **Salida ArtWalk** is the best way to experience everything at once. Held the first full weekend of June, July, August, and September, the event opens studios and galleries across town simultaneously, with artists on hand to discuss their work.

**Shop Salida** lists all the galleries and artisan shops — use our directory to plan your visit.`,
      metaDescription:
        "Salida, Colorado's Creative District is the state's largest, with 100+ artists and 50+ arts businesses. Discover galleries, studios, and artisan shops in walkable downtown Salida.",
      tags: ['salida creative district', 'colorado art', 'art galleries', 'salida colorado'],
      isPublished: true,
      publishedAt: new Date('2024-06-01'),
      authorName: 'Shop Salida',
    },
    {
      slug: 'best-boutiques-downtown-salida',
      title: 'The Best Boutiques in Downtown Salida, Colorado',
      excerpt:
        "From bohemian clothing to outdoor apparel and curated women's fashion, downtown Salida has a boutique for every style. Here's our guide to the best shopping on F Street.",
      content: `# The Best Boutiques in Downtown Salida, Colorado

Shopping in Salida isn't like shopping anywhere else in Colorado. The boutiques along **F Street** and the surrounding historic downtown blocks are a reflection of the town itself: creative, independent, a little wild, and deeply authentic.

## What to Expect

Forget big-box stores and chain retail. Salida's boutiques are owner-operated, with personalities as distinct as the mountains that surround them. You'll find everything from high-end women's fashion to outdoor adventure apparel, bohemian lifestyle goods, and locally made gifts.

## Top Boutiques to Visit

### Current Boutique
One of Salida's most beloved women's shops, Current Boutique curates a thoughtful mix of emerging designers and versatile everyday pieces. Perfect for the woman who lives adventurously and dresses accordingly.

### Wild Bird
If you're drawn to crystals, flowing fabrics, and handmade jewelry, Wild Bird is your place. The vibe is unmistakably Salida: free-spirited, colorful, and full of meaning.

### Mt. Shavano Outfitters
Named for the 14,229-ft peak looming over town, Mt. Shavano Outfitters stocks quality outdoor apparel and gear alongside Salida-branded clothing celebrating the Collegiate Peaks. A must-stop for hikers and climbers visiting the area.

## Shopping Tips

- **Go on a Saturday** to combine boutique shopping with the Salida Farmers Market
- **First Fridays** (June–September) keep stores open late with the ArtWalk crowd — a festive shopping night
- Most boutiques are within a 5-minute walk of each other along F Street
- Look for the **Shop Salida** premium badge — verified listings with full hours, photos, and contact details

Browse all boutiques in our [directory](/directory?category=boutique).`,
      metaDescription:
        "Discover the best boutiques in downtown Salida, Colorado — women's fashion, outdoor apparel, and bohemian lifestyle shops along historic F Street.",
      tags: ['salida boutiques', 'downtown salida shopping', 'salida colorado', 'f street shops'],
      isPublished: true,
      publishedAt: new Date('2024-07-01'),
      authorName: 'Shop Salida',
    },
    {
      slug: 'outdoor-gear-salida-arkansas-river',
      title: 'Outdoor Gear Shops in Salida: Outfit Your Arkansas River Adventure',
      excerpt:
        "Salida is the gateway to the Arkansas River's legendary whitewater, 14er trails, and world-class mountain biking. Here's where to gear up before you head out.",
      content: `# Outdoor Gear Shops in Salida: Outfit Your Arkansas River Adventure

Salida sits at the confluence of some of Colorado's most epic outdoor terrain: the **Arkansas River** (home to the legendary Royal Gorge and Browns Canyon National Monument Class V whitewater), the **Sawatch Range** (with more 14,000-ft peaks than anywhere else on Earth), and the **Monarch Crest** trail system, widely regarded as one of America's best mountain bike routes.

Naturally, the gear shops here reflect that abundance of adventure.

## Headwaters Outdoor Equipment

The anchor of Salida's outdoor retail scene, Headwaters has been outfitting river runners, climbers, and hikers in the Arkansas River valley since 2003. Their staff are local experts — many are guides on the Arkansas — and they stock an exceptional selection of:

- Kayaks, SUPs, and river gear (sales + rentals)
- Rock climbing hardware and footwear
- Backpacking equipment for 14er approaches
- Technical apparel for all seasons

## Salida Paddleboard Company

For flat-water fun on the Arkansas, Salida Paddleboard Company rents and sells stand-up paddleboards, with guided tours and beginner lessons available throughout summer. A fantastic option for families and casual paddlers.

## Before You Head Out

The Arkansas River through Browns Canyon runs best in **May and June** during snowmelt. For 14ers, the prime window is **July and August** (start early — afternoon thunderstorms are deadly). Mountain biking is excellent from **June through October**, with Monarch Crest peaking in fall color.

Check our [directory](/directory?category=outdoor-gear) for the full list of outdoor retailers in Salida.`,
      metaDescription:
        'Find the best outdoor gear shops in Salida, Colorado for Arkansas River adventures, 14er hikes, and mountain biking. Your guide to Headwaters, Salida Paddleboard, and more.',
      tags: ['salida outdoor gear', 'arkansas river', 'salida colorado', 'kayaking', '14ers', 'mountain biking'],
      isPublished: true,
      publishedAt: new Date('2024-08-01'),
      authorName: 'Shop Salida',
    },
    {
      slug: 'salida-artisan-jewelry-makers',
      title: "Salida's Artisan Jewelry Makers: Handcrafted Colorado Gems",
      excerpt:
        "Colorado sapphires, turquoise, and locally mined gemstones set in sterling silver and gold — Salida's jewelry makers create wearable art rooted in the Rocky Mountain landscape.",
      content: `# Salida's Artisan Jewelry Makers: Handcrafted Colorado Gems

There's something special about wearing a piece of jewelry made by hand in a mountain town. In Salida, the jewelry-making tradition runs deep — part of the broader Creative District culture that has attracted craftspeople and artisans from across the country.

## What Makes Salida Jewelry Unique

Several factors set Salida's jewelry scene apart:

**Colorado-sourced materials.** The state is home to the world's only significant deposit of blue sapphires — the **Yogo sapphires** of Montana's neighbor — alongside Colorado turquoise, rare Colorado red beryl, and smoky quartz from the Pike's Peak region. Many Salida jewelers incorporate these local stones.

**Studio-made.** Unlike mass-produced souvenir jewelry, Salida's artisan pieces are designed and fabricated on-site. When you buy from a studio like **Studio H Jewelry**, you're buying directly from the maker.

**Mountain aesthetic.** Designs tend toward organic forms — river stone settings, branch-like metalwork, mountain silhouettes — reflecting the landscape outside the studio window.

## Studio H Jewelry

Studio H is one of Salida's most celebrated jewelry studios, creating original fine jewelry in sterling silver and 14k gold. Custom commissions are a specialty — perfect for engagement rings, anniversary pieces, or memorial jewelry.

## River Rock Jewelers

River Rock combines traditional fine jewelry with a Colorado edge — Colorado sapphires and turquoise feature prominently, alongside classic diamond settings. Their custom design studio can work from a sketch or a dream.

## Shopping Tips

- Visit during the **ArtWalk** (June–September first weekends) for studio-open events where you can meet the maker
- Custom work typically takes 4–8 weeks; plan ahead if you want something made to order
- Browse our [jewelry & artisan listings](/directory?category=jewelry-artisan) for the full directory

A piece of Salida jewelry is more than a souvenir — it's a Colorado heirloom.`,
      metaDescription:
        "Discover Salida, Colorado's handcrafted jewelry makers — Colorado sapphires, turquoise, and sterling silver pieces made in the heart of the Sawatch Range.",
      tags: ['salida jewelry', 'colorado sapphires', 'handcrafted jewelry', 'artisan jewelry', 'salida colorado'],
      isPublished: true,
      publishedAt: new Date('2024-09-01'),
      authorName: 'Shop Salida',
    },
    {
      slug: 'salida-to-royal-gorge-day-trip',
      title: 'Shopping + Adventure: The Perfect Salida to Royal Gorge Day Trip',
      excerpt:
        'Start your morning browsing Salida\'s galleries and boutiques, then take the scenic 45-minute drive east on US-50 for world-class rafting or ziplines at Royal Gorge — and end with dinner at Whitewater Bar & Grill in Canon City.',
      content: `# Shopping + Adventure: The Perfect Salida to Royal Gorge Day Trip

This is Colorado at its best: a morning of art and boutique shopping in one of the state's most creative small towns, followed by an afternoon of world-class outdoor adventure at one of its most dramatic natural landmarks — all in a single day.

## Getting Here

**From Colorado Springs (COS):** 1 hour west on US-50 to Canon City, then 45 minutes further west to Salida. Total: approximately 1 hour 45 minutes.

**From Denver (DEN):** 2 hours south and west via I-25 and US-50. Head through Colorado Springs or take the scenic route through South Park on US-285. Total: approximately 2 hours.

**Pro tip:** Start in Salida (further west) and work your way east toward Canon City — you'll end the day near the Royal Gorge and Canon City restaurants without backtracking.

## Morning: Explore Salida's Creative District (9 AM – 12 PM)

Park once and walk. Downtown Salida's F Street and surrounding blocks are the heart of **Colorado's largest Certified Creative District** — over 100 working artists and 50+ arts businesses in a walkable footprint.

### Where to Start

**Absolute Gallery** (228 F Street) opens at 10 AM and anchors the gallery scene with exceptional contemporary fine art. Two blocks down, **Artyard Gallery** offers a unique outdoor sculpture experience you won't find anywhere else in Colorado.

### Shop the Boutiques

**Current Boutique** (115 F Street) carries curated women's apparel — perfect for a Colorado-inspired wardrobe refresh. For something more bohemian, **Wild Bird** (220 F Street) has handmade jewelry, crystals, and free-spirited clothing.

If someone in your group is an outdoor enthusiast, **Headwaters Outdoor Equipment** (228 N F Street, (719) 395-4100) stocks everything for the afternoon's adventure — river gear, quick-dry layers, and local beta from staff who actually paddle and climb here.

### Pick Up Gifts

- **Mountain Made** for Colorado-crafted pottery and photography prints
- **Salida Soap Company** for handmade natural bath goods — perfect travel gifts
- **Studio H Jewelry** (212 F Street) for handcrafted fine jewelry made on-site

## Lunch in Salida (12 PM – 1 PM)

Downtown Salida has excellent lunch options along F Street and Sackett Avenue. Grab a meal before the drive — you'll want energy for the afternoon.

## The Drive: Salida to Canon City (1 PM – 1:45 PM)

Head east on **US-50** — one of Colorado's most scenic highway stretches. You'll follow the Arkansas River through Browns Canyon National Monument, past the town of Salida, through the narrows, and into Cañon City. The drive is 45 minutes and worth slowing down for.

## Afternoon: Royal Gorge Adventure (2 PM – 5 PM)

Choose your adventure — or do both if you have the energy.

### Royal Gorge Rafting — Colorado's #1 Whitewater
**royalgorgerafting.net | (719) 275-7238**

The Royal Gorge section of the Arkansas River is one of the most legendary whitewater runs in North America — Class IV-V rapids through a canyon with 1,000-foot granite walls towering above you. Half-day trips run daily from April through September.

- Half-day trips: depart at 8 AM and 1 PM
- Full-day trips available
- All gear provided — no experience necessary for the half-day trip
- Book in advance; afternoon trips fill up fast in peak season (June–August)

### Royal Gorge Zipline Tours — 1,200 Feet Above the Canyon
**royalgorgeziplinetours.com | (719) 275-7238**

If you want to see the gorge from above rather than below, the Royal Gorge Zipline Tours run parallel lines over the canyon at up to 1,200 feet above the Arkansas River. The views are extraordinary — arguably the best vantage point in southern Colorado.

- Tours run daily in season; call ahead for current schedule
- Weight limits apply; check the website before booking
- Combination raft + zip packages available

### Royal Gorge Vacation Rentals — Stay the Night
**royalgorgevacationrentals.com | (719) 275-7238**

If the day is so good you don't want it to end, Royal Gorge Vacation Rentals offers Airstreams, yurts, and glamping accommodations near the gorge. Booking a night turns the day trip into the ultimate Colorado weekend.

## Dinner in Canon City (6 PM – 8 PM)

End the day right in downtown Canon City — two outstanding restaurants just minutes from the Royal Gorge.

### Whitewater Bar & Grill
**(719) 269-1009 | whitewaterbar.com**
Open seasonally April 17 through October 31. Classic Colorado bar and grill with great burgers, local beers, and a deck perfect for reliving the day's adventures. Arrives early — it fills up on summer evenings.

### Whitewater Rooftop Social
**(719) 451-7241 | wwrooftopsocial.com**
Open year-round. Rooftop dining and cocktails with views of Canon City's skyline and the mountains beyond. Elevated food and atmosphere — the perfect cap to a Colorado day.

## The Full Itinerary at a Glance

- **9 AM** — Arrive in Salida, park downtown, start at Absolute Gallery
- **9–12 PM** — Gallery hop, boutique shopping, pick up gifts on F Street
- **12 PM** — Lunch in Salida
- **1 PM** — Depart east on US-50 (45-minute scenic drive)
- **2 PM** — Arrive Canon City / Royal Gorge
- **2–5 PM** — Raft the Royal Gorge or fly over it on the ziplines
- **6 PM** — Dinner at Whitewater Bar & Grill or Rooftop Social in Canon City

**Browse the [Salida Shopping Directory](/directory) to plan your morning stops.**`,
      metaDescription:
        'The perfect Colorado day trip: morning shopping in Salida\'s Creative District, then a 45-minute drive east to world-class rafting and ziplines at Royal Gorge. Includes driving directions from Denver and Colorado Springs.',
      tags: ['salida day trip', 'royal gorge', 'salida shopping', 'colorado itinerary', 'arkansas river rafting', 'royal gorge zipline'],
      isPublished: true,
      publishedAt: new Date('2024-10-01'),
      authorName: 'Shop Salida',
    },
    {
      slug: 'artisan-weekend-salida-royal-gorge',
      title: 'Artisan Weekend: 2 Days of Salida Shopping & Royal Gorge Adventure',
      excerpt:
        'The ultimate Colorado weekend: two days of gallery-hopping, boutique shopping, artisan markets, world-class whitewater, and canyon views. A complete itinerary for the Salida Creative District and Royal Gorge.',
      content: `# Artisan Weekend: 2 Days of Salida Shopping & Royal Gorge Adventure

Two days. One of Colorado's most creative small towns. One of its most dramatic natural wonders. This is the Colorado weekend itinerary that has everything.

## Getting Here

**From Colorado Springs (COS):** 1 hour west on US-50 to Canon City. From Canon City, continue 45 minutes west to Salida. Total to Salida: approximately 1 hour 45 minutes.

**From Denver (DEN):** 2 hours south and west. Take I-25 south to Colorado Springs, then US-50 west — or take the scenic US-285 route through Fairplay and Poncha Springs. Total: approximately 2 hours.

**Recommended:** Arrive in Salida Friday evening or Saturday morning. Plan to return home Sunday via Canon City — you'll end near the Royal Gorge for your last adventure before heading back.

---

## Day 1: Salida's Creative District

### Morning: Gallery Row on F Street (9 AM – 12 PM)

Start at **Absolute Gallery** (228 F Street, (719) 539-7810) — Salida's anchor gallery for contemporary fine art. Give yourself 30–45 minutes; the rotating exhibitions are worth it.

From there, work your way down F Street:

- **The Decker Gallery** (218 F Street) — Original Colorado landscape paintings; the Collegiate Peaks and Arkansas River canyon are recurring subjects. Stunning plein air work.
- **The Green Spot Gallery** (120 F Street) — A collective of Salida artists: ceramics, textiles, jewelry, and contemporary work. Great for affordable originals.
- **Spirit of the Rockies Gallery** (131 F Street) — Western and wildlife art, bronze sculpture, and paintings celebrating the American West.

For the full sculptural experience, drive 3 minutes west to **Artyard Gallery** (9140 W Highway 50) — an outdoor sculpture garden and working studios unlike anything else in Colorado.

### Lunch Break (12 PM – 1 PM)

Refuel downtown before the afternoon boutique circuit.

### Afternoon: Boutiques & Artisan Shopping (1 PM – 5 PM)

**Current Boutique** (115 F Street) is the go-to for curated women's apparel — thoughtfully selected pieces that work for mountain-town life and city life alike.

**Wild Bird** (220 F Street) is pure Salida spirit: bohemian clothing, handmade jewelry, crystals, candles, and lifestyle goods for the free-spirited traveler.

For gifts, **Mountain Made** has the best selection of Colorado-made souvenirs — locally crafted pottery, photography prints, artisan food products, and more.

**Studio H Jewelry** (212 F Street) deserves dedicated time. These are handcrafted fine jewelry pieces made in-studio using sterling silver, 14k gold, and locally sourced gemstones. Custom commissions welcome. Even if you're not buying, the craftsmanship is worth seeing.

**Salida Soap Company** stocks handmade natural soaps scented with Colorado botanicals — some of the best packable gifts you'll find anywhere.

### Late Afternoon: Gear Up for Tomorrow (4 PM – 5 PM)

Stop by **Headwaters Outdoor Equipment** (228 N F Street, (719) 395-4100) if you need anything for tomorrow's adventure — quick-dry layers, river sandals, or just expert local advice on what to expect on the Arkansas.

### Evening in Salida

Saturday evenings in Salida are lively. If your weekend falls on the **first weekend of June, July, August, or September**, you'll have the **Salida ArtWalk** — galleries open late, artists on-site, street energy throughout the Creative District.

On any Saturday morning, the **Salida Farmers Market** (City Park) runs May–October with fresh produce, artisan crafts, and local food.

---

## Day 2: Royal Gorge Adventure

### Morning: Final Salida Stop (9 AM – 10 AM)

Before leaving, hit the **Salida Artisan Market** (Salida Creative District) for handmade pottery, jewelry, textiles, and woodwork from Chaffee County's best makers. Great for any last-minute gifts you didn't find yesterday.

Then grab coffee and head east.

### The Drive: Salida to Canon City (10 AM – 10:45 AM)

Take **US-50 east** — follow the Arkansas River through Browns Canyon National Monument. This is 45 minutes of genuinely beautiful Colorado scenery: river canyon, granite walls, cottonwood groves, and the occasional eagle overhead.

### Morning: Raft the Royal Gorge (11 AM – 2 PM)

**Royal Gorge Rafting | royalgorgerafting.net | (719) 275-7238**

The Royal Gorge section of the Arkansas River is Colorado's most iconic whitewater run — 10 miles of Class IV-V rapids between walls that rise 1,000 feet above you. Half-day trips depart at 8 AM and 1 PM; full-day options are available.

- Book in advance (online at royalgorgerafting.net or call (719) 275-7238)
- All gear provided; no prior experience required for the half-day standard trip
- Wetsuits provided in spring when snowmelt water is cold
- Peak season (June–August) books out weeks in advance

### OR: Royal Gorge Zipline Tours (11 AM – 1 PM)

**royalgorgeziplinetours.com | (719) 275-7238**

For the aerial perspective: the Royal Gorge Zipline Tours send you flying over the canyon at up to 1,200 feet above the Arkansas River. If heights are your thing, this is an absolutely unforgettable experience — the views of the gorge walls and suspension bridge from the ziplines are extraordinary.

Call (719) 275-7238 to check daily schedule and availability.

### Afternoon: Explore Canon City (2 PM – 5 PM)

Canon City's downtown has its own charm — the historic district along Main Street has excellent independent shops, coffee, and more before you start the drive home.

### Dinner Before You Go (5 PM – 7 PM)

**Whitewater Bar & Grill** (Canon City) — **(719) 269-1009 | whitewaterbar.com**
Open April 17 through October 31. The quintessential post-adventure meal: great burgers, Colorado craft beers, and the kind of atmosphere that comes from a room full of people who just had the best day of their summer. The riverside patio is outstanding.

**Whitewater Rooftop Social** (Canon City) — **(719) 451-7241 | wwrooftopsocial.com**
Open year-round. Elevated rooftop dining with cocktails and mountain views. The more upscale option — ideal if you want to celebrate the weekend properly before heading home.

### The Drive Home (7 PM)

**To Colorado Springs (COS area):** Head east on US-50 — 1 hour back to Colorado Springs.
**To Denver (DEN area):** East on US-50 to Colorado Springs, then north on I-25 — approximately 2 hours total.

---

## Weekend at a Glance

**Saturday**
- 9 AM: Absolute Gallery → F Street galleries
- 12 PM: Lunch in Salida
- 1 PM: Boutiques — Current Boutique, Wild Bird, Studio H Jewelry, Mountain Made
- 4 PM: Headwaters Outdoor (gear up for tomorrow)
- Evening: ArtWalk if first weekend of month (June–September)

**Sunday**
- 9 AM: Salida Artisan Market
- 10 AM: Drive east on US-50 (45 minutes)
- 11 AM: Raft the Royal Gorge (royalgorgerafting.net, (719) 275-7238) or Zipline Tours (royalgorgeziplinetours.com, (719) 275-7238)
- 2 PM: Explore Canon City
- 5 PM: Dinner at Whitewater Bar & Grill ((719) 269-1009) or Rooftop Social ((719) 451-7241)
- 7 PM: Drive home

**Browse the full [Salida Shopping Directory](/directory) to plan your stops.**`,
      metaDescription:
        'The ultimate 2-day Colorado weekend: gallery-hopping and boutique shopping in Salida\'s Creative District, then world-class rafting and ziplines at Royal Gorge. Full itinerary with drive times from Denver (2 hrs) and Colorado Springs (1 hr).',
      tags: ['salida weekend', 'salida shopping itinerary', 'royal gorge weekend', 'colorado weekend getaway', 'salida creative district', 'royal gorge rafting', 'artisan travel'],
      isPublished: true,
      publishedAt: new Date('2024-10-15'),
      authorName: 'Shop Salida',
    },
  ]

  let postsInserted = 0
  let postsUpdated = 0
  for (const post of blogData) {
    const existing = await db
      .select()
      .from(schema.blogPosts)
      .where(eq(schema.blogPosts.slug, post.slug!))
      .limit(1)
    if (existing.length > 0) {
      await db
        .update(schema.blogPosts)
        .set({ ...post, updatedAt: new Date() })
        .where(eq(schema.blogPosts.slug, post.slug!))
      postsUpdated++
    } else {
      await db.insert(schema.blogPosts).values(post)
      postsInserted++
    }
  }

  console.log(`✓ Blog posts: ${postsInserted} inserted, ${postsUpdated} updated`)
  console.log('\nSeed complete!')
  process.exit(0)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
