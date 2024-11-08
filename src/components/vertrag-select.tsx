import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { vertraege } from "../lib/definitions";
import classNames from "classnames";
import { CheckIcon, InfoIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  onChange?: (value: string) => void;
};

export function VertragSelect<T extends FieldValues>(props: Props<T>) {
  const { onChange, label, control, name } = props;
  const [info, setInfo] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (info) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [info]);

  return (
    <section id="vertrag">
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <div
            className={classNames(
              "flex flex-col gap-1 rounded-md",
              Boolean(error) && "border-red-500 p-2",
            )}
          >
            <label
              id="vertrag-select-label"
              className="text-sm font-bold"
              htmlFor={name}
            >
              {label}
              <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {vertraege.map((vertrag, key) => (
                <div
                  onClick={() => {
                    if (field.disabled) {
                      return;
                    }

                    field.onChange(vertrag.id);
                    onChange?.(vertrag.id);
                  }}
                  className={classNames(
                    "cursor-pointer relative rounded-2xl border flex flex-col",
                    field.value === vertrag.id
                      ? "border-4 border-theme"
                      : "border-4 border-gray-100",
                  )}
                  title={vertrag.minuten + " Minuten"}
                  key={key}
                >
                  <div className="rounded-t-xl bg-theme py-2 w-full relative">
                    <span className="text-white font-bold text-xl text-center flex w-full justify-center items-center">
                      {vertrag.minuten}
                      <br />
                      Minuten
                    </span>
                    <button
                      className="absolute top-2 right-2 text-white flex justify-center p-2 items-center"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setInfo(!info);
                        setSelected(vertrag.id);
                      }}
                    >
                      <InfoIcon />
                    </button>
                  </div>
                  <span className="text-lg w-full text-left px-4 text-dark-red font-bold pt-4">
                    {vertrag.variante === "einzel" && (
                      <span>Einzelunterricht</span>
                    )}
                    {vertrag.variante === "gruppe" && (
                      <span>Gruppenunterricht</span>
                    )}
                    {vertrag.variante === "frei" && (
                      <span>freie Vereinbarung</span>
                    )}
                  </span>
                  <span className="text-theme-text block mt-4 text-md font-bold text-left w-full px-4">
                    Einmalige Aufnahmegebühr <br />
                    {vertrag.aufnahmegebuehr} €
                  </span>
                  <span className="text-dark-red mt-8 text-lg mb-8 px-4 font-bold text-left w-full">
                    {vertrag.preis === 450
                      ? "Einmalige Gebühr"
                      : "Monatlicher Beitrag"}{" "}
                    <br />
                    {vertrag.preis} €
                  </span>
                  <AnimatePresence>
                    {field.value === vertrag.id && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="absolute -top-4 -left-4 rounded-full bg-green-600 flex justify-center items-center text-white w-10 h-10"
                      >
                        <CheckIcon />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
            {error && (
              <p className="text-red-500 text-xs italic">
                {error.message?.toString()}
              </p>
            )}

            {info && (
              <div
                className="fixed bg-black/60 inset-0 z-20 flex flex-row flex-nowrap justify-center items-center"
                onClick={() => {
                  setInfo(false);
                }}
              >
                <div
                  className="bg-white rounded-2xl max-w-[90vw] md:max-w-xl relative flex flex-col flex-nowrap max-h-[65vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-row p-4 flex-nowrap justify-between items-center border-b border-gray-400">
                    <p className="font-bold">
                      {vertraege.find((v) => v.id === selected)?.minuten}{" "}
                      Minuten Vertragsinformationen
                    </p>
                    <button
                      onClick={() => {
                        setInfo(false);
                      }}
                      type="button"
                      className="flex flex-row justify-center items-center p-2"
                    >
                      <XIcon />
                    </button>
                  </div>
                  <div className="h-full max-h-full overflow-y-auto p-4">
                    {selected === "1" && (
                      <p>
                        Die Musikschule übernimmt den regelmäßigen Unterricht
                        des Schülers. Als Unterrichtsjahr gilt das Kalenderjahr.
                        Der Unterricht wird als Lektion zu wöchentlich einmal 30
                        Minuten in multidimensionaler Form (siehe Anhang)
                        erteilt, monatliche Gebühr = 88,- Euro. Das Honorar wird
                        als Jahreshonorar berechnet und ist in 12 gleichen Raten
                        im Voraus bis zum 10. jeden Monats zu zahlen, einmalige
                        Aufnahmegebühr: 20,- Euro. Der Unterricht kann nur an
                        Schultagen erteilt werden. Bei Rücklastschriften
                        berechnen wir 10,-€ pro nicht einlösbarer Lastschrift.
                        Die erste Unterrichtsstunde ist ein
                        Gratis-Probeunterricht, die vereinbarte Zeit gilt für
                        alle folgenden Stunden. Will ein Schüler den Unterricht
                        nach der kostenlosen Probestunde nicht fortsetzen,
                        genügt eine entsprechende mündliche Mitteilung. Bei
                        längerer Krankheit des Schülers entfällt das anteilige
                        Honorar nach der vierten einander folgenden versäumten
                        Stunde. Der Kurs kann von den Vertragspartnern mit
                        sechswöchiger Frist zum 30.April/ 31.August/ 31.Dezember
                        in schriftlicher Form gekündigt werden. Die Kündigung
                        kann durch eine E-Mail erfolgen und muß vor Beginn der
                        Kündigungsfrist bei o.g. Anschrift eingegangen sein.
                        Eine Erhöhung des Honorars ist möglich und hat nach
                        Grundsätzen der Billigkeit zu erfolgen. Sie muß
                        mindestens 8 Wochen vorher dem Vertragspartner
                        schriftlich mitgeteilt werden. Für vom Schüler versäumte
                        oder abgesagte Stunden ist die Lehrkraft nicht
                        nachleistungspflichtig, die anteilige Vergütung hierfür
                        kann vom Honorar nicht abgezogen werden. Es besteht
                        jedoch die Möglichkeit, in derselben Woche ersatzweise
                        an einer anderen Unterrichtsstunde teilzunehmen, wenn
                        die Lehrkraft im Falle ernsthafter Verhinderung
                        mindestens 24 Stunden vorher davon Kenntnis erhalten
                        hat. Aus anderen Gründen von der Lehrkraft abgesagte
                        Stunden werden nachgegeben, ersatzweise wird das
                        anteilige Honorar erstattet. Zahlungsweise: nur
                        monatlich durch Einzugsverfahren. Änderungen und
                        Ergänzungen des Vertrages sind nur wirksam, wenn sie
                        schriftlich erfolgen. Werden einzelne Bestimmungen
                        dieses Vertrages unwirksam, wird dadurch die Gültigkeit
                        des Vertrages im Übrigen nicht berührt.
                      </p>
                    )}
                    {selected === "2" && (
                      <p>
                        Die Musikschule übernimmt den regelmäßigen Unterricht
                        des Schülers. Als Unterrichtsjahr gilt das Kalenderjahr.
                        Der Unterricht wird als Lektion zu wöchentlich einmal 45
                        Minuten erteilt, monatliche Gebühr = 111,- Euro. Das
                        Honorar wird als Jahreshonorar berechnet und ist in 12
                        gleichen Raten im Voraus bis zum 10. jeden Monats zu
                        zahlen, einmalige Aufnahmegebühr: 20,- Euro. Der
                        Unterricht kann nur an Schultagen erteilt werden. Bei
                        Rücklastschriften berechnen wir 10,-€ pro nicht
                        einlösbarer Lastschrift. Die erste Unterrichtsstunde ist
                        ein Gratis-Probeunterricht, die vereinbarte Zeit gilt
                        für alle folgenden Stunden. Will ein Schüler den
                        Unterricht nach der kostenlosen Probestunde nicht
                        fortsetzen, genügt eine entsprechende mündliche
                        Mitteilung. Bei längerer Krankheit des Schülers entfällt
                        das anteilige Honorar nach der vierten einander
                        folgenden versäumten Stunde. Der Kurs kann von den
                        Vertragspartnern mit sechswöchiger Frist zum 30.April/
                        31.August/ 31.Dezember in schriftlicher Form gekündigt
                        werden. Die Kündigung kann durch eine E-Mail erfolgen
                        und muß vor Beginn der Kündigungsfrist bei o.g.
                        Anschrift eingegangen sein. Eine Erhöhung des Honorars
                        ist möglich und hat nach Grundsätzen der Billigkeit zu
                        erfolgen. Sie muß mindestens 8 Wochen vorher dem
                        Vertragspartner schriftlich mitgeteilt werden. Für vom
                        Schüler versäumte oder abgesagte Stunden ist die
                        Lehrkraft nicht nachleistungspflichtig, die anteilige
                        Vergütung hierfür kann vom Honorar nicht abgezogen
                        werden. Es besteht jedoch die Möglichkeit, in derselben
                        Woche ersatzweise an einer anderen Unterrichtsstunde
                        teilzunehmen, wenn die Lehrkraft im Falle ernsthafter
                        Verhinderung mindestens 24 Stunden vorher davon Kenntnis
                        erhalten hat. Aus anderen Gründen von der Lehrkraft
                        abgesagte Stunden werden nachgegeben, ersatzweise wird
                        das anteilige Honorar erstattet. Zahlungsweise: nur
                        monatlich durch Einzugsverfahren. Änderungen und
                        Ergänzungen des Vertrages sind nur wirksam, wenn sie
                        schriftlich erfolgen. Werden einzelne Bestimmungen
                        dieses Vertrages unwirksam, wird dadurch die Gültigkeit
                        des Vertrages im Übrigen nicht berührt.
                      </p>
                    )}
                    {selected === "3" && (
                      <p>
                        Die Musikschule übernimmt den regelmäßigen Unterricht
                        des Schülers. Als Unterrichtsjahr gilt das Kalenderjahr.
                        Der Unterricht wird als Lektion zu wöchentlich einmal 60
                        Minuten als Gruppenunterricht erteilt, monatliche Gebühr
                        = 66,- Euro. Das Honorar wird als Jahreshonorar
                        berechnet und ist in 12 gleichen Raten im Voraus bis zum
                        10. jeden Monats zu zahlen, einmalige Aufnahmegebühr:
                        20,- Euro. Der Unterricht kann nur an Schultagen erteilt
                        werden. Bei Rücklastschriften berechnen wir 10,-€ pro
                        nicht einlösbarer Lastschrift. Die erste
                        Unterrichtsstunde ist ein Gratis-Probeunterricht, die
                        vereinbarte Zeit gilt für alle folgenden Stunden. Will
                        ein Schüler den Unterricht nach der kostenlosen
                        Probestunde nicht fortsetzen, genügt eine entsprechende
                        mündliche Mitteilung. Bei längerer Krankheit des
                        Schülers entfällt das anteilige Honorar nach der vierten
                        einander folgenden versäumten Stunde. Der Kurs kann von
                        den Vertragspartnern mit sechswöchiger Frist zum
                        30.April/ 31.August/ 31.Dezember in schriftlicher Form
                        gekündigt werden. Die Kündigung kann durch eine E-Mail
                        erfolgen und muß vor Beginn der Kündigungsfrist bei o.g.
                        Anschrift eingegangen sein. Eine Erhöhung des Honorars
                        ist möglich und hat nach Grundsätzen der Billigkeit zu
                        erfolgen. Sie muß mindestens 8 Wochen vorher dem
                        Vertragspartner schriftlich mitgeteilt werden. Für vom
                        Schüler versäumte oder abgesagte Stunden ist die
                        Lehrkraft nicht nachleistungspflichtig, die anteilige
                        Vergütung hierfür kann vom Honorar nicht abgezogen
                        werden. Es besteht jedoch die Möglichkeit, in derselben
                        Woche ersatzweise an einer anderen Unterrichtsstunde
                        teilzunehmen, wenn die Lehrkraft im Falle ernsthafter
                        Verhinderung mindestens 24 Stunden vorher davon Kenntnis
                        erhalten hat. Aus anderen Gründen von der Lehrkraft
                        abgesagte Stunden werden nachgegeben, ersatzweise wird
                        das anteilige Honorar erstattet. Zahlungsweise: nur
                        monatlich durch Einzugsverfahren. Änderungen und
                        Ergänzungen des Vertrages sind nur wirksam, wenn sie
                        schriftlich erfolgen. Werden einzelne Bestimmungen
                        dieses Vertrages unwirksam, wird dadurch die Gültigkeit
                        des Vertrages im Übrigen nicht berührt.
                      </p>
                    )}
                    {selected === "4" && (
                      <p>
                        Der Unterricht wird als 10-stündige Lektion zu jeweils
                        45 Minuten bei freier Vereinbarung des Zeitpunktes in
                        Absprache mit der zuständigen Lehrkraft erteilt,
                        einmahlige Gebühr = 450,- Euro. Aufnahmegebühr: 20,-
                        Euro. Unterrichtsstunden können abgesagt werden, wenn
                        die Lehrkraft im Falle ernsthafter Verhinderung
                        mindestens 24 Stunden vorher davon Kenntnis erhalten
                        hat, andernfalls gelten sie als gegeben. Zahlungsweise:
                        per Überweisung oder durch Einzugsverfahren. Änderungen
                        und Ergänzungen des Vertrages sind nur wirksam, wenn sie
                        schriftlich erfolgen. Werden einzelne Bestimmungen
                        dieses Vertrages unwirksam, wird dadurch die Gültigkeit
                        des Vertrages im Übrigen nicht berührt.
                      </p>
                    )}
                  </div>
                  <div className="flex flex-row flex-nowrap justify-end items-center w-full p-4 border-t border-gray-400">
                    <button
                      className="rounded-md bg-theme text-theme-text font-bold px-4 py-2"
                      type="button"
                      onClick={() => setInfo(false)}
                    >
                      Verstanden
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      />
    </section>
  );
}
