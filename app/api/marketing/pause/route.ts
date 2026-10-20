import { NextResponse } from 'next/server';
import { sharedApprovalService } from '@/lib/marketing/services/marketing-hub';

export async function GET() {
  const pauseState = sharedApprovalService.getEmergencyPauseState();
  return NextResponse.json(pauseState);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const isPaused = Boolean(body.isPaused);
    const reason = body.reason || 'Emergency manual override';
    const actor = body.actor || 'Marketing Director';

    sharedApprovalService.setEmergencyPause(isPaused, reason, actor);
    const updated = sharedApprovalService.getEmergencyPauseState();

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to toggle emergency pause' },
      { status: 400 }
    );
  }
}
