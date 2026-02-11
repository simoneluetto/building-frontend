import React from 'react';
import Image from "next/image"; // Add this import at the top

// A simple component for amenity items
const AmenityItem = ({ icon, title, description }: { icon: string, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
    <div className="flex flex-col items-start">
      <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-blue-50 text-blue-600 mb-6">
        <span className="text-3xl">{icon}</span>
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-3 text-base text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

export default function AboutPage() {
  const buildingAddress = "Via Aquila 8, 10144 Torino TO, Italy";
  const mapUrl = "https://www.google.com/maps/place/Via+Aquila,+8,+10144+Torino+TO";
  return (
    <div className="bg-gray-50 min-h-screen font-sans selection:bg-blue-100">      
      
      {/* Simple Navbar */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
        <div className="text-xl font-bold text-gray-900 tracking-tight">
            Bosco dell'Aquila 🦅
        </div>
      </nav>
      
      {/* Hero Section with Gradient */}
      <div className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden bg-gradient-to-b from-blue-50 to-gray-50">
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* A "Pill" badge to look pro */}
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6 tracking-wide">
            📍 Torino, Zona San Donato
          </span>

          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl mb-8">
            Vivere nel cuore <br className="hidden sm:block" />
            <span className="text-blue-600">di Torino.</span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed">
            Un nuovo concetto di abitare per studenti e giovani professionisti. 
            Privacy nei tuoi spazi, community dove conta.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://forms.gle/5tnsZ66TVcxbP6iB9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              📝 Compila il form se sei interessato
            </a>
          </div>
        </div>
      </div>

      {/* Amenities Grid */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Spazi Pensati per Te</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Non solo un posto letto. Abbiamo progettato ogni metro quadro per offrirti qualità della vita.
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AmenityItem icon="📚" title="Sala Studio" description="Scrivanie dedicate, silenzio e Wi-Fi veloce. Il luogo ideale per preparare il prossimo esame senza distrazioni." />
            <AmenityItem icon="🎮" title="Sala Relax" description="Cinema, gaming e zona lounge. Uno spazio condiviso dove staccare la spina e conoscere i tuoi vicini." />
            <AmenityItem icon="☀️" title="Terrazze Panoramiche" description="Aria aperta e vista sulla città. Perfette per un caffè al sole, una sessione di yoga o un aperitivo al tramonto." />
        </div>
      </div>

      {/* Map Section - STATIC & REACTIVE */}
      <div className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 py-16 sm:py-24">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">La Posizione</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Via Aquila 8 — A pochi passi dalla Metro e dal Politecnico.
                </p>
            </div>
            
            {/* The Container */}
            <a 
              href="https://www.google.com/maps/place/Via+Aquila,+8,+10144+Torino+TO" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block group relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 cursor-pointer">
              <Image 
                src="/map_centered.png"
                alt="Mappa posizione Via Aquila 8 Torino"
                fill // This replaces w-full h-full
                className="object-cover object-center transition duration-700 group-hover:scale-105"
                priority // Loads image faster since it's "above the fold"
              />
                
              {/* The "Click to Open" Overlay */}
              <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition duration-300 flex items-center justify-center">                   
                <span className="bg-white text-blue-900 px-6 py-3 rounded-full font-bold shadow-2xl transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition duration-300 backdrop-blur-sm">
                  📍 Apri su Google Maps
                </span>
              </div>
            </a>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-blue-600 text-white py-24">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white">Prossima Apertura: Primavera 2026</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                Stiamo mettendo a punto gli ultimi dettagli per creare uno spazio unico.
                Compila il form per essere avvisato quando apriremo.
            </p>
            <a 
              href="https://forms.gle/5tnsZ66TVcxbP6iB9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-full shadow-lg hover:bg-blue-50 transition duration-300 transform hover:-translate-y-1"
            >
              📝 Compila il form
            </a>

            {/* <p className="mt-12 text-sm text-blue-200">
                Hai domande? Scrivici a <a href="mailto:info@boscodellaquila.it" className="underline hover:text-white">info@boscodellaquila.it</a>
            </p> */}
        </div>
      </div>

    </div>
  );
}

