import {localeData} from '../config/datePicker';

/**
 * The function will take a month and year value and will return an array of weeks for that month.
 * Each element in this array will be in-turn an array of days in the week.
 * @param {number} month: the month for which array of weeks is needed
 * @param {number} year: the year for which array of weeks is needed
 * @param {number} firstDayOfWeek: first day of the week in the locale
 * @returns {Array}: Array of weeks in a month, each week is in turn array of days in that week
 */
export function getWeekArrayForMonth(month, year, firstDayOfWeek) {
  const monthDay = new Date(year, month, 1);
  // Todo: simplify this calculation of first date
  let firstDate = (1 + firstDayOfWeek) - monthDay.getDay();
  firstDate = firstDate <= 1 ? firstDate : firstDate - 7;
  monthDay.setDate(firstDate);
  const lastDate = new Date(year, month + 1, 0);

  const weekArray = [];
  while (monthDay <= lastDate) {
    const newWeek = [];
    for (let dayCounter = 0; dayCounter < 7; dayCounter++) {
      const weekDate = new Date(monthDay.getFullYear(), monthDay.getMonth(), monthDay.getDate());
      newWeek.push(weekDate);
      monthDay.setDate(monthDay.getDate() + 1);
    }
    weekArray.push(newWeek);
  }
  return weekArray;
}

/**
 * Function will return locale data for locale. If data is not available in config files it will return default data.
 * @param locale - locale for which data is needed.
 * @returns {Object}: Object containing locale data.
 */
export function getLocaleData(locale) {
  const localeResult = {};
  let lData;
  if (locale) {
    lData = localeData[locale];
  }
  localeResult.monthNames = (lData && lData.monthNames) ? lData.monthNames : ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  localeResult.dayNamesMin = (lData && lData.dayNamesMin) ? lData.dayNamesMin : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  localeResult.firstDay = (lData && lData.firstDay) ? lData.firstDay : 0;
  localeResult.weekEnd = (lData && lData.weekEnd) ? lData.weekEnd : 0;
  localeResult.isRTL = (lData && lData.isRTL) ? lData.isRTL : false;
  return localeResult;
}

export const TODAY = new Date();

export const CURRENT_DATE = TODAY.getDate();

export const CURRENT_MONTH = TODAY.getMonth();

export const CURRENT_YEAR = TODAY.getFullYear();
