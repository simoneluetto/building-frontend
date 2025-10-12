'use client'; 

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Effect to check if user is already logged in
  useEffect(() => {
    const checkUserStatus = async () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        setIsLoading(true); // Show loading indicator
        try {
          // Verify token and get user role
          const userRes = await fetch('http://127.0.0.1:1337/api/users/me?populate=role', {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });

          if (userRes.ok) {
            const userData = await userRes.json();
            const role = userData.role?.name;

            if (role === 'Tenant') {
              router.push('/tenant_dashboard');
            } else if (role === 'BuildingAdmin') {
              router.push('/admin_dashboard');
            }
          } else {
            // Token is invalid or expired, clear it
            localStorage.removeItem('jwt');
          }
        } catch (err) {
          console.error("Failed to verify user status", err);
          // If server is down, etc., clear token
          localStorage.removeItem('jwt');
        } finally {
            // Only stop loading if we didn't redirect
            setIsLoading(false);
        }
      }
    };
    checkUserStatus();
  }, [router]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const authRes = await fetch('http://127.0.0.1:1337/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
      });

      const authData = await authRes.json();
      
      if (authData.error) {
        setError(authData.error.message || 'An error occurred.');
        setIsLoading(false);
        return;
      }
      
      const jwt = authData.jwt;
      if (!jwt) {
        setError('Authentication failed, no token received.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('jwt', jwt);
      window.location.reload(); // Reload to update header and trigger redirect

    } catch (err) {
      setError('Failed to connect to the server or an error occurred.');
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-700"
            >
              Email or Username
            </label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isLoading}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

