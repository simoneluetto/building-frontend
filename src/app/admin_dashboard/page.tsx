'use client';

import React, { useState, useEffect } from 'react';

// --- TypeScript Interfaces ---
interface Tenant {
  id: number;
  username: string;
}

interface Apartment {
  id: number;
  name: string;
  is_available: boolean;
  tenant: Tenant[];
  max_tenants?: number; // Optional: max number of tenants per apartment
}

// --- Main Component ---
export default function AdminDashboardPage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://127.0.0.1:1337';

  // --- Data Fetching ---
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
        setError('Authentication token not found. Please log in again.');
        setIsLoading(false);
        return;
    }
    const headers = {
        Authorization: `Bearer ${jwt}`,
    };

    try {
      // Fetch apartments and populate their assigned tenants (users)
      const apartmentsRes = await fetch(
        `${API_URL}/api/apartments?populate=tenant`, { headers }
      );
      if (!apartmentsRes.ok) throw new Error('Failed to fetch apartments.');
      const apartmentsData = await apartmentsRes.json();
      console.log('Fetched apartments data:', apartmentsData); // Debugging log
      
      // Fetch all users with the 'Tenant' role
      const tenantsRes = await fetch(
        `${API_URL}/api/users?filters[role][name][$eq]=Tenant`, { headers }
      );
      if (!tenantsRes.ok) throw new Error('Failed to fetch tenants.');
      const tenantsData = await tenantsRes.json();
      console.log('Fetched tenants data:', tenantsData); // Debugging log

      setApartments(apartmentsData.data);
      setTenants(tenantsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Event Handler ---
  const handleAssignTenant = async (apartmentId: number, tenantId: string) => {
    if (!tenantId) return;

    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      alert('Authentication token not found. Please log in again.');
      return;
    }

    const tenantToAssign = parseInt(tenantId, 10);
    const apartment = apartments.find(apt => apt.id === apartmentId);
    if (!apartment) return;

    const currentTenantIds = apartment.users.map((user) => user.id);
    const newTenantIds = [...currentTenantIds, tenantToAssign];

    // Determine new availability status
    const maxTenants = apartment.max_tenants || 1;
    const newAvailability = newTenantIds.length < maxTenants;

    try {
        // IMPORTANT: In a real app, get the JWT from a secure store (e.g., cookies)
        // const jwt = getCookie('jwt'); 
        const res = await fetch(`${API_URL}/api/apartments/${apartmentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                data: {
                    users: {
                        connect: [tenantToAssign], // Use connect to add a relation
                    },
                    is_available: newAvailability,
                },
            }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error?.message || 'Failed to update apartment.');
        }

        alert('Tenant assigned successfully!');
        fetchData(); // Refresh data to show the change
    } catch (err: any) {
        alert(`Error: ${err.message}`);
    }
  };


  // --- Render Logic ---
  if (isLoading) return <div className="p-8 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apartment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status / Tenants</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assign Tenant</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {apartments.map((apt) => (
              <tr key={apt.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{apt.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {apt.users && apt.users.length > 0 ? (
                     <div className="text-sm text-gray-800">
                        {apt.users.map(user => user.username).join(', ')}
                     </div>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Available
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {apt.is_available ? (
                     <div className="flex items-center space-x-2">
                        <select 
                           id={`tenant-select-${apt.id}`}
                           className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                           <option value="">Select a tenant...</option>
                           {tenants.filter(t => !apartments.flatMap(a => a.tenant).some(u => u.id === t.id)).map(tenant => (
                               <option key={tenant.id} value={tenant.id}>{tenant.username}</option>
                           ))}
                        </select>
                        <button
                          onClick={() => handleAssignTenant(apt.id, (document.getElementById(`tenant-select-${apt.id}`) as HTMLSelectElement).value)}
                          className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                        >
                           Assign
                        </button>
                     </div>
                  ) : (
                    <span className="text-gray-500">Occupied</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
