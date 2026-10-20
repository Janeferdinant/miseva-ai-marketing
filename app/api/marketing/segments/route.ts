import { NextResponse } from 'next/server';
import {
  sharedCustomerSegmentService,
  CustomerSegmentId
} from '@/lib/marketing/services/customer-segment-service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const segmentId = searchParams.get('id') as CustomerSegmentId | null;
    const generatePrompt = searchParams.get('prompt') === 'true';

    if (segmentId) {
      const segment = sharedCustomerSegmentService.getSegmentById(segmentId);
      if (!segment) {
        return NextResponse.json(
          { success: false, error: `Segment ${segmentId} not found` },
          { status: 404 }
        );
      }

      if (generatePrompt) {
        const ingredients = searchParams.get('ingredients')?.split(',') || [];
        const dish = searchParams.get('dish') || undefined;
        const prompt = sharedCustomerSegmentService.generateSegmentPrompt(segmentId, {
          focusIngredients: ingredients,
          dishName: dish
        });
        return NextResponse.json({ success: true, segment, generatedPrompt: prompt });
      }

      return NextResponse.json({ success: true, segment });
    }

    const segments = sharedCustomerSegmentService.getAllSegments();
    return NextResponse.json({
      success: true,
      totalSegments: segments.length,
      segments
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
