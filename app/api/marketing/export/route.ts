import { NextResponse } from 'next/server';
import { sharedCalendarService } from '@/lib/marketing/services/marketing-hub';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = (searchParams.get('format') || 'JSON').toUpperCase();

    if (format === 'CSV') {
      const csv = sharedCalendarService.exportCalendar('CSV');
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="miseva-30-day-campaign-calendar.csv"'
        }
      });
    }

    if (format === 'ICS') {
      const ics = sharedCalendarService.exportCalendar('ICS');
      return new NextResponse(ics, {
        headers: {
          'Content-Type': 'text/calendar; charset=utf-8',
          'Content-Disposition': 'attachment; filename="miseva-campaign.ics"'
        }
      });
    }

    const json = sharedCalendarService.exportCalendar('JSON');
    return new NextResponse(json, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Disposition': 'attachment; filename="miseva-campaign.json"'
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Export failed' },
      { status: 500 }
    );
  }
}
