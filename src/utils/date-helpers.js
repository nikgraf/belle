/**
 * The function will take a month and year value and will return an array of weeks for that month.
 * Each element in this array will be in-turn an array of days in the week.
 * @param {number} month: the month for which array of weeks is needed
 * @param {number} year: the year for which array of weeks is needed
 * @returns {Array}: Array of weeks in a month, each week is in turn array of days in that week
 */
export function getWeekArrayForMonth(month, year) {
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const weekArray = [];
  let dayCounter = 1;
  for (let index = 1; index <= lastDate; ) {
    const newWeek = [];
    if (index === 1) {
      for (;dayCounter < firstDay; dayCounter++) {
        newWeek.push(undefined);
      }
    }
    for (;dayCounter <= 7 && index <= lastDate; dayCounter++) {
      newWeek.push(index);
      index++;
    }
    for (;dayCounter <= 7; dayCounter++) {
      newWeek.push(undefined);
    }
    dayCounter = 1;
    weekArray.push(newWeek);
  }
  return weekArray;
}

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];


