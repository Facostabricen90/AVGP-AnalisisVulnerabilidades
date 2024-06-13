'use client';

import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Login from '../pages/login';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
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
    return null; // Evitar mostrar contenido no autorizado
  }

  return (
    <html lang="en">
      <body className={`dark:bg-gray-800 ${inter.className}`}>
        {isAuthenticated ? (
          <div>
            <nav>
              <ul>
                <li><Link href="/"><a>Home</a></Link></li>
                <li><Link href="/dashboard"><a>Dashboard</a></Link></li>
                <li>
                  <button
                    onClick={() => {
                      localStorage.removeItem('user');
                      router.push('/login');
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
            {children}
          </div>
        ) : (
          <Login />
        )}
      </body>
    </html>
  );
}
