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

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  onChange?: (value: Instrument) => void;
};

function InstrumentImage({ instrument }: { instrument: Instrument }) {
  const className = "w-full h-24 object-cover object-center";

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

export function InstrumentSelect<T extends FieldValues>(props: Props<T>) {
  const { control, name, onChange } = props;

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Object.values(Instrument).map((instrument) => (
              <button
                key={instrument}
                onClick={() => {
                  field.onChange(instrument);
                  onChange?.(instrument as Instrument);
                }}
                type="button"
                className={classNames(
                  "relative flex flex-col col-span-1 flex-nowrap justify-center items-center overflow-hidden rounded-xl",
                  field.value === instrument
                    ? "border-4 border-theme"
                    : "border-4 border-transparent",
                )}
              >
                <InstrumentImage instrument={instrument as Instrument} />
                <div className="absolute inset-0 w-full h-full text-white font-bold flex justify-center items-center bg-black/40">
                  <span>
                    {instrument === Instrument.BLOCKFLOETE ? (
                      <span>Blockflöte</span>
                    ) : (
                      <span>
                        {instrument.charAt(0).toUpperCase() +
                          instrument.slice(1)}
                      </span>
                    )}
                  </span>
                </div>
              </button>
            ))}
          </div>
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
