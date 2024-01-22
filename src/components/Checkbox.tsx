import { type FC, useId, type ReactNode, type LabelHTMLAttributes } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  helperText?: ReactNode;
  validation?: UseFormRegisterReturn;
}

const Checkbox: FC<CheckboxProps> = ({
  label,
  labelProps,
  helperText,
  validation,
  className,
  ...restProps
}) => {
  const id = useId();

  return (
    <div>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id={id}
            type="checkbox"
            className={`${className} w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300`}
            {...restProps}
            {...validation}
          />
        </div>
        <div className="ml-3 text-sm">
          <label {...labelProps} htmlFor={id} className={`${labelProps?.className} text-gray-500`}>
            {label}
          </label>
        </div>
      </div>
      {Boolean(helperText) && <p className="mt-2 text-sm text-red-600">{helperText}</p>}
    </div>
  );
};

export default Checkbox;
