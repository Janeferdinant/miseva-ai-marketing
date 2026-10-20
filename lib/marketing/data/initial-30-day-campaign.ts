/**
 * MISEVA AI — 30-DAY SOCIAL MEDIA CAMPAIGN TEMPLATE
 * Populated from docs/marketing/30-day-content-calendar.md,
 * short-form-video-scripts.md, and instagram-carousels.md.
 */

import {
  CampaignPhase,
  ContentPillar,
  ContentStatus,
  CreativeFormat,
  PlatformType,
  type MarketingPost
} from '../types/marketing-types';

export const INITIAL_30_DAY_CAMPAIGN: MarketingPost[] = [
  // --- PHASE 1: THE TEASE & PHILOSOPHY (DAYS 1-5) ---
  {
    id: 'miseva-day-01',
    dayNumber: 1,
    title: 'The Chaos of Cooking vs Mise en Place',
    phase: CampaignPhase.TEASE,
    pillar: ContentPillar.BRAND_PHILOSOPHY,
    status: ContentStatus.PUBLISHED,
    format: CreativeFormat.VERTICAL_VIDEO_SHORT,
    platforms: [PlatformType.INSTAGRAM_REEL, PlatformType.YOUTUBE_SHORTS],
    englishContent: {
      hook: 'Why is dinner prep always chaotic? Professional chefs have a 100-year-old secret.',
      script: '0-5s: Cook frantically searching for spices while oil smokes. 5-15s: Michelin-star prep with ingredients measured in glass ramekins. 15-25s: Introduction to mise en place.',
      caption: 'Before the stove ever turns on, French chefs practice "Mise en place" — everything in its place. What if your phone could do that for you? Something intelligent is coming. #MisevaAI #CookingHacks #MiseEnPlace',
      hashtags: ['#MisevaAI', '#MiseEnPlace', '#CookingHacks', '#KitchenSecrets', '#HomeCooking'],
      callToAction: 'Follow @misevaai for the upcoming launch.'
    },
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'WebSpeech / ElevenLabs Authorized Model',
      audioLicense: 'Original Acoustic Kitchen Audio',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-10-21T18:30:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-01-published',
    publishingLogs: [
      {
        timestamp: '2026-10-21T18:30:05.000Z',
        platform: PlatformType.INSTAGRAM_REEL,
        status: 'SUCCESS',
        externalPostId: 'ig_mock_day01_101',
        externalUrl: 'https://instagram.com/reel/mock101',
        retryAttempt: 0
      }
    ],
    metrics: {
      views: 14200,
      reach: 12800,
      impressions: 16500,
      averageWatchTimeSeconds: 18.4,
      completionRatePercent: 78.2,
      likes: 1240,
      comments: 89,
      shares: 310,
      saves: 540,
      profileVisits: 820,
      websiteClicks: 410,
      appStoreVisits: 0,
      installs: 0,
      cookingSessions: 0,
      premiumTrials: 0,
      subscriptions: 0,
      attributionType: 'OBSERVED',
      lastUpdated: '2026-10-22T08:00:00.000Z'
    }
  },
  {
    id: 'miseva-day-02',
    dayNumber: 2,
    title: '5 Habits of Michelin-Star Chefs That Save 40 Mins',
    phase: CampaignPhase.TEASE,
    pillar: ContentPillar.BRAND_PHILOSOPHY,
    status: ContentStatus.PUBLISHED,
    format: CreativeFormat.CAROUSEL_DECK,
    platforms: [PlatformType.INSTAGRAM_CAROUSEL, PlatformType.FACEBOOK],
    englishContent: {
      hook: '5 kitchen habits that eliminate 40 minutes of dinner stress every single night.',
      caption: 'Slide 1: Clean board rule. Slide 2: Measure liquids before heat. Slide 3: Salt in three waves. Slide 4: Damp towel under your cutting board. Slide 5: Digital mise en place. Save this for tonight!',
      hashtags: ['#ChefLife', '#KitchenHacks', '#MisevaAI', '#CulinaryArt', '#FoodPrep'],
      callToAction: 'Save this post and follow @misevaai'
    },
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'N/A (Visual Carousel)',
      audioLicense: 'N/A',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-10-22T19:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-02-published',
    publishingLogs: []
  },
  {
    id: 'miseva-day-03',
    dayNumber: 3,
    title: 'Academic Research to Kitchen AI: The Miseva Story',
    phase: CampaignPhase.TEASE,
    pillar: ContentPillar.BRAND_PHILOSOPHY,
    status: ContentStatus.PUBLISHED,
    format: CreativeFormat.TEXT_IMAGE_POST,
    platforms: [PlatformType.LINKEDIN],
    englishContent: {
      hook: 'How CSE research in edge-AI and ambient voice synthesis created a co-pilot for home cooks.',
      caption: 'Under academic supervision with Jane Rose, Assistant Professor, CSE, our team set out to solve a real engineering challenge: acoustic noise suppression in boiling kitchens and screen-awake state handling. Proud to preview Miseva AI.',
      hashtags: ['#ArtificialIntelligence', '#EdTech', '#ComputerScience', '#MisevaAI', '#Innovation'],
      callToAction: 'Connect with our engineering team at miseva.ai'
    },
    assetProvenance: {
      dishImage: '/brand/images/app-experience.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'N/A',
      audioLicense: 'N/A',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-10-23T11:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-03-published',
    publishingLogs: []
  },
  {
    id: 'miseva-day-04',
    dayNumber: 4,
    title: '48 Hours to Launch: Sound On',
    phase: CampaignPhase.TEASE,
    pillar: ContentPillar.BRAND_PHILOSOPHY,
    status: ContentStatus.PUBLISHED,
    format: CreativeFormat.VERTICAL_VIDEO_SHORT,
    platforms: [PlatformType.INSTAGRAM_REEL, PlatformType.YOUTUBE_SHORTS],
    englishContent: {
      hook: '48 hours until your kitchen gets an intelligent co-pilot.',
      script: 'Sizzling tadka ASMR, steam rising from earthen pot, subtle emerald liquid-glass interface transition.',
      caption: 'Your ingredients. Your imagination. Your AI Chef. Get ready for Miseva AI. Launching in 48 hours.',
      hashtags: ['#Countdown', '#MisevaAI', '#KitchenCoPilot', '#CookingApp'],
      callToAction: 'Turn on post notifications!'
    },
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'WebSpeech / Studio Voice',
      audioLicense: 'Original Acoustic Kitchen Audio',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-10-24T18:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-04-published',
    publishingLogs: []
  },
  {
    id: 'miseva-day-05',
    dayNumber: 5,
    title: 'The Philosophy of Seva: Culinary Devotion',
    phase: CampaignPhase.TEASE,
    pillar: ContentPillar.BRAND_PHILOSOPHY,
    status: ContentStatus.PUBLISHED,
    format: CreativeFormat.TEXT_IMAGE_POST,
    platforms: [PlatformType.YOUTUBE, PlatformType.FACEBOOK],
    englishContent: {
      hook: 'Why we named our AI chef Miseva: The union of Mise en Place and Seva.',
      caption: 'In Indian culinary traditions, feeding someone is Seva (selfless hospitality). Miseva pairs French culinary discipline with the warm heart of home cooking. Tomorrow, the journey begins.',
      hashtags: ['#MisevaAI', '#Hospitality', '#IndianCulture', '#FoodStory'],
      callToAction: 'Subscribe on YouTube for tomorrow’s grand reveal.'
    },
    assetProvenance: {
      dishImage: '/brand/images/tablescaping-sadya.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'N/A',
      audioLicense: 'N/A',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-10-25T17:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-05-published',
    publishingLogs: []
  },

  // --- PHASE 2: THE GRAND REVEAL & LAUNCH (DAYS 6-10) ---
  {
    id: 'miseva-day-06',
    dayNumber: 6,
    title: 'Official Brand Reveal: Introducing Miseva AI',
    phase: CampaignPhase.LAUNCH,
    pillar: ContentPillar.AI_CHEF_TUTORIAL,
    status: ContentStatus.PUBLISHED,
    format: CreativeFormat.VERTICAL_VIDEO_SHORT,
    platforms: [PlatformType.INSTAGRAM_REEL, PlatformType.YOUTUBE_SHORTS, PlatformType.FACEBOOK],
    englishContent: {
      hook: 'Meet Miseva AI: Your World. Your Kitchen. Your AI Chef.',
      script: '0-5s: Flour on cook hands, phone screen locks. 5-15s: Cook says "Next step" — app transitions smoothly. 15-30s: 270 verified recipes across 14 cuisines, grocery price benchmarking, and Table Styling Studio.',
      caption: 'Today, we are thrilled to introduce Miseva AI! An intelligent culinary ecosystem built for modern food lovers. Hands-free voice cooking in English & Malayalam, live grocery comparisons, and 270 curated recipes. Link in bio!',
      hashtags: ['#MisevaLaunch', '#AIChef', '#SmartKitchen', '#FoodTech', '#KeralaTech'],
      callToAction: 'Experience Miseva AI today at miseva.ai'
    },
    assetProvenance: {
      dishImage: '/brand/images/app-experience.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'WebSpeech API / Android TTS (en-IN)',
      audioLicense: 'Original Acoustic Kitchen Audio',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-10-26T10:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-06-published',
    publishingLogs: []
  },
  {
    id: 'miseva-day-07',
    dayNumber: 7,
    title: 'Malayalam Voice Cooking Reveal (മലയാളത്തിൽ പാചകം)',
    phase: CampaignPhase.LAUNCH,
    pillar: ContentPillar.MALAYALAM_VOICE,
    status: ContentStatus.SCHEDULED,
    format: CreativeFormat.VERTICAL_VIDEO_SHORT,
    platforms: [PlatformType.INSTAGRAM_REEL, PlatformType.YOUTUBE_SHORTS, PlatformType.WHATSAPP],
    englishContent: {
      hook: 'Cook Kerala Fish Curry with zero touches using Malayalam voice commands.',
      script: 'Demonstrating hands-free step transitions in Malayalam while handling messy coconut and tamarind prep.',
      caption: 'Never touch your phone with oily hands again. Miseva AI listens and speaks in pure Malayalam! "അടുത്ത സ്റ്റെപ്പ്" എന്ന് പറഞ്ഞാൽ മതി. Try voice mode now!',
      hashtags: ['#MisevaAI', '#MalayalamCooking', '#KeralaFood', '#HandsFreeCooking', '#FishCurry'],
      callToAction: 'Try AI Voice Mode on web and Android'
    },
    malayalamContent: {
      hook: 'കൈ നനയാതെ ശബ്ദം കൊണ്ട് പാചകം ചെയ്യാം — മലയാളത്തിൽ ആദ്യമായി!',
      script: 'കണ്ണൂർ മീൻ കറി വെയ്ക്കുമ്പോൾ ഇനി കൈയിലെ എണ്ണയുമായി ഫോണിൽ തൊടേണ്ട. "അടുത്ത സ്റ്റെപ്പ്" എന്ന് പറഞ്ഞാൽ മിസേവ എഐ കൃത്യമായി പറഞ്ഞുതരും.',
      caption: 'മലയാളികളുടെ അടുക്കളയിലേക്ക് ഒരു ഡിജിറ്റൽ പാചക വിദഗ്ദ്ധൻ! മലയാളത്തിൽ കേൾക്കുകയും സംസാരിക്കുകയും ചെയ്യുന്ന മിസേവ എഐ ഇപ്പോൾ ലഭ്യമാണ്.',
      hashtags: ['#മിസേവഎഐ', '#മലയാളംപാചകം', '#കേരളം', '#മീൻകറി', '#AIപാചകം'],
      callToAction: 'മിസേവ എഐ ആപ്പ് സൗജന്യമായി പരീക്ഷിക്കൂ: miseva.ai'
    },
    verifiedDishId: 'kerala-meen-curry',
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'Android TTS / WebSpeech (ml-IN)',
      audioLicense: 'Original ASMR Sizzle + Malayalam VO',
      verifiedAgainstCatalog: true,
      catalogCategory: 'Indian Cuisines / Kerala'
    },
    scheduledTimeIso: '2026-10-27T18:30:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-07-scheduled',
    publishingLogs: []
  },
  {
    id: 'miseva-day-08',
    dayNumber: 8,
    title: '14 World Cuisines, 270 Verified Recipes',
    phase: CampaignPhase.LAUNCH,
    pillar: ContentPillar.WORLD_CUISINES,
    status: ContentStatus.APPROVED,
    format: CreativeFormat.CAROUSEL_DECK,
    platforms: [PlatformType.INSTAGRAM_CAROUSEL, PlatformType.PINTEREST],
    englishContent: {
      hook: 'From Kerala Sadya to Italian Risotto, Mexican Birria to Japanese Ramen: 14 Cuisines in 1 App.',
      caption: 'Every single cuisine in Miseva AI has at least 10 verified, culturally authentic recipes tested by chefs. Slide through to explore the regions!',
      hashtags: ['#WorldCuisines', '#AuthenticRecipes', '#MisevaAI', '#FoodieHeaven'],
      callToAction: 'Explore all 14 cuisines at miseva.ai'
    },
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'N/A',
      audioLicense: 'N/A',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-10-28T17:30:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-08-approved',
    publishingLogs: []
  },
  {
    id: 'miseva-day-09',
    dayNumber: 9,
    title: 'Complete Miseva AI App Walkthrough',
    phase: CampaignPhase.LAUNCH,
    pillar: ContentPillar.AI_CHEF_TUTORIAL,
    status: ContentStatus.AWAITING_APPROVAL,
    format: CreativeFormat.HORIZONTAL_VIDEO,
    platforms: [PlatformType.YOUTUBE, PlatformType.LINKEDIN],
    englishContent: {
      hook: 'How to plan meals, compare grocery prices, and cook hands-free with Miseva AI.',
      script: 'Complete 8-minute comprehensive tour: Meal planner, 2D Table Styling, Android Room DB offline sync, and real-time grocery cart optimization.',
      caption: 'Full platform walkthrough of Miseva AI! Watch how our AI cooking agent adapts in real time to your preferences and pantry items.',
      hashtags: ['#MisevaAI', '#AppWalkthrough', '#TechTutorial', '#FoodApp'],
      callToAction: 'Watch full video and download the Android app'
    },
    assetProvenance: {
      dishImage: '/brand/images/app-experience.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'Studio Voice (en-IN)',
      audioLicense: 'Licensed Acoustic Ambient',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-10-29T16:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-09-awaiting',
    publishingLogs: []
  },
  {
    id: 'miseva-day-10',
    dayNumber: 10,
    title: 'Tablescaping Aesthetic: 40 Curated Concepts',
    phase: CampaignPhase.LAUNCH,
    pillar: ContentPillar.TABLE_STYLING,
    status: ContentStatus.AWAITING_APPROVAL,
    format: CreativeFormat.PIN_STORY,
    platforms: [PlatformType.PINTEREST, PlatformType.INSTAGRAM_CAROUSEL],
    englishContent: {
      hook: 'Elevate your dinner parties: 40 breathtaking tablescaping concepts by Miseva AI.',
      caption: 'From traditional Onam banana leaf arrangements to minimalist Nordic candlelit dining, generate tableware shopping lists and top-down arrangements instantly.',
      hashtags: ['#TableStyling', '#Tablescaping', '#DinnerParty', '#MisevaAI', '#InteriorAesthetic'],
      callToAction: 'Browse Table Styling Studio at miseva.ai'
    },
    verifiedDishId: 'kerala-sadya-feast',
    assetProvenance: {
      dishImage: '/brand/images/tablescaping-sadya.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'N/A',
      audioLicense: 'N/A',
      verifiedAgainstCatalog: true,
      catalogCategory: 'Table Styling Studio / Kerala Sadya'
    },
    scheduledTimeIso: '2026-10-30T19:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-10-awaiting',
    publishingLogs: []
  },

  // --- PHASE 3: INTELLIGENCE & VOICE FOCUS (DAYS 11-18) ---
  {
    id: 'miseva-day-11',
    dayNumber: 11,
    title: 'Kitchen Timer Mastery & Screen-Awake Cooking',
    phase: CampaignPhase.FEATURE,
    pillar: ContentPillar.AI_CHEF_TUTORIAL,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.VERTICAL_VIDEO_SHORT,
    platforms: [PlatformType.INSTAGRAM_REEL, PlatformType.YOUTUBE_SHORTS],
    englishContent: {
      hook: 'Never burn your payasam or overcook pasta again.',
      script: 'Demonstrating synchronized voice step timers that count down automatically while the screen stays awake.',
      caption: 'Say goodbye to screen lockouts in the middle of boiling milk. Miseva AI keeps your screen awake and alerts you with voice timers. #KitchenHacks #CookingTech',
      hashtags: ['#MisevaAI', '#CookingTimer', '#SmartKitchen', '#TechTricks'],
      callToAction: 'Try Studio Cooking Mode now'
    },
    assetProvenance: {
      dishImage: '/brand/images/app-experience.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'WebSpeech API',
      audioLicense: 'Original Acoustic Kitchen Audio',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-10-31T18:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-11-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-12',
    dayNumber: 12,
    title: 'Live Grocery Price Audit across Indian Quick Commerce',
    phase: CampaignPhase.FEATURE,
    pillar: ContentPillar.GROCERY_BENCHMARK,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.CAROUSEL_DECK,
    platforms: [PlatformType.INSTAGRAM_CAROUSEL, PlatformType.LINKEDIN],
    englishContent: {
      hook: 'We audited grocery prices across Blinkit, Zepto, Swiggy Instamart, Amazon Fresh & Flipkart.',
      caption: 'The same Dal Tadka basket costs ₹180 on one app and ₹265 on another! Here is how Miseva AI benchmarks your cart across 5 Indian retailers.',
      hashtags: ['#GrocerySavings', '#PriceComparison', '#Blinkit', '#Zepto', '#SwiggyInstamart', '#MisevaAI'],
      callToAction: 'Check live grocery prices on Miseva AI'
    },
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'N/A',
      audioLicense: 'N/A',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-11-01T12:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-12-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-13',
    dayNumber: 13,
    title: 'The Sacred Order of Serving on a Banana Leaf',
    phase: CampaignPhase.CULTURAL,
    pillar: ContentPillar.TABLE_STYLING,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.VERTICAL_VIDEO_SHORT,
    platforms: [PlatformType.INSTAGRAM_REEL, PlatformType.YOUTUBE_SHORTS, PlatformType.WHATSAPP],
    englishContent: {
      hook: 'Do you know the exact sacred order of 12 dishes on a Kerala banana leaf?',
      script: 'Top left preserves, top center vegetables, bottom center Matta rice and parippu ghee, finale payasam.',
      caption: 'Every position on a banana leaf has a dietary and digestive reason. Learn the traditional art with Miseva AI Table Styling Studio.',
      hashtags: ['#KeralaSadya', '#Tradition', '#SouthIndianFood', '#MisevaAI', '#SadyaRules'],
      callToAction: 'Cook authentic Avial and Sadya with Miseva AI'
    },
    malayalamContent: {
      hook: 'സദ്യ വിളമ്പാൻ ഒരു കൃത്യമായ രീതിയുണ്ട് എന്ന് നിങ്ങൾക്കറിയാമോ?',
      script: 'ഇലയുടെ ഇടത് വശത്ത് ഉപ്പും ഇഞ്ചിപ്പുളിയും, മുകളിൽ പച്ചക്കറികൾ, നടുവിൽ ചോറും പരിപ്പും നെയ്യും. സദ്യയുടെ ശാസ്ത്രം മിസേവ എഐയിലൂടെ അറിയാം.',
      caption: 'വിഭവങ്ങൾ ഇലയിൽ വിളമ്പുന്നതിന്റെ പാരമ്പര്യവും ആരോഗ്യ രഹസ്യങ്ങളും അറിയാൻ മിസേവ എഐ ടേബിൾ സ്റ്റൈലിങ് സ്റ്റുഡിയോ സന്ദർശിക്കൂ.',
      hashtags: ['#സദ്യ', '#കേരളം', '#ഓണം', '#മിസേവഎഐ', '#പാരമ്പര്യം'],
      callToAction: 'സദ്യ പാചകം ചെയ്യൂ: miseva.ai'
    },
    verifiedDishId: 'kerala-sadya-feast',
    assetProvenance: {
      dishImage: '/brand/images/tablescaping-sadya.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'WebSpeech (ml-IN)',
      audioLicense: 'Original Acoustic Kerala Flute & ASMR',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-11-02T18:30:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-13-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-14',
    dayNumber: 14,
    title: 'Ask the AI Chef Anything: Science of the Tadka',
    phase: CampaignPhase.FEATURE,
    pillar: ContentPillar.AI_CHEF_TUTORIAL,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.VERTICAL_VIDEO_SHORT,
    platforms: [PlatformType.YOUTUBE_SHORTS, PlatformType.INSTAGRAM_REEL],
    englishContent: {
      hook: 'Why do we bloom mustard seeds in hot oil first instead of boiling them in water?',
      script: 'Fat-soluble essential oils (allyl isothiocyanate) require 180°C fat to release fragrance; water leaves them bitter.',
      caption: 'Ask the Miseva AI cooking agent any culinary question while you cook. It explains the kitchen chemistry behind every step!',
      hashtags: ['#CulinaryScience', '#KitchenChemistry', '#FoodFacts', '#MisevaAI'],
      callToAction: 'Ask the AI Chef at miseva.ai'
    },
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'WebSpeech (en-IN)',
      audioLicense: 'Original Sizzling Oil Tadka ASMR',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-11-03T18:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-14-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-15',
    dayNumber: 15,
    title: 'Table Styling Transformation in Under 10 Mins',
    phase: CampaignPhase.LIFESTYLE,
    pillar: ContentPillar.TABLE_STYLING,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.VERTICAL_VIDEO_SHORT,
    platforms: [PlatformType.INSTAGRAM_REEL, PlatformType.PINTEREST],
    englishContent: {
      hook: 'Plain dining table to imperial festive banquet in 10 minutes.',
      script: 'Time-lapse styling: Linen runner, brass urlis with marigolds, hand-thrown ceramic dinner plates.',
      caption: 'Impress your guests before they take their first bite. Generate dynamic 2D placement charts and decor shopping lists with Miseva AI.',
      hashtags: ['#Tablescaping', '#DinnerAesthetic', '#TableDecor', '#MisevaAI'],
      callToAction: 'Design your table layout at miseva.ai'
    },
    assetProvenance: {
      dishImage: '/brand/images/tablescaping-sadya.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'WebSpeech (en-IN)',
      audioLicense: 'Upbeat Lo-fi Ambient',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-11-04T19:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-15-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-16',
    dayNumber: 16,
    title: 'What is in Your Fridge? Interactive Community Chef',
    phase: CampaignPhase.COMMUNITY,
    pillar: ContentPillar.AI_CHEF_TUTORIAL,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.CAROUSEL_DECK,
    platforms: [PlatformType.INSTAGRAM_CAROUSEL, PlatformType.FACEBOOK],
    englishContent: {
      hook: 'Drop 3 random ingredients from your fridge into the comments.',
      caption: 'Our AI Chef will comment back within 60 seconds with a customized recipe and step-by-step guidance. Let the kitchen improv begin!',
      hashtags: ['#PantryChallenge', '#FridgeCleanout', '#AIChef', '#MisevaAI'],
      callToAction: 'Comment your 3 ingredients below!'
    },
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'N/A',
      audioLicense: 'N/A',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-11-05T17:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-16-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-17',
    dayNumber: 17,
    title: 'Offline Kitchen Test: Android Room DB in Action',
    phase: CampaignPhase.FEATURE,
    pillar: ContentPillar.AI_CHEF_TUTORIAL,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.VERTICAL_VIDEO_SHORT,
    platforms: [PlatformType.YOUTUBE_SHORTS, PlatformType.LINKEDIN],
    englishContent: {
      hook: 'Wi-Fi drops while cooking? Your recipe will not disappear.',
      script: 'Simulating airplane mode mid-cook. Miseva AI native Android Room database transitions smoothly with zero interruption.',
      caption: 'Kitchens are notorious for dead zones. That is why Miseva AI was built native with Android Room DB and local TTS. Zero lag, zero dropouts.',
      hashtags: ['#AndroidDev', '#OfflineFirst', '#JetpackCompose', '#FoodTech'],
      callToAction: 'Get the Android app on Google Play'
    },
    assetProvenance: {
      dishImage: '/brand/images/app-experience.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'Android TTS',
      audioLicense: 'Original Acoustic Kitchen Audio',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-11-06T18:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-17-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-18',
    dayNumber: 18,
    title: 'Mastering Italian Mantecatura: Saffron Risotto',
    phase: CampaignPhase.CULTURAL,
    pillar: ContentPillar.WORLD_CUISINES,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.VERTICAL_VIDEO_SHORT,
    platforms: [PlatformType.INSTAGRAM_REEL, PlatformType.YOUTUBE_SHORTS],
    englishContent: {
      hook: 'The restaurant secret to velvety risotto without adding heavy cream.',
      script: 'Cold butter cubes and Parmigiano emulsifying the starch released by Carnaroli rice during vigorous stirring.',
      caption: 'Discover the art of Italian mantecatura with Miseva AI. We have over 10 authentic Italian recipes from Northern Italy to Sicily.',
      hashtags: ['#Risotto', '#ItalianFood', '#CookingScience', '#MisevaAI', '#Milanese'],
      callToAction: 'Cook Milanese Risotto tonight'
    },
    verifiedDishId: 'italian-saffron-risotto',
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'WebSpeech (en-IN)',
      audioLicense: 'Acoustic Guitar Melodic Ambient',
      verifiedAgainstCatalog: true,
      catalogCategory: 'Global Cuisines / Italian'
    },
    scheduledTimeIso: '2026-11-07T19:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-18-draft',
    publishingLogs: []
  },

  // --- PHASE 4: CULINARY & TABLE ARTISTRY (DAYS 19-25) ---
  {
    id: 'miseva-day-19',
    dayNumber: 19,
    title: '5 Common Mistakes with Indian Spices',
    phase: CampaignPhase.FEATURE,
    pillar: ContentPillar.BRAND_PHILOSOPHY,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.CAROUSEL_DECK,
    platforms: [PlatformType.INSTAGRAM_CAROUSEL, PlatformType.FACEBOOK],
    englishContent: {
      hook: 'Are you making these 5 spice mistakes that ruin good curry?',
      caption: '1. Adding ground coriander too early. 2. Over-boiling garam masala. 3. Cold oil for tadka. 4. Raw turmeric in water. 5. Pre-ground versus whole spices.',
      hashtags: ['#SpicesOfIndia', '#CurryTips', '#MisevaAI', '#CookingBasics'],
      callToAction: 'Save and share with a friend who cooks'
    },
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'N/A',
      audioLicense: 'N/A',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-11-08T18:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-19-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-20',
    dayNumber: 20,
    title: 'Minimalist Outdoor Dining: Terracotta & Linen',
    phase: CampaignPhase.LIFESTYLE,
    pillar: ContentPillar.TABLE_STYLING,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.PIN_STORY,
    platforms: [PlatformType.PINTEREST, PlatformType.INSTAGRAM_CAROUSEL],
    englishContent: {
      hook: 'How to style an intimate alfresco dinner with earthy terracotta and natural linen.',
      caption: 'Sunset dining made effortless. Curated tableware checklist with natural candlelight and artisanal dinnerware.',
      hashtags: ['#OutdoorDining', '#TablescapeInspo', '#MisevaAI', '#RusticDecor'],
      callToAction: 'Explore Minimalist Outdoor collections on Miseva'
    },
    assetProvenance: {
      dishImage: '/brand/images/tablescaping-sadya.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'N/A',
      audioLicense: 'N/A',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-11-09T18:30:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-20-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-21',
    dayNumber: 21,
    title: 'Desserts Studio Showcase: The 2-String Sugar Test',
    phase: CampaignPhase.FEATURE,
    pillar: ContentPillar.DESSERTS_STUDIO,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.VERTICAL_VIDEO_SHORT,
    platforms: [PlatformType.INSTAGRAM_REEL, PlatformType.YOUTUBE_SHORTS],
    englishContent: {
      hook: 'How to nail the elusive 2-string syrup consistency for melt-in-mouth mithai.',
      script: 'Macro close-up testing sugar syrup between thumb and forefinger. Timing and temperature tips.',
      caption: '40 confectionery masterworks in Miseva Desserts Studio. From authentic Palada Payasam to layered Opera Cake and soft Rasgulla.',
      hashtags: ['#DessertsStudio', '#IndianSweets', '#MithaiMaking', '#MisevaAI', '#Payasam'],
      callToAction: 'Browse 40 desserts on Miseva AI'
    },
    verifiedDishId: 'payasam-palada',
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'WebSpeech (en-IN)',
      audioLicense: 'Original ASMR Caramel Sounds',
      verifiedAgainstCatalog: true,
      catalogCategory: 'Desserts Studio / Payasam'
    },
    scheduledTimeIso: '2026-11-10T19:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-21-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-22',
    dayNumber: 22,
    title: 'Beverages Studio: Ditch Sugary Sodas',
    phase: CampaignPhase.FEATURE,
    pillar: ContentPillar.BEVERAGES_STUDIO,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.VERTICAL_VIDEO_SHORT,
    platforms: [PlatformType.INSTAGRAM_REEL, PlatformType.YOUTUBE_SHORTS],
    englishContent: {
      hook: '5 cold-pressed fresh juices that taste better than any soda.',
      script: 'Cold extraction of beetroot-ginger-pomegranate, poured over ice spheres in highball glasses.',
      caption: 'Refresh naturally. Explore 50 handcrafted beverages in Miseva Beverages Studio: traditional Indian spiced coolers, matcha lattes, and tropical mocktails.',
      hashtags: ['#FreshJuice', '#BeveragesStudio', '#Mocktails', '#MisevaAI', '#HealthyLiving'],
      callToAction: 'Check out 50 beverage recipes'
    },
    verifiedDishId: 'cold-pressed-juice',
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'WebSpeech (en-IN)',
      audioLicense: 'Crisp Ice Clink ASMR',
      verifiedAgainstCatalog: true,
      catalogCategory: 'Beverages Studio / Fresh Juices'
    },
    scheduledTimeIso: '2026-11-11T18:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-22-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-23',
    dayNumber: 23,
    title: 'Malayalam Live Cooking: Thalassery Dum Biryani',
    phase: CampaignPhase.COMMUNITY,
    pillar: ContentPillar.MALAYALAM_VOICE,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.LIVE_STREAM,
    platforms: [PlatformType.YOUTUBE, PlatformType.FACEBOOK],
    englishContent: {
      hook: 'Cook Thalassery Dum Biryani live with us using hands-free voice commands!',
      caption: 'Join our interactive live stream cooking session. We will prepare authentic Malabar Jeerakasala Biryani guided entirely by Miseva AI voice assistant.',
      hashtags: ['#ThalasseryBiryani', '#LiveCooking', '#MisevaAI', '#MalabarFood'],
      callToAction: 'Set reminder for live stream on YouTube'
    },
    malayalamContent: {
      hook: 'തലശ്ശേരി ദം ബിരിയാണി തത്സമയം പാകം ചെയ്യാം — മിസേവ എഐയോടൊപ്പം!',
      caption: 'ജീരകശാല അരിയുടെ മണവും നാടൻ നെയ്യിന്റെ സ്വാദും നിറഞ്ഞ തലശ്ശേരി ബിരിയാണി വോയ്സ് കമാൻഡിലൂടെ ഉണ്ടാക്കാൻ ഞങ്ങളോടൊപ്പം ചേരൂ!',
      hashtags: ['#തലശ്ശേരിബിരിയാണി', '#ലൈവ്പാചകം', '#മലയാളം', '#മിസേവഎഐ'],
      callToAction: 'യൂട്യൂബിൽ ലൈവ് സ്ട്രീം റിമൈൻഡർ ഓൺ ചെയ്യൂ'
    },
    verifiedDishId: 'thalassery-dum-biryani',
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'Live Malayalam Presenter + TTS',
      audioLicense: 'Live Production',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-11-12T13:30:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-23-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-24',
    dayNumber: 24,
    title: 'Engineering AI for Kitchen Acoustics',
    phase: CampaignPhase.FEATURE,
    pillar: ContentPillar.BRAND_PHILOSOPHY,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.TEXT_IMAGE_POST,
    platforms: [PlatformType.LINKEDIN],
    englishContent: {
      hook: 'How we solved blender noise and kitchen reverb in voice-assisted UX.',
      caption: 'In our latest tech article, we discuss ambient acoustic modeling, VAD threshold tuning, and how local Android TTS delivers sub-100ms response times.',
      hashtags: ['#AcousticAI', '#MobileEngineering', '#AndroidTech', '#MisevaAI'],
      callToAction: 'Read the technical engineering writeup'
    },
    assetProvenance: {
      dishImage: '/brand/images/app-experience.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'N/A',
      audioLicense: 'N/A',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-11-13T10:30:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-24-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-25',
    dayNumber: 25,
    title: 'Gourmet Dinner for 4 under ₹400',
    phase: CampaignPhase.FEATURE,
    pillar: ContentPillar.GROCERY_BENCHMARK,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.VERTICAL_VIDEO_SHORT,
    platforms: [PlatformType.INSTAGRAM_REEL, PlatformType.YOUTUBE_SHORTS],
    englishContent: {
      hook: 'Can you cook a royal North Indian dinner for 4 under ₹400?',
      script: 'Palak paneer, jeera rice, and garlic butter parathas calculated with live grocery retailer pricing.',
      caption: 'Delicious dining does not have to be expensive. Miseva AI meal planner calculates the exact cart cost across Indian delivery services. Total: ₹340!',
      hashtags: ['#BudgetCooking', '#PalakPaneer', '#GroceryHacks', '#MisevaAI', '#DinnerUnder400'],
      callToAction: 'Calculate your meal budget on Miseva'
    },
    verifiedDishId: 'palak-paneer',
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'WebSpeech (en-IN)',
      audioLicense: 'Upbeat Lo-fi Kitchen Beat',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-11-14T18:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-25-draft',
    publishingLogs: []
  },

  // --- PHASE 5: GROWTH, COMMUNITY & VIRAL (DAYS 26-30) ---
  {
    id: 'miseva-day-26',
    dayNumber: 26,
    title: '#MisevaCookingChallenge Launch',
    phase: CampaignPhase.CHALLENGE,
    pillar: ContentPillar.COMMUNITY_CHALLENGE,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.VERTICAL_VIDEO_SHORT,
    platforms: [PlatformType.INSTAGRAM_REEL, PlatformType.YOUTUBE_SHORTS, PlatformType.FACEBOOK],
    englishContent: {
      hook: 'The #MisevaCookingChallenge starts today: Win a cast-iron cookware hamper!',
      script: 'Cook any dish using Miseva AI voice mode, record a 15s clip, tag @misevaai and win premium kitchen gear.',
      caption: 'Ready to cook with confidence? Cook any of our 270 recipes, post your dish with #MisevaCookingChallenge and tag @misevaai to enter!',
      hashtags: ['#MisevaCookingChallenge', '#CookingContest', '#FoodieGiveaway', '#MisevaAI'],
      callToAction: 'Join the challenge at miseva.ai/challenge'
    },
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'WebSpeech (en-IN)',
      audioLicense: 'Energetic Acoustic Pop',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-11-15T17:30:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-26-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-27',
    dayNumber: 27,
    title: 'Community Creations Showcase',
    phase: CampaignPhase.COMMUNITY,
    pillar: ContentPillar.COMMUNITY_CHALLENGE,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.CAROUSEL_DECK,
    platforms: [PlatformType.INSTAGRAM_CAROUSEL],
    englishContent: {
      hook: 'Look what our home cooks prepared with Miseva AI this week!',
      caption: 'Featuring gorgeous dishes cooked by our community in Kerala, Bangalore, Dubai, and London. Tag @misevaai to be featured next!',
      hashtags: ['#HomeChefs', '#MisevaCommunity', '#CookWithMiseva', '#ProudCooks'],
      callToAction: 'Tag @misevaai to be featured'
    },
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'N/A',
      audioLicense: 'N/A',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-11-16T18:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-27-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-28',
    dayNumber: 28,
    title: 'Behind the Code & Flavor: Documentary',
    phase: CampaignPhase.FEATURE,
    pillar: ContentPillar.BRAND_PHILOSOPHY,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.HORIZONTAL_VIDEO,
    platforms: [PlatformType.YOUTUBE, PlatformType.LINKEDIN],
    englishContent: {
      hook: 'How a student engineering project transformed into an AI kitchen revolution.',
      script: 'Mini-documentary (6 mins) featuring student developers, faculty supervisor Jane Rose, and home chefs testing hands-free voice mode.',
      caption: 'From university labs to dinner tables worldwide. Watch the inspiring story behind the making of Miseva AI.',
      hashtags: ['#BehindTheScenes', '#MisevaStory', '#EngineeringExcellence', '#FoodInnovation'],
      callToAction: 'Watch full documentary on YouTube'
    },
    assetProvenance: {
      dishImage: '/brand/images/app-experience.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'Studio Documentary Voice',
      audioLicense: 'Cinematic Orchestral Track',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-11-17T15:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-28-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-29',
    dayNumber: 29,
    title: '7-Day Smart Meal Plan: Zero Food Waste',
    phase: CampaignPhase.RETENTION,
    pillar: ContentPillar.AI_CHEF_TUTORIAL,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.CAROUSEL_DECK,
    platforms: [PlatformType.INSTAGRAM_CAROUSEL, PlatformType.PINTEREST],
    englishContent: {
      hook: 'A 7-day family meal plan that produces zero ingredient waste.',
      caption: 'Shared herbs, coordinated vegetable prep, and combined shopping list. Generate custom 7-day meal plans in seconds on Miseva AI.',
      hashtags: ['#MealPlanning', '#ZeroWaste', '#HealthyEating', '#MisevaAI', '#SmartPantry'],
      callToAction: 'Generate your weekly meal plan at miseva.ai/meal-planner'
    },
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'N/A',
      audioLicense: 'N/A',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-11-18T18:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-29-draft',
    publishingLogs: []
  },
  {
    id: 'miseva-day-30',
    dayNumber: 30,
    title: 'Month 1 Milestone: 50,000 Cooking Sessions!',
    phase: CampaignPhase.MILESTONE,
    pillar: ContentPillar.BRAND_PHILOSOPHY,
    status: ContentStatus.DRAFT,
    format: CreativeFormat.VERTICAL_VIDEO_SHORT,
    platforms: [PlatformType.INSTAGRAM_REEL, PlatformType.YOUTUBE_SHORTS, PlatformType.LINKEDIN],
    englishContent: {
      hook: '30 days, 50,000 cooking sessions, and a world of delicious flavors.',
      script: 'Montage of families cooking, plates being decorated, and thank-you messages from our kitchen community.',
      caption: 'Thank you for an incredible launch month! 50,000 dishes cooked, 1,200 hours saved, and countless memories made. The journey has just begun.',
      hashtags: ['#Milestone', '#MisevaAI', '#ThankYou', '#CookingCommunity', '#NextGenKitchen'],
      callToAction: 'Download Miseva AI and start cooking today'
    },
    assetProvenance: {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'WebSpeech (en-IN)',
      audioLicense: 'Triumphant Celebration Track',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: '2026-11-19T18:00:00.000Z',
    targetTimezone: 'Asia/Kolkata',
    idempotencyKey: 'idem-day-30-draft',
    publishingLogs: []
  }
];
