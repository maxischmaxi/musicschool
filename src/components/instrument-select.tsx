import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Instrument } from "../lib/definitions";
import piano from "../assets/piano.jpg";
import klavier from "../assets/klavier.jpg";
import ukulele from "../assets/ukulele.jpg";
import keyboard from "../assets/keyboard.jpg";
import singing from "../assets/singing.jpg";
import guitar from "../assets/guitar.jpg";
import flute from "../assets/flute.jpg";
import bass from "../assets/bass.jpg";
import drums from "../assets/schlagzeug.jpg";
import classNames from "classnames";
import { CheckIcon } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { isDesktop } from "react-device-detect";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  onChange: (value: Instrument) => void;
};

function InstrumentImage({ instrument }: { instrument: Instrument }) {
  const className = "w-full h-24 object-cover object-center rounded-xl";

  switch (instrument) {
    case Instrument.PIANO:
      return <img src={piano} alt="Piano" className={className} />;
    case Instrument.KLAVIER:
      return <img src={klavier} alt="Klavier" className={className} />;
    case Instrument.GESANG:
      return <img src={singing} alt="Singing" className={className} />;
    case Instrument.GITARRE:
      return <img src={guitar} alt="Guitar" className={className} />;
    case Instrument.BLOCKFLOETE:
      return <img src={flute} alt="Flute" className={className} />;
    case Instrument.BASS:
      return <img src={bass} alt="Bass" className={className} />;
    case Instrument.SCHLAGZEUG:
      return <img src={drums} alt="Drums" className={className} />;
    case Instrument.UKULELE:
      return <img src={ukulele} alt="Ukulele" className={className} />;
    case Instrument.KEYBOARD:
      return <img src={keyboard} alt="Keyboard" className={className} />;
    default:
      return null;
  }
}

type InstrumentProps = {
  onChange: (instrument: Instrument) => void;
  value: Instrument;
  instrument: Instrument;
};

function InstrumentComponent(props: InstrumentProps) {
  const { onChange, value, instrument } = props;
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, {
    once: true,
  });

  return (
    <motion.button
      ref={ref}
      animate={{
        y: inView ? 0 : 100,
        opacity: inView ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
      onClick={() => onChange(instrument)}
      type="button"
      className={classNames(
        "will-change-transform relative flex flex-col col-span-1 flex-nowrap justify-center items-center rounded-xl",
        value === instrument
          ? "border-4 border-theme"
          : "border-4 border-transparent",
      )}
    >
      <InstrumentImage instrument={instrument as Instrument} />
      <div className="absolute inset-0 w-full h-full text-white font-bold flex justify-center items-center bg-black/40 rounded-lg">
        <span>
          {instrument === Instrument.BLOCKFLOETE ? (
            <span>Blockflöte</span>
          ) : (
            <span>
              {instrument.charAt(0).toUpperCase() + instrument.slice(1)}
            </span>
          )}
        </span>
      </div>
      <AnimatePresence>
        {value === instrument && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="absolute -top-4 -right-4 rounded-full bg-green-600 flex justify-center items-center text-white w-10 h-10"
          >
            <CheckIcon />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function InstrumentSelect<T extends FieldValues>(props: Props<T>) {
  const { control, name, onChange } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div
          className={classNames(
            "flex flex-col gap-2 rounded-md",
            Boolean(error) && "border border-red-500 p-2",
          )}
        >
          <label className="text-sm font-bold" htmlFor={name}>
            Instrument wählen
          </label>
          {isDesktop && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Object.values(Instrument).map((instrument) => (
                <InstrumentComponent
                  key={instrument}
                  onChange={(value) => {
                    field.onChange(value);
                    onChange(value);
                  }}
                  value={field.value}
                  instrument={instrument}
                />
              ))}
            </div>
          )}
          {!isDesktop && (
            <>
              <button
                type="button"
                className="flex flex-row flex-nowrap justify-center items-center py-2 rounded-md border border-gray-300"
                onClick={() => {
                  setOpen(true);
                }}
              >
                {field.value
                  ? String(field.value).charAt(0).toUpperCase() +
                    String(field.value).slice(1)
                  : "Instrument wählen"}
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
                      <div className="max-h-[80vh] overflow-y-auto w-full flex flex-col">
                        <div className="grid grid-cols-1 gap-4 w-full h-full">
                          {Object.values(Instrument).map((instrument) => (
                            <InstrumentComponent
                              key={instrument}
                              onChange={(value) => {
                                field.onChange(value);
                                onChange(value);
                                setOpen(false);
                              }}
                              value={field.value}
                              instrument={instrument}
                            />
                          ))}
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
  );
}
