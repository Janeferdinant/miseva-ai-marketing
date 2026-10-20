/**
 * MISEVA AI — CAMPAIGN CALENDAR SERVICE
 * Manages the 30-day marketing flight schedule, filtering, status tracking, and export.
 */

import { INITIAL_30_DAY_CAMPAIGN } from '../data/initial-30-day-campaign';
import {
  CampaignPhase,
  ContentPillar,
  ContentStatus,
  PlatformType,
  type ApprovalRecord,
  type MarketingPost
} from '../types/marketing-types';

export interface CampaignFilterOptions {
  phase?: CampaignPhase;
  pillar?: ContentPillar;
  platform?: PlatformType;
  status?: ContentStatus;
  search?: string;
}

export interface CampaignSummary {
  totalPosts: number;
  byStatus: Record<ContentStatus, number>;
  byPhase: Record<CampaignPhase, number>;
  byPlatform: Record<PlatformType, number>;
  approvedCount: number;
  scheduledCount: number;
  publishedCount: number;
  awaitingApprovalCount: number;
}

export class CampaignCalendarService {
  private posts: Map<string, MarketingPost> = new Map();

  constructor(initialPosts: MarketingPost[] = INITIAL_30_DAY_CAMPAIGN) {
    initialPosts.forEach(post => {
      this.posts.set(post.id, { ...post });
    });
  }

  public getAllPosts(): MarketingPost[] {
    return Array.from(this.posts.values()).sort((a, b) => a.dayNumber - b.dayNumber);
  }

  public getPostById(id: string): MarketingPost | undefined {
    return this.posts.get(id);
  }

  public getPostByDay(dayNumber: number): MarketingPost | undefined {
    return Array.from(this.posts.values()).find(p => p.dayNumber === dayNumber);
  }

  public filterPosts(options: CampaignFilterOptions): MarketingPost[] {
    return this.getAllPosts().filter(post => {
      if (options.phase && post.phase !== options.phase) return false;
      if (options.pillar && post.pillar !== options.pillar) return false;
      if (options.status && post.status !== options.status) return false;
      if (options.platform && !post.platforms.includes(options.platform)) return false;
      if (options.search && options.search.trim() !== '') {
        const query = options.search.toLowerCase().trim();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesHook = post.englishContent.hook.toLowerCase().includes(query);
        const matchesCaption = post.englishContent.caption.toLowerCase().includes(query);
        const matchesDish = post.verifiedDishId?.toLowerCase().includes(query);
        const matchesMalayalam = post.malayalamContent?.hook.includes(query) ||
                                 post.malayalamContent?.caption.includes(query);
        if (!matchesTitle && !matchesHook && !matchesCaption && !matchesDish && !matchesMalayalam) {
          return false;
        }
      }
      return true;
    });
  }

  public updatePost(id: string, updates: Partial<MarketingPost>): MarketingPost {
    const existing = this.posts.get(id);
    if (!existing) {
      throw new Error(`Post with id "${id}" not found`);
    }
    const updated = {
      ...existing,
      ...updates
    };
    this.posts.set(id, updated);
    return updated;
  }

  public updatePostStatus(
    id: string,
    newStatus: ContentStatus,
    approvalRecord?: ApprovalRecord
  ): MarketingPost {
    const existing = this.posts.get(id);
    if (!existing) {
      throw new Error(`Post with id "${id}" not found`);
    }
    const updated: MarketingPost = {
      ...existing,
      status: newStatus,
      approvalRecord: approvalRecord || existing.approvalRecord
    };
    this.posts.set(id, updated);
    return updated;
  }

  public calculateCampaignSummary(): CampaignSummary {
    const posts = this.getAllPosts();

    const byStatus = Object.values(ContentStatus).reduce((acc, status) => {
      acc[status] = 0;
      return acc;
    }, {} as Record<ContentStatus, number>);

    const byPhase = Object.values(CampaignPhase).reduce((acc, phase) => {
      acc[phase] = 0;
      return acc;
    }, {} as Record<CampaignPhase, number>);

    const byPlatform = Object.values(PlatformType).reduce((acc, platform) => {
      acc[platform] = 0;
      return acc;
    }, {} as Record<PlatformType, number>);

    posts.forEach(post => {
      byStatus[post.status] = (byStatus[post.status] || 0) + 1;
      byPhase[post.phase] = (byPhase[post.phase] || 0) + 1;
      post.platforms.forEach(plat => {
        byPlatform[plat] = (byPlatform[plat] || 0) + 1;
      });
    });

    return {
      totalPosts: posts.length,
      byStatus,
      byPhase,
      byPlatform,
      approvedCount: byStatus[ContentStatus.APPROVED] || 0,
      scheduledCount: byStatus[ContentStatus.SCHEDULED] || 0,
      publishedCount: byStatus[ContentStatus.PUBLISHED] || 0,
      awaitingApprovalCount: byStatus[ContentStatus.AWAITING_APPROVAL] || 0
    };
  }

  public exportCalendar(format: 'CSV' | 'JSON' | 'ICS'): string {
    const posts = this.getAllPosts();

    if (format === 'JSON') {
      return JSON.stringify(posts, null, 2);
    }

    if (format === 'CSV') {
      const headers = [
        'Day',
        'Title',
        'Phase',
        'Pillar',
        'Format',
        'Platforms',
        'Status',
        'ScheduledTime',
        'EnglishHook',
        'VerifiedDish',
        'AssetImage'
      ];
      const rows = posts.map(p => [
        `"Day ${p.dayNumber}"`,
        `"${p.title.replace(/"/g, '""')}"`,
        `"${p.phase}"`,
        `"${p.pillar}"`,
        `"${p.format}"`,
        `"${p.platforms.join('; ')}"`,
        `"${p.status}"`,
        `"${p.scheduledTimeIso}"`,
        `"${p.englishContent.hook.replace(/"/g, '""')}"`,
        `"${p.verifiedDishId || 'N/A'}"`,
        `"${p.assetProvenance.dishImage}"`
      ]);
      return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    }

    if (format === 'ICS') {
      const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Miseva AI//30-Day Social Marketing Automation//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'X-WR-CALNAME:Miseva AI 30-Day Launch Campaign',
        'X-WR-TIMEZONE:Asia/Kolkata'
      ];

      posts.forEach(p => {
        const start = p.scheduledTimeIso.replace(/[-:]/g, '').split('.')[0] + 'Z';
        lines.push('BEGIN:VEVENT');
        lines.push(`UID:miseva-post-${p.id}@miseva.ai`);
        lines.push(`DTSTAMP:${now}`);
        lines.push(`DTSTART:${start}`);
        lines.push(`SUMMARY:Miseva AI Marketing: Day ${p.dayNumber} - ${p.title}`);
        lines.push(`DESCRIPTION:Phase: ${p.phase}\\nPillar: ${p.pillar}\\nPlatforms: ${p.platforms.join(', ')}\\nStatus: ${p.status}\\n\\nHook: ${p.englishContent.hook}`);
        lines.push(`STATUS:${p.status === ContentStatus.PUBLISHED ? 'CONFIRMED' : 'TENTATIVE'}`);
        lines.push('END:VEVENT');
      });

      lines.push('END:VCALENDAR');
      return lines.join('\r\n');
    }

    throw new Error(`Unsupported export format: ${format}`);
  }
}
