import { type ReactNode, type FC, useId } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

interface SelectInputType extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: ReactNode;
  options: string[];
  defaultOption: ReactNode;
  helperText?: ReactNode;
  validation: UseFormRegisterReturn;
}

const SelectInput: FC<SelectInputType> = ({
  label,
  defaultOption,
  options,
  helperText,
  validation,
  ...restProps
}) => {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <select
        id={id}
        defaultValue=""
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        {...restProps}
        {...validation}>
        <option disabled value="">
          {defaultOption}
        </option>
        {options.map((i) => {
          return <option key={i}>{i}</option>;
        })}
      </select>
      {Boolean(helperText) && <p className="mt-2 text-sm text-red-600">{helperText}</p>}
    </div>
  );
};

export default SelectInput;
