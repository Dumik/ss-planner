'use client';

import { Sidebar } from '@/modules/core';
import { useTypedSelector } from '@/store';
import classNames from 'classnames';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { isSidebarCollapse } = useTypedSelector((state) => state.manual);

  return (
    <div className='flex flex-col h-screen !overflow-x-hidden'>
      <div className='flex flex-1 z-50'>
        <Sidebar />
        <main
          className={classNames(
            'flex-1 flex justify-center overflow-x-hidden',

            isSidebarCollapse ? 'pl-20' : 'pl-64',
          )}>
          <div className='max-w-[2000px] w-full p-4 z-0'>{children}</div>
        </main>
      </div>
      <footer
        className={classNames(
          'w-full text-gray-900 py-6 border-t',
          isSidebarCollapse ? 'ml-0' : 'ml-20',
        )}>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center'>
          <div className='flex items-center space-x-3'>
            <span className='text-xl font-semibold'>Smart Spender</span>
          </div>
          <div className='mt-4 md:mt-0 text-sm text-center'>
            <p>&copy; 2024 Smart Spender. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
