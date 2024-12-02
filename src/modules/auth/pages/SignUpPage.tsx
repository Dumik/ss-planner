import { Button, ButtonSizeEnum, ButtonVariantEnum, Input } from '@/modules/core';
import { useForm } from 'react-hook-form';
import { useAuthActions } from '../slices';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebaseConfig';
import { GoogleAuth } from '../components';

type SignUpFormType = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage = () => {
  const router = useRouter();
  const { grantAccess } = useAuthActions();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormType>();

  const onSubmit = async ({ email, password, confirmPassword }: SignUpFormType) => {
    if (password !== confirmPassword) {
      setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const tokenResult = await user.getIdTokenResult();
      const { token, claims } = tokenResult;
      const expiresIn = claims.exp ? +claims.exp : Date.now() + 3600 * 1000;

      grantAccess({
        accessToken: token,
        expiresIn,
        refreshToken: user.refreshToken,
      });

      router.push('/dashboard'); 
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('email', { message: 'Email is already in use' });
      } else if (error.code === 'auth/weak-password') {
        setError('password', { message: 'Password is too weak' });
      } else {
        console.error('Sign-Up Error:', error);
        alert(error.message || 'An error occurred during sign-up.');
      }
    }
  };

  const handleSignIn = () => {
    router.push('sign-in');
  };

  return (
    <div className='flex justify-center flex-col items-center h-full'>
      <span className='text-3xl font-medium mt-14'>Hi, let&apos;s sign Up</span>
      <form className='flex flex-col w-full gap-6 p-8' onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder='Email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email format',
            },
          })}
          error={errors.email?.message || ''}
        />
        <Input
          type='password'
          placeholder='Password'
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          error={errors.password?.message || ''}
        />
        <Input
          type='password'
          placeholder='Confirm Password'
          {...register('confirmPassword', {
            required: 'Confirm password is required',
          })}
          error={errors.confirmPassword?.message || ''}
        />
        <span className='flex text-sm items-center -mb-4'>
          Already have an account?
          <Button
            text='Sign In'
            size={ButtonSizeEnum.SMALL}
            variant={ButtonVariantEnum.TEXT}
            className='p-0 w-14 whitespace-nowrap text-nowrap'
            type='button'
            onClick={handleSignIn}
          />
        </span>
        <Button type='submit' text='Sign up' fullWith />
      </form>
      <GoogleAuth buttonText='Sign up with Google' />
    </div>
  );
};

export default SignUpPage;
