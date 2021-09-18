import MobileTemplate from "components/template/MobileTemplate"
import { useCallback, useEffect, useRef, useState } from "react"
import ReceiptForm from "components/receipt/ReceiptForm"
import { initialReceipt, initialReceiptItem } from "components/receipt/ReceiptForm/ReceiptForm"
import { ReceiptType } from "types/ReceiptType"
import ReceiptSelector from "components/receipt/ReceiptSelector"
import HeaderMenu from "../HeaderMenu"
import KakaoMap from "../KakaoMap"
import TripDateSelector from "../TripDateSelector"
import { useRouter } from "next/dist/client/router"
import { useTrips } from "lib/apis/trip"
import { useReceipts } from "lib/apis/receipt"

declare global {
  interface Window {
    kakao: any
  }
}

const imageSrc = "/images/trip/marker_selected.svg"

export default function MyTrip() {
  const router = useRouter()
  const { tripId = '' } = router.query
  const map = useRef()
  const info = useRef(null)
  const markers = useRef([])
  const [activeMarker, setActiveMarker] = useState(false)
  const [draggingMarker, setDraggingMarker] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [receiptForm, setReceiptForm] = useState<ReceiptType>(initialReceipt)
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptType>(null)
  const [tripDateIndex, setTripDateIndex] = useState<number>(0)

  const { getTrip } = useTrips()  
  const {
    getReceipts,
    addReceipt,
    modifyReceipt,
  } = useReceipts()  
  const { data: tripDates } = getTrip(tripId)
  const {
    data: receipts = [],
    isLoading,
  } = getReceipts(tripDateIndex)

  const handleCancelFormVisible = useCallback(() => {
    setReceiptForm(initialReceipt)
    setFormVisible(false)
  }, [])

  const handleAddReceiptItem = useCallback((e) => {
    e.preventDefault()
    setReceiptForm(r => ({
      ...r,
      receiptItems: [
        ...r.receiptItems,
        initialReceiptItem,
      ],
    }))
  }, [])

  const handleOkReceiptForm = useCallback((target, form) => {
    handleCancelFormVisible()

    if (target === 'receipt') {
      modifyReceipt.mutate(form)
    }
    // modifyReceiptItem.mutate(form)
  }, [])

  const setMarkerEvent = useCallback((marker, receiptProp) => {
    window.kakao.maps.event.addListener(marker, 'click', function(e) {
      setTimeout(() => setFormVisible(true), 0)
      setReceiptForm(receiptProp)
    })
    window.kakao.maps.event.addListener(marker, 'mouseover', function() {
      const size = new window.kakao.maps.Size(60, 60)
      const image = new window.kakao.maps.MarkerImage(imageSrc, size)
      marker.setImage(image)
    })
    window.kakao.maps.event.addListener(marker, 'mouseout', function() {
      const size = new window.kakao.maps.Size(50, 50)
      const image = new window.kakao.maps.MarkerImage(imageSrc, size)
      marker.setImage(image)
    })
    window.kakao.maps.event.addListener(marker, 'dragstart', function() {
      const size = new window.kakao.maps.Size(60, 60)
      const image = new window.kakao.maps.MarkerImage(imageSrc, size)
      marker.setImage(image)
      setDraggingMarker(true)
    })
    window.kakao.maps.event.addListener(marker, 'dragend', function() {
      const size = new window.kakao.maps.Size(50, 50)
      const image = new window.kakao.maps.MarkerImage(imageSrc, size)
      marker.setImage(image)
      setDraggingMarker(false)
      const location = marker.getPosition()
      console.log('location: ', location)
      // 위치 변경 API 실행
    })
  }, [])

  const initMarkerName = useCallback(() => {
    if (info.current) {
      info.current.setMap(null)
      info.current = null
    }
  }, [])

  const setMarkerName = useCallback(({ position, name }) => {
    initMarkerName()
    if (position && name) {
      info.current = new window.kakao.maps.CustomOverlay({
        position,
        content: `<span style="font-weight: 600">${name}</span>`,
        map: map.current,
      })
    }
  }, [])

  useEffect(() => {
    console.log('mounted')
    const container = document.getElementById('map')
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    }
    map.current = new window.kakao.maps.Map(container, options)
  }, [])

  useEffect(() => {
    if (markers.current.length > 0) {
      markers.current.forEach((mark) => {
        mark?.setMap(null)
      })
    }
    if (receipts?.length > 0) {
      receipts.forEach((receipt, index) => {
        const { location, name } = receipt
        const { lat, lng } = location
        const imageSize = new window.kakao.maps.Size(50, 50)
        const latlng = new window.kakao.maps.LatLng(lat, lng)
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize)
        const marker = new window.kakao.maps.Marker({
          map: map.current,
          title: name,
          position: latlng,
          image : markerImage,
          draggable: true,
          clickable: true,
          zIndex: 5,
        })
        markers.current.push(marker)
        if (index === 0) {
          setMarkerName({
            position: latlng,
            name,
          })
        }
        setMarkerEvent(marker, receipt)
      })
    } else {
      initMarkerName()
    }
  }, [receipts])

  useEffect(() => {
    if (selectedReceipt) {
      const { location, name } = selectedReceipt
      const { lat, lng } = location
      const latlng = new window.kakao.maps.LatLng(lat, lng)
      setMarkerName({
        position: latlng,
        name,
      })
    }
  }, [selectedReceipt])

  const addMarkerCallback = (mouseEvent) => {
    const imageSize = new window.kakao.maps.Size(50, 50)
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize)
    const latlng = mouseEvent.latLng
    const marker = new window.kakao.maps.Marker({ 
      position: latlng,
      text: 'dfdf',
      image : markerImage,
      draggable: true,
      clickable: true,
      zIndex: 5,
    })
    setMarkerEvent(marker, initialReceipt)
    marker.setMap(map.current)

    // 영수증 추가
    addReceipt.mutate({
      location: { lat: latlng.Ma, lng: latlng.La },
      name: '',
      prices: 0,
      tripDateId: tripDates?.[tripDateIndex]?.id,
    })
  }

  const clickHandler = (e) => {
    setActiveMarker(false)
    setReceiptForm(initialReceipt)
    addMarkerCallback(e)
  }

  const handleAddMarker = () => {
    setActiveMarker(true)
    window.kakao.maps.event.addListener(map.current, 'click', clickHandler)
  }
  
  const handleAddOff = () => {
    setActiveMarker(false)
    window.kakao.maps.event.removeListener(map.current, 'click', clickHandler)
  }
  
  useEffect(() => {
    if (!activeMarker) {
      handleAddOff()
    }
  }, [activeMarker])

  return (
    <MobileTemplate
      header={(
        <HeaderMenu
          addMarker={activeMarker}
          handleAddMarker={handleAddMarker}
        />
      )}
    >
      <KakaoMap draggingMarker={draggingMarker} />
      <ReceiptForm
        receipt={receiptForm}
        visible={formVisible}
        onAdd={handleAddReceiptItem}
        onCancel={handleCancelFormVisible}
        onOk={handleOkReceiptForm}
      />
      {isLoading
        ? <span>로딩중...</span>
        : (
        <ReceiptSelector receipts={receipts} setSelectedReceipt={setSelectedReceipt} />
      )}
      <TripDateSelector tripDates={tripDates} setTripDateIndex={setTripDateIndex} />
    </MobileTemplate>
  )
}