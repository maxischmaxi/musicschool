import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm, useWatch } from "react-hook-form";
import {
  Anmeldung as AnmeldungType,
  Lehrer,
  anmeldung,
  apiGateway,
} from "../lib/definitions";
import { Input } from "../components/input";
import { InstrumentSelect } from "../components/instrument-select";
import { LehrerSelect } from "../components/lehrer-select";
import dayjs from "dayjs";
import { VertragSelect } from "../components/vertrag-select";
import { EinverstaendnisCheck } from "../components/einverstaendnis-check";
import { useRef, useState } from "react";
import { isDesktop } from "react-device-detect";

export function Anmeldung() {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const form = useForm<AnmeldungType>({
    resolver: zodResolver(anmeldung),
    defaultValues: {
      instrument: undefined,
      lehrer: undefined,
      vertrag: undefined,
      einverstaendnis: false,
      plz: "",
      email: "",
      schueler_name: "",
      ort: "",
      strasse: "",
      erziehungsberechtigte: "",
      telefon: "",
      geburtsdatum: dayjs().subtract(10, "year").toDate(),
    },
  });
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const instrument = useWatch({
    control: form.control,
    name: "instrument",
  });

  async function submit(data: AnmeldungType) {
    if (!data.einverstaendnis || !captchaRef.current) {
      return;
    }

    const token = captchaRef.current.getValue();

    if (!token || !token.length) {
      return;
    }

    fetch(`${apiGateway}/anmeldung`, {
      method: "POST",
      body: JSON.stringify({ ...data, token }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setSuccessModal(true);
        form.reset();
      })
      .catch(() => {
        setErrorModal(true);
      });
  }

  return (
    <main className="container max-w-5xl mx-auto pb-12 md:pb-24 px-8">
      <h1 className="text-theme-text font-bold mb-2 text-4xl">Kontakt</h1>
      <h4 className="text-theme-text mb-8">
        Fordern Sie jetzt Ihr unverbindliches Anmeldeformular an. Wir melden uns
        innerhalb von 1-2 Werktagen bei Ihnen.
      </h4>
      <form className="w-full space-y-4" onSubmit={form.handleSubmit(submit)}>
        <InstrumentSelect
          control={form.control}
          name="instrument"
          onChange={() => {
            form.setValue("lehrer", undefined as unknown as Lehrer);
            if (!isDesktop) {
              const lehrerSection = document.getElementById("lehrer");
              if (lehrerSection) {
                lehrerSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "end",
                });
              }
            }
          }}
        />
        <LehrerSelect
          control={form.control}
          name="lehrer"
          instrument={instrument}
          onChange={() => {
            if (!isDesktop) {
              const vertragSection = document.getElementById("vertrag");
              if (vertragSection) {
                vertragSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                  inline: "end",
                });
              }
            }
          }}
        />
        <VertragSelect
          control={form.control}
          name="vertrag"
          label="Vertrag wählen"
          onChange={() => {
            if (!isDesktop) {
              const emailSection = document.getElementById("email");
              if (emailSection) {
                emailSection.scrollIntoView({ behavior: "smooth" });
              }
            }
          }}
        />
        <Input
          label="E-Mail"
          name="email"
          control={form.control}
          placeholder="E-Mail Adresse angeben"
          type="email"
        />
        <div className="flex flex-col md:flex-row flex-nowrap justify-start items-center gap-4">
          <Input
            label="Name des Schülers"
            wrapperClassName="w-full max-w-full md:max-w-[350px]"
            name="schueler_name"
            control={form.control}
            placeholder="Vor- und Nachname"
          />
          <Input
            label="Geburtsdatum des Schülers"
            wrapperClassName="w-full max-w-full md:max-w-[200px]"
            name="geburtsdatum"
            control={form.control}
            type="date"
          />
          <Input
            label="Erziehungsberechtigte"
            wrapperClassName="w-full"
            name="erziehungsberechtigte"
            control={form.control}
            placeholder="Vor- und Nachname"
          />
        </div>
        <div className="flex flex-col md:flex-row flex-nowrap justify-start items-center gap-4">
          <Input
            label="Straße"
            wrapperClassName="space-y-1 w-full"
            name="strasse"
            control={form.control}
            placeholder="Straße"
          />
          <Input
            label="PLZ"
            wrapperClassName="space-y-1 max-w-full md:max-w-[250px] w-full"
            name="plz"
            control={form.control}
            placeholder="PLZ"
          />
          <Input
            label="Ort"
            wrapperClassName="space-y-1 w-full max-w-full md:max-w-[320px]"
            name="ort"
            control={form.control}
            placeholder="Ort"
          />
        </div>
        <div className="max-w-full md:max-w-[300px] w-full">
          <Input
            label="Telefon"
            wrapperClassName="space-y-1 w-full"
            name="telefon"
            control={form.control}
            placeholder="Telefonnummer"
            type="phone"
          />
        </div>
        <EinverstaendnisCheck control={form.control} name="einverstaendnis" />
        <ReCAPTCHA
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          ref={captchaRef}
        />
        <div className="flex flex-row w-full flex-nowrap justify-start items-center">
          <button className="bg-theme text-black rounded-md px-4 py-2 text-sm font-semibold">
            Formular absenden
          </button>
        </div>
      </form>
      {successModal && (
        <div
          onClick={() => setSuccessModal(false)}
          className="fixed inset-0 w-screen z-30 h-screen bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-4 space-y-4 w-[80%] md:w-[40%]"
          >
            <p className="text-theme-text font-bold">
              Vielen Dank für Ihre Nachricht!
            </p>
            <button
              onClick={() => setSuccessModal(false)}
              className="bg-theme text-white rounded-md py-2 px-4"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
      {errorModal && (
        <div
          onClick={() => setSuccessModal(false)}
          className="fixed inset-0 w-screen z-30 h-screen bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-4"
          >
            <p className="text-theme-text font-bold">
              Es ist ein Fehler aufgetreten.
            </p>
            <button
              onClick={() => setErrorModal(false)}
              className="bg-theme text-white rounded-md py-2 px-4"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
