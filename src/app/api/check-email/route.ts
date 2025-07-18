import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const supabase = createServerComponentClient();

    // Check if user exists with this email
    const { data: user, error } = await supabase.auth.admin.listUsers();

    if (error) {
      console.error('Error checking email:', error);
      return NextResponse.json(
        { error: 'Failed to check email' },
        { status: 500 }
      );
    }

    const emailExists = user.users.some(user => user.email === email);

    return NextResponse.json({
      exists: emailExists,
      message: emailExists ? 'Email already registered' : 'Email available'
    });

  } catch (error) {
    console.error('Unexpected error in check-email API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 