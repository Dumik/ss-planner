'use client';
import { Fragment, useEffect } from 'react';
import { isBefore, parseISO } from 'date-fns';

import { DayCard } from '@/dashboard/components';
import { useTypedSelector } from '@/store';
import { usePeriodActions } from '@/dashboard/slices';
import { useAuthUser } from '@/modules/auth';
import { useFetchPeriodsForUserQuery, useUpdatePeriodDocumentMutation } from '@/dashboard/api';
import { Loader } from '@/modules/core';

const DayCardsContainer = () => {
  const { user } = useAuthUser();

  const { period } = useTypedSelector((state) => state.period);
  const { accessToken } = useTypedSelector((state) => state.auth);
  const { addPeriodExpense, updateExpenses, setPeriod, clearPeriodState } = usePeriodActions();

  const { data, isFetching, isLoading } = useFetchPeriodsForUserQuery(user?.uid);
  const [updatePeriodMutation] = useUpdatePeriodDocumentMutation();

  const onAddExpense = (dayIndex: number, newExpense: { price: number; category: string }) => {
    addPeriodExpense({ newExpense: { ...newExpense, dayIndex } });
    updatePeriodMutation({ documentId: data?.docId || '', newData: period });
  };

  const onUpdateExpenses = (
    dayIndex: number,
    expenseIndex: number,
    value: { price: number; category: string },
  ) => {
    updateExpenses({ expense: { ...value, dayIndex, expenseIndex } });
    updatePeriodMutation({ documentId: data?.docId || '', newData: period });
  };

  useEffect(() => {
    if (data?.period.amountOnPeriod && !period.amountOnPeriod && accessToken && !isFetching) {
      setPeriod({ period: data?.period });
    }
  }, [data?.period.amountOnPeriod, period.amountOnPeriod, isFetching]);

  useEffect(() => {
    if (period?.dateEnd) {
      const isDateEndInPast = isBefore(parseISO(period.dateEnd), new Date());
      if (isDateEndInPast) {
        clearPeriodState();
      }
    }
  }, [period?.dateEnd, clearPeriodState]);

  return (
    <div className='grid grid-cols-3 gap-3 items-start xl:grid-cols-5 md:grid-cols-6 sm:grid-cols-4 w-full'>
      {period?.days?.map((item, index) => {
        if (index % 7 === 0) {
          const endIndex = Math.min(index + 7, period?.days?.length);

          return (
            <Fragment key={`${index}-header${item.date}`}>
              <div className='col-span-5 md:col-span-6 xl:col-span-5 w-full bg-gray-100 p-1 rounded'>
                Cash on the period:{' '}
                <span className='font-bold'>
                  {period?.days
                    ?.slice(index, endIndex)
                    .reduce((sum, day) => sum + day.amountPerDay, 0)
                    .toFixed(2)}
                </span>{' '}
                <span className='mx-2'> | </span> Expenses:{' '}
                <span className='font-bold'>
                  {period?.days
                    ?.slice(index, endIndex)
                    .reduce(
                      (sum, day) =>
                        sum + day.expenses.reduce((sum, expense) => sum + expense.price, 0),
                      0,
                    )
                    .toFixed(2)}
                </span>
              </div>
              <DayCard
                key={item.date}
                className='xl:col-span-1 sm:col-span-2 col-span-5'
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
            className='xl:col-span-1 sm:col-span-2 col-span-5'
            day={item}
            dayIndex={index}
            onAddExpense={onAddExpense}
            updateExpenses={onUpdateExpenses}
          />
        );
      })}

      {(isLoading || isFetching) && !data?.period.amountOnPeriod && (
        <div className='flex justify-center w-screen'>
          <Loader color='#4C1FA7' style={{ width: '60px' }} />
        </div>
      )}
    </div>
  );
};

export default DayCardsContainer;
