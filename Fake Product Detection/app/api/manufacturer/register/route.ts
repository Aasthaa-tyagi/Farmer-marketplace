import { NextRequest, NextResponse } from 'next/server';
import { createManufacturer, manufacturerEmailExists } from '@/lib/storage';
import type { ApiResponse, ManufacturerSession, ManufacturerInput } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ManufacturerInput;
    const { name, email, password, company } = body;

    // Validate required fields
    if (!name || !email || !password || !company) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    if (manufacturerEmailExists(email)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const manufacturer = createManufacturer(body);

    const session: ManufacturerSession = {
      id: manufacturer.id,
      name: manufacturer.name,
      email: manufacturer.email,
      company: manufacturer.company,
    };

    return NextResponse.json<ApiResponse<ManufacturerSession>>(
      { success: true, data: session },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    );
  }
}
