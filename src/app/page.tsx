import React from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

// A simple component for amenity items
const AmenityItem = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
        {/* A simple placeholder for an icon */}
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
    <div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-1 text-base text-gray-600">{description}</p>
    </div>
  </div>
);

export default function AboutPage() {
  const buildingAddress = "Via Aquila 8, 10144 Torino TO, Italy";
  // This is a pre-generated embed URL. See instructions below to create your own.
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5773.5963921580715!2d7.6625166117239765!3d45.08367815862679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47886da93b52b25b%3A0x8d4fc41212f649f!2sVia%20Aquila%2C%208%2C%2010144%20Torino%20TO!5e1!3m2!1sen!2sit!4v1760290281732!5m2!1sen!2sit`;

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="container mx-auto px-4 py-16 sm:py-24 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Vivere nel cuore di Torino!
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
            Un nuovo modo di abitare per giovani studenti e professionisti. Appartamenti indipendenti con spazi comuni pensati per la socialità e lo studio.
          </p>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Spazi Pensati per Te</h2>
            <p className="mt-4 text-lg text-gray-600">Oltre al tuo appartamento, avrai accesso a servizi che fanno la differenza.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AmenityItem icon="📚" title="Sala Studio" description="Un'area tranquilla e attrezzata per concentrarsi e studiare in gruppo o da soli." />
            <AmenityItem icon="🎮" title="Sala Relax" description="Dotata di proiettore e calcio balilla, perfetta per staccare la spina e divertirsi." />
            <AmenityItem icon="☀️" title="Terrazze Panoramiche" description="Due ampie terrazze per godersi il sole, socializzare e rilassarsi all'aria aperta." />
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16 sm:py-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold">Ci Troviamo Qui</h2>
                <p className="mt-4 text-lg text-gray-600">{buildingAddress}</p>
            </div>
            <div className="h-[450px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                 <iframe
                    src={mapEmbedUrl}
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map showing location: ${buildingAddress}`}
                 ></iframe>
            </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-blue-600">
        <div className="container mx-auto px-4 py-12 text-center">
            <h2 className="text-3xl font-bold text-white">Prossima Apertura: Gennaio 2026</h2>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
                Stiamo mettendo a punto gli ultimi dettagli per creare uno spazio unico. Contattaci per rimanere aggiornato e scoprire di più.
            </p>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
                Mail: info@boscodellaquila.it
            </p>
        </div>
      </div>

    </div>
  );
}

