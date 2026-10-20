import { NextResponse } from 'next/server';
import { sharedAnalyticsService, sharedExperimentsService } from '@/lib/marketing/services/marketing-hub';

export async function GET() {
  try {
    const funnel = sharedAnalyticsService.getFunnelReport();
    const experiments = sharedExperimentsService.getAllExperiments();
    const weeklyDigest = sharedAnalyticsService.generateWeeklyExecutiveDigest({
      weekNumber: 1,
      productionCostInr: 25000,
      paidCampaignSpendInr: 15000
    });

    return NextResponse.json({
      success: true,
      funnel,
      experiments,
      weeklyDigest
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
