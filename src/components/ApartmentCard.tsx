'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// SVG Icons to avoid external dependencies
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);


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

const API_URL = 'http://127.0.0.1:1337';

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? apartment.photos.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    const isLastSlide = currentIndex === apartment.photos.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const hasPhotos = apartment.photos && apartment.photos.length > 0;
  const currentPhoto = hasPhotos ? apartment.photos[currentIndex] : null;

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden group flex flex-col">
      <div className="relative w-full h-56">
        {hasPhotos && currentPhoto ? (
          <Image
            src={`${API_URL}${currentPhoto.url}`}
            alt={currentPhoto.alternativeText || `Foto di ${apartment.name}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Nessuna foto</span>
          </div>
        )}
        {hasPhotos && apartment.photos.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous image"
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-1 rounded-full hover:bg-opacity-60 transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next image"
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-40 text-white p-1 rounded-full hover:bg-opacity-60 transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold">{apartment.name}</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600 my-2">
          <span>Piano: {apartment.floor}</span>
          <span>•</span>
          <span>Stanze: {apartment.rooms}</span>
          {/* <span>•</span>
          <span>Id: {apartment.documentId}</span> */}
        </div>
        <div className="flex justify-between items-center mt-auto pt-4">
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                apartment.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
                {apartment.is_available ? 'Disponibile' : 'Occupato'}
            </span>
            <Link
                href={`/apartments/${apartment.documentId}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold text-sm"
            >
                Maggiori Dettagli
            </Link>
        </div>
      </div>
    </div>
  );
}
