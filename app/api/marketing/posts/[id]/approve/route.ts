import { NextResponse } from 'next/server';
import { sharedApprovalService } from '@/lib/marketing/services/marketing-hub';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const action = body.action || 'APPROVE';
    const approverName = body.approverName || 'Authorized Marketing Lead';
    const approverId = body.approverId || 'lead_user_1';
    const notes = body.notes || '';

    if (action === 'REJECT') {
      const rejected = sharedApprovalService.rejectPost(id, approverId, approverName, notes);
      return NextResponse.json({ success: true, post: rejected, message: 'Post rejected and returned to draft' });
    }

    const approved = sharedApprovalService.approvePost(id, approverId, approverName, notes);
    return NextResponse.json({ success: true, post: approved, message: 'Post approved for scheduling' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Approval action failed' },
      { status: 400 }
    );
  }
}
