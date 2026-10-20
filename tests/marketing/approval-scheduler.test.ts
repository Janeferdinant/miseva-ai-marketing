import { describe, it, expect, beforeEach } from 'vitest';
import { ApprovalWorkflowService } from '../../lib/marketing/services/approval-workflow-service';
import { SchedulerService } from '../../lib/marketing/services/scheduler-service';
import { CampaignCalendarService } from '../../lib/marketing/services/campaign-calendar-service';
import { ContentStatus, PlatformType } from '../../lib/marketing/types/marketing-types';

describe('Approval Workflow, Emergency Pause & Scheduler Engine', () => {
  let calendarService: CampaignCalendarService;
  let approvalService: ApprovalWorkflowService;
  let schedulerService: SchedulerService;

  beforeEach(() => {
    calendarService = new CampaignCalendarService();
    approvalService = new ApprovalWorkflowService(calendarService);
    schedulerService = new SchedulerService(calendarService, approvalService);
  });

  it('should approve a post and record approver identity and timestamp', () => {
    const post = calendarService.getPostByDay(11); // Draft post
    expect(post).toBeDefined();

    const approved = approvalService.approvePost(
      post!.id,
      'emp_jane_rose',
      'Jane Rose, Assistant Professor',
      'Verified kitchen timer script and image relevance.'
    );

    expect(approved.status).toBe(ContentStatus.APPROVED);
    expect(approved.approvalRecord).toBeDefined();
    expect(approved.approvalRecord?.approverName).toBe('Jane Rose, Assistant Professor');
    expect(approved.approvalRecord?.state).toBe('Approved');
  });

  it('should reject a post and return it to draft with rejection notes', () => {
    const post = calendarService.getPostByDay(12);
    const rejected = approvalService.rejectPost(
      post!.id,
      'emp_jane_rose',
      'Jane Rose',
      'Needs updated grocery comparison figures.'
    );

    expect(rejected.status).toBe(ContentStatus.DRAFT);
    expect(rejected.approvalRecord?.state).toBe('Rejected');
    expect(rejected.approvalRecord?.notes).toContain('Needs updated grocery');
  });

  it('should enforce emergency campaign pause killswitch immediately', () => {
    expect(approvalService.isEmergencyPaused()).toBe(false);

    approvalService.setEmergencyPause(true, 'Global brand audit requested by executive team.');
    expect(approvalService.isEmergencyPaused()).toBe(true);

    const check = schedulerService.canExecuteScheduledPublishing();
    expect(check.canPublish).toBe(false);
    expect(check.reason).toContain('Emergency campaign pause is active');

    // Resume
    approvalService.setEmergencyPause(false);
    expect(approvalService.isEmergencyPaused()).toBe(false);
    expect(schedulerService.canExecuteScheduledPublishing().canPublish).toBe(true);
  });

  it('should enforce idempotency and prevent duplicate publishing of the same post', async () => {
    const post = calendarService.getPostByDay(7)!;
    // Approve it first
    approvalService.approvePost(post.id, 'admin', 'Admin', 'Approved for schedule');

    // Process publish
    const result1 = await schedulerService.publishPostNow(post.id, { simulate: true });
    expect(result1.success).toBe(true);

    // Immediate duplicate publish attempt with same idempotency key must be blocked
    const result2 = await schedulerService.publishPostNow(post.id, { simulate: true });
    expect(result2.success).toBe(false);
    expect(result2.error).toContain('Duplicate publishing blocked by idempotency guard');
  });

  it('should calculate next optimal publishing slot adhering to Asia/Kolkata timezone windows', () => {
    const slot = schedulerService.calculateNextPublishSlot({
      timezone: 'Asia/Kolkata',
      preferredWindow: 'EVENING_COOKING_PREP' // 18:00 - 20:00 IST
    });

    expect(slot).toBeDefined();
    expect(slot.timezone).toBe('Asia/Kolkata');
    expect(new Date(slot.scheduledTimeIso).getTime()).toBeGreaterThan(Date.now() - 60000);
  });
});
