// import classNames from 'classnames'
// import monthMapper from 'config/constant/month.json'
import _ from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import tripDates from 'services/trip-dates.json'
import styles from './TripDateSelector.module.scss'
import TripDates from '../TripDates'

export default function TripDateSelector() {
  let startX = 0
  let scrollLeft = 0
  const $wrapper = useRef<HTMLDivElement>()
  const $target = useRef<null | HTMLDivElement>()
  const $scroller = useRef<HTMLDivElement>()
  const itemsRef = useRef([])

  const [selectedDate, setSelectedDate] = useState(null)

  const scrollToHorizontal = (walk) => {
    if (!$scroller) return
    $scroller.current?.scrollTo({
      behavior: 'smooth',
      left: walk,
    })
  }

  const moveCenter = useCallback((focusedItem) => {
    if (!focusedItem) return
    const firstItemLeft = itemsRef.current[0].getClientRects()[0].left
    const walk = Math.round(focusedItem.getClientRects()[0].left - firstItemLeft)
    scrollToHorizontal(walk)
  }, [])

  const getClosest = useCallback(() => {
    const {
      left: targetLeft = 0,
      right: targetRight = 0
    } = $target?.current.getClientRects()[0] ?? {}
    let leftItem
    let rightItem
    let leftCollapse = 0
    let rightCollapse = 0
    itemsRef.current.forEach((item) =>  {
      const { left, right } = item.getClientRects()[0]
      if (left < targetLeft && targetLeft < right) {
        leftItem = item
        leftCollapse = Math.abs(right - targetLeft)
      } else if (left < targetRight && targetRight < right) {
        rightItem = item
        rightCollapse = Math.abs(left - targetRight)
      }
    })
    if (leftCollapse > rightCollapse) {
      return leftItem
    } else {
      return rightItem
    }
  }, [])

  const handleMouseMove = useCallback((event) => {
    event.preventDefault()
    const x = event.pageX - $scroller.current.offsetLeft
    const walk = (x - startX) * 2
    const result = scrollLeft - walk
    $scroller.current.scrollLeft = result
  }, [])

  useEffect(() => {
    setSelectedDate(tripDates[0].date)

    $scroller.current.onmousedown = function(event) {
      startX = event.pageX - $scroller.current.offsetLeft
      scrollLeft = $scroller.current.scrollLeft
      
      $scroller.current.onmousemove = handleMouseMove
      $scroller.current.onmouseleave = function() {
        $scroller.current.onmousemove = null
        $scroller.current.onmouseup = null
        $scroller.current.onmouseleave = null
      }
      $scroller.current.onmouseup = function() {
        $scroller.current.onmousemove = null
        $scroller.current.onmouseup = null
        $scroller.current.onmouseleave = null
        const focusedItem = getClosest()
        moveCenter(focusedItem)
      }
    }

    $scroller.current.onscroll = _.debounce(function() {
      const focusedItem = getClosest()
      moveCenter(focusedItem)
    }, 200)
  }, [])

  return (
    <div className={styles.wrapper} ref={$wrapper}>
      <div className={styles.target} ref={$target} />
      <div className={styles.scroller} ref={$scroller}>
        {tripDates.map((tripDate, index) => {
          const { date } = tripDate
          // const selected = selectedDate === date
          const dateInfo = date.split('-');
          const day = dateInfo?.[2];
          return (
            <TripDates
              key={`trip_date_${index}`}
              data={day}
              ref={(el) => itemsRef.current[index] = el}
            />
          )
        })}
      </div>
    </div>
  )
}