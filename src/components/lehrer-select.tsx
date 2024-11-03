import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { available_lehrer, Instrument, Lehrer } from "../lib/definitions";
import jana from "../assets/jana.png";
import martin from "../assets/martin.png";
import benjamin from "../assets/benjamin.png";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  instrument: Instrument | undefined | null;
};

function LehrerImage({ lehrer }: { lehrer: Lehrer }) {
  const className = "object-cover object-center w-full h-full";

  switch (lehrer) {
    case Lehrer.JANA:
      return <img src={jana} alt="Jana" className={className} />;
    case Lehrer.MARTIN:
      return <img src={martin} alt="Martin" className={className} />;
    case Lehrer.CHRISTOPHER:
      return <img src={benjamin} alt="Christopher" className={className} />;
    case Lehrer.LUKAS:
      return <img src={benjamin} alt="Lukas" className={className} />;
    default:
      return null;
  }
}

export function LehrerSelect<T extends FieldValues>(props: Props<T>) {
  const { instrument, control, name } = props;

  const lehrer =
    available_lehrer
      .find((l) => l.instrument === instrument)
      ?.lehrer.map((lehrer) => ({
        value: lehrer,
        label: lehrer.charAt(0).toUpperCase() + lehrer.slice(1),
      })) ?? [];

  const disabled = lehrer.length === 0 || instrument?.length === 0;

  return (
    <Controller
      control={control}
      name={name}
      disabled={disabled}
      render={({ field, fieldState: { error } }) => (
        <div
          className={classNames(
            "flex flex-col gap-2 rounded-md",
            Boolean(error) && "border border-red-500 p-2",
          )}
        >
          <label className="font-bold text-sm" htmlFor={name}>
            Lehrer wählen
          </label>
          {!instrument && (
            <p className="text-gray-500">
              Wählen Sie ein Instrument aus, um die entsprechenden Lehrer
              angezeigt zu bekommen
            </p>
          )}
          {Boolean(instrument) && lehrer.length === 0 && (
            <p className="text-gray-500">Keine Lehrer verfügbar</p>
          )}
          {Boolean(instrument) && lehrer.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {lehrer.map((l) => (
                  <motion.button
                    type="button"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 900, damping: 40 }}
                    disabled={field.disabled}
                    className={classNames(
                      "h-48 w-full relative flex items-center justify-center rounded-2xl overflow-hidden",
                      field.value === l.value
                        ? "border-4 border-theme"
                        : "border-4 border-transparent",
                    )}
                    key={l.value}
                    onClick={() => field.onChange(l.value)}
                  >
                    <LehrerImage lehrer={l.value} />
                    <div className="absolute inset-0 w-full h-full text-white font-bold flex justify-center items-center bg-black/40">
                      <span>{l.label}</span>
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          )}
          {error && (
            <p className="text-red-500 text-xs italic">
              {error.message?.toString()}
            </p>
          )}
        </div>
      )}
    />
  );
}
