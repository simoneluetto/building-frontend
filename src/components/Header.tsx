'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardUrl, setDashboardUrl] = useState('/login'); // Default/fallback URL

  // This effect checks login status and determines the correct dashboard URL
  useEffect(() => {
    const verifyUserAndSetDashboard = async () => {
      const token = localStorage.getItem('jwt');
      if (token) {
        try {
          const userRes = await fetch('http://127.0.0.1:1337/api/users/me?populate=role', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (userRes.ok) {
            const userData = await userRes.json();
            const role = userData.role?.name;

            if (role === 'Tenant') {
              setDashboardUrl('/tenant_dashboard');
            } else if (role === 'BuildingAdmin') {
              setDashboardUrl('/admin_dashboard');
            }
            setIsLoggedIn(true);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem('jwt');
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error('Error verifying user status:', error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    
    verifyUserAndSetDashboard();
    // Rerun this effect if the user navigates to a new page to keep state fresh
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setDashboardUrl('/login'); // Reset the URL
    router.push('/login');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Appartamenti', href: '/apartments' },
    { name: 'Aree Comuni', href: '/common-areas' },
    { name: 'Chi Siamo', href: '/about' },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Bosco dell'Aquila
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-gray-600 hover:text-blue-600 transition-colors ${
                  isActive ? 'font-bold text-blue-600' : ''
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          {isLoggedIn ? (
            <>
              <Link href={dashboardUrl} className="font-semibold text-blue-600 hover:text-blue-800">
                Area Personale
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold">
              Login
            </Link>
          )}
        </nav>
        {/* Mobile View */}
        <div className="md:hidden">
          {isLoggedIn ? (
             <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 text-sm font-semibold"
              >
                Logout
              </button>
          ) : (
            <Link href="/login" className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors text-sm font-semibold">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

