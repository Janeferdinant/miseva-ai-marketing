import { describe, it, expect, beforeEach } from 'vitest';
import {
  RecommendationEngineService,
  RecommendationContext,
  UserConsentProfile
} from '@/lib/marketing/services/recommendation-engine-service';

describe('RecommendationEngineService — Explainable & Consent-Based', () => {
  let engine: RecommendationEngineService;

  beforeEach(() => {
    engine = new RecommendationEngineService();
  });

  it('provides relevant contextual recommendations for anonymous visitors without tracking', () => {
    const context: RecommendationContext = {
      currentPage: '/recipes/malabar-chicken-biryani',
      activeCategory: 'Kerala Cuisine',
      searchQuery: 'biryani'
    };

    const recommendations = engine.getRecommendations(context);
    expect(recommendations.length).toBeGreaterThan(0);

    const first = recommendations[0];
    expect(first.title).toBeDefined();
    expect(first.reason).toBeDefined();
    expect(first.confidenceScore).toBeGreaterThanOrEqual(0.5);
    expect(first.confidenceScore).toBeLessThanOrEqual(1.0);
    expect(first.personalisationBasis).toBe('CONTEXTUAL');
    expect(first.destinationUrl).toBeDefined();
  });

  it('ranks recommendations by user-consented interests when personalization is enabled', () => {
    const profile: UserConsentProfile = {
      userId: 'usr_foodie_101',
      allowPersonalisation: true,
      allowNotifications: true,
      consentedCategories: ['Desserts', 'Baking'],
      savedDishIds: ['molten-dark-chocolate-lava-cake'],
      preferredLanguage: 'en'
    };

    const context: RecommendationContext = {
      currentPage: '/home'
    };

    const recommendations = engine.getRecommendations(context, profile);
    expect(recommendations.length).toBeGreaterThan(0);

    const dessertRec = recommendations.find(r => r.category.toLowerCase().includes('dessert'));
    expect(dessertRec).toBeDefined();
    expect(dessertRec?.personalisationBasis).toBe('CONTENT_INTEREST');
    expect(dessertRec?.reason).toContain('Desserts');
  });

  it('reverts to non-personalized contextual mode when allowPersonalisation is false', () => {
    const optOutProfile: UserConsentProfile = {
      userId: 'usr_privacy_first',
      allowPersonalisation: false,
      allowNotifications: false,
      consentedCategories: ['Kerala Cuisine'],
      savedDishIds: ['kerala-karimeen-pollichathu']
    };

    const context: RecommendationContext = {
      currentPage: '/table-styling'
    };

    const recommendations = engine.getRecommendations(context, optOutProfile);
    expect(recommendations.length).toBeGreaterThan(0);

    recommendations.forEach(r => {
      // Must not use profile interest if opt-out
      expect(r.personalisationBasis).toBe('CONTEXTUAL');
    });
  });

  it('supports profile data reset and complete deletion', () => {
    const userId = 'usr_to_delete';
    engine.setUserProfile({
      userId,
      allowPersonalisation: true,
      allowNotifications: true,
      consentedCategories: ['Seafood'],
      savedDishIds: ['dish-123']
    });

    expect(engine.getUserProfile(userId)).toBeDefined();

    // Reset profile
    engine.resetUserProfile(userId);
    const reset = engine.getUserProfile(userId);
    expect(reset?.consentedCategories).toHaveLength(0);
    expect(reset?.savedDishIds).toHaveLength(0);

    // Delete completely
    const deleted = engine.deleteUserData(userId);
    expect(deleted).toBe(true);
    expect(engine.getUserProfile(userId)).toBeUndefined();
  });
});
