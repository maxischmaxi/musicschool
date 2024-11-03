import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: { value: string; label: string }[];
  defaultOption?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
};

export function Select<T extends FieldValues>(props: Props<T>) {
  const { onChange, disabled, options, defaultOption, name, control, label } =
    props;

  return (
    <div className="space-y-1">
      {Boolean(label) && <label htmlFor={name}>{label}</label>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...field}
            id={name}
            onChange={(e) => {
              field.onChange(e);
              onChange?.(e.target.value);
            }}
            disabled={field.disabled || disabled}
          >
            <option selected disabled>
              {defaultOption ?? "Auswählen"}
            </option>
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
}
