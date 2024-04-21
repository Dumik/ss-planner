import moment from 'moment';

export const getDaysBetweenDates = (startDate?: moment.Moment, endDate?: moment.Moment): number => {
  if (endDate && endDate) {
    return moment(endDate).diff(moment(startDate), 'days') + 1;
  }
  return 0;
};
