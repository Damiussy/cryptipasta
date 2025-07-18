import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { createServerComponentClient } from '@/lib/supabase';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('API called - starting...');
    
    // Récupérer la session NextAuth avec les bonnes options
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      console.log('No session or user ID');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('User ID from session:', session.user.id);

    // Récupérer les données de la requête
    const body = await request.json();
    console.log('Request body:', body);
    
    const { display_name, avatar_url } = body;
    
    // Préparer les métadonnées à mettre à jour
    const updateData: Record<string, string> = {};
    
    if (display_name !== undefined) {
      if (!display_name || typeof display_name !== 'string') {
        console.log('Invalid display_name:', display_name);
        return NextResponse.json({ error: 'Display name is required' }, { status: 400 });
      }
      updateData.display_name = display_name.trim();
      updateData.name = display_name.trim();
    }
    
    if (avatar_url !== undefined) {
      updateData.avatar_url = avatar_url;
    }

    // Vérifier qu'on a au moins une donnée à mettre à jour
    if (Object.keys(updateData).length === 0) {
      console.log('No data to update');
      return NextResponse.json({ error: 'No data provided for update' }, { status: 400 });
    }

    console.log('Data to update:', updateData);

    const adminClient = createServerComponentClient();

    const { data, error } = await adminClient.auth.admin.updateUserById(
      session.user.id,
      {
        user_metadata: updateData
      }
    );

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    console.log('Update successful:', data);
    return NextResponse.json({ success: true, user: data.user });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}