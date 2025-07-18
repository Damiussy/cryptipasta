import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { createServerComponentClient } from '@/lib/supabase';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('=== COMMENT ADD API CALLED ===');
    
    // Check authentication
    const session = await getServerSession(authOptions);
    console.log('Session:', session ? 'Found' : 'Not found');
    console.log('User ID:', session?.user?.id);
    
    if (!session?.user?.id) {
      console.log('Unauthorized - no session or user ID');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { page_slug, content } = await request.json();
    console.log('Request data:', { page_slug, content: content?.substring(0, 50) + '...' });

    if (!page_slug || !content) {
      console.log('Missing required fields');
      return NextResponse.json(
        { error: 'Page slug and content are required' },
        { status: 400 }
      );
    }

    if (content.trim().length === 0) {
      console.log('Empty content');
      return NextResponse.json(
        { error: 'Comment cannot be empty' },
        { status: 400 }
      );
    }

    if (content.length > 1000) {
      console.log('Content too long');
      return NextResponse.json(
        { error: 'Comment is too long (max 1000 characters)' },
        { status: 400 }
      );
    }

    console.log('Creating Supabase client...');
    const supabase = createServerComponentClient();

    console.log('Attempting to insert comment...');
    console.log('Insert data:', {
      page_slug,
      user_id: session.user.id,
      content: content.trim()
    });

    // Add comment (without the problematic join)
    const { data: comment, error } = await supabase
      .from('comments')
      .insert({
        page_slug,
        user_id: session.user.id,
        content: content.trim()
      })
      .select('*')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return NextResponse.json(
        { 
          error: 'Failed to add comment', 
          details: error.message,
          code: error.code,
          hint: error.hint
        },
        { status: 500 }
      );
    }

    console.log('Comment added successfully:', comment);
    console.log(`Comment added successfully for page ${page_slug} by user ${session.user.id}`);

    // Add user info from session
    const userMetadata = {
      username: session.user.name || session.user.email?.split('@')[0],
      avatar_url: session.user.avatar_url
    };
    
    const commentWithUser = {
      ...comment,
      user: {
        id: session.user.id,
        email: session.user.email,
        user_metadata: userMetadata
      }
    };

    return NextResponse.json({
      success: true,
      comment: commentWithUser
    });

  } catch (error) {
    console.error('Unexpected error in add-comment API:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 