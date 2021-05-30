export interface DateInfoParam {
  month: number;
  year: number;
}

export class Calendar {
  currentYear: number;
  currentMonth: number;
  currentDays: number;
  currentFirstDay: number;
  currentLastDay: number;
  prevYear: number;
  prevMonth: number;
  prevDays: number;
  nextYear: number;
  nextMonth: number;
  nextDays: number;
  
  constructor() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const days = this.getDays(year, month);
    this.currentYear = year;
    this.currentMonth = month;
    this.currentDays = days;
    this.init();
  }

  getDays(year: number, month: number): number {
    const isLeapYear = year % 4 === 0;
    const isEvenMonth = month % 2 === 0;
    const days = isEvenMonth
      ? month === 2
        ? isLeapYear ? 29 : 28
        : 30
      : 31;
    return days;
  }
  setFirstAndLastDay() {
    const firstDate = `${this.currentYear} ${this.currentMonth} 1`;
    const firstDay = new Date(firstDate).getDay();
    const lastDay = (this.currentDays + firstDay) % 7 - 1;
    this.currentFirstDay = firstDay;
    this.currentLastDay = lastDay;
  }
  getPrev(): DateInfoParam {
    const year = this.currentYear - 1 >= 0 ? this.currentYear -1 : 0;
    const month = this.currentMonth - 1 || 12;
    return { year, month };
  }
  getNext(): DateInfoParam {
    const year = this.currentYear + 1;
    const month = this.currentMonth + 1 % 13 || 1;
    return { year, month };
  }
  setDateInfo({ context, year, month }) {
    this[`${context}Year`] = year;
    this[`${context}Month`] = month;
    this[`${context}Days`] = this.getDays(year, month);
  }

  init() {
    this.setFirstAndLastDay();
    const { year: prevYear, month: prevMonth } = this.getPrev();
    const { year: nextYear, month: nextMonth } = this.getNext();
    this.setDateInfo({
      context: 'prev',
      year: prevYear,
      month: prevMonth,
    });
    this.setDateInfo({
      context: 'next',
      year: nextYear,
      month: nextMonth,
    });
  }
}