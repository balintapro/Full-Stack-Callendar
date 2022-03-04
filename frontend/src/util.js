import dayjs from 'dayjs';

export function getMonth(month = dayjs().month()) {

  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 0)).day();

  let currentMonthCount = 0 - firstDayOfTheMonth - 7;

  const daysMatrix = new Array(6).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });

  return daysMatrix;
}
