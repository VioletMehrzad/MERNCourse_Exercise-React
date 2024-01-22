/* eslint-disable @typescript-eslint/no-misused-promises */
import { type FC } from 'react';
import Textfield from '../components/Textfield';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { type RegisterSchema } from './RegisterPage';

interface LoginSchema {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup
    .string()
    .min(3, 'Password must be at least 8 characters')
    .required('Password is required'),
  rememberMe: yup.boolean()
});

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(loginSchema) });
  

  const handleLoginUser = (data: LoginSchema): void => {
    const usersList = JSON.parse(localStorage.getItem('users') ?? '[]');
    const user = usersList.find(
      (user: RegisterSchema) => user.email === data.email && user.password === data.password
    );
    if (user != null) {
      alert(`Welcome, ${user.fullName}`);
      navigate('/');
    } else {
      alert('User Not Found! Please, Sign up first!');
      navigate('/register');
    }
  };

  return (
    <div className="w-full rounded-lg shadow sm:max-w-md">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Sign in to your account
        </h1>
        <form
          onSubmit={handleSubmit(handleLoginUser)}
          className="space-y-4 md:space-y-6"
          action="#">
          <Textfield
            label="Your email"
            defaultValue={searchParams.get('email') ?? ''}
            placeholder="name@company.com"
            type="email"
            autoComplete="username"
            helperText={errors.email?.message}
            validation={register('email')}
          />
          <Textfield
            label="Password"
            placeholder="••••••••"
            type="password"
            autoComplete="current-password"
            helperText={errors.password?.message}
            validation={register('password')}
          />
          <div className="flex items-center justify-between">
            <Checkbox label="Remember me" validation={register('rememberMe')} />
            <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <Button>Sign in</Button>
          <p className="text-sm font-light text-gray-500">
            Don&apos;t have an account yet?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
