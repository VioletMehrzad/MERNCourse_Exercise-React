import { type ReactNode, type FC, useId } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

export interface TextfieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  helperText?: ReactNode;
  validation: UseFormRegisterReturn;
}

const Textfield: FC<TextfieldProps> = ({
  label,
  validation,
  helperText,
  className,
  ...restProps
}) => {
  const id = useId();

  return (
    <div>
      {Boolean(label) && (
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <input
        className={`${className} bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
        {...restProps}
        id={id}
        {...validation}
      />
      {Boolean(helperText) && <p className="mt-2 text-sm text-red-600">{helperText}</p>}
    </div>
  );
};

export default Textfield;
