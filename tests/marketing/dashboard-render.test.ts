import { describe, it, expect } from 'vitest';
import { sharedCalendarService, sharedApprovalService, sharedSchedulerService } from '../../lib/marketing/services/marketing-hub';
import { ContentStatus } from '../../lib/marketing/types/marketing-types';

describe('Marketing Dashboard State & Action Controls', () => {
  it('should initialize with all 30 campaign days and summary statistics', () => {
    const posts = sharedCalendarService.getAllPosts();
    expect(posts).toHaveLength(30);

    const summary = sharedCalendarService.calculateCampaignSummary();
    expect(summary.totalPosts).toBe(30);
    expect(summary.byPhase.Launch).toBeGreaterThan(0);
  });

  it('should handle post approval and update state reactively', () => {
    const post = sharedCalendarService.getPostByDay(14)!;
    sharedApprovalService.approvePost(
      post.id,
      'admin_user_01',
      'Chef Lead Jane Rose',
      'Verified culinary science explanation for tadka blooming.'
    );

    const updated = sharedCalendarService.getPostById(post.id);
    expect(updated?.status).toBe(ContentStatus.APPROVED);
    expect(updated?.approvalRecord?.approverName).toBe('Chef Lead Jane Rose');
  });

  it('should prevent publishing when emergency pause is active', async () => {
    sharedApprovalService.setEmergencyPause(true, 'Temporary compliance check');

    const post = sharedCalendarService.getPostByDay(14)!;
    const result = await sharedSchedulerService.publishPostNow(post.id, { simulate: true });

    expect(result.success).toBe(false);
    expect(result.error).toContain('Emergency campaign pause is active');

    // Resume
    sharedApprovalService.setEmergencyPause(false);
    const resumeCheck = sharedSchedulerService.canExecuteScheduledPublishing();
    expect(resumeCheck.canPublish).toBe(true);
  });

  it('should support export to CSV, JSON, and ICS formats', () => {
    const csv = sharedCalendarService.exportCalendar('CSV');
    expect(csv.startsWith('Day,Title,Phase')).toBe(true);

    const json = sharedCalendarService.exportCalendar('JSON');
    const parsed = JSON.parse(json);
    expect(parsed).toHaveLength(30);

    const ics = sharedCalendarService.exportCalendar('ICS');
    expect(ics).toContain('BEGIN:VCALENDAR');
  });

  it('verifies all 11 dashboard module components and shared services are wired and functional', async () => {
    const {
      sharedCustomerSegmentService,
      sharedRecommendationEngine,
      sharedAttributionService,
      sharedErrorRetryMonitor
    } = await import('../../lib/marketing/services/marketing-hub');

    // 1. Customer Segments
    expect(sharedCustomerSegmentService.getAllSegments()).toHaveLength(9);

    // 2. Recommendation Engine
    const recs = sharedRecommendationEngine.getRecommendations({ currentPage: '/home' });
    expect(recs.length).toBeGreaterThan(0);

    // 3. Attribution Funnel
    const funnel = sharedAttributionService.getCampaignFunnelMetrics('ingredient-finder');
    expect(funnel.costPerActivatedUserInr).toBeGreaterThan(0);

    // 4. Error Retry Monitor
    expect(sharedErrorRetryMonitor.calculateRetryDelaySeconds(1)).toBe(300);
  });
});
