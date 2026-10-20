/**
 * MISEVA AI — CONSENT-BASED EXPLAINABLE RECOMMENDATION ENGINE
 * 
 * Provides intent-first, privacy-compliant culinary and feature recommendations.
 * Supports anonymous visitors with zero tracking (pure contextual matching)
 * and honors granular user consent policies without third-party surveillance.
 */

export type PersonalisationBasis =
  | 'CONTEXTUAL'
  | 'CONTENT_INTEREST'
  | 'COLLABORATIVE'
  | 'CONSENTED_ACTIVITY';

export interface RecommendationContext {
  currentPage: string;
  activeCategory?: string;
  searchQuery?: string;
  currentDishId?: string;
  preferredLanguage?: 'en' | 'ml';
}

export interface UserConsentProfile {
  userId: string;
  allowPersonalisation: boolean;
  allowNotifications: boolean;
  consentedCategories: string[];
  savedDishIds: string[];
  preferredLanguage?: 'en' | 'ml';
  createdAt?: string;
  lastUpdated?: string;
}

export interface RecommendationResult {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  reason: string;
  confidenceScore: number; // 0.0 to 1.0
  destinationUrl: string;
  campaignAttributionId: string;
  personalisationBasis: PersonalisationBasis;
  badgeLabel?: string;
  thumbnailUrl?: string;
}

export class RecommendationEngineService {
  private userProfiles = new Map<string, UserConsentProfile>();

  // Curated knowledge base of recommendations
  private catalogItems = [
    {
      id: 'rec_ingredient_finder',
      title: 'Pantry Ingredient Finder',
      subtitle: 'Cook with what is already in your fridge',
      category: 'Smart Cooking',
      tags: ['ingredients', 'pantry', 'fridge', 'quick', 'what can I cook'],
      destinationUrl: '/campaigns/ingredient-finder',
      campaignAttributionId: 'camp_intent_ingredients',
      thumbnailUrl: '/brand/images/hero-culinary.jpg'
    },
    {
      id: 'rec_malayalam_assistant',
      title: 'Malayalam Voice Cooking Assistant',
      subtitle: 'Hands-free voice guided cooking in Malayalam',
      category: 'Kerala & Malayalam Cooking',
      tags: ['malayalam', 'kerala', 'voice', 'audio', 'hands-free', 'sadhya'],
      destinationUrl: '/campaigns/malayalam-assistant',
      campaignAttributionId: 'camp_kerala_voice',
      thumbnailUrl: '/brand/images/hero-culinary.jpg'
    },
    {
      id: 'rec_meal_planner',
      title: 'Weekly Budget Meal Planner',
      subtitle: 'Plan 7 days of balanced dinners under budget',
      category: 'Meal Planning',
      tags: ['budget', 'meal planner', 'prep', 'grocery', 'savings', 'family'],
      destinationUrl: '/campaigns/meal-planner',
      campaignAttributionId: 'camp_budget_planner',
      thumbnailUrl: '/brand/images/hero-culinary.jpg'
    },
    {
      id: 'rec_table_styling',
      title: 'Table Styling Studio',
      subtitle: 'Luxury dining themes and table decor inspiration',
      category: 'Table Styling',
      tags: ['table-styling', 'tableware', 'luxury', 'entertaining', 'dinner-party'],
      destinationUrl: '/campaigns/table-styling',
      campaignAttributionId: 'camp_table_styling_luxury',
      thumbnailUrl: '/brand/images/hero-culinary.jpg'
    },
    {
      id: 'rec_molten_lava_cake',
      title: 'Molten Dark Chocolate Lava Cake',
      subtitle: 'Rich warm cocoa center with vanilla pairing',
      category: 'Desserts',
      tags: ['dessert', 'baking', 'chocolate', 'cake', 'sweet'],
      destinationUrl: '/desserts/molten-dark-chocolate-lava-cake',
      campaignAttributionId: 'camp_dessert_choc',
      thumbnailUrl: '/brand/images/hero-culinary.jpg'
    },
    {
      id: 'rec_karimeen_pollichathu',
      title: 'Kerala Karimeen Pollichathu',
      subtitle: 'Pearl spot fish wrapped in charred banana leaves',
      category: 'Kerala Cuisine',
      tags: ['kerala', 'seafood', 'spicy', 'traditional', 'malayalam'],
      destinationUrl: '/recipes/kerala-karimeen-pollichathu',
      campaignAttributionId: 'camp_kerala_karimeen',
      thumbnailUrl: '/brand/images/hero-culinary.jpg'
    },
    {
      id: 'rec_malabar_biryani',
      title: 'Thalassery Malabar Chicken Biryani',
      subtitle: 'Kaima rice with aromatic Malabar spices and ghee',
      category: 'Kerala Cuisine',
      tags: ['biryani', 'kerala', 'malabar', 'chicken', 'festive'],
      destinationUrl: '/recipes/malabar-chicken-biryani',
      campaignAttributionId: 'camp_malabar_biryani',
      thumbnailUrl: '/brand/images/hero-culinary.jpg'
    },
    {
      id: 'rec_risotto_milanese',
      title: 'Creamy Saffron Risotto Milanese',
      subtitle: 'Authentic Italian comfort with Indian saffron infusion',
      category: 'International Cuisines',
      tags: ['risotto', 'italian', 'international', 'pasta', 'cheese'],
      destinationUrl: '/recipes/creamy-saffron-risotto-milanese',
      campaignAttributionId: 'camp_intl_risotto',
      thumbnailUrl: '/brand/images/hero-culinary.jpg'
    }
  ];

