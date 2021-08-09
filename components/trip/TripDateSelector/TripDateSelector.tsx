// import classNames from 'classnames'
// import monthMapper from 'config/constant/month.json'
import tripDates from 'services/trip-dates.json'
import TripDates from '../TripDates'
import ScrollBox, { useScrollBox } from '../ScrollBox'

export default function TripDateSelector() {
  const {
    $target,
    $scroller,
    $items,
    selectedIndex,
  } = useScrollBox();

  return (
    <ScrollBox
      targetRef={$target}
      scrollerRef={$scroller}
    >
      {tripDates.map((tripDate, index) => {
        const { date } = tripDate
        const selected = selectedIndex === index
        const dateInfo = date.split('-');
        const day = dateInfo?.[2];
        return (
          <TripDates
            key={`trip_date_${index}`}
            data={day}
            selected={selected}
            ref={(el) => $items.current[index] = el}
          />
        )
      })}
    </ScrollBox>
  )
}