import MobileTemplate from "components/template/MobileTemplate"
import { useCallback, useEffect, useState } from "react"
import ReceiptForm from "components/receipt/ReceiptForm"
import { initialReceipt, initialReceiptItem } from "components/receipt/ReceiptForm/ReceiptForm"
import { Receipt } from "types/ReceiptType"
import ReceiptSelector from "components/receipt/ReceiptSelector"
import receiptsJson from 'services/receipts.json'
import tripDatesJson from 'services/trip-dates.json'
import HeaderMenu from "../HeaderMenu"
import KakaoMap from "../KakaoMap"
import TripDateSelector from "../TripDateSelector"
import { useTripDate } from "hooks/useTripDate"
import { useQuery } from "react-query"

declare global {
  interface Window {
    kakao: any
  }
}

const imageSrc = "/images/trip/marker_selected.svg"

export default function MyTrip() {
  let map

  const [activeMarker, setActiveMarker] = useState(false)
  const [draggingMarker, setDraggingMarker] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [receipt, setReceipt] = useState<Receipt>(initialReceipt)
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt>(null)
  const [tripDateIndex, setTripDateIndex] = useState<number>(0)

  const {
    data: receipts = [],
    isLoading,
  } = useTripDate(tripDateIndex)

  const handleCancelFormVisible = useCallback(() => {
    setReceipt(initialReceipt)
    setFormVisible(false)
  }, [])

  const handleAddReceiptItem = useCallback((e) => {
    e.preventDefault();
    setReceipt(r => ({
      ...r,
      receiptItems: [
        ...r.receiptItems,
        initialReceiptItem,
      ],
    }))
  }, [])

  const setMarkerEvent = useCallback((marker, receiptProp) => {
    window.kakao.maps.event.addListener(marker, 'click', function(e) {
      setTimeout(() => setFormVisible(true), 0);
      setReceipt(receiptProp);
    })
    window.kakao.maps.event.addListener(marker, 'mouseover', function() {
      const size = new window.kakao.maps.Size(60, 60)
      const image = new window.kakao.maps.MarkerImage(imageSrc, size)
      marker.setImage(image);
    })
    window.kakao.maps.event.addListener(marker, 'mouseout', function() {
      const size = new window.kakao.maps.Size(50, 50)
      const image = new window.kakao.maps.MarkerImage(imageSrc, size)
      marker.setImage(image)
    })
    window.kakao.maps.event.addListener(marker, 'dragstart', function() {
      const size = new window.kakao.maps.Size(60, 60)
      const image = new window.kakao.maps.MarkerImage(imageSrc, size)
      marker.setImage(image);
      setDraggingMarker(true);
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

  useEffect(() => {
    const container = document.getElementById('map')
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3 //지도 확대, 축소 정도
    }
    map = new window.kakao.maps.Map(container, options)

    for (const receipt of receipts) {
      const { location, name } = receipt
      const { lat, lng } = location
      const imageSize = new window.kakao.maps.Size(50, 50)
      const latlng = new window.kakao.maps.LatLng(lat, lng)
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize)
      const marker = new window.kakao.maps.Marker({
        map,
        title: name,
        position: latlng,
        image : markerImage,
        draggable: true,
        clickable: true,
        zIndex: 5,
      })
      new window.kakao.maps.CustomOverlay({
        position: latlng,
        content: name,
        map,
      })
      setMarkerEvent(marker, receipt)
    }
  }, [receipts])

  useEffect(() => {
    if (selectedReceipt) {
      // update marker status
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
    setMarkerEvent(marker, initialReceipt);
    marker.setMap(map)
  }

  const clickHandler = (e) => {
    setActiveMarker(false)
    setReceipt(initialReceipt)
    addMarkerCallback(e)
  }

  const handleAddMarker = useCallback(() => {
    setActiveMarker(true)
    window.kakao.maps.event.addListener(map, 'click', clickHandler)
  }, [])
  
  const handleAddOff = useCallback(() => {
    setActiveMarker(false)
    window.kakao.maps.event.removeListener(map, 'click', clickHandler)
  }, [])
  
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
        receipt={receipt}
        visible={formVisible}
        onAdd={handleAddReceiptItem}
        onCancel={handleCancelFormVisible}
      />
      {isLoading
        ? <span>로딩중...</span>
        : (
        <ReceiptSelector receipts={receipts} setSelectedReceipt={setSelectedReceipt} />
      )}
      <TripDateSelector tripDates={tripDatesJson} setTripDateIndex={setTripDateIndex} />
    </MobileTemplate>
  )
}