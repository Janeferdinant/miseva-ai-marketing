/**
 * MISEVA AI — MARKETING HUB
 * Shared state container for calendar, approval, scheduler, experiments, and analytics services.
 */

import { CampaignCalendarService } from './campaign-calendar-service';
import { ApprovalWorkflowService } from './approval-workflow-service';
import { SchedulerService } from './scheduler-service';
import { ContentGenerationPipeline } from './content-generation-pipeline';
import { MediaAssetLibrary } from './media-asset-library';
import { GrowthExperimentsService } from './growth-experiments-service';
import { AnalyticsRevenueService } from './analytics-revenue-service';

import { sharedCustomerSegmentService, CustomerSegmentService } from './customer-segment-service';
import { sharedRecommendationEngine, RecommendationEngineService } from './recommendation-engine-service';
import { sharedAttributionService, AttributionFunnelService } from './attribution-funnel-service';
import { sharedErrorRetryMonitor, ErrorRetryMonitorService } from './error-retry-monitor-service';

export const sharedCalendarService = new CampaignCalendarService();
export const sharedApprovalService = new ApprovalWorkflowService(sharedCalendarService);
export const sharedSchedulerService = new SchedulerService(sharedCalendarService, sharedApprovalService);
export const sharedPipeline = new ContentGenerationPipeline();
export const sharedAssetLibrary = new MediaAssetLibrary();
export const sharedExperimentsService = new GrowthExperimentsService();
export const sharedAnalyticsService = new AnalyticsRevenueService();
export {
  sharedCustomerSegmentService,
  sharedRecommendationEngine,
  sharedAttributionService,
  sharedErrorRetryMonitor
};

