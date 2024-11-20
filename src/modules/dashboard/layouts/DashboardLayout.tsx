'use client';

import { Header } from '@/modules/core';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col justify-between'>
      <Header />
      <div className='flex justify-center min-h-screen mt-16'>
        <div className='max-w-[1400px] w-full'>{children}</div>
      </div>
      <div className='w-full  text-gray-900 py-6 mt-10 border-t '>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center'>
          <div className='flex items-center space-x-3'>
            <span className='text-xl font-semibold'>Smart Spender</span>
          </div>

          <div className='mt-4 md:mt-0 text-sm text-center'>
            <p>&copy; 2024 Smart Spender. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
