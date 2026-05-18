import { NextResponse } from 'next/server';
import { getStats } from '@/lib/storage';
import type { ApiResponse } from '@/lib/types';

export async function GET() {
  try {
    const stats = getStats();

    return NextResponse.json<ApiResponse<typeof stats>>({
      success: true,
      data: stats,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
