/**
 * MISEVA AI — MARKETING AUTOMATION SYSTEM TYPES
 * Enterprise-grade domain models for 30-day social media marketing automation.
 */

export enum CampaignPhase {
  TEASE = 'Tease',
  LAUNCH = 'Launch',
  FEATURE = 'Feature',
  CULTURAL = 'Cultural',
  LIFESTYLE = 'Lifestyle',
  COMMUNITY = 'Community',
  CHALLENGE = 'Challenge',
  RETENTION = 'Retention',
  MILESTONE = 'Milestone'
}

export enum ContentPillar {
  MALAYALAM_VOICE = 'Malayalam Voice Cooking',
  AI_CHEF_TUTORIAL = 'AI Chef Tutorial',
  GROCERY_BENCHMARK = 'Grocery Price Intelligence',
  TABLE_STYLING = 'Table Styling Studio',
  WORLD_CUISINES = 'World Cuisines',
  DESSERTS_STUDIO = 'Desserts Studio',
  BEVERAGES_STUDIO = 'Beverages Studio',
  COMMUNITY_CHALLENGE = 'Community & Challenges',
  BRAND_PHILOSOPHY = 'Brand Philosophy & Science'
}

export enum ContentStatus {
  IDEA = 'Idea',
  DRAFT = 'Draft',
  ASSET_GENERATION = 'Asset Generation',
  AWAITING_APPROVAL = 'Awaiting Approval',
  APPROVED = 'Approved',
  SCHEDULED = 'Scheduled',
  PUBLISHED = 'Published',
  FAILED = 'Failed'
}

export enum PlatformType {
  YOUTUBE = 'YouTube',
  YOUTUBE_SHORTS = 'YouTube Shorts',
  INSTAGRAM = 'Instagram',
  INSTAGRAM_REEL = 'Instagram Reel',
  INSTAGRAM_CAROUSEL = 'Instagram Carousel',
  FACEBOOK = 'Facebook',
  PINTEREST = 'Pinterest',
  LINKEDIN = 'LinkedIn',
  WHATSAPP = 'WhatsApp'
}

export enum CreativeFormat {
  VERTICAL_VIDEO_SHORT = 'Vertical Video (9:16 Short/Reel)',
  HORIZONTAL_VIDEO = 'Horizontal Video (16:9 Long-form)',
  CAROUSEL_DECK = 'Carousel Deck (4:5 Portrait)',
  PIN_STORY = 'Pin Story (2:3 Standard Pin)',
  TEXT_IMAGE_POST = 'Editorial Text + Graphic',
  LIVE_STREAM = 'Live Interactive Stream'
}

export interface PostContentVariant {
  hook: string;
  script?: string;
  caption: string;
  hashtags: string[];
  callToAction: string;
  voiceoverTranscript?: string;
  suggestedDurationSeconds?: number;
}

export interface PlatformSpecificPostVersion {
  platform: PlatformType;
  title?: string;
  caption: string;
  hashtags: string[];
  callToAction: string;
  customThumbnailPrompt?: string;
  aspectRatio: '9:16' | '16:9' | '4:5' | '1:1' | '2:3';
  utmUrl: string;
  characterLimit: number;
}

export interface AssetProvenance {
  dishImage: string;
  imageLicense: string;
  voiceProvider: string;
  audioLicense: string;
  verifiedAgainstCatalog: boolean;
  catalogCategory?: string;
  notes?: string;
}

export interface ApprovalRecord {
  approverId: string;
  approverName: string;
  approvedAt: string; // ISO 8601
  notes?: string;
  state: 'Approved' | 'Rejected' | 'Emergency_Held';
}

export interface PublishingLog {
  timestamp: string;
  platform: PlatformType;
  status: 'SUCCESS' | 'FAILED' | 'RETRYING' | 'MANUAL_REQUIRED';
  externalPostId?: string;
  externalUrl?: string;
  errorMessage?: string;
  retryAttempt: number;
}

export interface PostPerformanceMetrics {
  views: number;
  reach: number;
  impressions: number;
  averageWatchTimeSeconds: number;
  completionRatePercent: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  profileVisits: number;
  websiteClicks: number;
  appStoreVisits: number;
  installs: number;
  cookingSessions: number;
  premiumTrials: number;
  subscriptions: number;
  attributionType: 'OBSERVED' | 'ESTIMATED';
  lastUpdated: string;
}

