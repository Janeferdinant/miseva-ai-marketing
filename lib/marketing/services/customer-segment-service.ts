/**
 * MISEVA AI — CUSTOMER SEGMENTATION & INTENT ENGINE
 * 
 * Configurable audience-segmentation and prompt engine centered on job-to-be-done,
 * cooking intent, regional culture, and consented behavior.
 * Never infers sensitive demographic traits or relies on age/gender assumptions.
 */

export type CustomerSegmentId =
  | 'SEGMENT_A_INGREDIENTS'
  | 'SEGMENT_B_KERALA_MALAYALAM'
  | 'SEGMENT_C_BUDGET_PLANNERS'
  | 'SEGMENT_D_BUSY_PROFESSIONALS'
  | 'SEGMENT_E_FAMILY_ORGANISERS'
  | 'SEGMENT_F_DESSERT_JUICE'
  | 'SEGMENT_G_TABLE_STYLING'
  | 'SEGMENT_H_INTERNATIONAL_CUISINE'
  | 'SEGMENT_I_RE_ENGAGEMENT';

export interface AudienceSignal {
  type: 'SEARCH_QUERY' | 'FEATURE_USED' | 'PAGE_VIEW' | 'LANGUAGE_PREFERENCE' | 'SAVED_DISH' | 'NOTIFICATION_PREFERENCE';
  value: string;
}

export interface SegmentDemographicsPolicy {
  primaryFocus: string;
  demographicNote: string;
  allowedExperimentation: boolean;
}

export interface AudienceSegmentDefinition {
  id: CustomerSegmentId;
  name: string;
  code: string;
  marketingObjective: string;
  intentDescription: string;
  primaryChannels: string[];
  signalTriggers: string[];
  targetDemographics: SegmentDemographicsPolicy;
  promptTemplate: string;
  defaultHook: string;
  exampleCallToAction: string;
}

