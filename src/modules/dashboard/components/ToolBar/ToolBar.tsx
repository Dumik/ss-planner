'use client';
import { useId, useState, useEffect } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import moment from 'moment';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { Button, ButtonVariantEnum, DialogWrapper, Input } from '@/modules/core';
import { usePeriodActions } from '@/modules/dashboard/slices';
import { PeriodType } from '@/modules/dashboard/types';
import { useTypedSelector } from '@/store';
import { getDaysBetweenDates, getTotalPeriodAmount } from '@/dashboard/utils';
import { useAuthUser } from '@/modules/auth';
import {
  useDeletePeriodDocumentMutation,
  useFetchPeriodsForUserQuery,
  useSavePeriodToFirestoreMutation,
} from '@/dashboard/api';
import classNames from 'classnames';

const ToolBar = () => {
  const { user } = useAuthUser();
  const { period } = useTypedSelector((state) => state.period);
  const { setPeriod, resetPeriod } = usePeriodActions();

  const [createPeriod] = useSavePeriodToFirestoreMutation();
  const [deletePeriod] = useDeletePeriodDocumentMutation();
  const { data, refetch } = useFetchPeriodsForUserQuery(user?.uid);

  const randomId = useId();

  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);
  const [dateFrom, setDateFrom] = useState<moment.Moment | null>(
    (period?.dateStart && moment(period?.dateStart)) || null,
  );
  const [dateTo, setDateTo] = useState<moment.Moment | null>(
    (period?.dateEnd && moment(period?.dateEnd)) || null,
  );
  const [amount, setAmount] = useState<string | number>(period?.amountOnPeriod || '');
  const [errors, setErrors] = useState<{ amount?: boolean }>();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const [isDateError, setIsDateError] = useState('');

  const totalAmount = getTotalPeriodAmount(period);
  const daysBetweenDates = getDaysBetweenDates(
    dateFrom || moment(period?.dateStart),
    dateTo || moment(period?.dateEnd),
  );

  const isDateInPast = dateFrom?.isBefore(moment(), 'day');

  const onDatesChange = ({
    startDate,
    endDate,
  }: {
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }) => {
    if (isDateInPast) {
      setIsDateError('Start date cannot be in the past');
    }

    if (!isDateInPast) {
      setIsDateError('');
    }

    setDateFrom(startDate);
    setDateTo(endDate);
  };

  const handleConfirm = () => {
    const datesBetween: moment.Moment[] | null =
      dateTo && dateFrom
        ? Array.from({ length: daysBetweenDates! }, (_, index) =>
            moment(dateFrom).add(index, 'days'),
          )
        : null;

    if (+amount < 1) {
      setErrors({ amount: true });
      return;
    }

    if (daysBetweenDates! < 5) {
      setIsDateError('Minimum 5 days');
      return;
    }
    if (daysBetweenDates! > 31) {
      setIsDateError('Max 31 days');
      return;
    }

    const periodData: PeriodType = {
      id: randomId,
      amountOnPeriod: +amount,
      dateStart: dateFrom!.format('YYYY/MM/DD'),
      dateEnd: dateTo!.format('YYYY/MM/DD'),
      period:
        datesBetween &&
        `${datesBetween[0].format('YYYY/MM/DD')}-${datesBetween[datesBetween?.length - 1].format('YYYY/MM/DD')}`,
      days: [...Array(daysBetweenDates)].map((_, index) => {
        return {
          date: datesBetween ? datesBetween[index].format('MM/DD') : '',
          day: datesBetween ? datesBetween[index].format('dddd') : '',
          amountPerDay: +(+amount / daysBetweenDates!)?.toFixed(1) || 0,
          expenses: [],
        };
      }),
    };

    setPeriod({ period: periodData });
    createPeriod({ periodData, userId: user?.uid });
    setIsOpenDialog(false);
  };

  const handleResetPeriod = () => {
    setDateTo(null);
    setDateFrom(null);
    setAmount('');
    deletePeriod({ documentId: data?.docId || '' });
    resetPeriod();
    refetch();
    setIsOpenDialog(false);
  };

  //META: Init dates
  useEffect(() => {
    if (period?.dateStart && !dateFrom) {
      setDateFrom(moment(period?.dateStart));
    }
    if (period?.dateEnd && !dateTo) {
      setDateTo(moment(period?.dateEnd));
    }
  }, [dateFrom, dateTo, period?.dateEnd, period?.dateStart]);

  const isMobile = window.innerWidth < 700;

  return (
    <div className='flex flex-col w-full gap-4 p-4 rounded-md border-2 border-purple-700 justify-between xl:flex-row'>
      <div className='flex justify-center items-center w-full xl:justify-start'>
        {period.amountOnPeriod && totalAmount >= 0 && daysBetweenDates ? (
          <div className='flex gap-2 flex-col sm:flex-row items-center justify-center xl:items-start xl:justify-start sm:w-full sm:text-center'>
            <span className='text-xl font-medium text-nowrap sm:!text-center'>
              Period -{' '}
              <span className='text-xl font-medium text-purple-950'>
                {daysBetweenDates + ' days, '}
              </span>
            </span>
            <span className='text-xl font-medium text-nowrap  sm:!text-center'>
              Total expenses -{' '}
              <span className='text-xl font-medium text-purple-950'>{totalAmount}$</span>
            </span>
          </div>
        ) : (
          <span className='text-xl font-medium'>
            Select the days and amount on the period:{' '}
            <span className='text-xl font-medium text-purple-950'>
              {daysBetweenDates! > 1 ? daysBetweenDates + ' days' : ''}
            </span>
          </span>
        )}
      </div>
      <div className='flex flex-col gap-3 justify-center tablet:flex-row w-full xl:justify-end'>
        <div className='w-full relative'>
          <span className='absolute bottom-full text-red-500 text-xs'>{isDateError}</span>
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
            disabled={!!period?.dateStart && !!period?.dateEnd}
            isDayBlocked={(date) => date.isBefore(moment(), 'day')}
            orientation={isMobile ? 'vertical' : 'horizontal'}
          />
        </div>
        <div className='flex gap-3 w-full'>
          <Input
            value={period?.amountOnPeriod || amount}
            type='number'
            onChange={(e) => setAmount(e.target.value)}
            error={errors?.amount ? 'Enter the amount' : ''}
            disabled={!!period?.amountOnPeriod}
            className='xl:!w-auto !w-full'
            fullWith
          />
          {period.amountOnPeriod ? (
            <DialogWrapper
              isOpen={isOpenDialog}
              onOpenChange={(isOpen) => setIsOpenDialog(isOpen)}
              className='w-full'
              openElement={
                <span
                  className={classNames(
                    'border border-purple-700 text-purple-700',
                    ' hover:bg-purple-700 hover:text-white flex items-center justify-center min-w-32',
                    'rounded-md text-center font-bold transition duration-300 h-12',
                  )}>
                  Reset Period
                </span>
              }>
              <div className='w-full flex flex-col justify-center items-center p-4 gap-10'>
                <span className=' w-full text-xl font-semibold text-center'>
                  Do you really wont to reset period?
                </span>
                <div className='flex flex-col justify-center items-center gap-4 w-full sm:flex-row'>
                  <Button
                    variant={ButtonVariantEnum.OUTLINE}
                    text='Confirm'
                    onClick={handleResetPeriod}
                    fullWith
                  />
                  <Button
                    variant={ButtonVariantEnum.FILLED}
                    text='Cancel'
                    className='min-w-52 w-full'
                    onClick={() => {
                      setIsOpenDialog(false);
                    }}
                    fullWith
                  />
                </div>
              </div>
            </DialogWrapper>
          ) : (
            <Button
              variant={ButtonVariantEnum.FILLED}
              text='Generate'
              className='xl:!w-50'
              onClick={handleConfirm}
              isDisabled={!dateTo || !dateFrom || !amount || !!isDateError}
              fullWith
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
