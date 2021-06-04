export interface DateParam {
  year: number;
  month: number;
}

export function getDays(year: number, month: number): number {
  const isLeapYear = year % 4 === 0;
  const isEvenMonth = month % 2 === 0;
  const days = isEvenMonth
    ? month === 2
      ? isLeapYear ? 29 : 28
      : 30
    : 31;
  return days;
}

export function getFirstAndLastDay(year: number, month: number, days: number) {
  const firstDay = new Date(`${year} ${month} 1`).getDay();
  const lastDay = (days + firstDay) % 7 - 1;
  return { firstDay, lastDay };
}

export function getPrevYearAndMonth(y, m): DateParam {
  const year = y - 1 >= 0 ? y -1 : 0;
  const month = m - 1 || 12;
  return { year, month };
}

export function getNextYearAndMonth(y, m): DateParam {
  const year = y + 1;
  const month = m + 1 % 13 || 1;
  return { year, month };
}
