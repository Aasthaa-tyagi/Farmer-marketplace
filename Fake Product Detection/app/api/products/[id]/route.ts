import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/lib/storage';
import type { ApiResponse, Product } from '@/lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse<Product>>({
      success: true,
      data: product,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}
