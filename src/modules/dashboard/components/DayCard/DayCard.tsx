'use client';
import { Button, ButtonVariantEnum, InputEmpty } from '@/modules/core';
import classNames from 'classnames';
import { Day, Expense } from '../../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

type DayCardProps = {
  className?: string;
  day: Day;
  onAddExpense: (dayIndex: number, newExpense: Expense) => void;
  dayIndex: number;
  updateExpenses: (
    dayIndex: number,
    expensesIndex: number,
    value: {
      price: number;
      category: string;
    },
  ) => void;
};

const DayCard = ({ className, day, onAddExpense, dayIndex, updateExpenses }: DayCardProps) => {
  const [newExpense, setNewExpense] = useState<{ price: number; category: string }>({
    price: 0,
    category: '',
  });

  const {
    setValue,
    register,
    formState: { errors },
  } = useForm();

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
      {day.expenses.map(({ price, category }, index) => {
        const inputNamePrice = `price-${dayIndex}-${index}`;
        const inputNameCategory = `category-${dayIndex}-${index}`;
        return (
          <div
            key={`${price}-${category}-${index}`}
            className='items-center border-t border-purple-50  grid grid-cols-6'>
            <div className='col-span-2 border-r border-purple-50 py-2 px-1'>
              <InputEmpty
                value={price}
                className='w-full'
                placeholder='Sum'
                type='number'
                {...register(inputNamePrice, { required: true, value: price })}
                onBlur={(e) => {
                  const { value } = e.target as HTMLInputElement;
                  updateExpenses(dayIndex, index, { price, category: value });
                }}
              />
            </div>
            <div className='col-span-4  py-2 px-1'>
              <InputEmpty
                value={category}
                className='w-full'
                placeholder='Category'
                {...register(inputNameCategory, { required: true, value: category })}
                onBlur={(e) => {
                  const { value } = e.target as HTMLInputElement;
                  updateExpenses(dayIndex, index, { price, category: value });
                }}
                onChange={(e) => {
                  const { value } = e.target as HTMLInputElement;
                  setValue(inputNameCategory, value);
                  updateExpenses(dayIndex, index, { price, category: value });
                }}
              />
            </div>
          </div>
        );
      })}

      <div className='border-t border-purple-50'>
        <Button
          text='Add line +'
          variant={ButtonVariantEnum.TEXT}
          className='w-full hover:bg-purple-50 rounded-none rounded-b-md text-xs'
          type='button'
          onClick={handleAddExpense}
        />
      </div>
    </div>
  );
};

export default DayCard;
