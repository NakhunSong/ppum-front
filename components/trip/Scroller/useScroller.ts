import _ from 'lodash'
import { useCallback, useEffect, useRef, useState } from "react"

export function useScroller() {
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

  const moveCenter = useCallback((item) => {
    if (!item) return
    const firstItemLeft = $items.current[0].getClientRects()[0].left
    const walk = Math.round(item.getClientRects()[0].left - firstItemLeft)
    scrollToHorizontal(walk)
  }, [])

  const getClosest = useCallback(() => {
    const {
      left: targetLeft = 0,
      right: targetRight = 0
    } = $target?.current.getClientRects()[0] ?? {}
    let leftItemIndex, rightItemIndex, leftItem, rightItem
    let leftCollapse = 0, rightCollapse = 0
    let returnIndex = 0, returnItem = null
    let isMatched = false

    $items.current.forEach((item, index) =>  {
      if (item?.getClientRects) {
        const { left, right } = item.getClientRects()[0]
        const getStayWay = (way) => left < way && way < right
        const isStayLeft = getStayWay(targetLeft)
        const isStayRight = getStayWay(targetRight)
        const isMatchWithTarget = left === targetLeft && right === targetRight
        switch (true) {
          case isStayLeft:
            leftItem = item
            leftItemIndex = index
            leftCollapse = Math.abs(right - targetLeft)
            break;
          case isStayRight:
            rightItem = item
            rightItemIndex = index
            rightCollapse = Math.abs(left - targetRight)
            break;
          default:
            if (isMatchWithTarget) {
              isMatched = true
            }
        }
      }
    })

    switch (true) {
      case leftCollapse === 0 && rightCollapse === 0:
        if (!isMatched) {
          const lastIndex = $items.current.length - 1
          setSelectedIndex(lastIndex)
          returnItem = $items.current[lastIndex]
        } else {
          if ($scroller.current.scrollLeft === 0) {
            setSelectedIndex(0)
          }
        }
        break;
      default:
        if (leftCollapse > rightCollapse) {
          returnItem = leftItem
          returnIndex = leftItemIndex
        } else {
          returnItem = rightItem
          returnIndex = rightItemIndex
        }
        setSelectedIndex(returnIndex)
    }
    return returnItem
  }, [])

  const handleMouseMove = useCallback((event) => {
    event.preventDefault()
    const x = event.pageX - $scroller.current.offsetLeft
    const walk = (x - startX) * 2
    const result = scrollLeft - walk
    $scroller.current.scrollLeft = result
  }, [])

  const handleSelect = useCallback(() => {
    moveCenter(getClosest())
  }, [])

  useEffect(() => {
    const handleInit = () => {
      $scroller.current.onmousemove = null
      $scroller.current.onmouseup = null
      $scroller.current.onmouseleave = null
    }
    $scroller.current.onmousedown = (event) => {
      startX = event.pageX - $scroller.current.offsetLeft
      scrollLeft = $scroller.current.scrollLeft
      $scroller.current.onmousemove = handleMouseMove
      $scroller.current.onmouseleave = () => handleInit
      $scroller.current.onmouseup = function() {
        console.log('mouse up')
        handleInit()
        handleSelect()
      }
    }
    $scroller.current.onscroll = _.debounce(() => {
      console.log('scroll')
      handleSelect()
    }, 500)
  }, [])

  return {
    $target,
    $scroller,
    $items,
    selectedIndex,
    setSelectedIndex,
  }
}