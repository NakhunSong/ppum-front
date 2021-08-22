import MainButton from 'components/common/MainButton/MainButton'
import SwitchButton from 'components/common/SwitchButton'
import MobileTemplate from 'components/template/MobileTemplate'
import { getDateArray, useCalendar } from 'hooks/useCalendar'
import { useCallback, useEffect, useState } from 'react'
import Calendar from '../Calendar'
import styles from './TripSelectSection.module.scss'

export default function TripSelectSection() {
  const [calendar, dispatch] = useCalendar()
  const [dateArray, setDateArray] = useState([])
  const [turn, setTurn] = useState('start')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const array = getDateArray({
      firstDay: calendar.currentFirstDay,
      lastDay: calendar.currentLastDay,
      currentYear: calendar.currentYear,
      currentMonth: calendar.currentMonth,
      currentDays: calendar.currentDays,
      prevYear: calendar.prevYear,
      prevMonth: calendar.prevMonth,
      prevDays: calendar.prevDays,
      nextYear: calendar.prevYear,
      nextMonth: calendar.prevMonth,
    });
    setDateArray(() => array)
    if (calendar.start && !calendar.end) {
      setTurn('end')
    }
    setReady(calendar.start && calendar.end);
    console.log('calendar updated')
  }, [calendar])

  const handleClickMonth = useCallback((direction) => {
    dispatch({
      type: `calendar/${direction}`,
    })
  }, [])

  const handleClickDate = useCallback(item => {
    dispatch({
      type: 'calendar/SELECT_DATE',
      payload: {
        data: item,
        turn,
      },
    })
  }, [turn])

  const handleSwitchButton = useCallback((direction) => {
    setTurn(direction);
  }, [])

  const handleAddButton = useCallback(() => {

  }, [])

  return (
    <MobileTemplate
      header={<Calendar.header />}
    >
      <div className={styles.wrapper}>
        <Calendar
          calendar={calendar}
          dateArray={dateArray}
          onClickDate={handleClickDate}
          onClickMonth={handleClickMonth}
        />
        <div className={styles.button_wrapper}>
          <SwitchButton
            selected={turn}
            leftText="시작일"
            rightText="종료일"
            onClick={handleSwitchButton}
          />
        </div>
        <div className={styles.select_button_wrapper}>
          <MainButton
            disabled={!ready}
            onClick={handleAddButton}
          >
            여행 추가
          </MainButton>
        </div>
      </div>
    </MobileTemplate>
  )
}