'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.today = exports.convertDateToDateKey = exports.getDateForDateKey = exports.getDateKey = exports.getLocaleData = exports.getLastDayForMonth = exports.getWeekArrayForMonth = undefined;

var _i18n = require('../config/i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * The function will take a month and year value and will return an array of weeks for that month.
 * Each element in this array will be in-turn an array of days in the week.
 * @param {number} month: the month for which array of weeks is needed
 * @param {number} year: the year for which array of weeks is needed
 * @param {number} firstDayOfWeek: first day of the week in the locale
 * @returns {Array}: Array of weeks in a month, each week is in turn array of days in that week
 */
var getWeekArrayForMonth = exports.getWeekArrayForMonth = function getWeekArrayForMonth(month, year, firstDayOfWeek) {
  var monthDay = new Date(year, month, 1);

  // Todo: simplify this calculation of first date
  var firstDate = 1 + firstDayOfWeek - monthDay.getDay();
  firstDate = firstDate <= 1 ? firstDate : firstDate - 7;
  monthDay.setDate(firstDate);
  var lastDate = new Date(year, month + 1, 0);

  var weekArray = [];
  while (monthDay <= lastDate) {
    var newWeek = [];
    for (var dayCounter = 0; dayCounter < 7; dayCounter++) {
      var weekDate = new Date(monthDay.getFullYear(), monthDay.getMonth(), monthDay.getDate());
      newWeek.push(weekDate);
      monthDay.setDate(monthDay.getDate() + 1);
    }

    weekArray.push(newWeek);
  }

  return weekArray;
};

var getLastDayForMonth = exports.getLastDayForMonth = function getLastDayForMonth(year, month) {
  return new Date(year, month + 1, 0);
};

/**
 * Function will return locale data for locale. If data is not available in config files it will return default data.
 * @param locale - locale for which data is needed.
 * @returns {Object}: Object containing locale data.
 */
var getLocaleData = exports.getLocaleData = function getLocaleData(locale) {
  var localeResult = {};
  var lData = void 0;
  if (locale) {
    lData = _i18n2.default.localeData[locale];
  }

  var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  localeResult.monthNames = lData && lData.monthNames ? lData.monthNames : monthNames;
  localeResult.dayNamesMin = lData && lData.dayNamesMin ? lData.dayNamesMin : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  localeResult.firstDay = lData && lData.firstDay ? lData.firstDay : 0;
  localeResult.weekEnd = lData && lData.weekEnd ? lData.weekEnd : 0;
  localeResult.isRTL = lData && lData.isRTL ? lData.isRTL : false;
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
var getDateKey = exports.getDateKey = function getDateKey(year, month, day) {
  return year + '-' + month + '-' + day;
};

/**
 * Returns the date for a date string representation.
 *
 * @param year {number} - any year
 * @param month {number} - can be between 1 and 12
 * @param day {number} - can be between 1 and 31 depending on the month
 * @returns {date} - the parse date
 */
var getDateForDateKey = exports.getDateForDateKey = function getDateForDateKey(dateKey) {
  var splittedDate = dateKey.split('-');
  return new Date(parseInt(splittedDate[0], 10), parseInt(splittedDate[1], 10) - 1, parseInt(splittedDate[2], 10));
};

/**
 * Returns the string representation for a provided date.
 *
 * @param date {date} - a valid date
 * @returns {string}: a string representing the date in the format yyyy-mm-dd
 */
var convertDateToDateKey = exports.convertDateToDateKey = function convertDateToDateKey(date) {
  return getDateKey(date.getFullYear(), date.getMonth() + 1, date.getDate());
};

/**
 * Returns the date of today
 *
 * @returns {date}: today's date
 */
var today = exports.today = function today() {
  return new Date();
};