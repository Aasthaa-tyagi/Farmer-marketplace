import { NextRequest, NextResponse } from 'next/server';
import { createProduct, getAllProducts, getProductsByManufacturer, getManufacturerById } from '@/lib/storage';
import type { ApiResponse, Product, ProductInput } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const manufacturerId = searchParams.get('manufacturerId');

    let products: Product[];
    if (manufacturerId) {
      products = getProductsByManufacturer(manufacturerId);
    } else {
      products = getAllProducts();
    }

    return NextResponse.json<ApiResponse<Product[]>>({
      success: true,
      data: products,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { manufacturerId, ...productData } = body as ProductInput & { manufacturerId: string };

    if (!manufacturerId) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Manufacturer ID is required' },
        { status: 400 }
      );
    }

    const manufacturer = getManufacturerById(manufacturerId);
    if (!manufacturer) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Manufacturer not found' },
        { status: 404 }
      );
    }

    // Validate required fields
    const requiredFields = ['name', 'sku', 'description', 'category', 'batchNumber', 'manufacturingDate'];
    for (const field of requiredFields) {
      if (!productData[field as keyof ProductInput]) {
        return NextResponse.json<ApiResponse>(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const product = createProduct(productData, manufacturerId, manufacturer.company);

    return NextResponse.json<ApiResponse<Product>>(
      { success: true, data: product },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
