import _ from 'lodash'
import { useCallback, useEffect, useRef, useState } from "react"

export function useScrollBox() {
  let startX = 0
  let scrollLeft = 0
  const $target = useRef<null | HTMLDivElement>()
  const $scroller = useRef<HTMLDivElement>()
  const $items = useRef([])

  const [selectedIndex, setSelectedIndex] = useState(0)
  
  const scrollToHorizontal = useCallback((walk) => {
    if (!$scroller) return
    $scroller.current.scrollTo({
      behavior: 'smooth',
      left: walk,
    })
  }, [])

  const moveCenter = useCallback((focusedItem) => {
    if (!focusedItem) return
    const firstItemLeft = $items.current[0].getClientRects()[0].left
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
    let leftItemIndex
    let rightItemIndex
    let leftCollapse = 0
    let rightCollapse = 0
    let isSame = false
    $items.current.forEach((item, index) =>  {
      const { left, right } = item.getClientRects()[0]
      if (left < targetLeft && targetLeft < right) {
        leftItem = item
        leftItemIndex = index
        leftCollapse = Math.abs(right - targetLeft)
      } else if (left < targetRight && targetRight < right) {
        rightItem = item
        rightItemIndex = index
        rightCollapse = Math.abs(left - targetRight)
      } else {
        if (left === targetLeft && right === targetRight) {
          isSame = true
        }
      }
    })
    const itemsLength = $items.current.length
    if (leftCollapse === 0 && rightCollapse === 0) {
      if (!isSame) {
        setSelectedIndex(itemsLength - 1)
        return $items.current[itemsLength - 1]
      } else {
        if ($scroller.current.scrollLeft  === 0) {
          setSelectedIndex(0)
        }
      }
      return null
    } else {
      if (leftCollapse > rightCollapse) {
        setSelectedIndex(leftItemIndex)
        return leftItem
      } else {
        setSelectedIndex(rightItemIndex)
        return rightItem
      }
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
      console.log('scroll')
      const focusedItem = getClosest()
      moveCenter(focusedItem)
    }, 500)
  }, [])

  return {
    selectedIndex,
    $target,
    $scroller,
    $items,
  }
}