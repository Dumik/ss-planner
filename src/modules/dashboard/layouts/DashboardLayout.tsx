'use client';
import { Header } from '@/modules/core';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className='flex justify-center'>
        <div className='max-w-[1400px] w-full'>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
