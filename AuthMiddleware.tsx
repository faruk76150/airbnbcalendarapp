'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthMiddleware({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const router = useRouter();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const currentPath = window.location.pathname;
    
    // If not authenticated and not on login page, redirect to login
    if (isAuthenticated !== 'true' && currentPath !== '/login') {
      router.push('/login');
    }
  }, [router]);
  
  return <>{children}</>;
}
