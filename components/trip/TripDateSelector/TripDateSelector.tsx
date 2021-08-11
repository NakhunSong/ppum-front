// import classNames from 'classnames'
// import monthMapper from 'config/constant/month.json'
import tripDates from 'services/trip-dates.json'
import TripDates from '../TripDates'
import Scroller, { useScrollBox } from '../Scroller'

export default function TripDateSelector() {
  const {
    $target,
    $scroller,
    $items,
    selectedIndex,
  } = useScrollBox();

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
          // <TripDates
          //   key={`trip_date_${index}`}
          //   data={day}
          //   selected={selected}
          //   ref={(el) => $items.current[index] = el}
          // />
        )
      })}
    </Scroller>
  )
}