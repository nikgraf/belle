import i18n from '../config/i18n';

/**
 * The function will take a month and year value and will return an array of weeks for that month.
 * Each element in this array will be in-turn an array of days in the week.
 * @param {number} month: the month for which array of weeks is needed
 * @param {number} year: the year for which array of weeks is needed
 * @param {number} firstDayOfWeek: first day of the week in the locale
 * @returns {Array}: Array of weeks in a month, each week is in turn array of days in that week
 */
export const getWeekArrayForMonth = (month, year, firstDayOfWeek) => {
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
};

export const getLastDayForMonth = (year, month) => new Date(year, month + 1, 0);

/**
 * Function will return locale data for locale. If data is not available in config files it will return default data.
 * @param locale - locale for which data is needed.
 * @returns {Object}: Object containing locale data.
 */
export const getLocaleData = (locale) => {
  const localeResult = {};
  let lData;
  if (locale) {
    lData = i18n.localeData[locale];
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
  ];

  localeResult.monthNames = (lData && lData.monthNames) ? lData.monthNames : monthNames;
  localeResult.dayNamesMin = (lData && lData.dayNamesMin) ? lData.dayNamesMin : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  localeResult.firstDay = (lData && lData.firstDay) ? lData.firstDay : 0;
  localeResult.weekEnd = (lData && lData.weekEnd) ? lData.weekEnd : 0;
  localeResult.isRTL = (lData && lData.isRTL) ? lData.isRTL : false;
  return localeResult;
};

/**
 * Returns the string representation for a provided year, month & day.
 *
 * @param year {number} - any year
 * @param month {number} - can be between 1 and 12
 * @param day {number} - can be between 1 and 31 depending on the month
 * @returns {string}: a string representing the date in the format yyyy-mm-dd
 */
export const getDateKey = (year, month, day) => `${year}-${month}-${day}`;

/**
 * Returns the date for a date string representation.
 *
 * @param year {number} - any year
 * @param month {number} - can be between 1 and 12
 * @param day {number} - can be between 1 and 31 depending on the month
 * @returns {date} - the parse date
 */
export const getDateForDateKey = (dateKey) => {
  const splittedDate = dateKey.split('-');
  return new Date(parseInt(splittedDate[0], 10), parseInt(splittedDate[1], 10) - 1, parseInt(splittedDate[2], 10));
};

/**
 * Returns the string representation for a provided date.
 *
 * @param date {date} - a valid date
 * @returns {string}: a string representing the date in the format yyyy-mm-dd
 */
export const convertDateToDateKey = (date) => (
  getDateKey(date.getFullYear(), date.getMonth() + 1, date.getDate())
);

/**
 * Returns the date of today
 *
 * @returns {date}: today's date
 */
export const today = () => new Date();
