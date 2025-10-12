import React from 'react';
import ApartmentCard from '@/components/ApartmentCard';

const API_URL = 'http://127.0.0.1:1337';

interface Photo {
  id: number;
  url: string;
  alternativeText: string | null;
}

interface Apartment {
  id: number;
  name: string;
  floor: number;
  rooms: number;
  is_available: boolean;
  photos: Photo[];
}

interface ApiResponse {
  data: Apartment[];
}

async function getApartments(): Promise<Apartment[]> {
  try {
    const res = await fetch(`${API_URL}/api/apartments?populate=photos`, {
      cache: 'no-store', // Use 'no-store' for development to see changes, consider 'revalidate' for production
    });
    if (!res.ok) {
      console.error('Failed to fetch apartments:', res.statusText);
      return [];
    }
    const data: ApiResponse = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('An error occurred while fetching apartments:', error);
    return [];
  }
}

export default async function ApartmentsPage() {
  const apartments = await getApartments();

  if (!apartments || apartments.length === 0) {
    return (
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4">I Nostri Appartamenti</h1>
        <p className="text-gray-600">Al momento non ci sono appartamenti da mostrare. Riprova più tardi.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">I Nostri Appartamenti</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apartments.map((apt) => (
          <ApartmentCard key={apt.id} apartment={apt} />
        ))}
      </div>
    </div>
  );
}

