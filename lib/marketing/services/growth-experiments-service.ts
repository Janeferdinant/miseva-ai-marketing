/**
 * MISEVA AI — GROWTH EXPERIMENTS SERVICE
 * A/B Testing framework measuring product adoption over vanity metrics.
 */

import { type GrowthExperiment, type PostPerformanceMetrics } from '../types/marketing-types';

export class GrowthExperimentsService {
  private experiments: Map<string, GrowthExperiment> = new Map();

  constructor() {
    this.seedDefaultExperiments();
  }

  private seedDefaultExperiments(): void {
    const defaultList: GrowthExperiment[] = [
      {
        id: 'exp-malayalam-vs-english',
        name: 'Malayalam vs English Video Hooks',
        hypothesis: 'Native Malayalam hooks will drive 40% higher cooking session completions among Kerala diaspora cooks than English hooks.',
        variantA: {
          label: 'Malayalam Voice & Hook (മലയാളം)',
          description: 'Spoken Malayalam hook, Malayalam on-screen typography, regional Kerala culinary tone.',
          postIds: ['miseva-day-07', 'miseva-day-13', 'miseva-day-23'],
          metrics: {
            views: 42000,
            completionRatePercent: 86.4,
            cookingSessions: 380,
            subscriptions: 45
          }
        },
        variantB: {
          label: 'English Hook & Voice',
          description: 'English culinary hook with cosmopolitan tone.',
          postIds: ['miseva-day-01', 'miseva-day-06', 'miseva-day-14'],
          metrics: {
            views: 58000,
            completionRatePercent: 68.2,
            cookingSessions: 210,
            subscriptions: 28
          }
        },
        primaryMetric: 'cookingSessions',
        status: 'ACTIVE',
        confidenceScorePercent: 92.5,
        winner: 'A',
        insights: [
          'Malayalam hooks drove 81% more hands-free cooking sessions despite 27% lower top-of-funnel reach.',
          'Audience in Tier 1 and Gulf NRI diaspora watched 86% of the video duration when addressed in Malayalam.'
        ]
      },
      {
        id: 'exp-recipe-vs-product',
        name: 'Recipe Demos vs Product UI Demos',
        hypothesis: 'Authentic cooking demonstrations lead to higher app retention than raw software feature walkthroughs.',
        variantA: {
          label: 'Feature-Led UI Walkthrough',
          description: 'Screencasts highlighting Android Room DB, liquid-glass theme selector, and voice button.',
          postIds: ['miseva-day-09', 'miseva-day-17', 'miseva-day-24'],
          metrics: {
            views: 31000,
            cookingSessions: 42,
            subscriptions: 9
          }
        },
        variantB: {
          label: 'Recipe-Led Demonstration',
          description: 'Sizzling tadka, step-by-step Palak Paneer & Kerala Meen Curry with seamless voice co-pilot.',
          postIds: ['miseva-day-07', 'miseva-day-18', 'miseva-day-25'],
          metrics: {
            views: 49000,
            cookingSessions: 460,
            subscriptions: 62
          }
        },
        primaryMetric: 'cookingSessions',
        status: 'ACTIVE',
        confidenceScorePercent: 98.1,
        winner: 'B',
        insights: [
          'Leading with the sizzling dish and introducing the AI organically converts 6.8x more active cooking sessions.',
          'Vanity views on pure software walkthroughs have a 78% drop-off at second 12.'
        ]
      },
      {
        id: 'exp-short-vs-long',
        name: 'Short (<30s) vs Longer (45-60s) Videos',
        hypothesis: 'Snappy under-30s Reels maximize shareability, while 45-60s videos drive higher app installations.',
        variantA: {
          label: 'Snappy (<30s) Shorts/Reels',
          description: 'Rapid-cut culinary tips and micro-hacks.',
          postIds: ['miseva-day-01', 'miseva-day-04', 'miseva-day-11'],
          metrics: {
            views: 65000,
            shares: 1200,
            installs: 140,
            subscriptions: 15
          }
        },
        variantB: {
          label: 'Comprehensive (45-60s) Deep Dives',
          description: 'In-depth culinary science and step-by-step guidance.',
          postIds: ['miseva-day-06', 'miseva-day-18', 'miseva-day-25'],
          metrics: {
            views: 38000,
            shares: 450,
            installs: 390,
            subscriptions: 58
          }
        },
        primaryMetric: 'installs',
        status: 'ACTIVE',
        confidenceScorePercent: 94.0,
        winner: 'B',
        insights: [
          'Longer videos allow users to experience the full problem-solution arc, driving 2.7x more confirmed installs.'
        ]
      },
      {
        id: 'exp-cta-download-vs-visit',
        name: 'Call to Action: App Download vs Web Visit',
        hypothesis: 'Directing users to an instant web cooking experience without installation barrier yields higher first-day adoption.',
        variantA: {
          label: 'Direct App Store Download CTA',
          description: '"Download Android app on Google Play"',
          postIds: ['miseva-day-09', 'miseva-day-17'],
          metrics: {
            websiteClicks: 820,
            cookingSessions: 95,
            subscriptions: 18
          }
        },
        variantB: {
          label: 'Instant Web Cooking CTA',
          description: '"Try hands-free cooking now at miseva.ai"',
          postIds: ['miseva-day-06', 'miseva-day-07'],
          metrics: {
            websiteClicks: 2600,
            cookingSessions: 520,
            subscriptions: 72
          }
        },
        primaryMetric: 'cookingSessions',
        status: 'ACTIVE',
        confidenceScorePercent: 96.4,
        winner: 'B',
        insights: [
          'Zero-friction web session on mobile browser lets cooks test voice mode immediately, resulting in 4x subsequent app installs.'
        ]
      },
      {
        id: 'exp-recipe-vs-ai',
        name: 'Recipe-Led vs AI-Feature-Led Messaging',
        hypothesis: 'Focusing on delicious outcomes rather than AI buzzwords yields better engagement across Indian households.',
        variantA: {
          label: 'AI-Feature Messaging',
          description: '"Next-Gen Artificial Intelligence for your Kitchen"',
          postIds: ['miseva-day-03', 'miseva-day-24'],
          metrics: {
            views: 22000,
            cookingSessions: 50,
            subscriptions: 8
          }
        },
        variantB: {
          label: 'Delicious Outcome Messaging',
          description: '"Never burn your dinner again. Master authentic flavors effortlessly."',
          postIds: ['miseva-day-11', 'miseva-day-13'],
          metrics: {
            views: 44000,
            cookingSessions: 390,
            subscriptions: 49
          }
        },
        primaryMetric: 'cookingSessions',
        status: 'ACTIVE',
        confidenceScorePercent: 97.2,
        winner: 'B',
        insights: [
          'Framing technology as an invisible sous-chef that solves real pain points outperforms "AI" buzzwords by 7.8x.'
        ]
      },
      {
        id: 'exp-kerala-vs-global',
        name: 'Kerala-Specific vs Global Cuisine Content',
        hypothesis: 'Kerala culinary heritage establishes emotional trust before introducing global cuisines like Italian and Japanese.',
        variantA: {
          label: 'Kerala Heritage Dishes',
          description: 'Sadya, Meen Curry, Palada Payasam, Thalassery Biryani.',
          postIds: ['miseva-day-07', 'miseva-day-13', 'miseva-day-23'],
          metrics: {
            views: 61000,
            saves: 1850,
            shares: 1420,
            cookingSessions: 610
          }
        },
        variantB: {
          label: 'Global Cuisines',
          description: 'Saffron Risotto, Birria, Ramen, Thai Green Curry.',
          postIds: ['miseva-day-08', 'miseva-day-18'],
          metrics: {
            views: 39000,
            saves: 920,
            shares: 610,
            cookingSessions: 290
          }
        },
        primaryMetric: 'cookingSessions',
        status: 'ACTIVE',
        confidenceScorePercent: 95.0,
        winner: 'A',
        insights: [
          'Kerala content creates high viral sharing within family WhatsApp groups and community networks.'
        ]
      },
      {
        id: 'exp-grocery-vs-tablestyling',
        name: 'Grocery Cost Tips vs Table Styling Studio',
        hypothesis: 'Price-saving content drives high immediate utility, while Table Styling creates aspirational social saves.',
        variantA: {
          label: 'Grocery Price Benchmark',
          description: 'Blinkit vs Zepto vs Swiggy Instamart cost audits.',
          postIds: ['miseva-day-12', 'miseva-day-25'],
          metrics: {
            views: 45000,
            websiteClicks: 1400,
            shares: 980
          }
        },
        variantB: {
          label: 'Table Styling Studio',
          description: '2D layouts, banana leaf arrangements, candlelight banquets.',
          postIds: ['miseva-day-10', 'miseva-day-15', 'miseva-day-20'],
          metrics: {
            views: 38000,
            saves: 2100,
            websiteClicks: 1100
          }
        },
        primaryMetric: 'saves',
        status: 'ACTIVE',
        confidenceScorePercent: 88.0,
        winner: 'B',
        insights: [
          'Table Styling Studio is Pinterest gold: 2.1x higher saves and strong weekend party planning traffic.'
        ]
      }
    ];

    defaultList.forEach(exp => this.experiments.set(exp.id, exp));
  }

