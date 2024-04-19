'use client';
import { Button, ButtonVariantEnum, InputEmpty } from '@/modules/core';
import classNames from 'classnames';
import { Day } from '../../types';
import { useState } from 'react';

type DayCardProps = {
  className?: string;
  day: Day;
  onAddExpense: (dayIndex: number, newExpense: { price: number; category: string }) => void;
  dayIndex: number;
};
const DayCard = ({ className, day, onAddExpense, dayIndex }: DayCardProps) => {
  const [newExpense, setNewExpense] = useState<{ price: number; category: string }>({
    price: 0,
    category: '',
  });

  const handleAddExpense = () => {
    onAddExpense(dayIndex, newExpense);
    setNewExpense({ price: 0, category: '' });
  };
  return (
    <div className={classNames('w-full border-2 border-purple-50 rounded-md', className)}>
      <span className='flex justify-center items-center p-2 font-semibold text-sm bg-purple-50/50 text-purple-950 uppercase'>
        {`${day.day} - ${day.amountPerDay}`}
      </span>
      {!day.expenses.length && (
        <div className='flex justify-center items-center h-12'>
          <span className='font-semibold text-xs text-purple-950'>No costs today</span>
        </div>
      )}
      {day.expenses.map(({ price, category }) => {
        return (
          <div
            key={`${price}-${category}`}
            className='items-center border-t border-purple-50  grid grid-cols-6'>
            <div className='col-span-2 border-r border-purple-50 py-2 px-1'>
              <InputEmpty className='w-full' placeholder='Sum' type='number' />
            </div>
            <div className='col-span-4  py-2 px-1'>
              <InputEmpty className='w-full' placeholder='Category' />
            </div>
          </div>
        );
      })}

      <div className='border-t border-purple-50'>
        <Button
          text='Add line +'
          variant={ButtonVariantEnum.TEXT}
          className='w-full hover:bg-purple-50 rounded-none rounded-b-md text-xs'
          onClick={handleAddExpense}
        />
      </div>
    </div>
  );
};

export default DayCard;
