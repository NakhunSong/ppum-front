import MobileTemplate from "components/template/MobileTemplate"
import { useCallback, useEffect, useState } from "react"
import HeaderMenu from "../HeaderMenu"
import KakaoMap from "../KakaoMap"
import receiptsJson from 'services/receipts.json'
import ReceiptForm from "components/receipt/ReceiptForm"
import { Receipt } from "types/ReceiptType"
import { initialReceipt, initialReceiptItem } from "components/receipt/ReceiptForm/ReceiptForm"

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

  const handleCancelFormVisible = useCallback(() => {
    console.log('cancel')
    setFormVisible(false)
    setReceipt(initialReceipt)
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

  const setMarkerEvent = (marker, receiptProp) => {
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
  }

  useEffect(() => {
    let container = document.getElementById('map')
    let options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3 //지도 확대, 축소 정도
    }
    map = new window.kakao.maps.Map(container, options)
      
    for (const receipt of receiptsJson) {
      const { location, name } = receipt
      console.log('name: ', name);
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
      var customOverlay = new window.kakao.maps.CustomOverlay({
          position: latlng,
          content: name,   
      })
      customOverlay.setMap(map)
      setMarkerEvent(marker, receipt)
    }
  }, [])

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
    </MobileTemplate>
  )
}