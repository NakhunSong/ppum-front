// import classNames from 'classnames'
// import monthMapper from 'config/constant/month.json'
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import Scroller, { useScrollBox } from '../Scroller'

export default function TripDateSelector({ tripDates, setTripDateId }) {
  const {
    $target,
    $scroller,
    $items,
    selectedIndex,
  } = useScrollBox()
  
  useEffect(() => {
    setTripDateId(selectedIndex)
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
        const dateInfo = date.split('-');
        const day = dateInfo?.[2];
        return (
          <Scroller.item
            key={`trip_date_${index}`}
            selected={selected}
            ref={(el) => $items.current[index] = el}
          >
            <div style={{ fontSize: '64px' }}>
              {day}
            </div>
          </Scroller.item>
        )
      })}
    </Scroller>
  )
}