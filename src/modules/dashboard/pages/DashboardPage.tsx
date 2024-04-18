'use client';
import { Button, Input } from '@/modules/core';
import ToolBar from '../components/ToolBar/ToolBar';

const DashboardPage = () => {
  return (
    <div className='flex gap-7 flex-col p-5'>
      <div className='!w-50 flex gap-7'>
        <Button variant='filled' text='Save' size='medium' className='w-50' />
        <Button variant='outline' text='Save' size='large' className='w-50' />
      </div>
      <div className='w-30 flex gap-7'>
        <Input />
      </div>
      <ToolBar />
    </div>
  );
};

export default DashboardPage;
