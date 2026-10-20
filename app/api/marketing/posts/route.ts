import { NextResponse } from 'next/server';
import { sharedCalendarService, sharedPipeline } from '@/lib/marketing/services/marketing-hub';
import { CampaignPhase, ContentPillar, ContentStatus, PlatformType } from '@/lib/marketing/types/marketing-types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phase = searchParams.get('phase') as CampaignPhase | undefined;
    const pillar = searchParams.get('pillar') as ContentPillar | undefined;
    const platform = searchParams.get('platform') as PlatformType | undefined;
    const status = searchParams.get('status') as ContentStatus | undefined;
    const search = searchParams.get('search') || undefined;

    const posts = sharedCalendarService.filterPosts({
      phase,
      pillar,
      platform,
      status,
      search
    });

    const summary = sharedCalendarService.calculateCampaignSummary();

    return NextResponse.json({
      success: true,
      posts,
      summary
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch marketing posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const generatedPost = sharedPipeline.generatePostFromTopic({
      topic: body.topic || 'Kerala Culinary Secret',
      phase: body.phase || CampaignPhase.FEATURE,
      pillar: body.pillar || ContentPillar.WORLD_CUISINES,
      dishId: body.dishId,
      platforms: body.platforms || [PlatformType.INSTAGRAM_REEL, PlatformType.YOUTUBE_SHORTS],
      includeMalayalam: body.includeMalayalam ?? true
    });

    const added = sharedCalendarService.updatePost(generatedPost.id, generatedPost);

    return NextResponse.json({
      success: true,
      post: added
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to generate marketing post' },
      { status: 400 }
    );
  }
}
