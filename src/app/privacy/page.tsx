import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto prose prose-blue">
        <h1 className="text-3xl font-bold mb-8">Informativa sulla Privacy</h1>
        <p className="text-gray-500 mb-8">Ultimo aggiornamento: Febbraio 2026</p>

        <h3>1. Titolare del Trattamento</h3>
        <p>
          Il titolare del trattamento dei dati è la Dagramasi Società Semplice, proprietaria dell'immobile sito in Via Aquila 8, Torino.<br />
          Per qualsiasi richiesta in materia di privacy, puoi contattarci a: <strong>info@boscodellaquila.it</strong>
        </p>

        <h3>2. Quali dati raccogliamo</h3>
        <p>
          Raccogliamo esclusivamente i dati forniti volontariamente tramite il modulo di contatto (Google Forms), che possono includere:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Nome e Cognome</li>
          <li>Indirizzo email e numero di telefono</li>
          <li>Informazioni demografiche (età, occupazione)</li>
          <li>Preferenze abitative</li>
        </ul>

        <h3>3. Finalità del trattamento</h3>
        <p>
          I tuoi dati vengono trattati esclusivamente per:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Gestire la lista d'attesa per gli appartamenti.</li>
          <li>Contattarti quando si apriranno le prenotazioni.</li>
          <li>Organizzare eventuali visite all'immobile.</li>
        </ul>
        <p>I dati <strong>non</strong> saranno ceduti a terze parti per scopi pubblicitari o commerciali.</p>

        <h3>4. Conservazione dei dati</h3>
        <p>
          I dati personali di contatto saranno conservati fino al completamento della fase di affitto degli appartamenti (Primavera/Estate 2026). Successivamente, se non si concretizzerà un contratto di affitto, i dati verranno cancellati, salvo diversa richiesta dell'utente.
        </p>

        <h3>5. I tuoi diritti (GDPR)</h3>
        <p>
          In conformità al Regolamento UE 2016/679 (GDPR), hai il diritto di chiedere in qualsiasi momento:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>L'accesso ai tuoi dati personali.</li>
          <li>La rettifica o la cancellazione degli stessi ("Diritto all'oblio").</li>
          <li>La limitazione del trattamento.</li>
        </ul>
        <p>
          Per esercitare questi diritti, scrivi a info@boscodellaquila.it.
        </p>

        <h3>6. Piattaforme Terze</h3>
        <p>
          Questo sito utilizza <strong>Google Forms</strong> per la raccolta dei dati. L'uso di tale strumento è regolato dalla <a href="https://policies.google.com/privacy" target="_blank" className="text-blue-600 underline">Privacy Policy di Google</a>.
          Il sito non utilizza cookie di profilazione o tracciamento propri.
        </p>
        
        <div className="mt-12 pt-8 border-t">
            <a href="/" className="text-blue-600 font-bold hover:underline">← Torna alla Home</a>
        </div>
      </div>
    </div>
  );
}