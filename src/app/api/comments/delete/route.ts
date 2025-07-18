import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { createServerComponentClient } from '@/lib/supabase';
import { authOptions } from '@/lib/auth';

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { commentId } = await request.json();

    if (!commentId) {
      return NextResponse.json(
        { error: 'Comment ID is required' },
        { status: 400 }
      );
    }

    const supabase = createServerComponentClient();

    // First, check if the comment exists and belongs to the user
    const { data: existingComment, error: fetchError } = await supabase
      .from('comments')
      .select('*')
      .eq('id', commentId)
      .eq('user_id', session.user.id)
      .single();

    if (fetchError || !existingComment) {
      return NextResponse.json(
        { error: 'Comment not found or you do not have permission to delete it' },
        { status: 404 }
      );
    }

    // Delete the comment
    const { error: deleteError } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)
      .eq('user_id', session.user.id);

    if (deleteError) {
      console.error('Error deleting comment:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete comment' },
        { status: 500 }
      );
    }

    console.log(`Comment ${commentId} deleted successfully by user ${session.user.id}`);

    return NextResponse.json({
      success: true,
      message: 'Comment deleted successfully'
    });

  } catch (error) {
    console.error('Unexpected error in delete-comment API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 