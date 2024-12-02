import { Button, ButtonSizeEnum, ButtonVariantEnum, Input } from '@/modules/core';
import { useForm } from 'react-hook-form';
import { useAuthActions } from '../slices';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebaseConfig';
import { GoogleAuth } from '../components';

type SignInFormType = {
  email: string;
  password: string;
};

const SignInPage = () => {
  const router = useRouter();
  const { grantAccess } = useAuthActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormType>();

  const onSubmit = async ({ email, password }: SignInFormType) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
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
      console.error('Login Error:', error);
      alert(error.message || 'An error occurred during sign-in.');
    }
  };

  const handleSignUp = () => {
    router.push('sign-up');
  };

  return (
    <div className='flex justify-center flex-col items-center h-full'>
      <span className='text-3xl font-medium mt-14'>Hi, let&apos;s sign In</span>
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
        <span className='flex text-sm items-center -mb-4'>
          Don`t have an account?
          <Button
            text='Sign up'
            size={ButtonSizeEnum.SMALL}
            variant={ButtonVariantEnum.TEXT}
            className='p-0 w-12 whitespace-nowrap'
            type='button'
            onClick={handleSignUp}
          />
        </span>
        <Button type='submit' text='Sign in' fullWith />
      </form>
      <GoogleAuth buttonText='Sign in with Google' />
    </div>
  );
};

export default SignInPage;
