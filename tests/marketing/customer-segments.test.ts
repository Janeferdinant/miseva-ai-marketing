import { describe, it, expect } from 'vitest';
import {
  CustomerSegmentService,
  CustomerSegmentId,
  AudienceSignal
} from '@/lib/marketing/services/customer-segment-service';

describe('CustomerSegmentService — Intent-Driven Audience Engine', () => {
  const service = new CustomerSegmentService();

  it('provides all 9 required customer segments (A through I) centered on intent', () => {
    const segments = service.getAllSegments();
    expect(segments.length).toBe(9);

    const segmentIds = segments.map(s => s.id);
    expect(segmentIds).toContain('SEGMENT_A_INGREDIENTS');
    expect(segmentIds).toContain('SEGMENT_B_KERALA_MALAYALAM');
    expect(segmentIds).toContain('SEGMENT_C_BUDGET_PLANNERS');
    expect(segmentIds).toContain('SEGMENT_D_BUSY_PROFESSIONALS');
    expect(segmentIds).toContain('SEGMENT_E_FAMILY_ORGANISERS');
    expect(segmentIds).toContain('SEGMENT_F_DESSERT_JUICE');
    expect(segmentIds).toContain('SEGMENT_G_TABLE_STYLING');
    expect(segmentIds).toContain('SEGMENT_H_INTERNATIONAL_CUISINE');
    expect(segmentIds).toContain('SEGMENT_I_RE_ENGAGEMENT');
  });

  it('guarantees no segment uses age or gender as the core targeting hypothesis', () => {
    const segments = service.getAllSegments();
    segments.forEach(segment => {
      expect(segment.targetDemographics.primaryFocus).not.toMatch(/women|men|female|male|\b\d{2}-\d{2}\b/i);
      expect(segment.targetDemographics.demographicNote).toContain('intent');
    });
  });

  it('matches user signals to appropriate audience segment without fingerprinting', () => {
    // User searching for ingredients
    const ingredientSignals: AudienceSignal[] = [
      { type: 'SEARCH_QUERY', value: 'what can I cook with tomato and eggs' },
      { type: 'FEATURE_USED', value: 'ingredient-search' }
    ];
    const matchA = service.matchAudienceSignals(ingredientSignals);
    expect(matchA?.id).toBe('SEGMENT_A_INGREDIENTS');

    // User interacting with Malayalam voice cooking
    const malayalamSignals: AudienceSignal[] = [
      { type: 'LANGUAGE_PREFERENCE', value: 'ml' },
      { type: 'PAGE_VIEW', value: '/recipes/kerala-karimeen-pollichathu' }
    ];
    const matchB = service.matchAudienceSignals(malayalamSignals);
    expect(matchB?.id).toBe('SEGMENT_B_KERALA_MALAYALAM');

    // User viewing grocery price comparisons
    const budgetSignals: AudienceSignal[] = [
      { type: 'FEATURE_USED', value: 'price-comparison' },
      { type: 'SEARCH_QUERY', value: 'budget weekly meal plan under 1000' }
    ];
    const matchC = service.matchAudienceSignals(budgetSignals);
    expect(matchC?.id).toBe('SEGMENT_C_BUDGET_PLANNERS');
  });

  it('generates segment-specific AI marketing prompt with accurate guardrails', () => {
    const promptA = service.generateSegmentPrompt('SEGMENT_A_INGREDIENTS', {
      focusIngredients: ['Red Bell Pepper', 'Olive Oil', 'Garlic']
    });

    expect(promptA).toContain('ingredient-based cooking');
    expect(promptA).toContain('Red Bell Pepper');
    expect(promptA).toContain('Do not imply knowledge of a person\'s private browsing history');

    const promptB = service.generateSegmentPrompt('SEGMENT_B_KERALA_MALAYALAM');
    expect(promptB).toContain('culturally authentic Malayalam-first campaign');
    expect(promptB).toContain('Kerala recipe');
  });
});