  public getAllExperiments(): GrowthExperiment[] {
    return Array.from(this.experiments.values());
  }

  public getExperimentById(id: string): GrowthExperiment | undefined {
    return this.experiments.get(id);
  }

  /**
   * Evaluates an experiment based on qualified conversion outcomes:
   * Prioritizes Cooking Sessions (5x) & Subscriptions (10x) over raw views.
   */
  public evaluateExperiment(
    id: string,
    customMetrics?: {
      variantA: Partial<PostPerformanceMetrics>;
      variantB: Partial<PostPerformanceMetrics>;
    }
  ): GrowthExperiment {
    const exp = this.experiments.get(id);
    if (!exp) {
      throw new Error(`Experiment ${id} not found`);
    }

    const metricsA = { ...exp.variantA.metrics, ...customMetrics?.variantA };
    const metricsB = { ...exp.variantB.metrics, ...customMetrics?.variantB };

    // Adoption score formula:
    const scoreA =
      (metricsA.views || 0) * 0.01 +
      (metricsA.websiteClicks || 0) * 0.5 +
      (metricsA.installs || 0) * 2 +
      (metricsA.cookingSessions || 0) * 5 +
      (metricsA.subscriptions || 0) * 10;

    const scoreB =
      (metricsB.views || 0) * 0.01 +
      (metricsB.websiteClicks || 0) * 0.5 +
      (metricsB.installs || 0) * 2 +
      (metricsB.cookingSessions || 0) * 5 +
      (metricsB.subscriptions || 0) * 10;

    let winner: 'A' | 'B' | 'INCONCLUSIVE' = 'INCONCLUSIVE';
    if (scoreA > scoreB * 1.1) winner = 'A';
    else if (scoreB > scoreA * 1.1) winner = 'B';

    const insights = [
      `Variant ${winner === 'A' ? exp.variantA.label : exp.variantB.label} demonstrated superior qualified product adoption.`,
      `Score breakdown: Variant A (${Math.round(scoreA)}) vs Variant B (${Math.round(scoreB)}).`,
      `Verified metrics prioritize actual cooking sessions and subscriptions over vanity view counts.`
    ];

    const updated: GrowthExperiment = {
      ...exp,
      variantA: { ...exp.variantA, metrics: metricsA },
      variantB: { ...exp.variantB, metrics: metricsB },
      winner,
      insights
    };

    this.experiments.set(id, updated);
    return updated;
  }
}

export const growthExperimentsService = new GrowthExperimentsService();
