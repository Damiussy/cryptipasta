'use client';

import { usePageTransitions } from '@/hooks/usePageTransitions';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const { isTransitioning } = usePageTransitions();

  return (
    <div className={isTransitioning ? 'page-fade-in' : ''}>
      {children}
    </div>
  );
}