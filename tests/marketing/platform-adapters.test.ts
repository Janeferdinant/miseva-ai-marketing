import { describe, it, expect, beforeEach } from 'vitest';
import { PlatformAdapterRegistry } from '../../lib/marketing/adapters/adapter-registry';
import { PlatformType, type MarketingPost, ContentStatus, CampaignPhase, ContentPillar } from '../../lib/marketing/types/marketing-types';
import { INITIAL_30_DAY_CAMPAIGN } from '../../lib/marketing/data/initial-30-day-campaign';

describe('Social Platform Publishing Adapters & Manual Fallbacks', () => {
  let registry: PlatformAdapterRegistry;
  let samplePost: MarketingPost;

  beforeEach(() => {
    registry = new PlatformAdapterRegistry();
    samplePost = { ...INITIAL_30_DAY_CAMPAIGN[6] }; // Day 7: Malayalam Voice Cooking
  });

  it('should register all 6 required social platforms', () => {
    const supported = registry.getSupportedPlatforms();
    expect(supported).toContain(PlatformType.YOUTUBE);
    expect(supported).toContain(PlatformType.YOUTUBE_SHORTS);
    expect(supported).toContain(PlatformType.INSTAGRAM_REEL);
    expect(supported).toContain(PlatformType.INSTAGRAM_CAROUSEL);
    expect(supported).toContain(PlatformType.FACEBOOK);
    expect(supported).toContain(PlatformType.PINTEREST);
    expect(supported).toContain(PlatformType.LINKEDIN);
    expect(supported).toContain(PlatformType.WHATSAPP);
  });

  it('should report not connected before authentication has succeeded', () => {
    const adapter = registry.getAdapter(PlatformType.INSTAGRAM_REEL);
    expect(adapter).toBeDefined();
    expect(adapter?.isAuthenticated()).toBe(false);
  });

  it('should authenticate successfully with authorized test credentials', async () => {
    const adapter = registry.getAdapter(PlatformType.INSTAGRAM_REEL);
    const authResult = await adapter?.authenticate({
      accessToken: 'EAAB_test_mock_token_valid',
      instagramAccountId: 'act_miseva_123'
    });
    expect(authResult?.success).toBe(true);
    expect(adapter?.isAuthenticated()).toBe(true);
    expect(authResult?.scopes).toContain('instagram_content_publish');
  });

  it('should validate format rules and quotas for YouTube Shorts (duration, aspect ratio, title length)', () => {
    const ytAdapter = registry.getAdapter(PlatformType.YOUTUBE_SHORTS);
    expect(ytAdapter).toBeDefined();

    const validation = ytAdapter!.validatePostFormat(samplePost);
    expect(validation.valid).toBe(true);
    expect(validation.errors).toHaveLength(0);
    expect(validation.warnings.length).toBeLessThanOrEqual(1);

    // Overlong title test
    const longTitlePost: MarketingPost = {
      ...samplePost,
      title: 'A'.repeat(120) // YouTube max title is 100 chars
    };
    const invalidValidation = ytAdapter!.validatePostFormat(longTitlePost);
    expect(invalidValidation.valid).toBe(false);
    expect(invalidValidation.errors[0]).toContain('title exceeds 100 characters');
  });

  it('should generate a manual publishing checklist when a platform is not connected or requires manual verification', () => {
    const igAdapter = registry.getAdapter(PlatformType.INSTAGRAM_REEL);
    const checklist = igAdapter!.generateManualPublishingChecklist(samplePost);

    expect(checklist).toBeDefined();
    expect(checklist.platform).toBe(PlatformType.INSTAGRAM_REEL);
    expect(checklist.steps.length).toBeGreaterThanOrEqual(4);
    expect(checklist.copyableCaption).toContain(samplePost.englishContent.caption);
    expect(checklist.recommendedHashtags).toEqual(samplePost.englishContent.hashtags);
    expect(checklist.assetDownloadUrls).toContain(samplePost.assetProvenance.dishImage);
  });

  it('should reject publication if the post is not approved by a human approver', async () => {
    const ytAdapter = registry.getAdapter(PlatformType.YOUTUBE_SHORTS);
    await ytAdapter?.authenticate({ apiKey: 'yt_mock_key_valid' });

    const draftPost: MarketingPost = {
      ...samplePost,
      status: ContentStatus.DRAFT // Not Approved
    };

    const result = await ytAdapter!.publish(draftPost);
    expect(result.success).toBe(false);
    expect(result.error).toContain('Human approval is required');
  });

  it('should publish or simulate publication with idempotency tracking when post is approved', async () => {
    const ytAdapter = registry.getAdapter(PlatformType.YOUTUBE_SHORTS);
    await ytAdapter?.authenticate({ apiKey: 'yt_mock_key_valid' });

    const approvedPost: MarketingPost = {
      ...samplePost,
      status: ContentStatus.APPROVED,
      approvalRecord: {
        approverId: 'chef_admin_01',
        approverName: 'Jane Rose',
        approvedAt: new Date().toISOString(),
        state: 'Approved'
      }
    };

    const result = await ytAdapter!.publish(approvedPost, { simulate: true });
    expect(result.success).toBe(true);
    expect(result.externalPostId).toBeDefined();
    expect(result.externalUrl).toContain('youtube.com/shorts');
  });

  it('should generate valid WhatsApp 1-to-1 share link with pre-filled bilingual message', () => {
    const waAdapter = registry.getAdapter(PlatformType.WHATSAPP);
    expect(waAdapter).toBeDefined();

    const shareUrl = (waAdapter as any).generateWhatsAppShareUrl(samplePost);
    expect(shareUrl).toContain('https://api.whatsapp.com/send?text=');
    expect(shareUrl).toContain(encodeURIComponent('Miseva AI'));
  });
});
