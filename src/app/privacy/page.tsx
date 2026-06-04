import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto prose prose-blue">
        <h1 className="text-3xl font-bold mb-8">Informativa sulla Privacy</h1>
        <p className="text-gray-500 mb-8">Ultimo aggiornamento: Giugno 2026</p>

        <h3>1. Titolare del Trattamento</h3>
        <p>
          Il titolare del trattamento dei dati è la Dagramasi Società Semplice, proprietaria dell&apos;immobile sito in Via Aquila 8, Torino.<br />
          Per qualsiasi richiesta in materia di privacy, puoi contattarci a: <strong>info@boscodellaquila.it</strong>
        </p>

        <h3>2. Quali dati raccogliamo</h3>
        <p>
          Raccogliamo esclusivamente i dati che ci invii volontariamente via email per richiedere informazioni sugli appartamenti, che possono includere:
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
          <li>Rispondere alle richieste di informazioni sugli appartamenti.</li>
          <li>Comunicare disponibilita, costi e caratteristiche delle soluzioni abitative.</li>
          <li>Organizzare eventuali visite all&apos;immobile.</li>
        </ul>
        <p>I dati <strong>non</strong> saranno ceduti a terze parti per scopi pubblicitari o commerciali.</p>

        <h3>4. Conservazione dei dati</h3>
        <p>
          I dati personali di contatto saranno conservati per il tempo strettamente necessario a gestire la tua richiesta e gli eventuali successivi contatti relativi alla locazione. Se non si concretizzera alcun rapporto contrattuale, i dati saranno cancellati entro tempi congrui, salvo obblighi di legge o diversa richiesta dell&apos;utente.
        </p>

        <h3>5. I tuoi diritti (GDPR)</h3>
        <p>
          In conformità al Regolamento UE 2016/679 (GDPR), hai il diritto di chiedere in qualsiasi momento:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>L&apos;accesso ai tuoi dati personali.</li>
          <li>La rettifica o la cancellazione degli stessi (&quot;Diritto all&apos;oblio&quot;).</li>
          <li>La limitazione del trattamento.</li>
        </ul>
        <p>
          Per esercitare questi diritti, scrivi a info@boscodellaquila.it.
        </p>

        <h3>6. Piattaforme Terze</h3>
        <p>
          Questo sito non utilizza moduli di contatto integrati o strumenti proprietari di raccolta lead. Se ci scrivi via email, i dati contenuti nel messaggio saranno trattati attraverso il tuo fornitore di posta e il nostro servizio email secondo le rispettive policy. Il sito non utilizza cookie di profilazione o tracciamento propri.
        </p>
        
        <div className="mt-12 pt-8 border-t">
            <Link href="/" className="text-blue-600 font-bold hover:underline">← Torna alla Home</Link>
        </div>
      </div>
    </div>
  );
}