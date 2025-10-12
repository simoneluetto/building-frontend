import Image from 'next/image';
import React from 'react';
import { JSX } from 'react';

// --- Define Types to match your Strapi API ---

interface StrapiPhoto {
  id: number;
  url: string;
  width: number;
  height: number;
  name: string;
}

// Type for Strapi's Rich Text editor format
type StrapiRichText = {
  type: string;
  children: { type: string; text: string }[];
}[];

interface CommonArea {
  id: number;
  name: string;
  description: StrapiRichText;
  photos: StrapiPhoto[] | null;
}

// Helper function to safely extract text from Strapi's Rich Text
function extractDescriptionText(description: StrapiRichText): string {
  try {
    return description[0]?.children[0]?.text || '';
  } catch (error) {
    console.error("Could not parse description", error);
    return '';
  }
}

// Fetches data from the 'common-areas' endpoint in Strapi
async function getCommonAreas(): Promise<CommonArea[]> {
  try {
    // Note: The endpoint is typically plural, 'common-areas'. Adjust if you named it differently.
    const res = await fetch('http://127.0.0.1:1337/api/common-areas?populate=*', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch common areas from Strapi');
    }

    const jsonResponse = await res.json();
    // The actual data is in the 'data' property of the response
    return jsonResponse.data;
  } catch (error) {
    console.error("API Error:", error);
    return []; // Return an empty array on error
  }
}

export default async function CommonAreasPage(): Promise<JSX.Element> {
  const commonAreas = await getCommonAreas();

  if (!Array.isArray(commonAreas)) {
    return (
      <p className="text-center text-red-500 font-bold">
        Error: Could not load common areas data.
      </p>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Le Nostre Aree Comuni</h1>

      {commonAreas.length === 0 ? (
        <p className="text-center text-gray-500">
          Al momento non ci sono aree comuni da mostrare.
        </p>
      ) : (
        <div className="space-y-12">
          {commonAreas.map((area) => {
              const photoData = area.photos?.[0];
              const descriptionText = extractDescriptionText(area.description);

              return (
                <div key={area.id} className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
                  {photoData ? (
                    <div className="relative md:w-1/3 w-full h-64 md:h-auto">
                      <Image
                        src={`http://127.0.0.1:1337${photoData.url}`}
                        alt={`Foto di ${area.name}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ) : (
                     <div className="relative md:w-1/3 w-full h-64 md:h-auto bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Nessuna Foto</span>
                     </div>
                  )}
                  <div className="p-6 md:w-2/3">
                    <h2 className="text-3xl font-bold mb-4">{area.name}</h2>
                    <p className="text-gray-700 leading-relaxed">
                      {descriptionText}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

