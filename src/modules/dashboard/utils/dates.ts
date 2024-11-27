import { differenceInCalendarDays, isValid } from 'date-fns';

export const getDaysBetweenDates = (startDate?: Date, endDate?: Date): number | null => {
  if (startDate && endDate && isValid(startDate) && isValid(endDate)) {
    return differenceInCalendarDays(endDate, startDate) + 1;
  }
  return null;
};
