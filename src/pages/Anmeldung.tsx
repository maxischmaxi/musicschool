import { zodResolver } from "@hookform/resolvers/zod";
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
import { isDesktop } from "react-device-detect";
import { useMutation } from "@tanstack/react-query";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

export function Anmeldung() {
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
      geburtsdatum: dayjs().subtract(10, "year").toDate().toISOString(),
      token: "",
    },
  });
  const captchaError = form.formState.errors.token?.message;

  const instrument = useWatch({
    control: form.control,
    name: "instrument",
  });

  const send = useMutation<boolean, boolean, AnmeldungType>({
    async mutationFn(formdata) {
      const res = await fetch(`${apiGateway}/anmeldung`, {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status !== 200 || res.ok) {
        throw new Error("An error occurred");
      }

      const data = await res.json();

      if (!data["message"] || typeof data["message"] !== "string") {
        throw new Error("An error occurred");
      }

      return data["message"] === "ok";
    },
    onSuccess: () => {
      form.reset();
    },
  });

  return (
    <main className="container max-w-5xl mx-auto pb-12 md:pb-24 px-8">
      <h1 className="text-theme-text font-bold mb-2 text-4xl">Kontakt</h1>
      <h4 className="text-theme-text mb-8">
        Fordern Sie jetzt Ihr unverbindliches Anmeldeformular an. Wir melden uns
        innerhalb von 1-2 Werktagen bei Ihnen.
      </h4>
      <form
        className="w-full space-y-4"
        onSubmit={form.handleSubmit((data) => {
          send.mutate(data);
        })}
      >
        <InstrumentSelect
          control={form.control}
          name="instrument"
          onChange={() => {
            form.setValue("lehrer", undefined as unknown as Lehrer);
            if (!isDesktop) {
              const label = document.getElementById("lehrer-select-label");
              if (label) {
                const top = label.getBoundingClientRect().top;
                window.scrollTo({ top: top - 80, behavior: "smooth" });
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
              const label = document.getElementById("vertrag-select-label");
              if (label) {
                const top = label.getBoundingClientRect().top;
                window.scrollTo({ top, behavior: "smooth" });
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
              const emailLabel = document.querySelector("label[for=email]");
              if (emailLabel) {
                const top = emailLabel.getBoundingClientRect().top;
                window.scrollTo({ top, behavior: "smooth" });
              }
            }
          }}
        />
        <div className="w-full flex flex-col md:flex-row gap-4">
          <Input
            label="E-Mail"
            name="email"
            control={form.control}
            placeholder="E-Mail Adresse angeben"
            wrapperClassName="w-full"
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="E-Mail"
            type="email"
            required
          />
          <Input
            label="Telefon"
            required
            wrapperClassName="w-full max-w-[220px]"
            name="telefon"
            control={form.control}
            placeholder="176 123 123 123"
            type="phone"
            aria-label="Telefon"
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="tel"
          />
        </div>
        <div className="flex flex-col md:flex-row flex-nowrap justify-start items-center gap-4">
          <Input
            label="Name des Schülers"
            autoCorrect="off"
            autoCapitalize="on"
            wrapperClassName="w-full max-w-full md:max-w-[350px]"
            required
            name="schueler_name"
            control={form.control}
            placeholder="Vor- und Nachname"
            aria-label="Name des Schülers"
          />
          <Input
            label="Geburtsdatum des Schülers"
            wrapperClassName="w-full max-w-full md:max-w-[200px]"
            required
            name="geburtsdatum"
            control={form.control}
            type="date"
            autoComplete="bday"
            autoCapitalize="off"
            autoCorrect="off"
            aria-label="Geburtsdatum des Schülers"
          />
          <Input
            label="Erziehungsberechtigte"
            required
            wrapperClassName="w-full"
            name="erziehungsberechtigte"
            control={form.control}
            placeholder="Vor- und Nachname"
            autoCapitalize="on"
            autoCorrect="off"
            autoComplete="name"
            aria-label="Erziehungsberechtigte"
          />
        </div>
        <div className="flex flex-col md:flex-row flex-nowrap justify-start items-center gap-4">
          <Input
            label="Straße"
            wrapperClassName="space-y-1 w-full max-w-full md:max-w-[350px]"
            required
            name="strasse"
            control={form.control}
            placeholder="Straße"
            autoComplete="street-address"
            autoCorrect="off"
            autoCapitalize="off"
          />
          <Input
            label="PLZ"
            wrapperClassName="space-y-1 max-w-full md:max-w-[200px] w-full"
            required
            name="plz"
            control={form.control}
            placeholder="PLZ"
            autoComplete="postal-code"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="PLZ"
          />
          <Input
            label="Ort"
            wrapperClassName="space-y-1 w-full"
            required
            name="ort"
            control={form.control}
            placeholder="Ort"
            autoComplete="address-level2"
            autoCapitalize="on"
            autoCorrect="off"
            aria-label="Ort"
          />
        </div>

        <EinverstaendnisCheck control={form.control} name="einverstaendnis" />
        <p className="text-xs text-theme-text">
          <span className="text-red-500">*</span> Pflichtfelder
        </p>
        <GoogleReCaptcha
          onVerify={(token) => {
            form.setValue("token", token);
          }}
        />
        <div className="flex flex-row w-full flex-nowrap justify-start items-center">
          <button
            className="bg-theme text-black rounded-md px-4 py-2 text-sm font-semibold"
            type="submit"
            title="Formular absenden"
            aria-label="Formular absenden"
          >
            Formular absenden
          </button>
        </div>
        {Boolean(captchaError) && (
          <p className="text-red-500 text-xs italic">{captchaError}</p>
        )}
      </form>
      {send.isSuccess && (
        <div
          onClick={() => {
            send.reset();
          }}
          className="fixed inset-0 w-screen z-30 h-screen bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-4 space-y-4 w-[80%] md:w-[40%]"
          >
            <p className="text-theme-text font-bold">
              Vielen Dank für Ihre Nachricht!
            </p>
            <p>
              Wir haben Ihre Anmeldung erhalten und werden uns innerhalb von 1-2
              Werktagen bei Ihnen melden.
            </p>
            <button
              onClick={() => {
                send.reset();
              }}
              type="button"
              aria-label="Schließen"
              title="Schließen"
              className="bg-theme text-white rounded-md py-2 px-4"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
      {send.isError && (
        <div
          onClick={() => {
            send.reset();
          }}
          className="fixed inset-0 w-screen z-30 h-screen bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-4"
          >
            <p className="text-theme-text font-bold">
              Es ist ein Fehler aufgetreten.
            </p>
            <p>
              Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.
            </p>
            <button
              onClick={() => {
                send.reset();
              }}
              className="bg-theme text-white rounded-md py-2 px-4"
              type="button"
              title="Schließen"
              aria-label="Schließen"
            >
              Schließen
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
