/**
 * The function will take a month and year value and will return an array of weeks for that month.
 * Each element in this array will be in-turn an array of days in the week.
 * @param {number} month: the month for which array of weeks is needed
 * @param {number} year: the year for which array of weeks is needed
 * @returns {Array}: Array of weeks in a month, each week is in turn array of days in that week
 */
export function getWeekArrayForMonth(month, year) {
  const monthDay = new Date(year, month, 1);
  monthDay.setDate(monthDay.getDate() - monthDay.getDay());
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

export const TODAY = new Date();

export const CURRENT_DATE = TODAY.getDate();

export const CURRENT_MONTH = TODAY.getMonth();

export const CURRENT_YEAR = TODAY.getFullYear();
