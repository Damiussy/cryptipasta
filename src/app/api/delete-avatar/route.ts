import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { createServerComponentClient } from '@/lib/supabase';
import { authOptions } from '@/lib/auth';

export async function DELETE() {
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

    // Create Supabase client with service role (bypasses RLS)
    const supabase = createServerComponentClient();

    // Get current avatar URL from user metadata
    const { data: userData } = await supabase.auth.admin.getUserById(session.user.id);
    const currentAvatarUrl = userData?.user?.user_metadata?.avatar_url;
    
    if (!currentAvatarUrl) {
      return NextResponse.json(
        { error: 'No avatar to delete' },
        { status: 400 }
      );
    }

    // Extract filename from URL
    const urlParts = currentAvatarUrl.split('/');
    const fileName = urlParts[urlParts.length - 1].split('?')[0]; // Remove query params
    const fullPath = `${session.user.id}/${fileName}`;

    // Delete file from Supabase Storage
    const { error: deleteError } = await supabase.storage
      .from('profile-images')
      .remove([fullPath]);

    if (deleteError) {
      console.error('Delete error:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete avatar' },
        { status: 500 }
      );
    }

    // Update user metadata to remove avatar URL
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      session.user.id,
      {
        user_metadata: { avatar_url: null }
      }
    );

    if (updateError) {
      console.error('Update user error:', updateError);
      // Even if metadata update fails, the file was deleted successfully
    }

    console.log(`Avatar deleted successfully for user ${session.user.id}`);

    return NextResponse.json({
      success: true,
      message: 'Avatar deleted successfully'
    });

  } catch (error) {
    console.error('Unexpected error in delete-avatar:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 