// import classNames from 'classnames'
// import monthMapper from 'config/constant/month.json'
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { TripDateType } from 'types/trip.type';
import Scroller, { useScroller } from '../Scroller'

type TripDateSelectorProps = {
  tripDates: Array<TripDateType>,
  setTripDateIndex: React.Dispatch<number>,
}

export default function TripDateSelector({ tripDates, setTripDateIndex }: TripDateSelectorProps) {
  const {
    $target,
    $scroller,
    $items,
    selectedIndex,
  } = useScroller()
  const queryClient = useQueryClient()
  
  useEffect(() => {
    setTripDateIndex(selectedIndex)
    queryClient.setQueryData(
      ['receipts', selectedIndex],
      tripDates?.[selectedIndex]?.receipts ?? []
    )
  }, [selectedIndex, tripDates])

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