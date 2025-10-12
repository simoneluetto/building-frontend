import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

const API_URL = 'http://127.0.0.1:1337';

interface Photo {
  id: number;
  url: string;
  alternativeText: string | null;
}

interface Apartment {
  id: number;
  name: string;
  description: any[]; // Strapi's rich text format
  floor: number;
  rooms: number;
  is_available: boolean;
  photos: Photo[];
}

// A simple helper to render Strapi's Rich Text format
const RichTextRenderer = ({ content }: { content: any[] }) => {
    if (!content) return null;
    return (
        <div>
            {content.map((block, index) => {
                if (block.type === 'paragraph' && block.children) {
                    return <p key={index} className="mb-4 text-gray-700">{block.children.map((child: any) => child.text).join('')}</p>;
                }
                // This can be expanded to render lists, headings, etc. in the future
                return null;
            })}
        </div>
    );
};

async function getApartmentData(id: string): Promise<Apartment | null> {
  try {
    console.log(`Fetching apartment data for ID: ${id}`);
    const res = await fetch(`${API_URL}/api/apartments/${id}?populate=photos`, {
      cache: 'no-store', // Use 'no-store' for development
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch apartment data:', error);
    return null;
  }
}

export default async function ApartmentDetailPage({ params }: { params: { id: string } }) {
  const apartment = await getApartmentData(params.id);
  console.log('Apartment data:', apartment);
  if (!apartment) {
    return (
        <div className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Appartamento non trovato</h1>
            <p className="text-gray-600 mb-6">Non è stato possibile caricare i dettagli per questo appartamento.</p>
            <Link href="/apartments" className="text-blue-600 hover:underline">
                &larr; Torna a tutti gli appartamenti
            </Link>
        </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Header section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">{apartment.name}</h1>
        <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-gray-600">
            <span>Piano: {apartment.floor}</span>
            <span className="hidden md:inline">•</span>
            <span>Stanze: {apartment.rooms}</span>
            <span className="hidden md:inline">•</span>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                apartment.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
                {apartment.is_available ? 'Disponibile' : 'Occupato'}
            </span>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {apartment.photos?.map((photo) => (
          <div key={photo.id} className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={`${API_URL}${photo.url}`}
              alt={photo.alternativeText || `Foto di ${apartment.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ))}
         {!apartment.photos || apartment.photos.length === 0 && (
            <div className="col-span-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Nessuna foto disponibile</p>
            </div>
        )}
      </div>

      {/* Description */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Descrizione</h2>
        <div className="prose max-w-none">
            <RichTextRenderer content={apartment.description} />
        </div>
      </div>
      
      <div className="text-center mt-12">
        <Link href="/apartments" className="text-blue-600 hover:underline font-semibold">
            &larr; Torna a tutti gli appartamenti
        </Link>
      </div>
    </div>
  );
}

