import bg from "../assets/struktur-blau.jpeg";

type PreisProps = {
  minutes: number;
  title: string;
  description: string;
  aufnahmeGebuehr: number;
  monatlicheGebuehr?: number;
  einmaligeGebuehr?: number;
};

function Preis(props: PreisProps) {
  return (
    <div className="bg-white flex flex-col cols-span-1 rounded-md overflow-hidden">
      <div className="bg-theme p-4">
        <p className="text-4xl text-white text-center w-full font-semibold">
          {props.minutes}
          <br />
          Minuten
        </p>
      </div>
      <div className="p-4 flex flex-col h-full">
        <p className="text-lg w-full text-center text-dark-red font-bold">
          {props.title}
        </p>
        <p className="mt-4 font-semibold mb-8 text-theme-text text-left w-full">
          {props.description}
        </p>
        <p className="text-theme-text block mt-auto text-xl font-bold text-left w-full">
          Einmalige Aufnahmegebühr
          <br />
          {props.aufnahmeGebuehr},- Euro
        </p>
        <p className="text-dark-red mt-8 text-xl font-bold text-left w-full">
          {props.monatlicheGebuehr !== undefined && (
            <>
              <span>Monatliche Gebühr</span>
              <br />
              {props.monatlicheGebuehr},- Euro
            </>
          )}
          {props.einmaligeGebuehr !== undefined && (
            <>
              <span>Einmalige Gebühr</span>
              <br />
              {props.einmaligeGebuehr},- Euro
            </>
          )}
        </p>
        <a
          href="/anmeldung"
          className="bg-dark-red mt-4 hover:underline rounded-xl w-full text-white font-bold text-lg py-2 text-center block"
        >
          Anmeldeformular
        </a>
      </div>
    </div>
  );
}

export function Preise() {
  return (
    <section className="relative py-24" id="preise">
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="absolute -z-10 top-0 left-0 right-0 bottom-0 bg-repeat bg-center bg-fixed"
      />
      <h4 className="text-white text-5xl font-bold w-full text-center">
        Preise & Anmeldung
      </h4>
      <p className="text-theme px-4 md:px-8 font-bold text-lg text-center w-full mt-12">
        Klingt gut: Deine erste Schnupperstunde ist gratis. Wir freuen uns auf
        Dich.
      </p>
      <div className="px-4 md:px-8 container max-w-5xl mx-auto mt-8 gap-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <Preis
          minutes={30}
          title="Einzelunterricht"
          description="Der Unterricht wird als Lektion zu wöchentlich einmal 30 Minuten erteilt."
          aufnahmeGebuehr={20}
          monatlicheGebuehr={88}
        />
        <Preis
          minutes={45}
          title="Einzelunterricht"
          description="Der Unterricht wird als Lektion zu wöchentlich einmal 45 Minuten erteilt. Die einmalige Aufnahmegebühr beträgt 20,- Euro."
          aufnahmeGebuehr={20}
          monatlicheGebuehr={111}
        />
        <Preis
          minutes={60}
          title="Gruppenunterricht"
          description="Der Unterricht wird als Lektion zu wöchentlich einmal 60 Minuten erteilt."
          aufnahmeGebuehr={20}
          monatlicheGebuehr={66}
        />
        <Preis
          minutes={45}
          title="freie Vereinbarung"
          description="Der Unterricht wird als 10-stündige Lektion zu jeweils 45 Minuten bei freier Vereinbarung des Zeitpunktes in Absprache mit der Lehrkraft erteilt."
          aufnahmeGebuehr={20}
          einmaligeGebuehr={450}
        />
      </div>
    </section>
  );
}
