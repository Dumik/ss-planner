import { Button, Input, Logo } from '@/modules/core';
import { useForm } from 'react-hook-form';
import { useAuthActions } from '../slices';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SignInPage = () => {
  const router = useRouter();
  const { grantAccess } = useAuthActions();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    grantAccess({ accessToken: '123', expiresIn: 123, refreshToken: '123' });
  };

  const handleSignUp = () => {
    router.push('sign-up');
  };

  return (
    <div className='flex justify-center flex-col items-center h-full'>
      <span className='text-3xl font-medium mt-14'>Hi, let&apos;s sign In</span>
      <form className='flex flex-col w-full gap-4 p-8' onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('username')} placeholder='Username' />
        <Input {...register('password')} type='password' placeholder='Password' />
        <span className='flex text-sm'>
          Don`t have a account?
          <Button
            text='Sign up'
            size='small'
            variant='text'
            className='p-0 w-20'
            type='button'
            onClick={handleSignUp}
          />
        </span>
        <Button type='submit' text='Sign in' fullWith size='large' />
      </form>
    </div>
  );
};

export default SignInPage;
