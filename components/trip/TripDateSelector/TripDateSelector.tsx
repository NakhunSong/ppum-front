// import classNames from 'classnames'
// import monthMapper from 'config/constant/month.json'
import { usePrevious } from 'hooks/usePrevious';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { TripDateType } from 'types/trip.type';
import Scroller, { useScroller } from '../Scroller'

type TripDateSelectorProps = {
  tripDates: Array<TripDateType>,
  setTripDateId: React.Dispatch<string>,
  setTripDateIndex: React.Dispatch<number>,
}

export default function TripDateSelector({
  tripDates,
  setTripDateId,
  setTripDateIndex,
}: TripDateSelectorProps) {
  const {
    $target,
    $scroller,
    $items,
    selectedIndex,
  } = useScroller()
  const queryClient = useQueryClient()
  const [innerId, setInnerId] = useState(null)
  const [innerIndex, setInnerIndex] = useState(selectedIndex)
  const preSelectedIndex = usePrevious(selectedIndex)
  
  if (selectedIndex !== preSelectedIndex && selectedIndex !== innerIndex) {
    const selectedTripDate = tripDates?.[selectedIndex]
    const tripDateId = selectedTripDate?.id ?? null
    queryClient.setQueryData(
      ['receipts', tripDateId],
      selectedTripDate?.receipts ?? []
    )
    setInnerId(tripDateId)
    setInnerIndex(selectedIndex)
  }

  useEffect(() => {
    setTripDateId(innerId)
    setTripDateIndex(innerIndex)
  }, [innerId, innerIndex])

  return (
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
  )
}