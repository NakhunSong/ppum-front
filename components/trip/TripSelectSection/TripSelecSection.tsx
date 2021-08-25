import MainButton from 'components/common/MainButton/MainButton'
import SwitchButton from 'components/common/SwitchButton'
import MobileTemplate from 'components/template/MobileTemplate'
import { getDateArray, useCalendar } from 'hooks/useCalendar'
import { useTrips } from 'lib/apis/trip'
import { useCallback, useEffect, useState } from 'react'
import Calendar from '../Calendar'
import TripSelector from '../TripSelector'
import styles from './TripSelectSection.module.scss'

export default function TripSelectSection() {
  const [calendar, dispatch] = useCalendar()
  const [dateArray, setDateArray] = useState([])
  const [turn, setTurn] = useState('start')
  const [ready, setReady] = useState(false)
  const [selectedTripId, setSelectedTripId] = useState(null)
  
  const { data: trips } = useTrips()

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
      nextYear: calendar.nextYear,
      nextMonth: calendar.nextMonth,
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

  const handleSwitch = useCallback((direction) => {
    setTurn(direction);
  }, [])

  const handleAdd = useCallback(() => {

  }, [])

  const handleEdit = useCallback(() => {

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
            onClick={handleSwitch}
          />
        </div>
        <div className={styles.select_button_wrapper}>
          <MainButton
            disabled={!ready}
            onClick={handleAdd}
          >
            여행 추가
          </MainButton>
        </div>
      </div>
      {trips && (
        <TripSelector
          trips={trips}
          setSelectedTripId={setSelectedTripId}
        />
      )}
      {trips && (
        <MainButton
          onClick={handleEdit}
        >
          여행 보기
        </MainButton>
      )}
    </MobileTemplate>
  )
}