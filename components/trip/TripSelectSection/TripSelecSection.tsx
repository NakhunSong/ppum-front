import MainButton from 'components/common/MainButton/MainButton'
import MainInput from 'components/common/MainInput'
import MobileTemplate from 'components/template/MobileTemplate'
import SwitchButton from 'components/common/SwitchButton'
import { getDateArray, useCalendar } from 'hooks/useCalendar'
import { useTrips } from 'lib/apis/trip'
import { addZeroToOneDigit } from 'lib/helpers/trip/calendar'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useEffect, useState } from 'react'
import styles from './TripSelectSection.module.scss'
import Calendar from '../Calendar'
import TripSelector from '../TripSelector'

export default function TripSelectSection() {
  const router = useRouter()
  const [calendar, dispatch] = useCalendar()
  const [dateArray, setDateArray] = useState([])
  const [name, setName] = useState(null)
  const [ready, setReady] = useState(false)
  const [isDateSelected, setIsDateSelected] = useState(false)
  const [selectedTripId, setSelectedTripId] = useState(null)
  const [turn, setTurn] = useState('start')

  const {
    addTrip,
    getTrips,
  } = useTrips()
  const { data: trips } = getTrips((id) => setSelectedTripId(id))
  const mutation = addTrip()

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
    setIsDateSelected(calendar.start && calendar.end)
    console.log('calendar updated')
  }, [calendar])

  useEffect(() => {
    setReady(isDateSelected && !!name)
  }, [isDateSelected, name])

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
    const stringDate = (_d) => {
      const m = addZeroToOneDigit(_d.month)
      const d = addZeroToOneDigit(_d.date)
      return `${_d.year}-${m}-${d}`
    }
    const form = {
      name,
      beginDate: stringDate(calendar.start),
      endDate: stringDate(calendar.end),
    }
    mutation.mutate(form)
  }, [calendar, name])

  const handleSelectTrip = useCallback(() => {
    router.push(`/trips/${selectedTripId}`)
  }, [selectedTripId])

  return (
    <MobileTemplate>
      <div className={styles.wrapper}>
        <Calendar.header />
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
          {isDateSelected && (
            <div className={styles.trip_creator}>
              <MainInput
                style={{ width: '100%', maxWidth: '200px' }}
                placeholder="여행 이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <MainButton
                disabled={!ready}
                onClick={handleAdd}
              >
                여행 추가
              </MainButton>
            </div>
          )}
        </div>
      </div>
      {trips && (
        <div className={styles.trip_selector}>
          <TripSelector
            trips={trips}
            setSelectedTripId={setSelectedTripId}
          />
          <MainButton
            onClick={handleSelectTrip}
          >
            여행 편집
          </MainButton>
        </div>
      )}
    </MobileTemplate>
  )
}