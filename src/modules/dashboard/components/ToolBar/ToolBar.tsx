'use client';
import { useState } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { Button, ButtonVariantEnum, Input } from '@/modules/core';
import moment from 'moment';

const ToolBar = () => {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);
  const [dateFrom, setDateFrom] = useState<moment.Moment | null>(null);
  const [dateTo, setDateTo] = useState<moment.Moment | null>(null);
  const [amount, setAmount] = useState<string>('');

  const onDatesChange = ({
    startDate,
    endDate,
  }: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    setDateFrom(startDate);
    setDateTo(endDate);
  };
  const daysBetweenDates = dateTo && dateFrom ? dateTo.diff(dateFrom, 'days') + 1 : 0;

  const handleConfirm = () => {
    const datesBetween: moment.Moment[] | null =
      dateTo && dateFrom
        ? Array.from({ length: daysBetweenDates }, (_, index) =>
            moment(dateFrom).add(index, 'days'),
          )
        : null;

    const periodData = {
      period:
        datesBetween &&
        `${datesBetween[0].format('YYYY/MM/DD')}-${datesBetween[datesBetween?.length - 1].format('YYYY/MM/DD')}`,
      days: [...Array(daysBetweenDates)].map((_, index) => {
        return {
          date: datesBetween && datesBetween[index].format('YYYY/MM/DD'),
          day: datesBetween && datesBetween[index].format('dddd'),
          amountPerDay: (+amount / daysBetweenDates)?.toFixed(1),
          expenses: [],
        };
      }),
    };
    console.log('%c jordan periodData', 'color: lime;', periodData);
  };

  return (
    <div className='flex w-full p-3 rounded-md border-2 border-purple-700 justify-between'>
      <div className='flex justify-center items-center'>
        <span className='text-xl font-medium'>
          Select the days and amount on the period:{' '}
          <span className='text-xl font-medium text-purple-950'>
            {daysBetweenDates ? daysBetweenDates + ' days' : ''}
          </span>
        </span>
      </div>
      <div className='flex gap-3'>
        <DateRangePicker
          startDate={dateFrom}
          startDateId='start_date_id'
          endDate={dateTo}
          endDateId='end_date_id'
          onDatesChange={onDatesChange}
          focusedInput={focusedInput ? focusedInput : null}
          onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
          showClearDates={true}
          hideKeyboardShortcutsPanel={true}
          isOutsideRange={() => false}
          startDatePlaceholderText='Date from'
          endDatePlaceholderText='Date to'
          customArrowIcon='—'
        />
        <Input value={amount} type='number' onChange={(e) => setAmount(e.target.value)} />
        <Button
          variant={ButtonVariantEnum.FILLED}
          text='Save'
          className='w-50'
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
};

export default ToolBar;
