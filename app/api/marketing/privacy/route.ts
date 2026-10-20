import { NextResponse } from 'next/server';
import {
  sharedRecommendationEngine,
  UserConsentProfile
} from '@/lib/marketing/services/recommendation-engine-service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (userId) {
      const profile = sharedRecommendationEngine.getUserProfile(userId);
      return NextResponse.json({
        success: true,
        profile: profile || null
      });
    }

    return NextResponse.json({
      success: true,
      complianceStatus: 'VERIFIED_COMPLIANT',
      dpdpCompliant: true,
      thirdPartyTracking: false,
      quietHoursEnforced: true
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
    const action = body.action || 'UPDATE_CONSENT';
    const userId = body.userId;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (action === 'DELETE_DATA') {
      const deleted = sharedRecommendationEngine.deleteUserData(userId);
      return NextResponse.json({
        success: true,
        action: 'DELETE_DATA',
        deleted
      });
    }

    if (action === 'RESET_PROFILE') {
      sharedRecommendationEngine.resetUserProfile(userId);
      return NextResponse.json({
        success: true,
        action: 'RESET_PROFILE',
        message: 'Profile history cleared'
      });
    }

    // Default: UPDATE_CONSENT
    const allowPersonalisation = Boolean(body.allowPersonalisation);
    const allowNotifications = Boolean(body.allowNotifications);
    sharedRecommendationEngine.setConsent(userId, allowPersonalisation, allowNotifications);

    return NextResponse.json({
      success: true,
      action: 'UPDATE_CONSENT',
      profile: sharedRecommendationEngine.getUserProfile(userId)
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
