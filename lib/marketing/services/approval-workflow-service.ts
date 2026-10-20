/**
 * MISEVA AI — APPROVAL WORKFLOW SERVICE
 * Human approval gates, approval audit trail, and emergency campaign pause killswitch.
 */

import { CampaignCalendarService } from './campaign-calendar-service';
import {
  ContentStatus,
  type ApprovalRecord,
  type MarketingPost
} from '../types/marketing-types';

export interface EmergencyPauseState {
  isPaused: boolean;
  pausedAtIso?: string;
  pausedBy?: string;
  reason?: string;
}

export class ApprovalWorkflowService {
  private calendarService: CampaignCalendarService;
  private emergencyPause: EmergencyPauseState = { isPaused: false };
  private auditLog: Array<{
    timestamp: string;
    postId: string;
    action: 'APPROVED' | 'REJECTED' | 'RESCHEDULED' | 'EMERGENCY_PAUSE';
    actor: string;
    details: string;
  }> = [];

  constructor(calendarService: CampaignCalendarService) {
    this.calendarService = calendarService;
  }

  public isEmergencyPaused(): boolean {
    return this.emergencyPause.isPaused;
  }

  public getEmergencyPauseState(): EmergencyPauseState {
    return { ...this.emergencyPause };
  }

  public setEmergencyPause(isPaused: boolean, reason?: string, actor: string = 'Authorized Admin'): void {
    this.emergencyPause = {
      isPaused,
      pausedAtIso: isPaused ? new Date().toISOString() : undefined,
      pausedBy: isPaused ? actor : undefined,
      reason
    };

    this.auditLog.push({
      timestamp: new Date().toISOString(),
      postId: 'GLOBAL_CAMPAIGN',
      action: 'EMERGENCY_PAUSE',
      actor,
      details: isPaused ? `Emergency Pause ENABLED: ${reason || 'Manual override'}` : 'Emergency Pause RESUMED'
    });
  }

  public approvePost(
    postId: string,
    approverId: string,
    approverName: string,
    notes?: string
  ): MarketingPost {
    const approvalRecord: ApprovalRecord = {
      approverId,
      approverName,
      approvedAt: new Date().toISOString(),
      notes,
      state: 'Approved'
    };

    const updated = this.calendarService.updatePostStatus(
      postId,
      ContentStatus.APPROVED,
      approvalRecord
    );

    this.auditLog.push({
      timestamp: approvalRecord.approvedAt,
      postId,
      action: 'APPROVED',
      actor: approverName,
      details: notes || 'Post approved for scheduling'
    });

    return updated;
  }

  public rejectPost(
    postId: string,
    approverId: string,
    approverName: string,
    reason: string
  ): MarketingPost {
    const approvalRecord: ApprovalRecord = {
      approverId,
      approverName,
      approvedAt: new Date().toISOString(),
      notes: reason,
      state: 'Rejected'
    };

    const updated = this.calendarService.updatePostStatus(
      postId,
      ContentStatus.DRAFT,
      approvalRecord
    );

    this.auditLog.push({
      timestamp: approvalRecord.approvedAt,
      postId,
      action: 'REJECTED',
      actor: approverName,
      details: reason
    });

    return updated;
  }

  public reschedulePost(postId: string, newTimeIso: string, actor: string = 'Campaign Manager'): MarketingPost {
    const post = this.calendarService.getPostById(postId);
    if (!post) {
      throw new Error(`Post ${postId} not found`);
    }

    const updated = this.calendarService.updatePost(postId, {
      scheduledTimeIso: newTimeIso,
      status: post.status === ContentStatus.PUBLISHED ? post.status : ContentStatus.SCHEDULED
    });

    this.auditLog.push({
      timestamp: new Date().toISOString(),
      postId,
      action: 'RESCHEDULED',
      actor,
      details: `Rescheduled to ${newTimeIso}`
    });

    return updated;
  }

  public getAuditTrail(): Array<{
    timestamp: string;
    postId: string;
    action: string;
    actor: string;
    details: string;
  }> {
    return [...this.auditLog];
  }
}
