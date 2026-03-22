/**
 * seed.ts — Seeds the Shop Salida database.
 * All Salida shops verified as real, operating businesses via Chamber of Commerce,
 * Yelp, and local sources. Run with: DATABASE_URL=... npx tsx scripts/seed.ts
 */
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { eq, inArray } from 'drizzle-orm'
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

  // ── Cleanup: Remove Fabricated/Outdated Listings ───────────────────────────
  const slugsToRemove = [
    'absolute-gallery',
    'the-decker-gallery',
    'artyard-gallery',
    'spirit-of-the-rockies',
    'the-green-spot',
    'current-boutique-salida',
    'wild-bird-boutique',
    'mt-shavano-outfitters',
    'salida-paddleboard',
    'salida-antique-market',
    'river-curbside-vintage',
    'mountain-made-gifts',
    'salida-soap-company',
    'studio-h-jewelry',
    'river-rock-jewelers',
    'salida-artisan-market',
    'the-alpine-home',
    'salida-wine-and-spirits',
    'rocky-mountain-chocolate',
  ]
  await db.delete(schema.shops).where(inArray(schema.shops.slug, slugsToRemove))
  console.log(`✓ Removed ${slugsToRemove.length} outdated/unverified shop listings`)

  // ── Verified Salida Shops ──────────────────────────────────────────────────
  // All businesses confirmed via Salida Chamber of Commerce, Yelp, and local sources.
  const shopData: (typeof schema.shops.$inferInsert)[] = [

    // ── Art Galleries ──────────────────────────────────────────────────────
    {
      slug: 'eye-candy-art-salida',
      name: 'Eye Candy Art and Treasure',
      shortDescription: 'Fine art gallery representing 40+ artists in downtown Salida.',
      description:
        'Eye Candy Art and Treasure is a cornerstone of the Salida Creative District, ' +
        'representing over 40 regional and national artists across paintings, sculpture, ' +
        'artisan jewelry, and Native American sterling silver pieces. ' +
        'Part of the annual Salida ArtWalk held the first weekend of each month June through September — ' +
        'one of the best gallery experiences in southern Colorado.',
      category: 'art-gallery',
      tier: 'premium',
      address: '118 N F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['fine art', 'artisan jewelry', 'Native American silver', 'paintings', 'sculpture', 'creative district'],
      isFeatured: true,
      isClaimed: true,
    },
    {
      slug: 'the-maverick-potter',
      name: 'The Maverick Potter',
      shortDescription: 'Working pottery studio and gallery — hand-thrown ceramics since 2008.',
      description:
        'The Maverick Potter is a working studio and gallery featuring hand-thrown pottery ' +
        'by owner Mark Rittmann and over 20 local and regional artists. ' +
        'In addition to ceramics, the gallery carries hand-blown glass and handmade jewelry. ' +
        'One of Salida\'s most beloved creative spaces since 2008 — a must-visit on the Creative District walk.',
      category: 'art-gallery',
      tier: 'premium',
      address: '148 N F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 539-5112',
      tags: ['pottery', 'ceramics', 'hand-thrown', 'blown glass', 'handmade jewelry', 'working studio'],
      isFeatured: true,
      isClaimed: true,
    },
    {
      slug: 'four-winds-gallery',
      name: 'Four Winds Gallery',
      shortDescription: 'Oil paintings, Colorado pottery, nature photography, and artisan jewelry.',
      description:
        'Four Winds Gallery has been a fixture of downtown Salida since 2005, ' +
        'featuring original oil paintings, mixed media work, Colorado pottery, ' +
        'handmade jewelry, gourd art, and nature photography. ' +
        'Owner Linda Frances curates a warm, welcoming space that captures the color and spirit of the Salida Creative District.',
      category: 'art-gallery',
      tier: 'free',
      address: '118 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 539-7459',
      tags: ['oil paintings', 'mixed media', 'Colorado pottery', 'nature photography', 'handmade jewelry'],
      isFeatured: false,
      isClaimed: false,
    },
    {
      slug: 'brodeur-studio-gallery',
      name: 'Brodeur Studio Gallery',
      shortDescription: 'Colorful abstract and impressionistic paintings inspired by Colorado.',
      description:
        'Brodeur Studio Gallery showcases the work of international artist Paulette Brodeur, ' +
        'whose colorful paintings span abstract to impressionistic styles rooted in Colorado landscapes. ' +
        'Established in 1994, the studio features original paintings, prints, and cards — ' +
        'vibrant, expressive work that captures the light and energy of the Arkansas River valley.',
      category: 'art-gallery',
      tier: 'free',
      address: '133 E Second Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['abstract', 'impressionistic', 'Colorado landscapes', 'paintings', 'prints'],
      isFeatured: false,
      isClaimed: false,
    },
    {
      slug: 'bork-and-watkins-gallery',
      name: 'Bork and Watkins Gallery',
      shortDescription: 'Husband-wife gallery: landscape paintings and whimsical felted sculpture.',
      description:
        'Bork and Watkins Gallery is a unique husband-and-wife creative space featuring ' +
        'Carl Bork\'s landscape paintings of the Colorado high country alongside ' +
        'Karen Watkins\'s whimsical surreal paintings and delightful felted sculptures. ' +
        'Open since 2010 at the corner of 1st and G — a charming and distinctive stop on the Creative District.',
      category: 'art-gallery',
      tier: 'free',
      address: '149 W 1st Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(216) 409-3679',
      tags: ['landscape paintings', 'felted sculpture', 'whimsical', 'Colorado', 'husband and wife'],
      isFeatured: false,
      isClaimed: false,
    },

    // ── Boutiques ──────────────────────────────────────────────────────────
    {
      slug: 'opal-boutique-salida',
      name: 'Opal Boutique',
      shortDescription: 'Curated women\'s fashion and accessories in the heart of downtown Salida.',
      description:
        'Opal Boutique brings modern, stylish women\'s apparel, accessories, and footwear ' +
        'to downtown Salida\'s F Street. The carefully curated collection pairs wearable ' +
        'everyday style with pieces that transition effortlessly from mountain trails to evening out. ' +
        'A go-to destination for fashion in Colorado\'s most creative small town.',
      category: 'boutique',
      tier: 'premium',
      address: '128 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 539-2515',
      tags: ['women\'s fashion', 'accessories', 'footwear', 'boutique', 'clothing'],
      isFeatured: true,
      isClaimed: true,
    },
    {
      slug: 'yolo-clothing-salida',
      name: 'Yolo',
      shortDescription: 'Eclectic casual clothing, footwear, and accessories for everyone.',
      description:
        'Yolo on F Street carries an eclectic mix of casual clothing for men, women, and juniors, ' +
        'alongside footwear, accessories, and gifts. Laid-back and fun, Yolo is a Salida staple ' +
        'for relaxed Colorado style that works as well on the river as it does around town.',
      category: 'boutique',
      tier: 'free',
      address: '100 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 539-2150',
      tags: ['casual clothing', 'men\'s', 'women\'s', 'footwear', 'accessories', 'gifts'],
      isFeatured: false,
      isClaimed: false,
    },
    {
      slug: 'drift-and-amble',
      name: 'Drift & Amble',
      shortDescription: 'Hand-printed apparel, letterpress cards, and Colorado-inspired gifts.',
      description:
        'Drift & Amble is an independent printmaking studio and shop on N F Street, ' +
        'offering hand-printed apparel, letterpress greeting cards, handmade jewelry, ' +
        'and Colorado-inspired art prints. Everything is made with care and creative intention — ' +
        'a perfect stop for gifts that feel as original as Salida itself.',
      category: 'boutique',
      tier: 'free',
      address: '117 N F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(720) 507-9044',
      tags: ['hand-printed apparel', 'letterpress', 'art prints', 'handmade jewelry', 'Colorado gifts'],
      isFeatured: false,
      isClaimed: false,
    },
    {
      slug: 'in-the-current-imports',
      name: 'In The Current Imports',
      shortDescription: 'Hand-curated art, clothing, jewelry, and home decor from around the world.',
      description:
        'In The Current Imports brings together hand-curated art, clothing, jewelry, and home decor ' +
        'from diverse cultural traditions around the world. ' +
        'The eclectic collection reflects Salida\'s creative, globally curious spirit — ' +
        'a unique destination for travelers and locals seeking something truly one of a kind.',
      category: 'boutique',
      tier: 'free',
      address: '114 E 1st Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 539-2321',
      tags: ['imports', 'world clothing', 'global art', 'jewelry', 'home decor'],
      isFeatured: false,
      isClaimed: false,
    },

    // ── Outdoor Gear ───────────────────────────────────────────────────────
    {
      slug: 'headwaters-outdoor',
      name: 'Headwaters Outdoor Equipment',
      shortDescription: 'The Arkansas River valley\'s premier outdoor gear shop since 2003.',
      description:
        'Headwaters Outdoor Equipment is the go-to outfitter for river sports, climbing, hiking, ' +
        'and all-season adventure in the Arkansas River valley. ' +
        'Stocking kayaks, SUPs, climbing gear, backpacking essentials, and technical apparel, ' +
        'with expert staff who are active guides and athletes on the Arkansas. ' +
        'An authorized Patagonia dealer and the anchor of Salida\'s outdoor retail scene since 2003.',
      category: 'outdoor-gear',
      tier: 'premium',
      address: '228 N F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 539-4506',
      website: 'https://headwatersoutdoor.com',
      tags: ['kayaking', 'SUP', 'climbing', 'hiking', 'Patagonia', 'Arkansas River', 'rentals'],
      isFeatured: true,
      isClaimed: true,
    },
    {
      slug: 'salida-mountain-sports',
      name: 'Salida Mountain Sports',
      shortDescription: 'Authorized North Face dealer — outdoor gear, apparel, and ski equipment.',
      description:
        'Salida Mountain Sports on N F Street is your full-service outdoor retailer for Salida\'s ' +
        'four-season adventure scene. An authorized North Face dealer carrying outdoor gear, ' +
        'technical apparel, footwear, camping supplies, and ski/snowboard equipment. ' +
        'Whether you\'re gearing up for a 14er ascent or Monarch Mountain\'s slopes, this is your shop.',
      category: 'outdoor-gear',
      tier: 'free',
      address: '110 N F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 539-4400',
      website: 'https://salidamountainsports.com',
      tags: ['North Face', 'outdoor gear', 'ski', 'snowboard', 'apparel', 'camping', '14ers'],
      isFeatured: false,
      isClaimed: false,
    },
    {
      slug: 'badfish-surf-shop',
      name: 'Badfish Surf Shop',
      shortDescription: 'River surfboards, SUPs, and paddleboard gear on the Arkansas.',
      description:
        'Badfish is a river surfing and paddleboard brand with its own Salida retail shop — ' +
        'the only place in town to buy stand-up paddleboards, river surfboards, and surf-specific gear. ' +
        'Staff are passionate river surfers and paddlers who know the Arkansas River\'s waves firsthand. ' +
        'The perfect stop before hitting the water. Open Wednesday through Sunday.',
      category: 'outdoor-gear',
      tier: 'free',
      address: '148 E 1st Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      website: 'https://badfishsup.com',
      tags: ['paddleboard', 'SUP', 'river surfing', 'Arkansas River', 'water sports'],
      isFeatured: false,
      isClaimed: false,
    },
    {
      slug: 'bluebird-mountain-sports',
      name: 'Bluebird Mountain Sports',
      shortDescription: 'Ski and snowboard sales, rentals, and outdoor sports gear at Mt. Shavano.',
      description:
        'Bluebird Mountain Sports — formerly the legendary Mt. Shavano Ski Shop — ' +
        'is Salida\'s destination for ski and snowboard equipment sales and rentals, ' +
        'plus year-round outdoor sports gear. ' +
        'Located on US-50 at the base of Mt. Shavano\'s access road, ' +
        'it\'s the closest full-service ski shop to Monarch Mountain.',
      category: 'outdoor-gear',
      tier: 'free',
      address: '16101 US-50',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 539-3240',
      website: 'https://bluebird.online',
      tags: ['ski', 'snowboard', 'rentals', 'Monarch Mountain', 'outdoor gear', 'Mt. Shavano'],
      isFeatured: false,
      isClaimed: false,
    },

    // ── Vintage & Antique ──────────────────────────────────────────────────
    {
      slug: 'ruby-blues',
      name: 'Ruby Blues',
      shortDescription: 'Vintage clothing, vinyl records, bicycles, and curated secondhand finds.',
      description:
        'Ruby Blues is Salida\'s beloved vintage and secondhand shop on N F Street, ' +
        'carrying vintage clothing, vinyl records, bicycles, kitchenware, shoes, and housewares. ' +
        'Every visit turns up something unexpected — this is the kind of shop that makes Salida shopping special. ' +
        'Sustainable, eclectic, and deeply Salida.',
      category: 'vintage-antique',
      tier: 'free',
      address: '102 N F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 539-2268',
      tags: ['vintage clothing', 'vinyl records', 'bicycles', 'secondhand', 'thrift', 'housewares'],
      isFeatured: false,
      isClaimed: false,
    },
    {
      slug: 'true-vintage-finds',
      name: 'True Vintage Finds & Home Goods',
      shortDescription: 'Multi-vendor antique and vintage market on F Street.',
      description:
        'True Vintage Finds & Home Goods is a multi-vendor space at 134 F Street ' +
        'packed with antiques, vintage clothing, jewelry, home goods, vintage decor, and old books. ' +
        'Recently relocated to this downtown location, it\'s grown into one of Salida\'s ' +
        'favorite vintage hunting grounds — new vendors and inventory arriving regularly.',
      category: 'vintage-antique',
      tier: 'free',
      address: '134 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 239-2000',
      tags: ['antiques', 'vintage clothing', 'home goods', 'vintage decor', 'jewelry', 'old books'],
      isFeatured: false,
      isClaimed: false,
    },
    {
      slug: 'old-log-cabin-antiques',
      name: 'Old Log Cabin Antiques',
      shortDescription: 'Five authentic log cabins filled with antiques — a Salida landmark for 50 years.',
      description:
        'Old Log Cabin Antiques is one of Salida\'s most enduring businesses, ' +
        'with five authentic log cabins filled with antiques, furniture, housewares, artwork, ' +
        'outdoor accessories, quilts, glassware, and collectibles. ' +
        'Open seven days a week, 9:30 AM to 5 PM. ' +
        'Approaching its 50th anniversary — a true Colorado treasure on US-50.',
      category: 'vintage-antique',
      tier: 'free',
      address: '225 E Hwy 50',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 207-3143',
      tags: ['antiques', 'furniture', 'quilts', 'glassware', 'collectibles', 'log cabin', 'landmark'],
      isFeatured: false,
      isClaimed: false,
    },

    // ── Gift Shops ─────────────────────────────────────────────────────────
    {
      slug: 'fattees',
      name: 'Fattees',
      shortDescription: 'Screen-printed t-shirts, hoodies, and apparel designed by local Salida artists.',
      description:
        'Fattees on F Street has been printing bold, creative apparel with Salida-area designs ' +
        'for locals and visitors alike. Custom screen printing, hoodies, hats, stickers, ' +
        'and apparel featuring designs by local artists make Fattees a one-stop shop ' +
        'for Colorado keepsakes with real local character. Open daily 10 AM to 5 PM.',
      category: 'gift-shop',
      tier: 'free',
      address: '115 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 539-4599',
      website: 'https://fattees-printing.com',
      tags: ['t-shirts', 'screen printing', 'hoodies', 'local art', 'custom apparel', 'Colorado souvenirs'],
      isFeatured: false,
      isClaimed: false,
    },
    {
      slug: 'blueflower-candies',
      name: 'Blueflower Candies & Provisions',
      shortDescription: 'Fudge, chocolates, and 600+ candy varieties from around the world.',
      description:
        'Blueflower Candies & Provisions brings serious candy craft to downtown Salida — ' +
        'fudge made fresh daily, nostalgic candy organized by decade, ' +
        'and over 600 SKUs of confectionery from around the world. ' +
        'Whether you\'re shopping for a gift box or a childhood favorite, Blueflower has it. ' +
        'From the same family behind beloved locations in Leadville and Buena Vista.',
      category: 'gift-shop',
      tier: 'free',
      address: '132 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['candy', 'fudge', 'chocolate', 'sweets', 'gifts', 'nostalgic candy'],
      isFeatured: true,
      isClaimed: false,
    },
    {
      slug: 'dragonfly-gifts',
      name: 'Dragonfly Gifts',
      shortDescription: 'Crystals, gemstone jewelry, Raku pottery, candles, and artisan gifts.',
      description:
        'Dragonfly Gifts on F Street is a Salida institution for crystals, ' +
        'gemstone jewelry, Himalayan salt lamps, Raku pottery, incense, candles, ' +
        'and Woodstock wind chimes. ' +
        'The kind of shop you\'ll spend longer in than you planned — ' +
        'perfect for gifts, personal treasures, or simply browsing the magical selection. ' +
        'Open Monday through Saturday 10 AM to 5 PM, Sunday from noon.',
      category: 'gift-shop',
      tier: 'free',
      address: '221 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 539-4448',
      tags: ['crystals', 'gemstone jewelry', 'Raku pottery', 'candles', 'Himalayan salt lamp', 'wind chimes', 'incense'],
      isFeatured: false,
      isClaimed: false,
    },

    // ── Jewelry & Artisan ──────────────────────────────────────────────────
    {
      slug: 'krivanek-jewelers',
      name: 'Krivanek Jewelers',
      shortDescription: 'Custom jewelry design, fine gemstones, and expert jewelry repair.',
      description:
        'Krivanek Jewelers — also known as GemFactory — is Salida\'s destination for ' +
        'custom jewelry design, fine gemstones, and professional jewelry repair. ' +
        'With an on-site studio, they create one-of-a-kind pieces from scratch or remake ' +
        'treasured heirlooms. Colorado sapphires, turquoise, and rare gemstones are a specialty. ' +
        'Open Tuesday through Saturday, 10 AM to 5 PM.',
      category: 'jewelry-artisan',
      tier: 'premium',
      address: '101 F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 539-7493',
      tags: ['custom jewelry', 'gemstones', 'Colorado sapphires', 'turquoise', 'jewelry repair', 'fine jewelry'],
      isFeatured: true,
      isClaimed: true,
    },
    {
      slug: 'riveting-experience-jewelry',
      name: 'Riveting Experience Jewelry',
      shortDescription: 'Wine-and-design jewelry studio — make your own piece with expert guidance.',
      description:
        'Riveting Experience Jewelry is Salida\'s unique wine-and-design jewelry studio, ' +
        'where you sit down with experienced metalsmiths to create your own handcrafted piece. ' +
        'Sip wine, learn metalsmithing basics, and leave with something you actually made. ' +
        'Perfect for date nights, bachelorette parties, or anyone who wants a truly personal souvenir.',
      category: 'jewelry-artisan',
      tier: 'free',
      address: '121 N F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 530-3032',
      tags: ['make your own jewelry', 'metalsmithing', 'wine and design', 'studio', 'unique experience'],
      isFeatured: false,
      isClaimed: false,
    },

    // ── Markets ────────────────────────────────────────────────────────────
    {
      slug: 'salida-farmers-market',
      name: 'Salida Farmers Market',
      shortDescription: 'Saturday farmers market at Alpine Park — June through October.',
      description:
        'The Salida Farmers Market is held every Saturday morning from June through October ' +
        'at Alpine Park, 404 E Street (corner of 5th & E Street) in downtown Salida. ' +
        'Operated by the Foodshed Alliance, the market brings together Chaffee County\'s ' +
        'farmers, ranchers, bakers, and artisans: fresh produce, grass-fed meats, ' +
        'artisan breads, local honey, handmade crafts, and live music. ' +
        'The perfect complement to a morning of gallery and boutique shopping on F Street.',
      category: 'market',
      tier: 'free',
      address: 'Alpine Park, 404 E Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      website: 'https://salidafarmersmarket.com',
      tags: ['farmers market', 'fresh produce', 'artisan', 'Saturday', 'seasonal', 'local food', 'live music'],
      isFeatured: true,
      isClaimed: false,
    },

    // ── Home & Decor ───────────────────────────────────────────────────────
    {
      slug: 'limber-grove-salida',
      name: 'Limber Grove',
      shortDescription: 'Women\'s clothing, apothecary, candles, and gifts from 100+ Colorado makers.',
      description:
        'Limber Grove on N F Street carries women\'s clothing alongside an exceptional selection ' +
        'of apothecary items, candles, and locally sourced gifts from over 100 Colorado makers. ' +
        'The shop reflects the spirit of Colorado\'s creative small towns — beautiful, intentional, ' +
        'and rooted in local craft. A Breckenridge-born brand that has found a perfect home in Salida.',
      category: 'home-decor',
      tier: 'free',
      address: '143 N F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['women\'s clothing', 'apothecary', 'candles', 'Colorado makers', 'gifts', 'home goods'],
      isFeatured: false,
      isClaimed: false,
    },

    // ── Books & Music ──────────────────────────────────────────────────────
    {
      slug: 'salida-books',
      name: 'Salida Books',
      shortDescription: 'Independent bookstore with new and used books in the heart of downtown.',
      description:
        'Salida Books is the town\'s beloved independent bookstore, carrying new and used ' +
        'fiction, non-fiction, classics, and a well-stocked children\'s section. ' +
        'The kind of bookstore you browse for hours, leave with more than you planned, ' +
        'and return to every visit. Open Monday and Wednesday through Sunday, 10 AM to 6 PM.',
      category: 'books-music',
      tier: 'free',
      address: '109 N F Street, Suite A',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 626-1377',
      tags: ['books', 'independent bookstore', 'new books', 'used books', 'children\'s books', 'fiction'],
      isFeatured: false,
      isClaimed: false,
    },
    {
      slug: 'suttys-downtown-records',
      name: "Sutty's Downtown Records & Arts",
      shortDescription: 'Boutique vinyl record shop and contemporary art gallery combined.',
      description:
        "Sutty's Downtown Records & Arts is Salida's unique pairing of a vinyl record shop " +
        'and contemporary art gallery — two creative worlds that belong together. ' +
        'Browse new LPs alongside fresh, affordable contemporary art in a laid-back atmosphere. ' +
        "A must for music and art lovers, and one of Salida's most original retail spaces.",
      category: 'books-music',
      tier: 'free',
      address: '110 E 1st Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      tags: ['vinyl records', 'LP', 'contemporary art', 'record shop', 'music', 'gallery'],
      isFeatured: false,
      isClaimed: false,
    },

    // ── Food & Specialty ───────────────────────────────────────────────────
    {
      slug: 'arlies-jug-liquors',
      name: "Arlie Dale's Jug Liquors",
      shortDescription: "Salida's oldest downtown liquor store — beer, wine, and spirits.",
      description:
        "Arlie Dale's Jug Liquors at 220 N F Street is a Salida institution — " +
        "the longest-running liquor store at this downtown location. " +
        'Stocking a strong selection of craft beers, Colorado wines, and spirits from around the world. ' +
        'A convenient stop before heading to the river, the mountains, or a vacation rental.',
      category: 'food-specialty',
      tier: 'free',
      address: '220 N F Street',
      city: 'Salida',
      state: 'CO',
      zip: '81201',
      phone: '(719) 539-0111',
      website: 'https://jugliquors.com',
      tags: ['liquor', 'beer', 'wine', 'spirits', 'craft beer', 'Colorado wine'],
      isFeatured: false,
      isClaimed: false,
    },

    // ── Featured Partners — Day Trip Adventure (Canon City / Royal Gorge) ──
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

    // ── Featured Partners — Dining Near the Gorge (Canon City) ────────────
    {
      slug: 'whitewater-bar-grill',
      name: 'Whitewater Bar & Grill',
      shortDescription: "Canon City's favorite bar and grill — open April through October.",
      description:
        'Whitewater Bar & Grill is the go-to post-adventure spot in Canon City — great burgers, local Colorado craft beers, ' +
        'and a lively atmosphere that welcomes rafters, hikers, and Salida shoppers alike. ' +
        'Open seasonally April 17 through October 31. ' +
        'Located in Canon City, 45 minutes east of Salida on US-50.',
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

Salida's gallery scene is extraordinary for a town of its size (population ~5,000). From **Eye Candy Art and Treasure** (118 N F Street) — representing 40+ artists across paintings, sculpture, and artisan jewelry — to the working pottery studios at **The Maverick Potter** (148 N F Street), you can spend an entire day gallery-hopping without leaving downtown.

**Four Winds Gallery** (118 F Street) has been a downtown fixture since 2005, and **Bork and Watkins Gallery** (149 W 1st Street) brings a distinctive husband-and-wife perspective with landscape paintings and whimsical felted sculpture. Many galleries participate in the monthly FIRSTfriday openings and the summer ArtWalk series.

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
        "From hand-printed apparel to curated women's fashion and world imports, downtown Salida has a boutique for every style. Here's our guide to the best shopping on F Street.",
      content: `# The Best Boutiques in Downtown Salida, Colorado

Shopping in Salida isn't like shopping anywhere else in Colorado. The boutiques along **F Street** and the surrounding historic downtown blocks are a reflection of the town itself: creative, independent, a little wild, and deeply authentic.

## What to Expect

Forget big-box stores and chain retail. Salida's boutiques are owner-operated, with personalities as distinct as the mountains that surround them. You'll find everything from curated women's fashion to hand-printed apparel, global imports, and locally sourced gifts.

## Top Boutiques to Visit

### Opal Boutique
Located at 128 F Street, Opal is Salida's premier women's fashion destination — modern, stylish apparel, accessories, and footwear curated for mountain-town life and beyond. Open Monday through Saturday 10 AM to 5 PM, Sunday 11 AM to 4:30 PM. Call (719) 539-2515.

### Drift & Amble
An independent printmaking studio and shop at 117 N F Street, Drift & Amble offers hand-printed apparel, letterpress greeting cards, handmade jewelry, and Colorado-inspired art prints. Everything is made with creative intention — perfect for gifts with real local character.

### Salida Mountain Sports
At 110 N F Street, Salida Mountain Sports is an authorized North Face dealer stocking outdoor apparel alongside technical gear. The go-to for hikers, climbers, and skiers looking to dress for the adventure ahead. Call (719) 539-4400.

### In The Current Imports
At 114 E 1st Street, In The Current brings hand-curated art, clothing, jewelry, and home decor from diverse cultural traditions around the world — an eclectic, globally curious shop perfectly suited to Salida's spirit.

### Yolo
The casual, laid-back counterpart to Salida's boutique scene: 100 F Street carries clothing for men, women, and juniors alongside footwear and accessories. Great for relaxed Colorado style that works on the river or around town.

## Shopping Tips

- **Go on a Saturday** to combine boutique shopping with the Salida Farmers Market (Alpine Park, 404 E Street)
- **First Fridays** (June–September) keep stores open late with the ArtWalk crowd — a festive shopping night
- Most boutiques are within a 5-minute walk of each other along F Street
- Look for the **Shop Salida** premium badge — verified listings with full hours, photos, and contact details

Browse all boutiques in our [directory](/directory?category=boutique).`,
      metaDescription:
        "Discover the best boutiques in downtown Salida, Colorado — women's fashion, hand-printed apparel, outdoor gear, and global imports along historic F Street.",
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

The anchor of Salida's outdoor retail scene, Headwaters has been outfitting river runners, climbers, and hikers in the Arkansas River valley since 2003. An authorized Patagonia dealer, their staff are local experts — many are guides on the Arkansas — and they stock an exceptional selection of:

- Kayaks, SUPs, and river gear (sales + rentals)
- Rock climbing hardware and footwear
- Backpacking equipment for 14er approaches
- Technical apparel for all seasons

228 N F Street | (719) 539-4506

## Badfish Surf Shop

For stand-up paddleboarding and river surfing, Badfish Surf Shop at 148 E 1st Street is your source. Badfish is a respected river surfing brand with its own Salida retail location — staff are passionate paddlers with deep knowledge of the Arkansas River's best runs and wave spots. Open Wednesday through Sunday.

## Salida Mountain Sports

An authorized North Face dealer at 110 N F Street, Salida Mountain Sports carries a full range of outdoor gear, apparel, footwear, camping supplies, and ski/snowboard equipment. The go-to for hikers heading into the Sawatch Range or skiers bound for Monarch Mountain. Call (719) 539-4400.

## Bluebird Mountain Sports

Formerly the legendary Mt. Shavano Ski Shop, Bluebird Mountain Sports (16101 US-50) specializes in ski and snowboard sales and rentals — the closest full-service ski shop to Monarch Mountain, open daily. Call (719) 539-3240.

## Before You Head Out

The Arkansas River through Browns Canyon runs best in **May and June** during snowmelt. For 14ers, the prime window is **July and August** (start early — afternoon thunderstorms are deadly). Mountain biking is excellent from **June through October**, with Monarch Crest peaking in fall color.

Check our [directory](/directory?category=outdoor-gear) for the full list of outdoor retailers in Salida.`,
      metaDescription:
        'Find the best outdoor gear shops in Salida, Colorado for Arkansas River adventures, 14er hikes, and mountain biking. Headwaters Outdoor, Badfish Surf Shop, Salida Mountain Sports, and more.',
      tags: ['salida outdoor gear', 'arkansas river', 'salida colorado', 'kayaking', '14ers', 'mountain biking'],
      isPublished: true,
      publishedAt: new Date('2024-08-01'),
      authorName: 'Shop Salida',
    },
    {
      slug: 'salida-artisan-jewelry-makers',
      title: "Salida's Artisan Jewelry Makers: Handcrafted Colorado Gems",
      excerpt:
        "Colorado sapphires, turquoise, and custom-made pieces crafted in-studio — Salida's jewelry makers create wearable art rooted in the Rocky Mountain landscape.",
      content: `# Salida's Artisan Jewelry Makers: Handcrafted Colorado Gems

There's something special about wearing a piece of jewelry made by hand in a mountain town. In Salida, the jewelry-making tradition runs deep — part of the broader Creative District culture that has attracted craftspeople and artisans from across the country.

## What Makes Salida Jewelry Unique

Several factors set Salida's jewelry scene apart:

**Colorado-sourced materials.** The state is home to remarkable gemstones — Colorado turquoise, Colorado sapphires, smoky quartz from the Pikes Peak region, and rare specimens found throughout the Rockies. Many Salida jewelers incorporate these local stones.

**Studio-made.** Unlike mass-produced souvenir jewelry, Salida's artisan pieces are designed and fabricated on-site. When you buy from a studio like **Krivanek Jewelers**, you're buying directly from the maker.

**Mountain aesthetic.** Designs tend toward organic forms — river stone settings, branch-like metalwork, mountain silhouettes — reflecting the landscape outside the studio window.

## Krivanek Jewelers

Also known as GemFactory, Krivanek Jewelers at 101 F Street is Salida's destination for custom jewelry design, fine gemstones, and expert jewelry repair. With an on-site studio, they create one-of-a-kind pieces featuring Colorado sapphires, turquoise, and other precious stones. Custom commissions are a specialty — perfect for engagement rings, anniversary pieces, or memorial jewelry. Open Tuesday through Saturday, 10 AM to 5 PM. Call (719) 539-7493.

## Riveting Experience Jewelry

For something truly unforgettable, Riveting Experience Jewelry at 121 N F Street offers a wine-and-design make-your-own jewelry experience. Sit down with experienced metalsmiths, sip wine, learn the basics of metalsmithing, and leave with a handcrafted piece you actually made yourself. Perfect for date nights, bachelorette parties, and travelers who want a deeply personal souvenir. Call (719) 530-3032.

## Shopping Tips

- Visit during the **ArtWalk** (June–September first weekends) for studio-open events where you can meet the makers
- Custom work typically takes 4–8 weeks; plan ahead if you want something made to order
- Browse our [jewelry & artisan listings](/directory?category=jewelry-artisan) for the full directory

A piece of Salida jewelry is more than a souvenir — it's a Colorado heirloom.`,
      metaDescription:
        "Discover Salida, Colorado's handcrafted jewelry makers — Colorado sapphires, turquoise, and custom-made pieces at Krivanek Jewelers and Riveting Experience Jewelry.",
      tags: ['salida jewelry', 'colorado sapphires', 'handcrafted jewelry', 'artisan jewelry', 'salida colorado'],
      isPublished: true,
      publishedAt: new Date('2024-09-01'),
      authorName: 'Shop Salida',
    },
    {
      slug: 'salida-to-royal-gorge-day-trip',
      title: 'Shopping + Adventure: The Perfect Salida to Royal Gorge Day Trip',
      excerpt:
        "Start your morning browsing Salida's galleries and boutiques, then take the scenic 45-minute drive east on US-50 for world-class rafting or ziplines at Royal Gorge — and end with dinner at Whitewater Bar & Grill in Canon City.",
      content: `# Shopping + Adventure: The Perfect Salida to Royal Gorge Day Trip

This is Colorado at its best: a morning of art and boutique shopping in one of the state's most creative small towns, followed by an afternoon of world-class outdoor adventure at one of its most dramatic natural landmarks — all in a single day.

## Getting Here

**From Colorado Springs (COS):** 1 hour west on US-50 to Canon City, then 45 minutes further west to Salida. Total: approximately 1 hour 45 minutes.

**From Denver (DEN):** 2 hours south and west via I-25 and US-50. Head through Colorado Springs or take the scenic route through South Park on US-285. Total: approximately 2 hours.

**Pro tip:** Start in Salida (further west) and work your way east toward Canon City — you'll end the day near the Royal Gorge and Canon City restaurants without backtracking.

## Morning: Explore Salida's Creative District (9 AM – 12 PM)

Park once and walk. Downtown Salida's F Street and surrounding blocks are the heart of **Colorado's largest Certified Creative District** — over 100 working artists and 50+ arts businesses in a walkable footprint.

### Where to Start

**Eye Candy Art and Treasure** (118 N F Street) represents 40+ artists across paintings, sculpture, and artisan jewelry — give yourself 30 to 45 minutes to browse. A block away, **The Maverick Potter** (148 N F Street, (719) 539-5112) offers hand-thrown pottery, blown glass, and handmade jewelry in a working studio setting open since 2008.

### Shop the Boutiques

**Opal Boutique** (128 F Street, (719) 539-2515) carries curated women's apparel — perfect for a Colorado-inspired wardrobe refresh. For something more eclectic, **Drift & Amble** (117 N F Street) has hand-printed apparel, letterpress cards, and Colorado art prints.

If someone in your group is an outdoor enthusiast, **Headwaters Outdoor Equipment** (228 N F Street, (719) 539-4506) stocks everything for the afternoon's adventure — river gear, quick-dry layers, and local beta from staff who actually paddle and climb here.

### Pick Up Gifts

- **Blueflower Candies & Provisions** (132 F Street) for fudge, chocolate, and 600+ candy varieties — perfect packable gifts
- **Dragonfly Gifts** (221 F Street, (719) 539-4448) for crystals, Raku pottery, candles, and artisan finds
- **Krivanek Jewelers** (101 F Street, (719) 539-7493) for handcrafted fine jewelry made in-studio

## Lunch in Salida (12 PM – 1 PM)

Downtown Salida has excellent lunch options along F Street and Sackett Avenue. Grab a meal before the drive — you'll want energy for the afternoon.

## The Drive: Salida to Canon City (1 PM – 1:45 PM)

Head east on **US-50** — one of Colorado's most scenic highway stretches. You'll follow the Arkansas River through Browns Canyon National Monument, past rolling ranch land, through the narrows, and into Cañon City. The drive is 45 minutes and worth slowing down for.

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
Open seasonally April 17 through October 31. Classic Colorado bar and grill with great burgers, local beers, and a deck perfect for reliving the day's adventures. Arrive early — it fills up on summer evenings.

### Whitewater Rooftop Social
**(719) 451-7241 | wwrooftopsocial.com**
Open year-round. Rooftop dining and cocktails with views of Canon City's skyline and the mountains beyond. Elevated food and atmosphere — the perfect cap to a Colorado day.

## The Full Itinerary at a Glance

- **9 AM** — Arrive in Salida, park downtown, start at Eye Candy Art and Treasure
- **9–12 PM** — Gallery hop, boutique shopping, pick up gifts on F Street
- **12 PM** — Lunch in Salida
- **1 PM** — Depart east on US-50 (45-minute scenic drive)
- **2 PM** — Arrive Canon City / Royal Gorge
- **2–5 PM** — Raft the Royal Gorge or fly over it on the ziplines
- **6 PM** — Dinner at Whitewater Bar & Grill or Rooftop Social in Canon City

**Browse the [Salida Shopping Directory](/directory) to plan your morning stops.**`,
      metaDescription:
        "The perfect Colorado day trip: morning shopping in Salida's Creative District, then a 45-minute drive east to world-class rafting and ziplines at Royal Gorge. Driving directions from Denver (2 hrs) and Colorado Springs (1 hr 45 min).",
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

Start at **Eye Candy Art and Treasure** (118 N F Street) — 40+ artists, fine artisan jewelry, paintings, and sculpture in a beautiful downtown gallery. Give yourself 30–45 minutes; the rotating exhibitions are worth it.

From there, work your way through the Creative District:

- **The Maverick Potter** (148 N F Street, (719) 539-5112) — Hand-thrown pottery, blown glass, and handmade jewelry from 20+ artists in a working studio. Mark Rittmann has been making pots here since 2008.
- **Four Winds Gallery** (118 F Street, (719) 539-7459) — Owner Linda Frances has curated this welcoming gallery since 2005: oil paintings, mixed media, Colorado pottery, and nature photography.
- **Brodeur Studio Gallery** (133 E Second Street) — Colorful abstract and impressionistic paintings by international artist Paulette Brodeur, celebrating the Colorado landscape since 1994.
- **Bork and Watkins Gallery** (149 W 1st Street) — A charming husband-and-wife gallery featuring Carl Bork's landscape paintings alongside Karen Watkins's whimsical felted sculptures.

### Lunch Break (12 PM – 1 PM)

Refuel downtown before the afternoon boutique circuit. Salida's F Street and Sackett Avenue have excellent lunch spots.

### Afternoon: Boutiques & Artisan Shopping (1 PM – 5 PM)

**Opal Boutique** (128 F Street, (719) 539-2515) is the go-to for curated women's apparel — thoughtfully selected pieces that work for mountain-town life and city life alike.

**Drift & Amble** (117 N F Street) is pure Salida spirit: hand-printed apparel, letterpress cards, handmade jewelry, and Colorado art prints made with real creative intention.

For gifts, **Blueflower Candies & Provisions** (132 F Street) has the best selection of fudge, chocolates, and 600+ candy varieties — beautifully packaged and perfect for taking home.

**Krivanek Jewelers** (101 F Street, (719) 539-7493) deserves dedicated time. Custom-designed fine jewelry featuring Colorado sapphires, turquoise, and rare gemstones — made in-studio by expert craftspeople. Open Tue–Sat, 10 AM to 5 PM.

**Dragonfly Gifts** (221 F Street, (719) 539-4448) stocks crystals, Raku pottery, Himalayan salt lamps, artisan candles, and gemstone jewelry — the kind of shop you'll browse longer than planned.

### Late Afternoon: Gear Up for Tomorrow (4 PM – 5 PM)

Stop by **Headwaters Outdoor Equipment** (228 N F Street, (719) 539-4506) if you need anything for tomorrow's adventure — quick-dry layers, river sandals, or expert local advice on what to expect on the Arkansas.

### Evening in Salida

Saturday evenings in Salida are lively. If your weekend falls on the **first weekend of June, July, August, or September**, you'll have the **Salida ArtWalk** — galleries open late, artists on-site, street energy throughout the Creative District.

On any Saturday morning, the **Salida Farmers Market** runs at **Alpine Park, 404 E Street** (corner of 5th & E) from June through October — fresh produce, artisan crafts, local food, and live music.

---

## Day 2: Royal Gorge Adventure

### Morning: Final Salida Stop (9 AM – 10 AM)

Before leaving, browse **Salida Books** (109 N F Street, Suite A, (719) 626-1377) for a great trail read or Colorado title to take home — one of the region's best independent bookstores, open Monday and Wednesday through Sunday. Or stop into **Sutty's Downtown Records & Arts** (110 E 1st Street) for a vinyl LP and some fresh contemporary art.

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
Open April 17 through October 31. The quintessential post-adventure meal: great burgers, Colorado craft beers, and the kind of atmosphere that comes from a room full of people who just had the best day of their summer.

**Whitewater Rooftop Social** (Canon City) — **(719) 451-7241 | wwrooftopsocial.com**
Open year-round. Elevated rooftop dining with cocktails and mountain views. The more upscale option — ideal if you want to celebrate the weekend properly before heading home.

### The Drive Home (7 PM)

**To Colorado Springs (COS area):** Head east on US-50 — 1 hour back to Colorado Springs.
**To Denver (DEN area):** East on US-50 to Colorado Springs, then north on I-25 — approximately 2 hours total.

---

## Weekend at a Glance

**Saturday**
- 9 AM: Eye Candy Art and Treasure → F Street galleries (The Maverick Potter, Four Winds, Brodeur, Bork & Watkins)
- 12 PM: Lunch in Salida
- 1 PM: Boutiques — Opal Boutique, Drift & Amble, Krivanek Jewelers, Blueflower Candies, Dragonfly Gifts
- 4 PM: Headwaters Outdoor (gear up for tomorrow)
- Evening: ArtWalk if first weekend of month (June–September)

**Sunday**
- 9 AM: Salida Books or Sutty's Downtown Records & Arts
- 10 AM: Drive east on US-50 (45 minutes)
- 11 AM: Raft the Royal Gorge (royalgorgerafting.net, (719) 275-7238) or Zipline Tours (royalgorgeziplinetours.com, (719) 275-7238)
- 2 PM: Explore Canon City
- 5 PM: Dinner at Whitewater Bar & Grill ((719) 269-1009) or Rooftop Social ((719) 451-7241)
- 7 PM: Drive home

**Browse the full [Salida Shopping Directory](/directory) to plan your stops.**`,
      metaDescription:
        "The ultimate 2-day Colorado weekend: gallery-hopping and boutique shopping in Salida's Creative District, then world-class rafting and ziplines at Royal Gorge. Full itinerary with drive times from Denver (2 hrs) and Colorado Springs (1 hr 45 min).",
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