export interface MarketingPost {
  id: string;
  dayNumber: number; // 1 to 30
  title: string;
  phase: CampaignPhase;
  pillar: ContentPillar;
  status: ContentStatus;
  format: CreativeFormat;
  platforms: PlatformType[];
  platformVersions?: Partial<Record<PlatformType, PlatformSpecificPostVersion>>;
  englishContent: PostContentVariant;
  malayalamContent?: PostContentVariant;
  verifiedDishId?: string;
  assetProvenance: AssetProvenance;
  scheduledTimeIso: string;
  targetTimezone: string; // Default: 'Asia/Kolkata'
  approvalRecord?: ApprovalRecord;
  publishingLogs: PublishingLog[];
  metrics?: PostPerformanceMetrics;
  idempotencyKey: string;
  manualChecklistUrl?: string;
  tags?: string[];
}

export interface GrowthExperiment {
  id: string;
  name: string;
  hypothesis: string;
  variantA: {
    label: string;
    description: string;
    postIds: string[];
    metrics: Partial<PostPerformanceMetrics>;
  };
  variantB: {
    label: string;
    description: string;
    postIds: string[];
    metrics: Partial<PostPerformanceMetrics>;
  };
  primaryMetric: keyof PostPerformanceMetrics;
  status: 'ACTIVE' | 'CONCLUDED' | 'DRAFT';
  confidenceScorePercent?: number;
  winner?: 'A' | 'B' | 'INCONCLUSIVE';
  insights: string[];
}

export interface MarketingFunnelMetrics {
  totalCampaignImpressions: number;
  totalReach: number;
  totalSocialClicks: number;
  websiteVisitors: number;
  appInstalls: number;
  onboardedUsers: number;
  firstCookingSessions: number;
  premiumTrials: number;
  activeSubscribers: number;
  subscriberRetentionRatePercent: number;
  observedAttributedRevenueInr: number;
  estimatedAttributedRevenueInr: number;
  totalProductionCostInr: number;
  blendedRoiMultiplier: number;
}

export interface PostValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateMarketingPost(post: MarketingPost): PostValidationResult {
  const errors: string[] = [];

  if (!post.id || post.id.trim() === '') {
    errors.push('Post ID is required');
  }
  if (!post.dayNumber || post.dayNumber < 1 || post.dayNumber > 30) {
    errors.push('Day number must be between 1 and 30');
  }
  if (!post.title || post.title.trim() === '') {
    errors.push('Post title is required');
  }
  if (!post.platforms || post.platforms.length === 0) {
    errors.push('At least one target platform must be specified');
  }
  if (!post.englishContent?.caption || post.englishContent.caption.trim() === '') {
    errors.push('English caption is required');
  }
  if (!post.englishContent?.hook || post.englishContent.hook.trim() === '') {
    errors.push('English hook is required');
  }
  if (!post.assetProvenance?.imageLicense) {
    errors.push('Asset provenance and licensing statement are mandatory');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function createDefaultMarketingPost(params: Partial<MarketingPost> & {
  id: string;
  dayNumber: number;
  title: string;
  phase: CampaignPhase;
  pillar: ContentPillar;
  platforms: PlatformType[];
}): MarketingPost {
  return {
    id: params.id,
    dayNumber: params.dayNumber,
    title: params.title,
    phase: params.phase,
    pillar: params.pillar,
    status: params.status || ContentStatus.DRAFT,
    format: params.format || CreativeFormat.VERTICAL_VIDEO_SHORT,
    platforms: params.platforms,
    platformVersions: params.platformVersions || {},
    englishContent: params.englishContent || {
      hook: '',
      caption: '',
      hashtags: ['#MisevaAI'],
      callToAction: 'Visit miseva.ai'
    },
    malayalamContent: params.malayalamContent,
    verifiedDishId: params.verifiedDishId,
    assetProvenance: params.assetProvenance || {
      dishImage: '/brand/images/hero-culinary.jpg',
      imageLicense: 'Miseva Original Proprietary Asset',
      voiceProvider: 'WebSpeech / Android TTS',
      audioLicense: 'Original Acoustic Kitchen Audio',
      verifiedAgainstCatalog: true
    },
    scheduledTimeIso: params.scheduledTimeIso || new Date().toISOString(),
    targetTimezone: params.targetTimezone || 'Asia/Kolkata',
    publishingLogs: params.publishingLogs || [],
    idempotencyKey: params.idempotencyKey || `idem-${params.id}-${Date.now()}`
  };
}
