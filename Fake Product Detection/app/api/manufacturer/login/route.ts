import { NextRequest, NextResponse } from 'next/server';
import { getManufacturerByEmail } from '@/lib/storage';
import { verifyPassword } from '@/lib/hash';
import type { ApiResponse, ManufacturerSession } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const manufacturer = getManufacturerByEmail(email);

    if (!manufacturer) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!verifyPassword(password, manufacturer.password)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const session: ManufacturerSession = {
      id: manufacturer.id,
      name: manufacturer.name,
      email: manufacturer.email,
      company: manufacturer.company,
    };

    return NextResponse.json<ApiResponse<ManufacturerSession>>({
      success: true,
      data: session,
    });
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Login failed' },
      { status: 500 }
    );
  }
}
