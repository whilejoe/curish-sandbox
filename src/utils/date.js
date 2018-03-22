import moment from 'moment';

export const getMonthYear = timestamp => moment(timestamp).format('MMM YYYY');

export const getMonthDayYear = timestamp => moment(timestamp).format('MMM D, YYYY');

export const getTimeFromNow = timestamp => moment(timestamp).fromNow();
