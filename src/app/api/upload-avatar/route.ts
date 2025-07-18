import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { createServerComponentClient } from '@/lib/supabase';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Get session from NextAuth
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      console.error('No session or user ID');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Create Supabase client with service role (bypasses RLS)
    const supabase = createServerComponentClient();

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${session.user.id}/${timestamp}.${fileExtension}`;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('profile-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      );
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fileName);

    // Update user metadata with new avatar URL
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      session.user.id,
      {
        user_metadata: { avatar_url: publicUrl }
      }
    );

    if (updateError) {
      console.error('Update user error:', updateError);
      // Even if metadata update fails, the file was uploaded successfully
      // So we still return the URL
    }

    console.log(`Avatar uploaded successfully for user ${session.user.id}: ${publicUrl}`);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      message: 'Avatar uploaded successfully'
    });

  } catch (error) {
    console.error('Unexpected error in upload-avatar:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 