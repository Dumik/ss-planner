'use client';
import { useState } from 'react';
import { InterfaceData } from '../../types';
import DayCard from '../DayCard/DayCard';

const DayCardsContainer = () => {
  const interfaceData: InterfaceData = {
    days: [
      {
        date: '2020/12/12',
        day: 'monday',
        amountPerDay: 400,
        expenses: [
          {
            price: 40,
            category: 'atb0',
          },
        ],
      },

      {
        date: '2020/12/12',
        day: 'tuesday',
        amountPerDay: 400,
        expenses: [],
      },
      {
        date: '2020/12/12',
        day: 'Wednesday',
        amountPerDay: 400,
        expenses: [
          {
            price: 40,
            category: 'atb1',
          },
          {
            price: 40,
            category: 'atb2',
          },
        ],
      },
    ],
  };
  const onAddExpense = (dayIndex: number, newExpense: { price: number; category: string }) => {
    interfaceData.days[dayIndex].expenses.push(newExpense);
  };

  const updateExpenses = (
    dayIndex: number,
    expensesIndex: number,
    value: { price: number; category: string },
  ) => {
    console.log('%c jordan value', 'color: lime;', value);
    interfaceData.days[dayIndex].expenses[expensesIndex] = value;
  };

  return (
    <div className='grid grid-cols-5 gap-3 items-start'>
      {interfaceData.days.map((item, index) => {
        return (
          <DayCard
            key={item.date}
            className='col-span-1'
            day={item}
            dayIndex={index}
            onAddExpense={onAddExpense}
            updateExpenses={updateExpenses}
          />
        );
      })}
    </div>
  );
};

export default DayCardsContainer;