  public getRecommendations(
    context: RecommendationContext,
    userProfile?: UserConsentProfile
  ): RecommendationResult[] {
    const results: RecommendationResult[] = [];
    const isPersonalised = userProfile?.allowPersonalisation ?? false;

    // 1. If user has consented to personalisation and profile exists
    if (isPersonalised && userProfile) {
      // Content-based matching against consented categories & saved dishes
      const userCategories = userProfile.consentedCategories.map(c => c.toLowerCase());
      const savedDishes = userProfile.savedDishIds.map(d => d.toLowerCase());

      for (const item of this.catalogItems) {
        let score = 0;
        let reasons: string[] = [];

        // Category match
        if (userCategories.some(uc => item.category.toLowerCase().includes(uc) || item.tags.some(t => t.includes(uc)))) {
          score += 0.45;
          reasons.push(`Based on your interest in ${item.category}`);
        }

        // Saved dishes affinity
        if (savedDishes.some(sd => item.destinationUrl.includes(sd) || item.tags.some(t => t.includes(sd)))) {
          score += 0.4;
          reasons.push('Complementary to your saved recipes');
        }

        // Language affinity
        if (userProfile.preferredLanguage === 'ml' && item.tags.includes('malayalam')) {
          score += 0.15;
          reasons.push('Features Malayalam voice guidance');
        }

        if (score > 0) {
          results.push({
            id: `rec_${item.id}_pers`,
            title: item.title,
            subtitle: item.subtitle,
            category: item.category,
            reason: reasons.join(' • '),
            confidenceScore: Math.min(0.98, Math.max(0.65, Number((0.6 + score * 0.4).toFixed(2)))),
            destinationUrl: item.destinationUrl,
            campaignAttributionId: item.campaignAttributionId,
            personalisationBasis: 'CONTENT_INTEREST',
            badgeLabel: 'Recommended for you',
            thumbnailUrl: item.thumbnailUrl
          });
        }
      }
    }

    // 2. Contextual Matching (Works for anonymous visitors OR when personalization is disabled)
    const page = (context.currentPage || '').toLowerCase();
    const query = (context.searchQuery || '').toLowerCase();
    const activeCat = (context.activeCategory || '').toLowerCase();

    for (const item of this.catalogItems) {
      // Don't duplicate already added items
      if (results.some(r => r.destinationUrl === item.destinationUrl)) continue;

      let contextualScore = 0;
      let reason = '';

      if (query && item.tags.some(t => t.includes(query) || query.includes(t))) {
        contextualScore = 0.92;
        reason = `Direct match for your search "${context.searchQuery}"`;
      } else if (activeCat && (item.category.toLowerCase().includes(activeCat) || activeCat.includes(item.category.toLowerCase()))) {
        contextualScore = 0.85;
        reason = `Popular in ${context.activeCategory}`;
      } else if (page.includes('table-styling') && item.category === 'Table Styling') {
        contextualScore = 0.9;
        reason = 'Explore coordinating luxury tableware and dining concepts';
      } else if (page.includes('dessert') && item.category === 'Desserts') {
        contextualScore = 0.88;
        reason = 'Explore complementary desserts and sweet pairings';
      } else if (page.includes('biryani') || page.includes('kerala')) {
        if (item.tags.includes('kerala') || item.tags.includes('malayalam')) {
          contextualScore = 0.82;
          reason = 'Authentic Kerala culinary pairing';
        }
      } else {
        // General top utility
        contextualScore = 0.72;
        reason = 'Trending smart cooking feature';
      }

      if (contextualScore >= 0.7) {
        results.push({
          id: `rec_${item.id}_ctx`,
          title: item.title,
          subtitle: item.subtitle,
          category: item.category,
          reason,
          confidenceScore: contextualScore,
          destinationUrl: item.destinationUrl,
          campaignAttributionId: item.campaignAttributionId,
          personalisationBasis: 'CONTEXTUAL',
          badgeLabel: 'Contextual suggestion',
          thumbnailUrl: item.thumbnailUrl
        });
      }
    }

    // Sort descending by confidence score
    return results.sort((a, b) => b.confidenceScore - a.confidenceScore).slice(0, 4);
  }

  public setUserProfile(profile: UserConsentProfile): void {
    this.userProfiles.set(profile.userId, {
      ...profile,
      lastUpdated: new Date().toISOString()
    });
  }

  public getUserProfile(userId: string): UserConsentProfile | undefined {
    return this.userProfiles.get(userId);
  }

  public setConsent(userId: string, allowPersonalisation: boolean, allowNotifications: boolean): void {
    const existing = this.userProfiles.get(userId) || {
      userId,
      allowPersonalisation: false,
      allowNotifications: false,
      consentedCategories: [],
      savedDishIds: []
    };

    existing.allowPersonalisation = allowPersonalisation;
    existing.allowNotifications = allowNotifications;
    existing.lastUpdated = new Date().toISOString();
    this.userProfiles.set(userId, existing);
  }

  public resetUserProfile(userId: string): void {
    const profile = this.userProfiles.get(userId);
    if (profile) {
      profile.consentedCategories = [];
      profile.savedDishIds = [];
      profile.lastUpdated = new Date().toISOString();
    }
  }

  public deleteUserData(userId: string): boolean {
    return this.userProfiles.delete(userId);
  }
}

export const sharedRecommendationEngine = new RecommendationEngineService();
