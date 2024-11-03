import classNames from "classnames";
import { CheckIcon } from "lucide-react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
};

export function EinverstaendnisCheck<T extends FieldValues>(props: Props<T>) {
  const { control, name } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full flex flex-col">
          <div className="max-w-full w-full flex flex-row flex-nowrap items-center gap-4">
            <button
              type="button"
              className={classNames(
                "shrink-0 flex cursor-pointer outline-none flex-row flex-nowrap justify-center items-center w-6 h-6 border border-gray-400 hover:border-gray-500 rounded-sm",
                Boolean(error) && "border-red-500",
              )}
              onClick={() => {
                field.onChange(!field.value);
              }}
              id={name}
            >
              {field.value && (
                <CheckIcon className="w-8 h-8 text-theme font-bold" />
              )}
            </button>
            <label className="outline-none text-sm font-bold" htmlFor={name}>
              Hiermit erklären wir uns einverstanden, dass die Daten zur
              Bearbeitung gespeichert und verarbeitet werden. Weitere
              Informationen und Widerrufshinweise finden Sie in unserer{" "}
              <a
                className="text-theme underline"
                href="/privacy"
                target="_blank"
                rel="noreferrer"
              >
                Datenschutzerklärung
              </a>
            </label>
          </div>
          {error && (
            <p className="text-red-500 text-xs italic mt-2">
              {error.message?.toString()}
            </p>
          )}
        </div>
      )}
    />
  );
}