export class CustomerSegmentService {
  private segments: AudienceSegmentDefinition[] = [
    {
      id: 'SEGMENT_A_INGREDIENTS',
      code: 'SEG-A',
      name: 'Ingredient-Based Recipe Seekers',
      marketingObjective: 'Solve the immediate "What can I cook with these ingredients?" problem.',
      intentDescription: 'Home cooks looking to turn existing pantry ingredients into delicious meals without grocery runs.',
      primaryChannels: ['Instagram Reels', 'YouTube Shorts', 'Search Ads', 'Recipe SEO'],
      signalTriggers: ['ingredient-search', 'fridge-scan', 'pantry-lookup', 'what can I cook'],
      targetDemographics: {
        primaryFocus: 'Interest-based cooking intent',
        demographicNote: 'Anchored on real-time ingredient search intent, not age or gender.',
        allowedExperimentation: true
      },
      promptTemplate:
        'Create a helpful Miseva AI campaign for people interested in ingredient-based cooking. Demonstrate how a user can enter ingredients ({ingredients}) and discover suitable recipes. Use a strong practical hook, realistic food visuals, a short explanation and a clear invitation to try the relevant feature. Avoid unsupported claims and do not imply knowledge of a person\'s private browsing history.',
      defaultHook: '3 dinners you can make from ingredients already in your fridge right now.',
      exampleCallToAction: 'Try the Ingredient Finder on Miseva AI'
    },
    {
      id: 'SEGMENT_B_KERALA_MALAYALAM',
      code: 'SEG-B',
      name: 'Kerala & Malayalam Cooking Enthusiasts',
      marketingObjective: 'Demonstrate culturally authentic Malayalam voice cooking guidance and Kerala regional classics.',
      intentDescription: 'Malayalam-speaking cooks, diaspora members, and regional culinary fans seeking authentic Kerala food and native language voice guidance.',
      primaryChannels: ['Malayalam Creator Partnerships', 'Instagram Reels', 'YouTube Shorts', 'WhatsApp Opt-In'],
      signalTriggers: ['ml', 'kerala', 'sadhya', 'karimeen', 'malayalam-assistant'],
      targetDemographics: {
        primaryFocus: 'Language and regional culinary affinity',
        demographicNote: 'Voluntary language preference and cultural intent, open to all adult cooks.',
        allowedExperimentation: true
      },
      promptTemplate:
        'Create a culturally authentic Malayalam-first campaign featuring a relevant Kerala recipe. Demonstrate how Miseva AI supports recipe discovery or Malayalam cooking guidance. Use natural language, accurate dish names, realistic ingredients and familiar culinary context. Provide an English variant where useful.',
      defaultHook: 'മലയാളത്തിൽ പാചകം പഠിക്കാം! Step-by-step voice guided cooking in Malayalam.',
      exampleCallToAction: 'Start Cooking with Malayalam Voice on Miseva AI'
    },
    {
      id: 'SEGMENT_C_BUDGET_PLANNERS',
      code: 'SEG-C',
      name: 'Budget-Conscious Meal Planners',
      marketingObjective: 'Help households organize weekly menus, eliminate food waste, and benchmark grocery prices.',
      intentDescription: 'Individuals and families striving to balance healthy eating with budget predictability.',
      primaryChannels: ['Google Search', 'Pinterest Infographics', 'YouTube Long-form', 'Blog Guides'],
      signalTriggers: ['budget', 'price-comparison', 'grocery-savings', 'cheap meals', 'weekly plan under'],
      targetDemographics: {
        primaryFocus: 'Financial wellness and meal planning intent',
        demographicNote: 'Focuses on economic utility and organized shopping intent.',
        allowedExperimentation: true
      },
      promptTemplate:
        'Create a practical campaign showing how Miseva AI helps organise meals and shopping. Use a realistic ingredient list, useful planning tips and a clear product demonstration. Only state prices or savings when supported by current, verifiable data.',
      defaultHook: 'How to meal prep 5 days of healthy dinners under ₹1,200 with zero food waste.',
      exampleCallToAction: 'Build Your Free Weekly Budget Meal Plan'
    },
    {
      id: 'SEGMENT_D_BUSY_PROFESSIONALS',
      code: 'SEG-D',
      name: 'Students & Busy Professionals',
      marketingObjective: 'Promote ultra-quick 15-minute healthy meals with minimal cleanup.',
      intentDescription: 'Working individuals, university students, and busy solo cooks who need fast, nutritious dinners after long days.',
      primaryChannels: ['Instagram Reels', 'YouTube Shorts', 'Quick Recipe Cards'],
      signalTriggers: ['quick', 'easy', '15-minute', 'one-pot', 'microwave'],
      targetDemographics: {
        primaryFocus: 'Time-efficiency and convenience intent',
        demographicNote: 'Based on lifestyle scheduling and quick meal intent.',
        allowedExperimentation: true
      },
      promptTemplate:
        'Create a short, energetic campaign showing a manageable meal-planning or cooking workflow. Emphasise simplicity, clear steps and relevant Miseva AI functionality without making unsupported claims about preparation time.',
      defaultHook: 'Exhausted after 9 hours of work? Make this 15-minute garlic paneer bowl.',
      exampleCallToAction: 'Explore 15-Minute Meals on Miseva AI'
    },
    {
      id: 'SEGMENT_E_FAMILY_ORGANISERS',
      code: 'SEG-E',
      name: 'Families & Household Meal Organisers',
      marketingObjective: 'Streamline multi-person household meal coordination and batch cooking.',
      intentDescription: 'Coordinators of multi-member households balancing kids, seniors, and diverse dietary needs.',
      primaryChannels: ['Pinterest Boards', 'YouTube Long-form', 'Facebook Groups'],
      signalTriggers: ['family', 'kids', 'batch-cook', 'household-shopping', 'multi-portion'],
      targetDemographics: {
        primaryFocus: 'Household coordination intent',
        demographicNote: 'Family-sized cooking intent without assuming traditional gender roles.',
        allowedExperimentation: true
      },
      promptTemplate:
        'Create a useful campaign about coordinating a household meal, planning compatible dishes and organising ingredients. Keep recommendations flexible and avoid assumptions about gender roles or family structure.',
      defaultHook: 'Dinner that everyone in the house actually agrees on—without cooking 3 separate dishes.',
      exampleCallToAction: 'Coordinate Your Household Meals with Miseva AI'
    },
    {
      id: 'SEGMENT_F_DESSERT_JUICE',
      code: 'SEG-F',
      name: 'Dessert, Juice & Baking Enthusiasts',
      marketingObjective: 'Showcase indulgent confectionery, tropical juices, and artisanal dessert techniques.',
      intentDescription: 'Food lovers looking for sweet treats, refreshing natural beverages, and baking inspiration.',
      primaryChannels: ['Instagram Carousels', 'Pinterest Pins', 'TikTok/Reels'],
      signalTriggers: ['dessert', 'baking', 'cake', 'juice', 'shake', 'beverage', 'lava cake'],
      targetDemographics: {
        primaryFocus: 'Culinary passion and indulgence intent',
        demographicNote: 'Aesthetic dessert and beverage appreciation intent across all demographics.',
        allowedExperimentation: true
      },
      promptTemplate:
        'Create an attractive dessert or juice campaign with accurate ingredients, appealing visuals and a relevant Miseva AI feature demonstration. Include a clear link to explore the recipe or related collection.',
      defaultHook: 'Restaurant-grade Molten Dark Chocolate Lava Cake right in your home oven.',
      exampleCallToAction: 'View the Artisanal Dessert Collection'
    },
    {
      id: 'SEGMENT_G_TABLE_STYLING',
      code: 'SEG-G',
      name: 'Fine Dining & Table Styling Enthusiasts',
      marketingObjective: 'Highlight the Table Styling Studio, luxury table settings, glassware pairing, and occasion hosting.',
      intentDescription: 'Entertainers, design enthusiasts, and home hosts curating aesthetic dining atmospheres.',
      primaryChannels: ['Table Styling Studio', 'Pinterest Aesthetic Boards', 'Instagram Aesthetic Carousels'],
      signalTriggers: ['table-styling', 'tableware', 'fine-dining', 'dinner-party', 'luxury-dining'],
      targetDemographics: {
        primaryFocus: 'Aesthetic dining and entertaining intent',
        demographicNote: 'Hospitality and design intent, accessible to all culinary enthusiasts.',
        allowedExperimentation: true
      },
      promptTemplate:
        'Create an elegant campaign demonstrating Miseva AI\'s Table Styling Studio. Show a distinct theme, coordinated tableware, compatible dishes and an occasion-specific arrangement. Keep the visual design realistic and the feature claims accurate.',
      defaultHook: 'Transform your dining table from everyday to 5-star luxury with AI styling.',
      exampleCallToAction: 'Launch Miseva Table Styling Studio'
    },
    {
      id: 'SEGMENT_H_INTERNATIONAL_CUISINE',
      code: 'SEG-H',
      name: 'International Cuisine Explorers',
      marketingObjective: 'Guide Indian cooks to authentic world cuisines (Italian, Mexican, Japanese, Pan-Asian) using locally available ingredients.',
      intentDescription: 'Curious cooks wishing to master foreign dishes with dependable Indian pantry adaptations.',
      primaryChannels: ['YouTube Tutorials', 'Instagram Guides', 'Culinary Blogs'],
      signalTriggers: ['pasta', 'risotto', 'ramen', 'sushi', 'tacos', 'international', 'italian', 'mexican'],
      targetDemographics: {
        primaryFocus: 'Global culinary exploration intent',
        demographicNote: 'Broad adult interest and culinary intent in international gastronomies.',
        allowedExperimentation: true
      },
      promptTemplate:
        'Create an informative campaign around an international cuisine. Explain the featured dish, ingredients and cooking workflow, and demonstrate how Miseva AI helps users discover or prepare it. Respect culinary authenticity and provide appropriate regional alternatives where useful.',
      defaultHook: 'Authentic Creamy Risotto made using ingredients you can buy at your local supermarket.',
      exampleCallToAction: 'Explore Global Cuisines on Miseva AI'
    },
    {
      id: 'SEGMENT_I_RE_ENGAGEMENT',
      code: 'SEG-I',
      name: 'Existing Users Who Need Re-Engagement',
      marketingObjective: 'Re-engage registered users who saved a dish, set a meal plan, or have consented notification preferences.',
      intentDescription: 'Consented users with past in-app interest who have not cooked recently or left an incomplete meal plan.',
      primaryChannels: ['In-App Alerts', 'Consented WhatsApp Updates', 'Email Digest'],
      signalTriggers: ['saved-dish-inactive', 'abandoned-onboarding', 'weekly-reminder-due', 're-engage'],
      targetDemographics: {
        primaryFocus: 'Consented first-party user relationship',
        demographicNote: 'Strictly opt-in with re-engagement intent, respecting user quiet hours and communication preferences.',
        allowedExperimentation: false
      },
      promptTemplate:
        'Generate a helpful, non-pressuring reminder related to the user\'s chosen activity. Avoid revealing sensitive information in notifications. Respect communication frequency limits, quiet hours, opt-outs and notification preferences.',
      defaultHook: 'Your saved Malabar Chicken Curry is ready for tonight\'s dinner.',
      exampleCallToAction: 'Resume Cooking on Miseva AI'
    }
  ];

