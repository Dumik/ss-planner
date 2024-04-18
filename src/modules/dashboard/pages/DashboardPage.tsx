'use client';
import { Button, Input } from '@/modules/core';
import { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const DashboardPage = () => {
  console.log(
    '%c jordan TRIGGERED',
    'color: orange; font-weight: bold; font-size: 16px; text-transform: uppercase',
  );
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const onDatesChange = ({ startDate, endDate }) => {
    setDateFrom(startDate);
    setDateTo(endDate);
  };
  const [focusedInput, setFocusedInput] = useState(false);

  return (
    <div className='flex gap-7 flex-col p-5'>
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
      <div className='!w-50 flex gap-7'>
        <Button variant='filled' text='Save' size='medium' className='w-50' />
        <Button variant='outline' text='Save' size='large' className='w-50' />
      </div>
      <div className='w-30 flex gap-7'>
        <Input />
      </div>
    </div>
  );
};

export default DashboardPage;
