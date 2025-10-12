'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// --- TypeScript Interfaces ---
// Updated to RentPayment
interface RentPayment {
  id: number;
  title: string;
  amount: number;
  due_date: string;
  status: 'Paid' | 'Unpaid';
}

interface Photo {
  url: string;
  alternativeText: string | null;
}

interface Apartment {
  id: number;
  name: string;
  photos: Photo[];
}

interface UserData {
  username: string;
  email: string;
  apartment: Apartment | null;
  rent_payments: RentPayment[]; // Updated from bills
}

// --- Main Component ---
export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const API_URL = 'http://127.0.0.1:1337';

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('jwt');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        // Updated the populate query from bills to rent_payments
        const res = await fetch(
          `${API_URL}/api/users/me?populate[apartment][populate][0]=photos&populate[rent_payments]=*`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error('Failed to fetch user data. Please log in again.');
        }

        const data = await res.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
        localStorage.removeItem('jwt');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (isLoading) {
    return <div className="p-8 text-center text-lg">Loading your dashboard...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  if (!userData) {
    return <div className="p-8 text-center">Could not load user data.</div>;
  }

  // Updated to rent_payments
  const { username, apartment, rent_payments } = userData;
  const apartmentPhoto = apartment?.photos?.[0];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        Welcome back, {username}!
      </h1>
      
      {/* Apartment Information */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Apartment</h2>
        {apartment ? (
          <div className="md:flex md:space-x-6">
            {apartmentPhoto && (
              <div className="md:w-1/3 relative h-48 md:h-auto rounded-lg overflow-hidden mb-4 md:mb-0">
                <Image
                  src={`${API_URL}${apartmentPhoto.url}`}
                  alt={apartmentPhoto.alternativeText || `Photo of ${apartment.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            )}
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold">{apartment.name}</h3>
              <p className="text-gray-600 mt-2">
                This is your assigned living space. Manage your related tasks below.
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">You are not currently assigned to an apartment.</p>
        )}
      </div>

      {/* Rent Payments Section */}
      <div className="bg-white shadow-md rounded-lg">
         <h2 className="text-2xl font-semibold p-6">Rent Payments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rent_payments && rent_payments.length > 0 ? (
                rent_payments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">€{payment.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{new Date(payment.due_date).toLocaleDateString('it-IT')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          payment.status === 'Paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    You have no rent payments to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

