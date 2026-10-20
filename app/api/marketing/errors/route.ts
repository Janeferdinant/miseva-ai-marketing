import { NextResponse } from 'next/server';
import {
  sharedErrorRetryMonitor,
  PublishingErrorType
} from '@/lib/marketing/services/error-retry-monitor-service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pendingOnly = searchParams.get('pending') === 'true';

    const logs = pendingOnly
      ? sharedErrorRetryMonitor.getPendingRetries()
      : sharedErrorRetryMonitor.getAuditLogs();

    return NextResponse.json({
      success: true,
      total: logs.length,
      logs
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
    const { postId, platform, errorType, errorMessage, attemptNumber } = body;

    if (!postId || !platform || !errorType) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters (postId, platform, errorType)' },
        { status: 400 }
      );
    }

    const result = sharedErrorRetryMonitor.recordError({
      postId,
      platform,
      errorType: errorType as PublishingErrorType,
      errorMessage: errorMessage || 'Transient publishing anomaly',
      attemptNumber: Number(attemptNumber) || 1
    });

    return NextResponse.json({
      success: true,
      result
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
