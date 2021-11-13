import monthMapper from 'config/constant/month.json'
import { usePrevious } from 'hooks/usePrevious'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { TripDateType } from 'types/trip.type'
import styles from './TripDateSelector.module.scss'
import Scroller, { useScroller } from '../Scroller'

type TripDateSelectorProps = {
  tripDates: Array<TripDateType>,
  setTripDateIndex: React.Dispatch<number>,
}

export default function TripDateSelector({
  tripDates,
  setTripDateIndex,
}: TripDateSelectorProps) {
  const {
    $target,
    $scroller,
    $items,
    selectedIndex,
  } = useScroller()
  const queryClient = useQueryClient()
  const [innerIndex, setInnerIndex] = useState(selectedIndex)
  const preSelectedIndex = usePrevious(selectedIndex)

  if (selectedIndex !== preSelectedIndex && selectedIndex !== innerIndex) {
    const selectedTripDate = tripDates?.[selectedIndex]
    const tripDateId = selectedTripDate?.id ?? null
    queryClient.setQueryData(
      ['receipts', tripDateId],
      selectedTripDate?.receipts ?? []
    )
    setInnerIndex(selectedIndex)
  }

  if (selectedIndex !== preSelectedIndex && selectedIndex !== innerIndex) {
    const selectedTripDate = tripDates?.[selectedIndex]
    const tripDateId = selectedTripDate?.id ?? null
    queryClient.setQueryData(
      ['receipts', tripDateId],
      selectedTripDate?.receipts ?? []
    )
    setInnerIndex(selectedIndex)
  }

  useEffect(() => {
    setTripDateIndex(innerIndex)
  }, [innerIndex])

  return (
    <div className={styles.wrapper}>
      {tripDates && (
        <div className={styles.month}>
          {monthMapper[tripDates[innerIndex].date.split('-')[1]]}
        </div>
      )}
      <Scroller
        targetRef={$target}
        scrollerRef={$scroller}
      >
        {tripDates?.map((tripDate, index) => {
          const { date } = tripDate
          const selected = selectedIndex === index
          const dateInfo = date.split('-')
          const day = dateInfo?.[2]
          const ref = (el) => $items.current[index] = el
          return (
            <Scroller.Item
              key={`trip_date_${index}`}
              ref={ref}
              selected={selected}
            >
              <div style={{ fontSize: '64px' }}>
                {day}
              </div>
            </Scroller.Item>
          )
        })}
      </Scroller>
    </div>
  )
}