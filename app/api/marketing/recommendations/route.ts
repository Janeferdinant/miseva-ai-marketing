import { NextResponse } from 'next/server';
import {
  sharedRecommendationEngine,
  RecommendationContext,
  UserConsentProfile
} from '@/lib/marketing/services/recommendation-engine-service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const currentPage = searchParams.get('page') || '/home';
    const activeCategory = searchParams.get('category') || undefined;
    const searchQuery = searchParams.get('q') || undefined;
    const lang = (searchParams.get('lang') as 'en' | 'ml') || 'en';

    const context: RecommendationContext = {
      currentPage,
      activeCategory,
      searchQuery,
      preferredLanguage: lang
    };

    const recommendations = sharedRecommendationEngine.getRecommendations(context);

    return NextResponse.json({
      success: true,
      total: recommendations.length,
      recommendations
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
    const body = await request.json();
    const context: RecommendationContext = body.context || { currentPage: '/home' };
    const profile: UserConsentProfile | undefined = body.profile;

    const recommendations = sharedRecommendationEngine.getRecommendations(context, profile);

    return NextResponse.json({
      success: true,
      total: recommendations.length,
      recommendations
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
