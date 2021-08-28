// import classNames from 'classnames'
// import monthMapper from 'config/constant/month.json'
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { TripDateType } from 'types/TripType';
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
  
  useEffect(() => {
    setTripDateIndex(selectedIndex)
  }, [selectedIndex])

  const queryClient = useQueryClient()
  useQuery('tripDates', () =>
    tripDates, {
      onSuccess: (dates) => {
        queryClient.setQueryData(['receipts', selectedIndex], dates[selectedIndex]?.receipts ?? [])
      },
    }
  )

  return (
    <Scroller
      targetRef={$target}
      scrollerRef={$scroller}
    >
      {tripDates.map((tripDate, index) => {
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