'use client';

import { DayCard } from '@/dashboard/components';
import { useTypedSelector } from '@/store';
import { usePeriodActions } from '@/dashboard/slices';
import { Fragment } from 'react';

const DayCardsContainer = () => {
  const { period } = useTypedSelector((state) => state.period);
  const { addPeriodExpense, updateExpenses } = usePeriodActions();

  const onAddExpense = (dayIndex: number, newExpense: { price: number; category: string }) => {
    addPeriodExpense({ newExpense: { ...newExpense, dayIndex } });
  };

  const onUpdateExpenses = (
    dayIndex: number,
    expenseIndex: number,
    value: { price: number; category: string },
  ) => {
    updateExpenses({ expense: { ...value, dayIndex, expenseIndex } });
  };

  return (
    <div className='grid grid-cols-5 gap-3 items-start'>
      {period.days.map((item, index) => {
        if ((index + 1) % 6 === 0 || index === 0) {
          return (
            <Fragment key={`${index}-header`}>
              <div className='col-span-5 w-full bg-purple-50 p-1 rounded'>
                Cash on the period: {item.amountPerDay * 5}{' '}
              </div>
              <DayCard
                key={item.date}
                className='col-span-1'
                day={item}
                dayIndex={index}
                onAddExpense={onAddExpense}
                updateExpenses={onUpdateExpenses}
              />
            </Fragment>
          );
        }
        return (
          <DayCard
            key={item.date}
            className='col-span-1'
            day={item}
            dayIndex={index}
            onAddExpense={onAddExpense}
            updateExpenses={onUpdateExpenses}
          />
        );
      })}
    </div>
  );
};

export default DayCardsContainer;
