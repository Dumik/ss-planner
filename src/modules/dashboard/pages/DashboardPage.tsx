'use client';
import { PhotoBanner } from '@/modules/core';
import ToolBar from '../components/ToolBar/ToolBar';
import { DayCardsContainer } from '../components';

const DashboardPage = () => {
  return (
    <div className='flex gap-7 flex-col p-5 !h-full'>
      <PhotoBanner />
      <ToolBar />
      <DayCardsContainer />
    </div>
  );
};

export default DashboardPage;
