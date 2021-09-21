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
  const month = m - 1 || 12;
  const year = month === 12 ? y -1 : y;
  return { year, month };
}

export function getNextYearAndMonth(y, m): DateParam {
  const month = (m + 1) % 13 || 1;
  const year = month === 1 ? y + 1 : y;
  return { year, month };
}

export function combineDateInfo(y, m, d) {
  if (!(y && m && d)) return new Date()
  return new Date(`${y}-${m}-${d}`)
}

export function addZeroToOneDigit(num: number) {
  return `${num / 10 < 1 ? '0' : ''}${num}`
}
