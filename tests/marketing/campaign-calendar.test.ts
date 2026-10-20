import { describe, it, expect } from 'vitest';
import { CampaignCalendarService } from '../../lib/marketing/services/campaign-calendar-service';
import { CampaignPhase, ContentPillar, ContentStatus, PlatformType } from '../../lib/marketing/types/marketing-types';

describe('Campaign Calendar Service & 30-Day Template', () => {
  const service = new CampaignCalendarService();

  it('should load all 30 days of campaign posts', () => {
    const posts = service.getAllPosts();
    expect(posts).toHaveLength(30);

    // Verify all 30 day numbers exist 1..30
    for (let day = 1; day <= 30; day++) {
      const post = service.getPostByDay(day);
      expect(post).toBeDefined();
      expect(post?.dayNumber).toBe(day);
    }
  });

  it('should include bilingual content (English and Malayalam) for cultural and voice posts', () => {
    const malayalamPosts = service.filterPosts({ pillar: ContentPillar.MALAYALAM_VOICE });
    expect(malayalamPosts.length).toBeGreaterThanOrEqual(2);

    malayalamPosts.forEach(post => {
      expect(post.malayalamContent).toBeDefined();
      expect(post.malayalamContent?.hook.length).toBeGreaterThan(5);
      expect(post.malayalamContent?.caption.length).toBeGreaterThan(10);
      expect(post.englishContent?.hook.length).toBeGreaterThan(5);
    });
  });

  it('should filter posts by phase, platform, and content status', () => {
    const launchPosts = service.filterPosts({ phase: CampaignPhase.LAUNCH });
    expect(launchPosts.length).toBeGreaterThan(0);

    const igPosts = service.filterPosts({ platform: PlatformType.INSTAGRAM_REEL });
    expect(igPosts.length).toBeGreaterThan(0);

    const filtered = service.filterPosts({ search: 'Sadya' });
    expect(filtered.length).toBeGreaterThan(0);
  });

  it('should export the 30-day content calendar in CSV, JSON, and ICS formats', () => {
    const jsonExport = service.exportCalendar('JSON');
    expect(jsonExport).toContain('"dayNumber": 1');
    expect(jsonExport).toContain('"dayNumber": 30');

    const csvExport = service.exportCalendar('CSV');
    expect(csvExport).toContain('Day,Title,Phase,Pillar,Format,Platforms,Status');
    expect(csvExport).toContain('Day 1');
    expect(csvExport).toContain('Day 30');

    const icsExport = service.exportCalendar('ICS');
    expect(icsExport).toContain('BEGIN:VCALENDAR');
    expect(icsExport).toContain('END:VCALENDAR');
    expect(icsExport).toContain('SUMMARY:Miseva AI Marketing:');
  });

  it('should calculate accurate campaign summary metrics', () => {
    const summary = service.calculateCampaignSummary();
    expect(summary.totalPosts).toBe(30);
    expect(summary.byStatus).toBeDefined();
    expect(summary.byPlatform).toBeDefined();
    expect(summary.byPhase).toBeDefined();
  });
});
