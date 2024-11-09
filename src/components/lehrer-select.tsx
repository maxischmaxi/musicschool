import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { available_lehrer, Instrument, Lehrer } from "../lib/definitions";
import jana from "../assets/jana.png";
import martin from "../assets/martin.png";
import benjamin from "../assets/benjamin.png";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { isDesktop } from "react-device-detect";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  instrument: Instrument | undefined | null;
  onChange?: (value: Lehrer) => void;
};

function LehrerImage({ lehrer }: { lehrer: Lehrer }) {
  const className = "object-cover object-center w-full h-full rounded-xl overflow-hidden";

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

type LehrerComponentProps = {
  disabled: boolean;
  value: Lehrer;
  lehrer: { value: Lehrer; label: string };
  onChange: (value: Lehrer) => void;
};

export function LehrerComponent(props: LehrerComponentProps) {
  const { disabled, value, lehrer, onChange } = props;
  return (
    <motion.button
      type="button"
      title={lehrer.label}
      aria-label={lehrer.label}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 900,
        damping: 40,
      }}
      disabled={disabled}
      className={classNames(
        "will-change-auto h-24 md:h-48 w-full relative flex items-center justify-center rounded-2xl",
        value === lehrer.value
          ? "border-4 border-theme"
          : "border-4 border-transparent",
      )}
      onClick={() => onChange(lehrer.value)}
    >
      <LehrerImage lehrer={lehrer.value} />
      <div className="absolute inset-0 w-full h-full text-white font-bold flex justify-center items-center bg-black/40 rounded-xl">
        <span>{lehrer.label}</span>
      </div>
      <AnimatePresence>
        {value === lehrer.value && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="absolute -top-4 -right-1 md:-right-4 rounded-full bg-green-600 flex justify-center items-center text-white w-10 h-10"
          >
            <CheckIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function LehrerSelect<T extends FieldValues>(props: Props<T>) {
  const { instrument, control, name, onChange } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const lehrer =
    available_lehrer
      .find((l) => l.instrument === instrument)
      ?.lehrer.map((lehrer) => ({
        value: lehrer,
        label: lehrer.charAt(0).toUpperCase() + lehrer.slice(1),
      })) ?? [];

  const disabled = lehrer.length === 0 || instrument?.length === 0;

  return (
    <section id="lehrer">
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
            <label
              id="lehrer-select-label"
              className="font-bold text-sm"
              htmlFor={name}
            >
              Lehrer wählen
              <span className="text-red-500">*</span>
            </label>
            {isDesktop && (
              <>
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
                        <LehrerComponent
                          value={field.value}
                          disabled={Boolean(field.disabled)}
                          lehrer={l}
                          key={l.value}
                          onChange={() => {
                            field.onChange(l.value);
                            onChange?.(l.value);
                          }}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </>
            )}
            {!isDesktop && (
              <>
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  disabled={field.disabled}
                  title="Lehrer wählen"
                  type="button"
                  className="disabled:opacity-50 flex flex-row flex-nowrap justify-center items-center py-2 rounded-md border border-gray-300"
                >
                  {field.value
                    ? String(field.value).charAt(0).toUpperCase() +
                    String(field.value).slice(1)
                    : "Lehrer wählen"}
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      className="bg-black/40 flex flex-row flex-nowrap justify-center items-center fixed inset-0 z-50 will-change-transform"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-white p-4 rounded-xl will-change-transform w-[80vw]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="max-h-[65vh] overflow-y-auto w-full flex flex-col">
                          <div className="flex flex-col flex-nowrap gap-4 w-full h-full">
                            <AnimatePresence>
                              {lehrer.map((l) => (
                                <LehrerComponent
                                  value={field.value}
                                  disabled={Boolean(field.disabled)}
                                  lehrer={l}
                                  key={l.value}
                                  onChange={() => {
                                    field.onChange(l.value);
                                    onChange?.(l.value);
                                    setOpen(false);
                                  }}
                                />
                              ))}
                            </AnimatePresence>
                          </div>
                        </div>
                        <div className="w-full flex flex-row flex-nowrap items-center justify-end pt-4">
                          <button
                            type="button"
                            className="bg-theme text-theme-text rounded-md py-2 px-4"
                            onClick={() => {
                              setOpen(false);
                            }}
                          >
                            Abbrechen
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
            {error && (
              <p className="text-red-500 text-xs italic">
                {error.message?.toString()}
              </p>
            )}
          </div>
        )}
      />
    </section>
  );
}
