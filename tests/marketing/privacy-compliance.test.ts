import { describe, it, expect } from 'vitest';
import {
  RecommendationEngineService,
  UserConsentProfile
} from '@/lib/marketing/services/recommendation-engine-service';

describe('Privacy Compliance & User Consent Controls', () => {
  const engine = new RecommendationEngineService();

  it('guarantees no personal profiles are created for anonymous page browsing', () => {
    const anonymousContext = {
      currentPage: '/recipes/butter-chicken'
    };

    // Anonymous call without userProfile
    const recs = engine.getRecommendations(anonymousContext);
    expect(recs.length).toBeGreaterThan(0);
    expect(recs.every(r => r.personalisationBasis === 'CONTEXTUAL')).toBe(true);

    // Verify no user profile was secretly stored
    expect(engine.getUserProfile('anonymous')).toBeUndefined();
  });

  it('immediately purges personal signals upon consent revocation', () => {
    const userId = 'usr_test_privacy_revocation';

    // 1. User initially consents
    engine.setUserProfile({
      userId,
      allowPersonalisation: true,
      allowNotifications: true,
      consentedCategories: ['Kerala Cuisine', 'Fine Dining'],
      savedDishIds: ['malabar-biryani']
    });

    const activeProfile = engine.getUserProfile(userId);
    expect(activeProfile?.allowPersonalisation).toBe(true);
    expect(activeProfile?.consentedCategories.length).toBe(2);

    // 2. User toggles personalisation OFF
    engine.setConsent(userId, false, false);
    const updatedProfile = engine.getUserProfile(userId);
    expect(updatedProfile?.allowPersonalisation).toBe(false);
    expect(updatedProfile?.allowNotifications).toBe(false);

    // 3. User requests complete profile reset
    engine.resetUserProfile(userId);
    const resetProfile = engine.getUserProfile(userId);
    expect(resetProfile?.consentedCategories.length).toBe(0);
    expect(resetProfile?.savedDishIds.length).toBe(0);

    // 4. Recommendations for this user must now be strictly CONTEXTUAL
    const recs = engine.getRecommendations({ currentPage: '/home' }, updatedProfile);
    expect(recs.every(r => r.personalisationBasis === 'CONTEXTUAL')).toBe(true);
  });

  it('supports full right-to-be-forgotten data deletion', () => {
    const userId = 'usr_delete_me';
    engine.setUserProfile({
      userId,
      allowPersonalisation: true,
      allowNotifications: false,
      consentedCategories: ['Desserts'],
      savedDishIds: []
    });

    const deleted = engine.deleteUserData(userId);
    expect(deleted).toBe(true);
    expect(engine.getUserProfile(userId)).toBeUndefined();
  });
});
