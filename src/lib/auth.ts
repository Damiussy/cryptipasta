import { SupabaseAdapter } from '@next-auth/supabase-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { supabase } from '@/lib/supabase'
import { createServerComponentClient } from '@/lib/supabase'
import type { NextAuthOptions } from 'next-auth'

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
    }
  }
  
  interface User {
    id: string
    email: string
    name?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
  }
}

export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        })

        if (error || !data.user) {
          return null
        }

        // DEBUG: Afficher les métadonnées utilisateur
        console.log('User data from Supabase:', data.user)
        console.log('User metadata:', data.user.user_metadata)

        // Récupérer le display name depuis les métadonnées
        const displayName = data.user.user_metadata?.display_name || 
                           data.user.user_metadata?.name ||
                           data.user.user_metadata?.username ||
                           data.user.user_metadata?.full_name ||
                           data.user.email?.split('@')[0]

        console.log('Final displayName:', displayName)

        return {
          id: data.user.id,
          email: data.user.email!,
          name: displayName,
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  pages: {
    signIn: '/auth/signin',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        console.log('JWT callback - user name:', user.name)
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id
        
        try {
          // Récupérer les métadonnées utilisateur fraîches à chaque session
          const adminClient = createServerComponentClient();
          const { data: userData } = await adminClient.auth.admin.getUserById(token.id);
          
          if (userData?.user?.user_metadata) {
            // Mettre à jour le nom avec les données les plus récentes
            const freshDisplayName = userData.user.user_metadata?.display_name || 
                                     userData.user.user_metadata?.name ||
                                     userData.user.user_metadata?.username ||
                                     userData.user.user_metadata?.full_name ||
                                     session.user.email?.split('@')[0];
            
            session.user.name = freshDisplayName;
            console.log('Session callback - updated name from Supabase:', freshDisplayName);
          }
        } catch (error) {
          console.error('Error fetching fresh user data:', error);
          // En cas d'erreur, garder le nom existant
        }
        
        console.log('Session callback - final session user:', session.user)
      }
      return session
    },
  },
} 