import { getDays, getFirstAndLastDay, getPrevYearAndMonth, getNextYearAndMonth } from "lib/helpers/trip/calendar";
import { useEffect, useReducer } from "react";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDays = getDays(currentYear, currentMonth);

const initialState = {
  currentYear,
  currentMonth,
  currentDays,
  currentFirstDay: null,
  currentLastDay: null,
  prevYear: null,
  prevMonth: null,
  prevDays: null,
  nextYear: null,
  nextMonth: null,
  nextDays: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'calendar/INIT': {
      const currentYear = state.currentYear;
      const currentMonth = state.currentMonth;
      const currentDays = state.currentDays;
      const {
        firstDay: currentFirstDay,
        lastDay: currentLastDay,
      } = getFirstAndLastDay(currentYear, currentMonth, currentDays);
      const { year: prevYear, month: prevMonth } = getPrevYearAndMonth(currentYear, currentMonth);
      const prevDays = getDays(prevYear, prevMonth);
      const { year: nextYear, month: nextMonth } = getNextYearAndMonth(currentYear, currentMonth);
      const nextDays = getDays(nextYear, nextMonth);
      
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
      return { ...state };
    }
    case 'calendar/NEXT': {
      return { ...state };
    }
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