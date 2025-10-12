import Link from 'next/link';
import { JSX } from 'react';

export default function HomePage(): JSX.Element {
  return (
    <div>
      <div className="text-center p-12 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-4">
          Benvenuti al Bosco dell'Aquila
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          La soluzione abitativa moderna e flessibile nel cuore di Torino, pensata per le esigenze di studenti e giovani professionisti. Scopri i nostri spazi, vivi la community.
        </p>
        <Link 
          href="/apartments" 
          className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Scopri gli Appartamenti
        </Link>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Perché Sceglierci?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Aree Comuni Attrezzate</h3>
            <p className="text-gray-600">Spazi per studiare, rilassarsi e socializzare. Dalla sala relax alla lavanderia, tutto a tua disposizione.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Posizione Strategica</h3>
            <p className="text-gray-600">Vicino alle università e ben collegato con i mezzi pubblici. La città è a portata di mano.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Community Giovane</h3>
            <p className="text-gray-600">Un ambiente dinamico e stimolante, ideale per creare nuove amicizie e connessioni.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
