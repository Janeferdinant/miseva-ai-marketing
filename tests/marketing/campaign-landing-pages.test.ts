import { describe, it, expect } from 'vitest';
import {
  AttributionFunnelService,
  CAMPAIGN_CONFIGS
} from '@/lib/marketing/services/attribution-funnel-service';

describe('AttributionFunnelService & Campaign Landing Configurations', () => {
  const service = new AttributionFunnelService();

  it('contains definitions for all 8 mandatory campaign landing pages', () => {
    const slugs = Object.keys(CAMPAIGN_CONFIGS);
    expect(slugs.length).toBe(8);

    expect(slugs).toContain('ingredient-finder');
    expect(slugs).toContain('kerala-recipes');
    expect(slugs).toContain('malayalam-assistant');
    expect(slugs).toContain('meal-planner');
    expect(slugs).toContain('budget-cooking');
    expect(slugs).toContain('desserts-juices');
    expect(slugs).toContain('table-styling');
    expect(slugs).toContain('international-recipes');
  });

  it('provides genuine feature demo metadata and calls-to-action for each campaign', () => {
    Object.values(CAMPAIGN_CONFIGS).forEach(cfg => {
      expect(cfg.title).toBeDefined();
      expect(cfg.headline).toBeDefined();
      expect(cfg.demoType).toBeDefined();
      expect(cfg.ctaLabel).toBeDefined();
      expect(cfg.googlePlayUrl).toBeDefined();
      expect(cfg.webAppUrl).toBeDefined();
    });
  });

  it('tracks full funnel events from impression to paid conversion', () => {
    const testSession = 'sess_test_1234';

    service.recordFunnelEvent({
      sessionId: testSession,
      campaignSlug: 'ingredient-finder',
      stage: 'LANDING_PAGE_VISIT',
      utmSource: 'google_search',
      utmCampaign: 'intent_pantry_cooking'
    });

    service.recordFunnelEvent({
      sessionId: testSession,
      campaignSlug: 'ingredient-finder',
      stage: 'APP_INSTALL',
      utmSource: 'google_search',
      utmCampaign: 'intent_pantry_cooking'
    });

    service.recordFunnelEvent({
      sessionId: testSession,
      campaignSlug: 'ingredient-finder',
      stage: 'FIRST_COOKING_SESSION',
      utmSource: 'google_search',
      utmCampaign: 'intent_pantry_cooking'
    });

    const metrics = service.getCampaignFunnelMetrics('ingredient-finder');
    expect(metrics.landingPageVisits).toBeGreaterThanOrEqual(1);
    expect(metrics.appInstalls).toBeGreaterThanOrEqual(1);
    expect(metrics.firstCookingSessions).toBeGreaterThanOrEqual(1);
  });

  it('calculates Cost Per Activated User (CPAU) accurately without divide-by-zero errors', () => {
    // Normal case
    const cpau = service.calculateCostPerActivatedUser(10000, 25);
    expect(cpau).toBe(400); // 10000 / 25 = 400 INR

    // Zero activation case
    const zeroCpau = service.calculateCostPerActivatedUser(5000, 0);
    expect(zeroCpau).toBe(0);
  });
});
