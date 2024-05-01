'use client';
import { ComingSoon } from '@/modules/core';
import Image from 'next/image';

const SettingsPage = () => {
  return (
    <div className='flex gap-7 flex-col p-5 !h-full'>
      <div className='w-full h-full flex items-start justify-center'>
        <Image src={ComingSoon} alt='' className='max-w-1/3' />
      </div>
    </div>
  );
};

export default SettingsPage;
