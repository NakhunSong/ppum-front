import { getDays, getFirstAndLastDay, getPrevYearAndMonth, getNextYearAndMonth } from "lib/helpers/trip/calendar";
import { useEffect, useReducer } from "react";

const initYear = new Date().getFullYear();
const initMonth = new Date().getMonth() + 1;
const initDays = getDays(initYear, initMonth);

const initialState = {
  currentYear: initYear,
  currentMonth: initMonth,
  currentDays: initDays,
  currentFirstDay: null,
  currentLastDay: null,
  prevYear: null,
  prevMonth: null,
  prevDays: null,
  nextYear: null,
  nextMonth: null,
  nextDays: null,
  start: null,
  end: null,
};

function initCalendar(_y, _m) {
  const currentYear = _y;
  const currentMonth = _m;
  const currentDays = getDays(currentYear, currentMonth);
  const {
    firstDay: currentFirstDay,
    lastDay: currentLastDay,
  } = getFirstAndLastDay(currentYear, currentMonth, currentDays);
  const { year: prevYear, month: prevMonth } = getPrevYearAndMonth(currentYear, currentMonth);
  const prevDays = getDays(prevYear, prevMonth);
  const { year: nextYear, month: nextMonth } = getNextYearAndMonth(currentYear, currentMonth);
  const nextDays = getDays(nextYear, nextMonth);
  
  return {
    currentFirstDay,
    currentLastDay,
    prevYear,
    prevMonth,
    prevDays,
    nextYear,
    nextMonth,
    nextDays,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'calendar/INIT': {
      const {
        currentFirstDay,
        currentLastDay,
        prevYear,
        prevMonth,
        prevDays,
        nextYear,
        nextMonth,
        nextDays,
      } = initCalendar(
        state.currentYear,
        state.currentMonth,
      );
      
      return {
        ...state,
        currentFirstDay,
        currentLastDay,
        prevYear,
        prevMonth,
        prevDays,
        nextYear,
        nextMonth,
        nextDays,
      };
    }
    case 'calendar/PREV': {
      const currentYear = state.prevYear;
      const currentMonth = state.prevMonth;
      const currentDays = state.prevDays;
      const {
        currentFirstDay,
        currentLastDay,
        prevYear,
        prevMonth,
        prevDays,
        nextYear,
        nextMonth,
        nextDays,
      } = initCalendar(
        currentYear,
        currentMonth,
      );
      return {
        ...state,
        currentYear,
        currentMonth,
        currentDays,
        currentFirstDay,
        currentLastDay,
        prevYear,
        prevMonth,
        prevDays,
        nextYear,
        nextMonth,
        nextDays,
      };
    }
    case 'calendar/NEXT': {
      const currentYear = state.nextYear;
      const currentMonth = state.nextMonth;
      const currentDays = state.nextDays;
      const {
        currentFirstDay,
        currentLastDay,
        prevYear,
        prevMonth,
        prevDays,
        nextYear,
        nextMonth,
        nextDays,
      } = initCalendar(
        currentYear,
        currentMonth,
      );
      return {
        ...state,
        currentYear,
        currentMonth,
        currentDays,
        currentFirstDay,
        currentLastDay,
        prevYear,
        prevMonth,
        prevDays,
        nextYear,
        nextMonth,
        nextDays,
      };
    }
    case 'SELECT_DATE': {}
    default: return state;
  }
}

export function useCalendar() {
  const [calendar, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: 'calendar/INIT' });
  }, []);
  
  return [calendar, dispatch];
}