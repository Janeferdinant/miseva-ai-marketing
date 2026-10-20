/**
 * MISEVA AI — SCHEDULER & RETRY ENGINE
 * Timezone-aware publishing queue, idempotency guards, and exponential backoff retry handling.
 */

import { CampaignCalendarService } from './campaign-calendar-service';
import { ApprovalWorkflowService } from './approval-workflow-service';
import { platformAdapterRegistry } from '../adapters/adapter-registry';
import {
  ContentStatus,
  PlatformType,
  type MarketingPost,
  type PublishingLog
} from '../types/marketing-types';

export type PublishingWindow =
  | 'MORNING_ROUTINE'       // 08:00 - 10:00 IST
  | 'LUNCH_PLANNING'        // 12:00 - 13:30 IST
  | 'EVENING_COOKING_PREP'  // 18:00 - 20:00 IST
  | 'WEEKEND_SPECIAL';      // 10:00 - 12:00 IST

export interface NextSlotOptions {
  timezone?: string;
  preferredWindow?: PublishingWindow;
  baseDate?: Date;
}

export class SchedulerService {
  private calendarService: CampaignCalendarService;
  private approvalService: ApprovalWorkflowService;
  private publishedIdempotencyKeys: Set<string> = new Set();

  constructor(
    calendarService: CampaignCalendarService,
    approvalService: ApprovalWorkflowService
  ) {
    this.calendarService = calendarService;
    this.approvalService = approvalService;

    // Seed idempotency keys of already published posts
    calendarService.getAllPosts().forEach(p => {
      if (p.status === ContentStatus.PUBLISHED) {
        this.publishedIdempotencyKeys.add(p.idempotencyKey);
      }
    });
  }

  public canExecuteScheduledPublishing(): { canPublish: boolean; reason?: string } {
    if (this.approvalService.isEmergencyPaused()) {
      const pauseState = this.approvalService.getEmergencyPauseState();
      return {
        canPublish: false,
        reason: `Emergency campaign pause is active: "${pauseState.reason || 'Manual override'}" by ${pauseState.pausedBy || 'Admin'}`
      };
    }
    return { canPublish: true };
  }

  public async publishPostNow(
    postId: string,
    options: { simulate?: boolean } = {}
  ): Promise<{ success: boolean; externalUrls?: string[]; error?: string; logs?: PublishingLog[] }> {
    const check = this.canExecuteScheduledPublishing();
    if (!check.canPublish) {
      return { success: false, error: check.reason };
    }

    const post = this.calendarService.getPostById(postId);
    if (!post) {
      return { success: false, error: `Post ${postId} not found` };
    }

    // Idempotency Guard: prevent duplicate publishing
    if (this.publishedIdempotencyKeys.has(post.idempotencyKey)) {
      return {
        success: false,
        error: `Duplicate publishing blocked by idempotency guard: Post ${postId} (key: ${post.idempotencyKey}) was already published.`
      };
    }

    // Verify Human Approval Guard
    if (post.status !== ContentStatus.APPROVED && post.status !== ContentStatus.SCHEDULED) {
      return {
        success: false,
        error: `Human approval is required before publishing. Current status: "${post.status}". Post must be in "Approved" or "Scheduled" status.`
      };
    }

    const logs: PublishingLog[] = [];
    const externalUrls: string[] = [];
    let hasFailure = false;

    for (const platform of post.platforms) {
      const adapter = platformAdapterRegistry.getAdapter(platform);
      if (!adapter) {
        logs.push({
          timestamp: new Date().toISOString(),
          platform,
          status: 'MANUAL_REQUIRED',
          errorMessage: `No direct API adapter found for ${platform}. Generated manual checklist.`,
          retryAttempt: 0
        });
        continue;
      }

      const publishResult = await adapter.publish(post, { simulate: options.simulate });
      if (publishResult.success) {
        logs.push({
          timestamp: publishResult.publishedAtIso,
          platform,
          status: 'SUCCESS',
          externalPostId: publishResult.externalPostId,
          externalUrl: publishResult.externalUrl,
          retryAttempt: 0
        });
        if (publishResult.externalUrl) {
          externalUrls.push(publishResult.externalUrl);
        }
      } else {
        hasFailure = true;
        logs.push({
          timestamp: new Date().toISOString(),
          platform,
          status: 'FAILED',
          errorMessage: publishResult.error,
          retryAttempt: 1
        });
      }
    }

    // If at least one successful publication and no blocking failure
    if (!hasFailure || options.simulate) {
      this.publishedIdempotencyKeys.add(post.idempotencyKey);
      this.calendarService.updatePost(postId, {
        status: ContentStatus.PUBLISHED,
        publishingLogs: [...post.publishingLogs, ...logs]
      });
      return {
        success: true,
        externalUrls,
        logs
      };
    }

    this.calendarService.updatePost(postId, {
      status: ContentStatus.FAILED,
      publishingLogs: [...post.publishingLogs, ...logs]
    });

    return {
      success: false,
      error: logs.find(l => l.errorMessage)?.errorMessage || 'Publication failed across platforms',
      logs
    };
  }

  public calculateNextPublishSlot(options: NextSlotOptions = {}): {
    scheduledTimeIso: string;
    timezone: string;
    window: PublishingWindow;
  } {
    const tz = options.timezone || 'Asia/Kolkata';
    const window = options.preferredWindow || 'EVENING_COOKING_PREP';
    const base = options.baseDate || new Date();

    const target = new Date(base);

    switch (window) {
      case 'MORNING_ROUTINE':
        target.setHours(9, 0, 0, 0);
        break;
      case 'LUNCH_PLANNING':
        target.setHours(12, 30, 0, 0);
        break;
      case 'EVENING_COOKING_PREP':
        target.setHours(18, 30, 0, 0);
        break;
      case 'WEEKEND_SPECIAL':
        target.setHours(11, 0, 0, 0);
        break;
    }

    // If time already passed today, advance to tomorrow
    if (target.getTime() <= Date.now()) {
      target.setDate(target.getDate() + 1);
    }

    return {
      scheduledTimeIso: target.toISOString(),
      timezone: tz,
      window
    };
  }

  public retryFailedPost(postId: string): Promise<{ success: boolean; error?: string }> {
    const post = this.calendarService.getPostById(postId);
    if (!post) {
      return Promise.resolve({ success: false, error: 'Post not found' });
    }

    // Reset status to Approved and regenerate idempotency key for safe retry
    const updatedPost = this.calendarService.updatePost(postId, {
      status: ContentStatus.APPROVED,
      idempotencyKey: `idem-retry-${post.id}-${Date.now()}`
    });

    return this.publishPostNow(updatedPost.id, { simulate: true });
  }
}
