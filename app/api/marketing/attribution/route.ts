import { NextResponse } from 'next/server';
import {
  sharedAttributionService,
  FunnelEvent
} from '@/lib/marketing/services/attribution-funnel-service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const campaignSlug = searchParams.get('campaign') || 'ingredient-finder';

    const metrics = sharedAttributionService.getCampaignFunnelMetrics(campaignSlug);

    return NextResponse.json({
      success: true,
      campaign: campaignSlug,
      metrics
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: FunnelEvent = await request.json();

    if (!body.sessionId || !body.campaignSlug || !body.stage) {
      return NextResponse.json(
        { success: false, error: 'Missing required funnel parameters (sessionId, campaignSlug, stage)' },
        { status: 400 }
      );
    }

    sharedAttributionService.recordFunnelEvent(body);

    return NextResponse.json({
      success: true,
      recordedEvent: body
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
