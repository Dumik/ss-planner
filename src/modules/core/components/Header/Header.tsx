import Image from 'next/image';
import React from 'react';
import { Button, Logo } from '@/modules/core';
import { useAuthActions } from '@/modules/auth';

const Header = () => {
  const { resetAccess } = useAuthActions();
  const handleLogOut = () => {
    resetAccess();
  };
  return (
    <header className=' text-white p-1 sticky border-2 border-purple-700 '>
      <div className='container mx-auto flex justify-between   items-center'>
        <div className='container mx-auto flex items-center'>
          <Image
            src={Logo}
            width={60}
            height={50}
            alt=''
            className='text-white stroke-white fill-white'
          />
          <span className='text-purple-700 font-semibold'>Smart Spender</span>
        </div>
        <Button variant='text' text='Log out >' size='small' onClick={handleLogOut} />
      </div>
    </header>
  );
};

export default Header;
