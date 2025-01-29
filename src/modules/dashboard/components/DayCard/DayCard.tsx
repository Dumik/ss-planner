'use client';
import {
  Autocomplete,
  Button,
  ButtonSizeEnum,
  ButtonVariantEnum,
  InputEmpty,
} from '@/modules/core';
import classNames from 'classnames';
import { Day, Expense } from '../../types';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type DayCardProps = {
  className?: string;
  day: Day;
  onAddExpense: (dayIndex: number, newExpense: Expense) => void;
  dayIndex: number;
  updateExpenses: (
    dayIndex: number,
    expenseIndex: number,
    value: {
      price: number;
      category: string;
    },
  ) => void;
};

const DayCard = ({ className, day, onAddExpense, dayIndex, updateExpenses }: DayCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newExpense, setNewExpense] = useState<{ price: number; category: string }>({
    price: 0,
    category: '',
  });

  const {
    setValue,
    getValues,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const handleAddExpense = () => {
    onAddExpense(dayIndex, newExpense);
    setNewExpense({ price: 0, category: '' });
  };

  const totalAmount = day.expenses.reduce((total, expense) => total + expense.price, 0);

  return (
    <div
      className={classNames(
        'w-full rounded-lg shadow-md bg-white h-full flex flex-col justify-between',
        className,
      )}>
      <div>
        <div className=' max-h-8 flex justify-between items-center px-4 py-2 bg-gray-50 text-gray-700 rounded-t-lg'>
          <span className='font-semibold text-sm'>{`${day.date}`}</span>
          <span className='text-xs text-gray-500'>Budget: {day.amountPerDay.toFixed(2)}</span>
        </div>

        {!day.expenses.length && (
          <div className='flex justify-center items-center py-4 text-gray-500'>
            <span className='text-sm'>No expenses for this day</span>
          </div>
        )}

        {day.expenses.map(({ price, category }, index) => {
          console.log('%c jordan category', 'color: lime;', category);
          const inputNamePrice = `price-${dayIndex}-${index}`;
          const inputNameCategory = `category-${dayIndex}-${index}`;

          return (
            <div
              key={`${price}-${category}-${day.date}`}
              className='grid grid-cols-6 items-center gap-2 px-4 py-2 border-b last:border-none'>
              <div className='col-span-2'>
                <InputEmpty
                  value={isEditing ? watch(inputNamePrice) : watch(inputNamePrice) || price}
                  className='w-full text-sm p-2 rounded border-gray-300 focus:ring focus:ring-indigo-200'
                  placeholder='Sum'
                  type='number'
                  {...register(inputNamePrice, { required: true, value: price })}
                  onBlur={() => {
                    const values = getValues();
                    updateExpenses(dayIndex, index, { price: +values[inputNamePrice], category });
                    setIsEditing(false);
                    reset();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const values = getValues();
                      updateExpenses(dayIndex, index, { price: +values[inputNamePrice], category });
                      setIsEditing(false);
                      reset();
                    }
                  }}
                  onChange={(e) => {
                    const { value } = e.target as HTMLInputElement;
                    setValue(inputNamePrice, value);
                    setIsEditing(true);
                  }}
                />
              </div>
              <div className='col-span-4 relative'>
                <Autocomplete
                  value={
                    isEditing ? watch(inputNameCategory) : watch(inputNameCategory) || category
                  }
                  className='w-full text-sm p-2 rounded border-gray-300 focus:ring focus:ring-indigo-200'
                  placeholder='Category'
                  {...register(inputNameCategory, { required: true, value: category })}
                  onBlur={(e: any) => {
                    const { value } = e.target as HTMLInputElement;
                    updateExpenses(dayIndex, index, { price, category: value });
                    setIsEditing(false);
                    reset();
                  }}
                  onKeyDown={(e: any) => {
                    if (e.key === 'Enter') {
                      const { value } = e.target as HTMLInputElement;
                      updateExpenses(dayIndex, index, { price, category: value });
                      setIsEditing(false);
                      reset();
                    }
                  }}
                  onChange={(e: any) => {
                    const { value } = e.target as HTMLInputElement;
                    setValue(inputNameCategory, value);
                    setIsEditing(true);
                  }}
                  //@ts-ignore
                  onSelect={(value: string) => setValue(inputNameCategory, value)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div>
        {!!totalAmount && (
          <div className='flex justify-between items-center px-4 py-2 bg-gray-50 text-gray-700 max-h-10'>
            <span
              className={classNames('font-semibold text-base', {
                'text-red-600': totalAmount > day.amountPerDay,
                'text-green-600': totalAmount < day.amountPerDay,
              })}>
              Total: {totalAmount.toFixed(2)}
            </span>
          </div>
        )}

        <div className='px-4 py-2'>
          <Button
            text='Add Expense +'
            variant={ButtonVariantEnum.FILLED}
            className='w-full text-sm py-2'
            type='button'
            onClick={handleAddExpense}
            size={ButtonSizeEnum.SMALL}
            isDisabled={day.expenses.some(
              (item, index) => index === day.expenses.length - 1 && item.price === 0,
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default DayCard;
