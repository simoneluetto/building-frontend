"use client";

import React, { useState, useEffect } from 'react';

const contactEmail = 'info@boscodellaquila.it';
const contactHref = 'mailto:info@boscodellaquila.it?subject=Richiesta%20informazioni%20Bosco%20dell%27Aquila';

// --- DATA CONFIGURATION ---
// Replace the URLs below with your local image paths when you copy this into Next.js
// Example: "/PXL_20260222_154049867~2.jpg"
const commonAreaImages = [
  "/terrazze1.jpg",
  "/terrazze2.jpg",
  "/terrazze3.jpg",
  "/terrazze4.jpg",
];

const apartmentImages = [
  "/living2.jpg",
  "/monolocale1.jpg",
  "/living1.jpg",
  "/living3.jpg",
  "/living4.jpg",
  "/bagno1.jpg",
  "/camera1.jpg",
];

// --- ICONS ---
const Icons = {
  Expand: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>,
  ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>,
};

export default function App() {
  const [galleryState, setGalleryState] = useState({
    isOpen: false,
    images: [] as string[],
    currentIndex: 0
  });

  type GalleryNavigationEvent = React.MouseEvent<HTMLElement> | KeyboardEvent;

  const openGallery = (images: string[], index: number = 0) => {
    setGalleryState({ isOpen: true, images, currentIndex: index });
  };

  const closeGallery = () => {
    setGalleryState(prev => ({ ...prev, isOpen: false }));
  };

  const nextImage = (e?: GalleryNavigationEvent) => {
    e?.stopPropagation();
    setGalleryState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex === prev.images.length - 1 ? 0 : prev.currentIndex + 1
    }));
  };

  const prevImage = (e: GalleryNavigationEvent) => {
    e.stopPropagation();
    setGalleryState(prev => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1
    }));
  };

  // Handle keyboard navigation for the gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!galleryState.isOpen) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') nextImage(e);
      if (e.key === 'ArrowLeft') prevImage(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryState.isOpen]);

  const mapUrl = "https://www.google.com/maps/place/Via+Aquila,+8,+10144+Torino+TO";

  return (
    <div className="bg-gray-50 min-h-screen font-sans selection:bg-blue-200 selection:text-blue-900">      
      
      {/* Lightbox Gallery Modal */}
      {galleryState.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={closeGallery}>
          <button onClick={closeGallery} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50">
            <Icons.X />
          </button>
          
          <button onClick={prevImage} className="absolute left-4 sm:left-10 text-white/70 hover:text-white transition-colors z-50">
            <Icons.ChevronLeft />
          </button>
          
          <img 
            src={galleryState.images[galleryState.currentIndex]} 
            alt={`Gallery image ${galleryState.currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-sm"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          />
          
          <button onClick={nextImage} className="absolute right-4 sm:right-10 text-white/70 hover:text-white transition-colors z-50">
            <Icons.ChevronRight />
          </button>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm font-medium tracking-widest z-50">
            {galleryState.currentIndex + 1} / {galleryState.images.length}
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full p-4 sm:p-6 flex justify-between items-center z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <span className="text-blue-600">Bosco</span> dell&apos;Aquila 🦅
          </div>
          <a 
            href={contactHref}
            className="hidden sm:inline-block px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
          >
            Contattaci via email
          </a>
        </div>
      </nav>
      
      {/* Hero Section */}
      <div className="relative pt-24 pb-12 lg:pt-32 lg:pb-0 overflow-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            
            <div className="w-full lg:w-1/2 pt-10 lg:pt-20 lg:pb-32 z-10 text-center lg:text-left">
              <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-6 tracking-wide border border-blue-100">
                📍 Torino, Zona San Donato
              </span>

              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl xl:text-7xl mb-6">
                Vivere nel cuore <br className="hidden lg:block" />
                <span className="text-blue-600">di Torino.</span>
              </h1>
              
              <p className="max-w-xl mx-auto lg:mx-0 text-xl text-gray-600 mb-10 leading-relaxed">
                Una residenza pensata per studenti e giovani lavoratori.
                Appartamenti privati, spazi condivisi curati e una posizione strategica nel cuore di Torino.
              </p>
              <p className="max-w-xl mx-auto lg:mx-0 text-2xl font-extrabold text-blue-600 mb-10 leading-relaxed">
                Appartamenti gia disponibili in Via Aquila 8
              </p>              
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <a 
                  href={contactHref}
                  className="inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Contattaci via email
                </a>
              </div>
            </div>

            {/* Safari/Webkit Shadow Bug Fix: Separated shadow and overflow into two layers */}
            <div className="w-full lg:w-1/2 h-[400px] lg:h-[700px] relative">
              <div className="absolute inset-0 rounded-3xl shadow-2xl bg-white/50"></div>
              <div className="absolute inset-0 rounded-3xl overflow-hidden z-10">
                <img 
                  src="/esterno3.png"
                  alt="Bosco dell'Aquila Exterior"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

{/* SECTION 2: The Apartments (Soluzioni Abitative) */}
<div className="bg-white py-24 border-t border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4">
          
          {/* Changed to flex-col so Text appears before Gallery on mobile */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left: Text Content */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
                Le Soluzioni Abitative
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Che tu stia cercando la massima indipendenza o preferisca condividere gli spazi, abbiamo la soluzione adatta alle tue esigenze.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Tutti gli appartamenti sono completamente rinnovati e arredati a nuovo. Dispongono di tutto l&apos;arredo necessario, aria condizionata e bagni di nuova realizzazione.
                Inoltre come servizi sono inclusi lavanderia comune, wi-fi e parcheggio interno per le biciclette.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Le spese saranno ad importo forfettario ed includono: riscaldamento, corrente, acqua e pulizie degli spazi comuni.
              </p>
              <div className="grid gap-6">
                <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🔑</span> Monolocali
                  </h3>
                  <p className="text-gray-600">
                    Spazi totalmente indipendenti e luminosi. 
                    Ideali per chi cerca la massima privacy, completi di cucina, zona giorno con divano e tavolo, zona notte e bagno.
                  </p>
                  <p className="text-gray-600 italic">Prezzo 600€ + 110€ di spese</p>
                </div>

                <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-purple-700 mb-3 flex items-center gap-2">
                    <span className="text-2xl">✨</span> Bilocali
                  </h3>
                  <p className="text-gray-600">
                    Appartamenti con cucina e zona giorno separate dalla zona notte, forniti di matrimoniale e ideale anche per giovani coppie. 
                  </p>
                  <p className="text-gray-600 italic">Prezzo da 700€ + 120€ di spese</p>
                </div>

                <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-emerald-700 mb-3 flex items-center gap-2">
                    <span className="text-2xl">🛏️</span> Trilocali
                  </h3>
                  <p className="text-gray-600">
                    Appartamenti con zona giorno e due camere da letto indipendenti fornite di scrivania e affittabili singolarmente.
                  </p>
                  <p className="text-gray-600 italic">Prezzo stanza singola 500€ + 100€ di spese</p>
                </div>
              </div>
            </div>

            {/* Right: Gallery Card */}
            <div className="w-full lg:w-1/2 relative group cursor-pointer" onClick={() => openGallery(apartmentImages)}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-square lg:aspect-auto lg:h-[650px] transform-gpu">
                <img 
                  src={apartmentImages[0]} 
                  alt="Appartamenti" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/30 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white/95 text-blue-900 px-6 py-4 rounded-full font-bold shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-3">
                    <Icons.Expand />
                    <span>Apri Galleria ({apartmentImages.length} foto)</span>
                  </div>
                </div>
              </div>
              {/* Decorative background element */}
              <div className="absolute -z-10 top-8 -right-8 w-full h-full bg-blue-50 rounded-3xl hidden lg:block"></div>
            </div>

          </div>

        </div>
      </div>

      {/* SECTION 1: Common Areas (Spazi Comuni) */}
      <div className="bg-gray-50 py-24 border-t border-gray-100 overflow-hidden">
        <div className="container mx-auto px-4">
          
          {/* Changed to flex-col-reverse so Text appears before Gallery on mobile */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            
            {/* Left: Gallery Card */}
            <div className="w-full lg:w-1/2 relative group cursor-pointer" onClick={() => openGallery(commonAreaImages)}>
              <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-square lg:aspect-auto lg:h-[600px] transform-gpu">
                <img 
                  src={commonAreaImages[0]} 
                  alt="Spazi Comuni" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/30 transition-all duration-300 flex items-center justify-center">
                  <div className="bg-white/95 text-blue-900 px-6 py-4 rounded-full font-bold shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-3">
                    <Icons.Expand />
                    <span>Apri Galleria ({commonAreaImages.length} foto)</span>
                  </div>
                </div>
              </div>
              {/* Decorative background element */}
              <div className="absolute -z-10 top-8 -left-8 w-full h-full bg-blue-100 rounded-3xl hidden lg:block"></div>
            </div>

            {/* Right: Text Content */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
                Spazi Comuni da Vivere
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Non offriamo solo un posto letto, ma un ambiente pensato per lo studio, la socialità e il relax. 
                Ampie aree condivise progettate per farti sentire a casa e socializzare.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 text-2xl">
                    ☀️
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Spazi esterni</h3>
                    <p className="text-gray-600">Due ampie terrazze sempre al sole con divanetti e tavolini. Un grande cortile verde con calcetto e ping-pong</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 text-2xl">
                    📚
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sala Studio</h3>
                    <p className="text-gray-600">Scrivanie dedicate, silenzio e Wi-Fi veloce. Il luogo ideale per preparare il prossimo esame o lavorare senza distrazioni.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 text-green-600 text-2xl">
                    🌱
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Edificio Eco-Sostenibile</h3>
                    <p className="text-gray-600">Struttura termicamente riqualificata con impianto a pannelli fotovoltaici, per un impatto ambientale ridotto.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 text-2xl">
                   🤝
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Regolamento</h3>
                    <p className="text-gray-600">
                      Per garantire una convivenza serena e rispettosa, ti invitiamo a leggere il nostro <a href="/regolamento" className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors">Regolamento della struttura</a>.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 py-16 sm:py-24 max-w-5xl">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Posizione Strategica</h2>
                <p className="mt-4 text-lg text-gray-600 font-medium">
                  Via Aquila 8, Torino
                </p>
                <p className="mt-2 text-md text-gray-500">
                  A pochi passi da fermate di tram, autobus e Metro, vicino a tutti i servizi, comodo per il centro città e le università.
                </p>
            </div>
            
            <a 
              href={mapUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block group relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-xl border-4 border-white cursor-pointer transform-gpu"
            >
              <img 
                src="/map_centered.png"
                alt="Mappa posizione Via Aquila 8 Torino"
                className="w-full h-full object-cover object-center transition duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/30 transition duration-300 flex items-center justify-center">                   
                <span className="bg-white text-blue-900 px-6 py-3 rounded-full font-bold shadow-2xl transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition duration-300 backdrop-blur-sm flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Apri su Google Maps
                </span>
              </div>
            </a>
        </div>
      </div>


      {/* Call To Action / Footer */}
      <div className="bg-blue-600 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-500 opacity-50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-700 opacity-50 blur-3xl"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-extrabold text-white mb-6">Richiedi informazioni o una visita</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                La residenza è già operativa.
                Scrivici per conoscere disponibilità, costi aggiornati e modalità di visita.
            </p>
            <p className="text-lg text-blue-100 font-semibold mb-8">
                {contactEmail}
            </p>
            <a 
              href={contactHref}
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-blue-600 bg-white rounded-full shadow-2xl shadow-blue-900/50 hover:bg-blue-50 transition duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              Scrivici a {contactEmail}
            </a>
            
            <div className="mt-16 pt-8 border-t border-blue-500/30 text-blue-200 text-sm flex flex-col md:flex-row justify-center md:justify-between items-center gap-4">
                <span>&copy; {new Date().getFullYear()} Bosco dell&apos;Aquila. Tutti i diritti riservati.</span>
                <a href="/regolamento" className="hover:text-white transition-colors underline underline-offset-4">
                    Regolamento della struttura
                </a>
            </div>
        </div>
      </div>

    </div>
  );
}