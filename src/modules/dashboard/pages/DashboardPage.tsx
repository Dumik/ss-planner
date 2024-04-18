'use client';
import { Button, DialogWrapper, Input, PhotoBanner } from '@/modules/core';
import ToolBar from '../components/ToolBar/ToolBar';

const DashboardPage = () => {
  return (
    <div className='flex gap-7 flex-col p-5'>
      <PhotoBanner />
      <ToolBar />
    </div>
  );
};

export default DashboardPage;
