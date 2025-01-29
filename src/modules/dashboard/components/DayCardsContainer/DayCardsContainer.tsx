'use client';
import { Fragment, useEffect } from 'react';
import { isBefore, parseISO } from 'date-fns';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { DayCard } from '@/dashboard/components';
import { useTypedSelector } from '@/store';
import { usePeriodActions } from '@/dashboard/slices';
import { useAuthUser } from '@/modules/auth';
import { useFetchPeriodsForUserQuery, useUpdatePeriodDocumentMutation } from '@/dashboard/api';
import { Loader } from '@/modules/core';
import { NextArrow, PreviousArrow } from './Arrows';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
};

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
      const isDateEndInPast =
        typeof period.dateEnd === 'string'
          ? isBefore(parseISO(period.dateEnd), new Date())
          : isBefore(period.dateEnd, new Date());

      if (isDateEndInPast) {
        clearPeriodState();
      }
    }
  }, [period?.dateEnd, clearPeriodState]);

  const groupedDays = period?.days?.reduce(
    (groups, day, index) => {
      const groupIndex = Math.floor(index / 10);
      if (!groups[groupIndex]) {
        groups[groupIndex] = [];
      }
      groups[groupIndex].push(day);
      return groups;
    },
    [] as (typeof period.days)[],
  );

  return (
    <div className='w-full relative overflow-hidden'>
      {groupedDays?.map((days, groupIndex) => {
        const cashOnPeriod = days.reduce((sum, day) => sum + day.amountPerDay, 0).toFixed(2);
        const expensesOnPeriod = days
          .reduce(
            (sum, day) =>
              sum + day.expenses.reduce((expenseSum, expense) => expenseSum + expense.price, 0),
            0,
          )
          .toFixed(2);

        let sliderRef: any = null;

        return (
          <Fragment key={groupIndex}>
            <div className='w-full bg-gray-100 p-2 rounded sticky top-0 z-10 flex justify-between items-center'>
              <div>
                <span>
                  Cash on the period: <strong>${cashOnPeriod}</strong>{' '}
                </span>
                <span className='mx-2'> | </span>
                <span>
                  Expenses: <strong>${expensesOnPeriod}</strong>
                </span>
              </div>
              <div className='flex gap-2'>
                <PreviousArrow onClick={() => sliderRef?.slickPrev()} />
                <NextArrow onClick={() => sliderRef?.slickNext()} />
              </div>
            </div>

            <Slider
              ref={(slider: any) => (sliderRef = slider)}
              {...settings}
              className='py-4 !flex'>
              {days.map((day, index) => (
                <DayCard
                  key={`${day.date}`}
                  day={day}
                  dayIndex={groupIndex * 10 + index}
                  onAddExpense={onAddExpense}
                  updateExpenses={onUpdateExpenses}
                />
              ))}
            </Slider>
          </Fragment>
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
