/* eslint-disable @typescript-eslint/no-misused-promises */
import { type FC, useContext } from 'react';
import Textfield from '../components/Textfield';
import SelectInput from '../components/SelectInput';
import Checkbox from './../components/Checkbox';
import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { store } from '../contexts';

export interface RegisterSchema {
  email: string;
  password: string;
  repeatPassword: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  address: string;
  termsAndConditions: boolean;
  id?: string;
}

const registerSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup
    .string()
    .min(3, 'Password must be at least 8 characters')
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  fullName: yup.string().required('Name is required'),
  gender: yup.string().required('Gender is required'),
  phoneNumber: yup
    .string()
    .matches(/^\d{11}$/, 'Invalid phone number format')
    .required('Phone number is required'),
  address: yup.string().required('Address is required'),
  termsAndConditions: yup
    .boolean()
    .oneOf([true], 'You must accept the Terms and Conditions')
    .required('You must accept the Terms and Conditions')
});

const RegisterPage: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(registerSchema) });

  const { users, setUsers } = useContext(store);

  const handleRegisterUser = (data: RegisterSchema): void => {
    if (users.find((i) => i.email === data.email) != null) alert('User Already Exists!');
    else {
      const user = {
        id: uuidv4(),
        ...data
      };
      setUsers((prevUsers) => [...prevUsers, user]);
      alert('Signed up successfully! Please, log in!');
      location.assign(`/login?email=${data.email}`);
    }
  };

  return (
    <div className="w-full rounded-lg shadow sm:max-w-md">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          Create an account
        </h1>
        <form onSubmit={handleSubmit(handleRegisterUser)} className="space-y-4 md:space-y-6">
          <Textfield
            label="Email address"
            type="email"
            placeholder="name@company.com"
            autoComplete="username"
            helperText={errors.email?.message}
            validation={register('email')}
          />
          <Textfield
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            helperText={errors.password?.message}
            validation={register('password')}
          />
          <Textfield
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            helperText={errors.repeatPassword?.message}
            validation={register('repeatPassword')}
          />
          <div className="grid md:grid-cols-2 md:gap-6">
            <Textfield
              label="Name"
              type="text"
              placeholder="e.g. John Doe"
              helperText={errors.fullName?.message}
              validation={register('fullName')}
            />
            <SelectInput
              label="Gender"
              defaultOption="Choose your gender"
              options={['Female', 'Male', 'Rather not say']}
              helperText={errors.gender?.message}
              validation={register('gender')}
            />
            <Textfield
              label="Phone number"
              type="tel"
              placeholder="1234567890"
              helperText={errors.phoneNumber?.message}
              validation={register('phoneNumber')}
            />
            <Textfield
              label="Address"
              type="text"
              placeholder="e.g. 132, Kingston, New York."
              helperText={errors.address?.message}
              validation={register('address')}
            />
          </div>
          <Checkbox
            label={
              <>
                I accept the{' '}
                <a className="font-medium text-blue-600 hover:underline" href="#">
                  Terms and Conditions
                </a>
              </>
            }
            labelProps={{ className: 'font-light' }}
            helperText={errors.termsAndConditions?.message}
            validation={register('termsAndConditions')}
          />
          <Button>Create an account</Button>
          <p className="text-sm font-light text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
