import { JSX } from 'react';

export default function AboutPage(): JSX.Element {
    return (
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">La Nostra Storia</h1>
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            "Bosco dell'Aquila" nasce da un progetto di famiglia: la ristrutturazione di un edificio storico con l'obiettivo di creare non solo appartamenti, ma un vero e proprio hub per giovani. 
            Come ingegnere specializzato in deep learning, ho voluto applicare un approccio moderno e funzionale a questo spazio.
          </p>
          <p>
            La nostra visione è quella di offrire una soluzione abitativa che vada oltre il semplice affitto. Con 14 appartamenti, aree comuni per lo studio e il tempo libero, e due terrazze panoramiche, vogliamo promuovere un senso di community e condivisione.
          </p>
          <p>
            Ogni appartamento è completamente indipendente per garantire la massima privacy, ma gli spazi comuni sono il cuore pulsante del nostro edificio, pensati per favorire l'interazione e la nascita di nuove amicizie e collaborazioni. Siamo a Torino, una città universitaria e vibrante, e il nostro spazio vuole rifletterne l'energia.
          </p>
        </div>
      </div>
    );
  }
