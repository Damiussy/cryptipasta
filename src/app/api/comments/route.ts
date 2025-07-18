import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/lib/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSlug = searchParams.get('page_slug');

    if (!pageSlug) {
      return NextResponse.json(
        { error: 'Page slug is required' },
        { status: 400 }
      );
    }

    const supabase = createServerComponentClient();

    // Get comments without the problematic join
    const { data: comments, error } = await supabase
      .from('comments')
      .select('*')
      .eq('page_slug', pageSlug)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
      return NextResponse.json(
        { error: 'Failed to fetch comments' },
        { status: 500 }
      );
    }

    // Get current session to check if any comments belong to current user
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id;

    // Get user data for each comment
    const commentsWithUsers = await Promise.all(
      (comments || []).map(async (comment) => {
        try {
          // If this is the current user's comment, use session data
          if (currentUserId && comment.user_id === currentUserId) {
            const userMetadata = {
              username: session.user.name || session.user.email?.split('@')[0],
              avatar_url: session.user.avatar_url
            };
            
            return {
              ...comment,
              user: {
                id: session.user.id,
                email: session.user.email,
                user_metadata: userMetadata
              }
            };
          }

          // For other users, get data from Supabase
          const { data: userData } = await supabase.auth.admin.getUserById(comment.user_id);
          return {
            ...comment,
            user: userData?.user ? {
              id: userData.user.id,
              email: userData.user.email,
              user_metadata: userData.user.user_metadata
            } : null
          };
        } catch (error) {
          console.error('Error fetching user data for comment:', comment.id, error);
          return {
            ...comment,
            user: null
          };
        }
      })
    );

    return NextResponse.json({
      comments: commentsWithUsers
    });

  } catch (error) {
    console.error('Unexpected error in comments API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 