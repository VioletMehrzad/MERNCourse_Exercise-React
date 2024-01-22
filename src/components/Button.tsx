import { type FC } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text';
}

const Button: FC<ButtonProps> = ({ variant, className, ...restProps }) => {
  const buttonStyles = {
    contained: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-300',
    outlined:
      'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200',
    text: 'hover:bg-slate-300 focus:ring-blue-300'
  };

  return (
    <button
      {...restProps}
      className={`${
        buttonStyles[variant ?? 'contained']
      } ${className} w-full focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}></button>
  );
};

export default Button;
