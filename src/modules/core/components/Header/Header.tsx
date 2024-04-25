'use client';
import Image from 'next/image';
import React from 'react';
import { Button, ButtonSizeEnum, ButtonVariantEnum, Logo } from '@/modules/core';
import { useAuthActions } from '@/modules/auth';
import { CaretRight } from '@phosphor-icons/react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../../firebaseConfig';
import { usePeriodActions } from '@/modules/dashboard';

const Header = () => {
  const { resetAccess } = useAuthActions();
  const { resetPeriod } = usePeriodActions();

  const handleLogOut = () => {
    resetPeriod();
    resetAccess();
    signOut(auth);
  };
  return (
    <header className='h-20 text-white p-1 border-b-2 border-purple-700 fixed w-full bg-white z-10 flex items-center justify-center'>
      <div className='flex justify-between items-center w-full max-w-[1400px] px-5'>
        <div className='container flex items-center max-h-20'>
          <Image src={Logo} alt='' className='text-white stroke-white fill-white max-h-12 w-auto' />
          <span className='text-purple-700  font-semibold ml-4'>Smart Spender</span>
        </div>
        <Button
          text='Log out'
          size={ButtonSizeEnum.SMALL}
          variant={ButtonVariantEnum.TEXT}
          onClick={handleLogOut}
          className=''>
          <div className='flex items-center !w-24 justify-end'>
            <span>Log out</span>
            <CaretRight size={20} className='fill-purple-700' weight='bold' />
          </div>
        </Button>
      </div>
    </header>
  );
};

export default Header;
