import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

enum Instrument {
  KEYBOARD = "keyboard",
  KLAVIER = "klavier",
  PIANO = "piano",
  GITARRE = "gitarre",
  BASS = "bass",
  SCHLAGZEUG = "schlagzeug",
  BLOCKFLOETE = "blockfloete",
  UKULELE = "ukulele",
  GESANG = "gesang",
}

enum Lehrer {
  JANA = "jana",
  CHRISTOPHER = "christopher",
  MARTIN = "martin",
  LUKAS = "lukas",
}

const available_lehrer = [
  {
    instrument: Instrument.KEYBOARD,
    lehrer: [Lehrer.JANA, Lehrer.CHRISTOPHER, Lehrer.LUKAS],
  },
  {
    instrument: Instrument.PIANO,
    lehrer: [Lehrer.JANA, Lehrer.CHRISTOPHER, Lehrer.LUKAS],
  },
  {
    instrument: Instrument.KLAVIER,
    lehrer: [Lehrer.JANA, Lehrer.CHRISTOPHER, Lehrer.LUKAS],
  },
  {
    instrument: Instrument.GITARRE,
    lehrer: [Lehrer.MARTIN, Lehrer.CHRISTOPHER],
  },
  {
    instrument: Instrument.BASS,
    lehrer: [Lehrer.MARTIN, Lehrer.CHRISTOPHER],
  },
  {
    instrument: Instrument.UKULELE,
    lehrer: [Lehrer.MARTIN],
  },
  {
    instrument: Instrument.SCHLAGZEUG,
    lehrer: [Lehrer.CHRISTOPHER],
  },
  {
    instrument: Instrument.BLOCKFLOETE,
    lehrer: [Lehrer.CHRISTOPHER],
  },
  {
    instrument: Instrument.GESANG,
    lehrer: [Lehrer.MARTIN],
  },
];

const anmeldung = z.object({
  instrument: z.nativeEnum(Instrument),
  lehrer: z.nativeEnum(Lehrer),
  schlueler_name: z.string(),
  geburtsdatum: z.string(),
  wohnort: z.string(),
  plz: z.string(),
  strasse: z.string(),
  email: z.string().email(),
  telefon: z.string(),
  erziehungsberechtigte: z.string(),
});

export function Anmeldung() {
  const form = useForm<z.infer<typeof anmeldung>>({
    resolver: zodResolver(anmeldung),
  });

  const instrument = useWatch({
    control: form.control,
    name: "instrument",
  });

  return (
    <main className="container mx-auto pb-12 md:pb-24 px-8 md:px-0">
      <h1 className="text-3xl font-bold mb-8">Anmeldeformular</h1>
      <form className="w-full space-y-4">
        <div className="space-y-1">
          <label htmlFor="email">E-Mail</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="E-Mail Adresse eingeben"
            {...form.register("email")}
            id="email"
            type="email"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="instrument">Instrument</label>
          <select
            {...form.register("instrument")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="instrument"
          >
            <option selected disabled>
              Instrument auswählen
            </option>
            {Object.values(Instrument).map((instrument) => (
              <option value={instrument} key={instrument}>
                {instrument.charAt(0).toUpperCase() + instrument.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="lehrer">Lehrer</label>
          <select
            disabled={!instrument}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...form.register("lehrer")}
            id="lehrer"
          >
            <option selected disabled>
              Lehrer auswählen
            </option>
            {instrument &&
              available_lehrer
                .find((l) => l.instrument === instrument)
                ?.lehrer.map((lehrer) => (
                  <option value={lehrer} key={lehrer}>
                    {lehrer.charAt(0).toUpperCase() + lehrer.slice(1)}
                  </option>
                ))}
          </select>
        </div>
        <div className="flex flex-col md:flex-row flex-nowrap justify-start items-center gap-4">
          <div className="space-y-1 w-full max-w-full md:max-w-[350px]">
            <label htmlFor="schlueler_name">Schülername</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Schülername eingeben"
              {...form.register("schlueler_name")}
              id="schlueler_name"
              type="text"
            />
          </div>
          <div className="space-y-1 w-full md:w-auto">
            <label htmlFor="geburtsdatum">Geburtsdatum</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Geburtsdatum eingeben"
              {...form.register("geburtsdatum")}
              id="geburtsdatum"
              type="date"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row flex-nowrap justify-start items-center gap-4">
          <div className="space-y-1 max-w-full md:max-w-[200px] w-full">
            <label htmlFor="plz">PLZ</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="PLZ eingeben"
              {...form.register("plz")}
              id="plz"
              type="text"
            />
          </div>
          <div className="space-y-1 w-full max-w-full md:max-w-[320px]">
            <label htmlFor="wohnort">Ort</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Wohnort eingeben"
              {...form.register("wohnort")}
              id="wohnort"
              type="text"
            />
          </div>
          <div className="space-y-1 w-full">
            <label htmlFor="strasse">Straße und Hausnummer</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Straße eingeben"
              {...form.register("strasse")}
              id="strasse"
              type="text"
            />
          </div>
        </div>
        <div className="pt-8 flex flex-row w-full flex-nowrap justify-end items-center">
          <button className="bg-theme text-black rounded-md px-4 py-2 text-sm font-semibold">
            Formular absenden
          </button>
        </div>
      </form>
    </main>
  );
}
