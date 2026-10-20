import { describe, it, expect } from 'vitest';
import {
  CampaignPhase,
  ContentPillar,
  ContentStatus,
  PlatformType,
  validateMarketingPost,
  createDefaultMarketingPost,
  type MarketingPost
} from '../../lib/marketing/types/marketing-types';

describe('Marketing Domain Types & Validators', () => {
  it('should define all required campaign phases and content pillars', () => {
    expect(CampaignPhase.TEASE).toBe('Tease');
    expect(CampaignPhase.LAUNCH).toBe('Launch');
    expect(CampaignPhase.FEATURE).toBe('Feature');
    expect(CampaignPhase.CULTURAL).toBe('Cultural');
    expect(CampaignPhase.LIFESTYLE).toBe('Lifestyle');
    expect(CampaignPhase.COMMUNITY).toBe('Community');
    expect(CampaignPhase.CHALLENGE).toBe('Challenge');
    expect(CampaignPhase.RETENTION).toBe('Retention');

    expect(ContentPillar.MALAYALAM_VOICE).toBe('Malayalam Voice Cooking');
    expect(ContentPillar.AI_CHEF_TUTORIAL).toBe('AI Chef Tutorial');
    expect(ContentPillar.GROCERY_BENCHMARK).toBe('Grocery Price Intelligence');
    expect(ContentPillar.TABLE_STYLING).toBe('Table Styling Studio');
    expect(ContentPillar.WORLD_CUISINES).toBe('World Cuisines');
    expect(ContentPillar.DESSERTS_STUDIO).toBe('Desserts Studio');
    expect(ContentPillar.BEVERAGES_STUDIO).toBe('Beverages Studio');
  });

  it('should define all 8 content status life-cycle states', () => {
    const statuses: ContentStatus[] = [
      ContentStatus.IDEA,
      ContentStatus.DRAFT,
      ContentStatus.ASSET_GENERATION,
      ContentStatus.AWAITING_APPROVAL,
      ContentStatus.APPROVED,
      ContentStatus.SCHEDULED,
      ContentStatus.PUBLISHED,
      ContentStatus.FAILED
    ];
    expect(statuses.length).toBe(8);
  });

  it('should validate a complete marketing post with bilingual scripts and asset provenance', () => {
    const post: MarketingPost = createDefaultMarketingPost({
      id: 'day-07',
      dayNumber: 7,
      title: 'Malayalam Voice Cooking Reveal',
      phase: CampaignPhase.LAUNCH,
      pillar: ContentPillar.MALAYALAM_VOICE,
      platforms: [PlatformType.INSTAGRAM, PlatformType.YOUTUBE_SHORTS],
      englishContent: {
        hook: 'Cook Kerala Fish Curry with just your voice',
        script: 'Visual: Teak board and clay pot simmering. VO: Hands messy? Just say Next Step.',
        caption: 'Meet Miseva AI: hands-free cooking in English & Malayalam.',
        hashtags: ['#MisevaAI', '#VoiceCooking', '#KeralaFood', '#Malayalam'],
        callToAction: 'Try AI Voice Mode now at miseva.ai'
      },
      malayalamContent: {
        hook: 'കൈ നനയാതെ ശബ്ദം കൊണ്ട് പാചകം ചെയ്യാം',
        script: 'കണ്ണൂർ മീൻ കറി തയാറാക്കുമ്പോൾ കൈ നനഞ്ഞാൽ ഇനി ഫോണിൽ തൊടേണ്ട. അടുത്ത സ്റ്റെപ്പ് എന്ന് പറഞ്ഞാൽ മതി.',
        caption: 'മലയാളത്തിൽ ആദ്യമായി ഒരു നിർമ്മിത ബുദ്ധി പാചക സഹായി — മിസേവ എഐ!',
        hashtags: ['#മിസേവഎഐ', '#മലയാളംപാചകം', '#MisevaAI', '#KeralaKitchen'],
        callToAction: 'ഇന്നുതന്നെ മിസേവ എഐ സൗജന്യമായി പരീക്ഷിക്കൂ'
      },
      verifiedDishId: 'kerala-meen-curry',
      assetProvenance: {
        dishImage: '/brand/images/hero-culinary.jpg',
        imageLicense: 'Miseva Original Proprietary Asset',
        voiceProvider: 'WebSpeech API / Android TTS (ml-IN, en-IN)',
        audioLicense: 'Original ASMR & Licensed Acoustic Ambient',
        verifiedAgainstCatalog: true
      }
    });

    const validation = validateMarketingPost(post);
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);
    expect(post.status).toBe(ContentStatus.DRAFT);
  });

  it('should catch invalid posts missing mandatory fields or invalid status transitions', () => {
    const invalidPost = createDefaultMarketingPost({
      id: 'invalid-post',
      dayNumber: 0,
      title: '',
      phase: CampaignPhase.TEASE,
      pillar: ContentPillar.WORLD_CUISINES,
      platforms: []
    });

    const validation = validateMarketingPost(invalidPost);
    expect(validation.isValid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);
  });
});