  public getAllSegments(): AudienceSegmentDefinition[] {
    return [...this.segments];
  }

  public getSegmentById(id: CustomerSegmentId): AudienceSegmentDefinition | undefined {
    return this.segments.find(s => s.id === id);
  }

  public matchAudienceSignals(signals: AudienceSignal[]): AudienceSegmentDefinition | undefined {
    if (!signals || signals.length === 0) return undefined;

    // Search query or feature matching
    for (const signal of signals) {
      const lowerVal = signal.value.toLowerCase();

      // Check Malayalam / Kerala
      if (signal.type === 'LANGUAGE_PREFERENCE' && lowerVal === 'ml') {
        return this.getSegmentById('SEGMENT_B_KERALA_MALAYALAM');
      }
      if (lowerVal.includes('kerala') || lowerVal.includes('malayalam')) {
        return this.getSegmentById('SEGMENT_B_KERALA_MALAYALAM');
      }

      // Check Ingredient search
      if (lowerVal.includes('what can i cook') || signal.value === 'ingredient-search' || lowerVal.includes('ingredients')) {
        return this.getSegmentById('SEGMENT_A_INGREDIENTS');
      }

      // Check Budget & pricing
      if (lowerVal.includes('budget') || lowerVal.includes('price') || signal.value === 'price-comparison') {
        return this.getSegmentById('SEGMENT_C_BUDGET_PLANNERS');
      }

      // Check Table styling
      if (lowerVal.includes('table-styling') || lowerVal.includes('tableware') || lowerVal.includes('luxury')) {
        return this.getSegmentById('SEGMENT_G_TABLE_STYLING');
      }

      // Check Desserts & Juices
      if (lowerVal.includes('dessert') || lowerVal.includes('cake') || lowerVal.includes('juice') || lowerVal.includes('chocolate')) {
        return this.getSegmentById('SEGMENT_F_DESSERT_JUICE');
      }

      // Check Quick / Students
      if (lowerVal.includes('quick') || lowerVal.includes('15-minute') || lowerVal.includes('easy')) {
        return this.getSegmentById('SEGMENT_D_BUSY_PROFESSIONALS');
      }

      // Check International
      if (lowerVal.includes('risotto') || lowerVal.includes('ramen') || lowerVal.includes('pasta') || lowerVal.includes('international')) {
        return this.getSegmentById('SEGMENT_H_INTERNATIONAL_CUISINE');
      }

      // Check Family
      if (lowerVal.includes('family') || lowerVal.includes('kids') || lowerVal.includes('batch')) {
        return this.getSegmentById('SEGMENT_E_FAMILY_ORGANISERS');
      }

      // Check Re-engagement
      if (lowerVal.includes('re-engage') || lowerVal.includes('inactive')) {
        return this.getSegmentById('SEGMENT_I_RE_ENGAGEMENT');
      }
    }

    return this.getSegmentById('SEGMENT_A_INGREDIENTS');
  }

  public generateSegmentPrompt(segmentId: CustomerSegmentId, context?: {
    focusIngredients?: string[];
    dishName?: string;
    targetChannel?: string;
  }): string {
    const segment = this.getSegmentById(segmentId);
    if (!segment) {
      throw new Error(`Unknown segment: ${segmentId}`);
    }

    let prompt = segment.promptTemplate;
    if (context?.focusIngredients && context.focusIngredients.length > 0) {
      prompt = prompt.replace('{ingredients}', context.focusIngredients.join(', '));
    } else {
      prompt = prompt.replace('{ingredients}', 'fresh vegetables and pantry spices');
    }

    if (context?.dishName) {
      prompt += ` Featured dish: "${context.dishName}".`;
    }

    if (context?.targetChannel) {
      prompt += ` Tailor format specifically for: ${context.targetChannel}.`;
    }

    // Safety and ethical compliance guardrails
    prompt += ' Comply strictly with user privacy: Do not infer sensitive personal traits, and Do not imply knowledge of a person\'s private browsing history.';

    return prompt;
  }
}

export const sharedCustomerSegmentService = new CustomerSegmentService();
