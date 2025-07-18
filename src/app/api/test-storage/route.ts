import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { createServerComponentClient } from '@/lib/supabase';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    console.log('Testing storage access...');
    
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const adminClient = createServerComponentClient();

    // Test 1: Vérifier l'accès au bucket
    const { data: bucketData, error: bucketError } = await adminClient.storage
      .from('profile-images')
      .list('', { limit: 1 });

    if (bucketError) {
      console.error('Bucket access error:', bucketError);
      return NextResponse.json({ 
        error: 'Bucket access failed', 
        details: bucketError.message 
      }, { status: 500 });
    }

    // Test 2: Vérifier les policies
    const { data: policies, error: policiesError } = await adminClient.storage
      .from('profile-images')
      .list(`${session.user.id}`, { limit: 1 });

    console.log('Storage test results:', {
      bucketAccess: !bucketError,
      userFolderAccess: !policiesError,
      userFolderData: policies,
      bucketData: bucketData
    });

    return NextResponse.json({ 
      success: true,
      bucketAccess: !bucketError,
      userFolderAccess: !policiesError,
      userFolderData: policies,
      bucketData: bucketData
    });

  } catch (error) {
    console.error('Storage test error:', error);
    return NextResponse.json({ 
      error: 'Storage test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 