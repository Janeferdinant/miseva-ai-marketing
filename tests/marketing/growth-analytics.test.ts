import { describe, it, expect } from 'vitest';
import { GrowthExperimentsService } from '../../lib/marketing/services/growth-experiments-service';
import { AnalyticsRevenueService } from '../../lib/marketing/services/analytics-revenue-service';
import { PlatformType } from '../../lib/marketing/types/marketing-types';

describe('Growth Experiments, Privacy-Conscious Analytics & Revenue Funnel', () => {
  const experimentsService = new GrowthExperimentsService();
  const analyticsService = new AnalyticsRevenueService();

  it('should initialize all 7 required growth experiments', () => {
    const experiments = experimentsService.getAllExperiments();
    expect(experiments.length).toBeGreaterThanOrEqual(7);

    const mlVsEn = experimentsService.getExperimentById('exp-malayalam-vs-english');
    expect(mlVsEn).toBeDefined();
    expect(mlVsEn?.name).toContain('Malayalam vs English');
    expect(mlVsEn?.variantA.label).toContain('Malayalam');
    expect(mlVsEn?.variantB.label).toContain('English');
  });

  it('should determine experiment winners based on qualified product engagement (cooking sessions & subscriptions), not views alone', () => {
    const exp = experimentsService.getExperimentById('exp-recipe-vs-product');
    expect(exp).toBeDefined();

    // High views but low cooking sessions on Variant A vs lower views but 4x cooking sessions on Variant B
    const evaluated = experimentsService.evaluateExperiment('exp-recipe-vs-product', {
      variantA: { views: 50000, cookingSessions: 20, subscriptions: 2 },
      variantB: { views: 25000, cookingSessions: 180, subscriptions: 24 }
    });

    expect(evaluated.winner).toBe('B'); // Product adoption prioritized over vanity views
    expect(evaluated.insights.some(i => i.includes('cooking sessions'))).toBe(true);
  });

  it('should generate compliant UTM parameter links for privacy-first tracking', () => {
    const url = analyticsService.buildUtmUrl({
      baseUrl: 'https://miseva.ai/recipes/kerala-meen-curry',
      platform: PlatformType.INSTAGRAM_REEL,
      campaignName: '30day_launch',
      contentId: 'day_07',
      term: 'malayalam_voice'
    });

    expect(url).toContain('utm_source=instagram_reel');
    expect(url).toContain('utm_medium=short_video');
    expect(url).toContain('utm_campaign=30day_launch');
    expect(url).toContain('utm_content=day_07');
    expect(url).toContain('utm_term=malayalam_voice');
  });

  it('should calculate full funnel metrics while strictly separating observed from estimated metrics', () => {
    const funnel = analyticsService.getFunnelReport();
    expect(funnel.totalCampaignImpressions).toBeGreaterThan(0);
    expect(funnel.websiteVisitors).toBeGreaterThan(0);
    expect(funnel.appInstalls).toBeGreaterThan(0);
    expect(funnel.firstCookingSessions).toBeGreaterThan(0);
    expect(funnel.activeSubscribers).toBeGreaterThan(0);

    // Verify separation of observed vs estimated revenue
    expect(funnel.observedAttributedRevenueInr).toBeGreaterThan(0);
    expect(funnel.estimatedAttributedRevenueInr).toBeGreaterThan(0);
    expect(funnel.observedAttributedRevenueInr).not.toBe(funnel.estimatedAttributedRevenueInr);
  });

  it('should generate a comprehensive weekly executive performance digest', () => {
    const report = analyticsService.generateWeeklyExecutiveDigest({
      weekNumber: 1,
      productionCostInr: 25000,
      paidCampaignSpendInr: 15000
    });

    expect(report.weekNumber).toBe(1);
    expect(report.bestPerformingPost).toBeDefined();
    expect(report.worstPerformingPost).toBeDefined();
    expect(report.totalSpendInr).toBe(40000);
    expect(report.recommendations.length).toBeGreaterThanOrEqual(3);
  });
});
