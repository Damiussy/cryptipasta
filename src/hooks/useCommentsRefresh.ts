import { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';

export function useCommentsRefresh() {
  const { data: session } = useSession();
  const lastUsername = useRef<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      // Get current username from session
      const currentUsername = session.user.name || session.user.email?.split('@')[0] || '';
      
      // If username changed, trigger a refresh
      if (lastUsername.current && lastUsername.current !== currentUsername) {
        // Dispatch a custom event to refresh comments
        window.dispatchEvent(new CustomEvent('refreshComments'));
      }
      
      lastUsername.current = currentUsername;
    }
  }, [session?.user]);

  return {
    addRefreshListener: (callback: () => void) => {
      const handleRefresh = () => callback();
      window.addEventListener('refreshComments', handleRefresh);
      return () => window.removeEventListener('refreshComments', handleRefresh);
    }
  };
} 