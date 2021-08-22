import {
  getDays,
  getFirstAndLastDay,
  getPrevYearAndMonth,
  getNextYearAndMonth,
} from "lib/helpers/trip/calendar"
import { useEffect, useReducer } from "react"

const initYear = new Date().getFullYear()
const initMonth = new Date().getMonth() + 1
const initDays = getDays(initYear, initMonth)

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
}

interface DateObject {
  year: string,
  month: string,
  date: string,
}

function getDateByDateObject(dateObject: DateObject) {
  console.log('dateObject: ', dateObject);
  const { year: y, month: m, date: d } = dateObject
  return new Date(`${y} ${m} ${d}`)
}

function initCalendar(y, m) {
  const currentYear = y
  const currentMonth = m
  const currentDays = getDays(currentYear, currentMonth)
  const {
    firstDay: currentFirstDay,
    lastDay: currentLastDay,
  } = getFirstAndLastDay(currentYear, currentMonth, currentDays)
  const { year: prevYear, month: prevMonth } = getPrevYearAndMonth(currentYear, currentMonth)
  const prevDays = getDays(prevYear, prevMonth)
  const { year: nextYear, month: nextMonth } = getNextYearAndMonth(currentYear, currentMonth)
  const nextDays = getDays(nextYear, nextMonth)
  return {
    currentFirstDay,
    currentLastDay,
    prevYear,
    prevMonth,
    prevDays,
    nextYear,
    nextMonth,
    nextDays,
  }
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
      )
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
      }
    }
    case 'calendar/PREV': {
      const currentYear = state.prevYear
      const currentMonth = state.prevMonth
      const currentDays = state.prevDays
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
      )
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
      }
    }
    case 'calendar/NEXT': {
      const currentYear = state.nextYear
      const currentMonth = state.nextMonth
      const currentDays = state.nextDays
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
      )
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
      }
    }
    case 'calendar/SELECT_DATE': {
      const { start, end } = state
      const { data, turn } = action.payload
      let setable = true
      if (end && turn === 'start') {
        const startDate = +getDateByDateObject(data)
        const endDate = +getDateByDateObject(end)
        setable = startDate < endDate
      }
      if (start && turn === 'end') {
        const startDate = +getDateByDateObject(start)
        const endDate = +getDateByDateObject(data)
        setable = startDate < endDate
      }
      if (setable) {
        return {
          ...state,
          [turn]: data,
        }
      }
      return { ...state }
    }
    default: return state
  }
}

export function useCalendar() {
  const [calendar, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    dispatch({ type: 'calendar/INIT' })
  }, [])
  return [calendar, dispatch]
}


interface DateArrayParams {
  firstDay: number,
  lastDay: number,
  currentYear: number,
  currentMonth: number,
  currentDays: number,
  prevYear: number,
  prevMonth: number,
  prevDays: number,
  nextYear: number,
  nextMonth: number,
  nextDays?: number,
}

export function getDateArray({
  firstDay,
  lastDay,
  currentYear,
  currentMonth,
  currentDays,
  prevYear,
  prevMonth,
  prevDays,
  nextYear,
  nextMonth,
}: DateArrayParams) {
  const prevArray = Array.from({ length: firstDay }).map((e, i) => ({
    context: 'prev',
    date: prevDays - i,
    month: prevMonth,
    year: prevYear,
  })).sort(() => -1)
  const nextArray = Array.from({ length: 6 - lastDay }).map((e, i) => ({
    context: 'next',
    date: i + 1,
    month: nextMonth,
    year: nextYear,
  }))
  const currentArray = Array.from({ length: currentDays }).map((e, i) => ({
    context: 'current',
    date: i + 1,
    month: currentMonth,
    year: currentYear,
  }))
  return [...prevArray, ...currentArray, ...nextArray]
}