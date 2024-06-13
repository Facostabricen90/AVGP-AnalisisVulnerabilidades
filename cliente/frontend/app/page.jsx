// app/page.jsx
'use client';

import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Login from '../pages/login';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push('/login');
    }
  }, [router]);

  if (!isAuthenticated && router.pathname !== '/login') {
    return null;
  }

  return (
    <div className={`dark:bg-gray-800 ${inter.className}`}>
      <h1>Welcome to the Home Page</h1>
    </div>
  );
}
