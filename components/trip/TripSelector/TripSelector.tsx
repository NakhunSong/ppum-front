import styles from './TripSelector.module.scss'
import Scroller, { useScroller } from "../Scroller"
import { useEffect } from 'react'

export default function TripSelector({ setSelectedTripId, trips }) {
  const {
    $scroller,
    $target,
    $items,
    selectedIndex,
  } = useScroller()

  useEffect(() => {
    setSelectedTripId(trips?.[selectedIndex]?.id ?? null)
  }, [selectedIndex, trips])

  return (
    <Scroller
      scrollerRef={$scroller}
      targetRef={$target}
    >
      {trips.map((trip, index) => {
        const { name } = trip
        const selected = selectedIndex === index
        const ref = (el) => $items.current[index] = el
        return (
          <Scroller.Item
            key={`trip_selector_item_${index}`}
            ref={ref}
            selected={selected}
            gap="50px"
          >
            <div className={styles.trip_selector_item}>
              {name}
            </div>
          </Scroller.Item>
        )
      })}
    </Scroller>
  )
}