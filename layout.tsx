'use client';

import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import AuthMiddleware from '@/components/AuthMiddleware';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-100`}>
        <AuthMiddleware>
          {/* Navigation */}
          <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/" className="text-xl font-bold text-blue-600">
                      Airbnb Calendar
                    </Link>
                  </div>
                  
                  {/* Desktop navigation */}
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    <Link 
                      href="/" 
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    >
                      Calendar
                    </Link>
                    <Link 
                      href="/listings" 
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    >
                      Manage Listings
                    </Link>
                    <Link 
                      href="/listings/add" 
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    >
                      Add Listing
                    </Link>
                  </div>
                </div>
                
                {/* Mobile menu button */}
                <div className="flex items-center sm:hidden">
                  <button 
                    className="menu-button inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg 
                      className="h-6 w-6" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>
          
          {/* Main content */}
          <main className="py-6">
            {children}
          </main>
          
          {/* Footer */}
          <footer className="bg-white shadow-inner mt-auto py-4">
            <div className="container mx-auto px-4">
              <div className="text-center text-sm text-gray-500">
                <p>Airbnb Calendar Integration App</p>
                <p className="mt-1">© {new Date().getFullYear()} - All rights reserved</p>
              </div>
            </div>
          </footer>
        </AuthMiddleware>
      </body>
    </html>
  );
}
