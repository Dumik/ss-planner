'use client';
import { useEffect } from 'react';
import Image from 'next/image';

import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../../../../firebaseConfig';
import { useAuthActions } from '@/auth/slices';

type GoogleAuthProps = {
  buttonText: string;
};

const GoogleAuth = ({ buttonText }: GoogleAuthProps) => {
  const { grantAccess } = useAuthActions();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      user?.getIdTokenResult().then((data) => {
        const expiresIn = data.claims.exp ? +data.claims.exp : 0;
        grantAccess({
          accessToken: data.token,
          expiresIn: expiresIn,
          refreshToken: '',
        });
      });
    });
  }, []);

  return (
    <div className='flex items-center justify-center h-12 w-full px-8'>
      <button
        onClick={signInWithGoogle}
        className='px-4 py-2 border flex gap-2 items-center justify-center w-full border-slate-200  rounded-lg hover:border-slate-400 hover:text-slate-900 over:shadow transition duration-150'>
        <Image
          className='w-6 h-6'
          src='https://www.svgrepo.com/show/475656/google-color.svg'
          loading='lazy'
          alt='google logo'
          width={20}
          height={20}
        />
        <span>{buttonText}</span>
      </button>
    </div>
  );
};

export default GoogleAuth;
