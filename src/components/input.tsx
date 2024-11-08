import classNames from "classnames";
import { InputHTMLAttributes } from "react";
import { Path, Control, Controller, FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  wrapperClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input<T extends FieldValues>(props: Props<T>) {
  const {
    type,
    required,
    placeholder,
    name,
    control,
    label,
    wrapperClassName,
    ...rest
  } = props;

  return (
    <div className={classNames("space-y-1", wrapperClassName)}>
      {Boolean(label) && (
        <label className="text-sm font-bold" htmlFor={name}>
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <div
              className={classNames(
                "shadow appearance-none border rounded-md overflow-hidden w-full text-gray-700 leading-tight focus-within:outline-none focus-within:shadow-outline flex flex-row flex-nowrap",
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
                {...rest}
                {...field}
                placeholder={placeholder}
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
