import { z } from "zod";

export const MOBILE_NUMBER = "+4915120740695";
export const PHONE_NUMBER = "0896121855";
export const VISIBLE_PHONE_NUMBER = "089 6121855";
export const EMAIL_ADDRESS = "jana@musicschool-cml.de";
export enum Instrument {
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
export enum Lehrer {
  JANA = "jana",
  CHRISTOPHER = "christopher",
  MARTIN = "martin",
  LUKAS = "lukas",
}

export const apiGateway = import.meta.env.VITE_API_GATEWAY;
export type Vertrag = {
  minuten: number;
  preis: number;
  aufnahmegebuehr: number;
  variante: "einzel" | "gruppe" | "frei";
  id: string;
};

// INFO!!!!!!
// wenn du hier IDS änderst, muss das auch im backend gemacht werden
export const vertraege: Vertrag[] = [
  {
    id: "1",
    minuten: 30,
    preis: 88,
    aufnahmegebuehr: 20,
    variante: "einzel",
  },
  {
    id: "2",
    minuten: 45,
    preis: 111,
    aufnahmegebuehr: 20,
    variante: "einzel",
  },
  {
    id: "3",
    minuten: 60,
    preis: 66,
    aufnahmegebuehr: 20,
    variante: "gruppe",
  },
  {
    id: "4",
    minuten: 45,
    preis: 450,
    aufnahmegebuehr: 20,
    variante: "frei",
  },
];

export const available_lehrer = [
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

export const phoneRegex = new RegExp(/^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/);

export const anmeldung = z.object({
  instrument: z
    .nativeEnum(Instrument, {
      required_error: "Bitte wähle ein Instrument aus",
      message: "Bitte wähle ein Instrument aus",
    })
    .nullish()
    .refine((v) => v !== null && v !== undefined, {
      message: "Bitte wähle ein Instrument aus",
    }),
  lehrer: z
    .nativeEnum(Lehrer, {
      required_error: "Bitte wähle einen Lehrer aus",
    })
    .nullish()
    .refine((v) => v !== null && v !== undefined, {
      message: "Bitte wähle einen Lehrer aus",
    }),
  vertrag: z
    .string({
      required_error: "Bitte wähle einen Vertrag aus",
    })
    .nullable(),
  schueler_name: z
    .string({
      required_error: "Bitte gib den Namen des Schülers an",
    })
    .min(1, {
      message: "Bitte gib den Namen des Schülers an",
    }),
  geburtsdatum: z.coerce.date({
    message: "Bitte gib das Geburtsdatum des Schülers an",
    required_error: "Bitte gib das Geburtsdatum des Schülers an",
  }),
  ort: z
    .string({
      required_error: "Bitte gib den Wohnort an",
    })
    .min(1, {
      message: "Bitte gib den Wohnort an",
    }),
  plz: z
    .string({
      required_error: "Bitte gib die Postleitzahl an",
    })
    .min(5, "Die Postleitzahl muss 5 Ziffern lang sein")
    .max(6, "Die Postleitzahl muss mindestens 5 Ziffern lang sein"),
  strasse: z
    .string({
      required_error: "Bitte gib die Straße und Hausnummer an",
    })
    .min(1, {
      message: "Bitte gib die Straße und Hausnummer an",
    }),
  email: z
    .string({
      required_error: "Bitte gib deine E-Mail-Adresse an",
    })
    .email({
      message: "Bitte gib eine gültige E-Mail-Adresse an",
    }),
  telefon: z
    .string({
      required_error: "Bitte gib deine Telefonnummer an",
    })
    .regex(phoneRegex, {
      message: "Bitte gib eine gültige Telefonnummer an",
    }),
  erziehungsberechtigte: z
    .string({
      required_error: "Bitte gib den Namen der Erziehungsberechtigten an",
    })
    .min(1, {
      message: "Bitte gib den Namen der Erziehungsberechtigten an",
    }),
  einverstaendnis: z
    .boolean({
      required_error:
        "Bitte bestätige, dass du die Datenschutzerklärung gelesen hast",
    })
    .refine((v) => v === true, {
      message: "Bitte bestätige, dass du die Datenschutzerklärung gelesen hast",
    }),
});

export type Anmeldung = z.infer<typeof anmeldung>;
