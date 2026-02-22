import React from 'react';
import Link from 'next/link';

export default function RegolamentoPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-600 px-6 py-8 sm:px-10 text-center">
          <h1 className="text-3xl font-bold text-white">
           Bosco dell'Aquila — Regolamento di Convivenza 🦅
          </h1>
        </div>

        {/* Content */}
        <div className="px-6 py-8 sm:px-10 space-y-8 text-gray-700 leading-relaxed">
          
          <div className="prose prose-blue max-w-none">
            <p className="text-lg text-gray-600">
              Benvenuto a casa! Per garantire a tutti i residenti (studenti e giovani professionisti) 
              un ambiente sereno e pulito, abbiamo stabilito alcune semplici regole di convivenza. 
              Vivere qui significa far parte di una comunità: il rispetto reciproco è la chiave di tutto.
            </p>
          </div>

          {/* 1. Utenze e Consumi */}
          <section className="border-b border-gray-100 pb-6">
            <div className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-600 text-xl mr-4">
                🌱
              </span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">1. Utenze e Sostenibilità</h3>
                <p>
                  Le utenze sono incluse nel canone forfettario, ma questo non autorizza sprechi. 
                  Siamo una residenza attenta all'ambiente che punta grazie a pannelli fotovoltaici e teleriscaldamento ad una alta efficenza e un basso impatto ambientale.
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                  <li><strong>Riscaldamento:</strong> Evita di tenere le finestre spalancate con il riscaldamento acceso.</li>
                  <li><strong>Condizionatore</strong> Non lasciare il condizionatore acceso quando sei fuori dall'appartamento.</li>
                  <li><strong>Luci e Acqua:</strong> Spegni le luci quando esci dalla stanza o dalle aree comuni. Non lasciare scorrere l'acqua inutilmente.</li>
                  <li><strong>Elettrodomestici:</strong> Usa le lavatrici comuni a pieno carico.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 2. Aree Comuni */}
          <section className="border-b border-gray-100 pb-6">
            <div className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 text-xl mr-4">
                🛋️
              </span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">2. Spazi Comuni (Sala Studio, Relax, Terrazze)</h3>
                <p>
                  Gli spazi comuni sono un'estensione della tua casa. Trattali come tali.
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                  <li><strong>Pulizia:</strong> Non lasciare oggetti personali, tazze sporche o rifiuti in giro. Lascia lo spazio come vorresti trovarlo.</li>
                  <li><strong>Rumore:</strong> La Sala Studio è zona di silenzio. Nella Sala Relax e nelle Terrazze divertiti ma con rispetto, rispetta la quiete degli altri inquilini dopo le 23:00.</li>
                  <li><strong>Danni:</strong> Chi rompe, paga. Se danneggi accidentalmente qualcosa, avvisa subito la gestione. È segno di maturità e responsabilità.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 3. Ospiti */}
          <section className="border-b border-gray-100 pb-6">
            <div className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 text-purple-600 text-xl mr-4">
                🤝
              </span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">3. Ospiti e Visite</h3>
                <p>
                  Ci piace che tu abbia una vita sociale, ma la privacy e la sicurezza dei coinquilini vengono prima.
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                  <li><strong>Diurno:</strong> Gli ospiti sono benvenuti durante il giorno, purché non disturbino lo studio o la quiete altrui. Inoltre la presenza di propri ospiti non deve impedire agli altri inquilini di usufruire delle aree comuni.</li>
                  <li><strong>Pernottamento:</strong> È consentito ospitare occasionalmente (max 2-3 notti al mese) un amico/partner, ovviamente previa comunicazione ai coinquilini in caso di trilocale.</li>
                  <li><strong>Responsabilità:</strong> Sei responsabile al 100% del comportamento dei tuoi ospiti all'interno della struttura.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. Animali */}
          <section className="border-b border-gray-100 pb-6">
            <div className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-red-100 text-red-600 text-xl mr-4">
                🐾
              </span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">4. Animali Domestici</h3>
                <p>
                  Amiamo gli animali, ma per garantire l'igiene delle aree comuni e prevenire allergie o disturbi agli altri residenti al momento non è consentito tenere animali negli appartamenti.
                </p>
              </div>
            </div>
          </section>

          {/* 5. Sicurezza e Chiavi */}
          <section>
            <div className="flex items-start">
              <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-yellow-100 text-yellow-600 text-xl mr-4">
                🔑
              </span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">5. Sicurezza</h3>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
                  <li>Chiudi sempre il portone d'ingresso e la porta del tuo appartamento.</li>
                  <li>Non cedere le tue chiavi a terzi, se non per necessità specifiche e concordate.</li>
                  <li>È vietato fumare all'interno degli appartamenti e delle aree comuni chiuse. Usa le terrazze e i posaceneri.</li>
                </ul>
              </div>
            </div>
          </section>

        </div>

        {/* Footer CTA */}
        <div className="bg-gray-50 px-6 py-6 sm:px-10 text-center border-t border-gray-200">
          <p className="text-gray-500 mb-4">
            Il rispetto di queste regole è condizione necessaria per la permanenza nella struttura.
          </p>
          <Link 
            href="/"
            className="inline-block text-blue-600 font-bold hover:underline"
          >
            ← Torna alla Home
          </Link>
        </div>

      </div>
    </div>
  );
}