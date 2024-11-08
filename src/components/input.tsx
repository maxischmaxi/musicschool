import classNames from "classnames";
import { Path, Control, Controller, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  type?: "phone" | "email" | "text" | "date";
  control: Control<T>;
  name: Path<T>;
  label?: string;
  wrapperClassName?: string;
  placeholder?: string;
};

export function Input<T extends FieldValues>(props: Props<T>) {
  const { type, placeholder, name, control, label, wrapperClassName } = props;

  return (
    <div className={classNames("space-y-1", wrapperClassName)}>
      {Boolean(label) && (
        <label className="text-sm font-bold" htmlFor={name}>
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <div
              className={classNames(
                "shadow appearance-none border rounded w-full text-gray-700 leading-tight focus-within:outline-none focus-within:shadow-outline flex flex-row flex-nowrap",
                Boolean(error) && "border-red-500",
              )}
            >
              {type === "phone" && (
                <label
                  htmlFor={name}
                  className="h-8 w-12 flex flex-row justify-center items-center border-r border-gray-200 px-3"
                >
                  <span>+49</span>
                </label>
              )}
              <input
                placeholder={placeholder}
                {...field}
                type={type}
                id={name}
                className="outline-none h-8 w-full px-3"
              />
            </div>
            {error && (
              <p className="text-red-500 text-xs italic">
                {error.message?.toString()}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
