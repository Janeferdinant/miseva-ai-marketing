import { NextResponse } from 'next/server';
import { sharedSchedulerService } from '@/lib/marketing/services/marketing-hub';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const simulate = body.simulate ?? false;

    const result = await sharedSchedulerService.publishPostNow(id, { simulate });
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error, logs: result.logs },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      externalUrls: result.externalUrls,
      logs: result.logs,
      message: 'Post successfully published across target platforms'
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Publishing operation failed' },
      { status: 500 }
    );
  }
}
