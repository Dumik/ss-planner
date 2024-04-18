import { Button, Input, Logo } from '@/modules/core';
import { useForm } from 'react-hook-form';
import { useAuthActions } from '../slices';
import { useRouter } from 'next/navigation';

const SignUpPage = () => {
  const router = useRouter();
  const { grantAccess } = useAuthActions();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    grantAccess({ accessToken: '123', expiresIn: 123, refreshToken: '123' });
  };

  const handleSignIn = () => {
    router.push('sign-in');
  };

  return (
    <div className='flex justify-center flex-col items-center h-full'>
      <span className='text-3xl font-medium mt-14'>Hi, let&apos;s sign Up</span>
      <form className='flex flex-col w-full gap-4 p-8' onSubmit={handleSubmit(onSubmit)}>
        <Input {...register('username')} placeholder='Username' />
        <Input {...register('password')} type='password' placeholder='Password' />
        <Input {...register('confirmPassword')} type='password' placeholder='Confirm Password' />
        <span className='flex text-sm'>
          Already have a account?
          <Button
            text='Sign In'
            size='small'
            variant='text'
            className='p-0 w-20'
            type='button'
            onClick={handleSignIn}
          />
        </span>
        <Button type='submit' text='Sign up' fullWith size='large' />
      </form>
    </div>
  );
};

export default SignUpPage;
