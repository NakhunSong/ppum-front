import MobileTemplate from "components/template/MobileTemplate"
import { useCallback, useEffect, useRef, useState } from "react"
import ReceiptForm from "components/receipt/ReceiptForm"
import { Mode, ModeType, ReceiptItemPayloadType, ReceiptPropertyKey, ReceiptType } from "types/receipt.type"
import ReceiptSelector from "components/receipt/ReceiptSelector"
import HeaderMenu from "../HeaderMenu"
import KakaoMap from "../KakaoMap"
import TripDateSelector from "../TripDateSelector"
import { useRouter } from "next/dist/client/router"
import { useTrips } from "lib/apis/trip"
import { useReceipts } from "lib/apis/receipt"
import { useReceiptForm } from "stores/receipt/receipt.reducer"
import { InputChangeEventTargetType } from "types/common/Event"
import { actionCreators } from "stores/receipt/receipt.actions"

declare global {
  interface Window {
    kakao: any
  }
}

const imageSrc = "/images/trip/marker_selected.svg"

export default function MyTrip() {
  const router = useRouter()
  const { tripId = '' } = router.query

  const [{
    mode,
    receipt: receiptState,
  }, dispatch] = useReceiptForm()

  const map = useRef()
  const info = useRef(null)
  const markers = useRef([])
  const [activeMarker, setActiveMarker] = useState(false)
  const [draggingMarker, setDraggingMarker] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [tripDateIndex, setTripDateIndex] = useState<number>(0)

  const { getTrip } = useTrips()  
  const {
    getReceipts,
    addReceipt,
    addReceiptItem,
    modifyReceipt,
    modifyReceiptItem,
  } = useReceipts(dispatch)  
  const { data: tripDates } = getTrip(tripId)
  const { data: receipts = [], isLoading } = getReceipts(tripDateIndex)

  const handleChangeMode = useCallback((modeProp: ModeType) => {
    dispatch(actionCreators.changeMode(modeProp))
  }, [])

  const handleSelectReceipt = (receiptProp) => {
    dispatch(actionCreators.init(receiptProp))
  }

  const handleCancelFormVisible = useCallback(() => {
    setFormVisible(false)
  }, [])

  const setMarkerEvent = useCallback((marker, receiptProp?) => {
    window.kakao.maps.event.addListener(marker, 'click', function(e) {
      setTimeout(() => setFormVisible(true), 0)
      if (receiptProp) {
        // setSelectedReceipt(receiptProp)
        handleSelectReceipt(receiptProp)
      }
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

  const createMarker = (mouseEvent) => {
    const imageSize = new window.kakao.maps.Size(50, 50)
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize)
    const latlng = mouseEvent.latLng
    const marker = new window.kakao.maps.Marker({ 
      position: latlng,
      image : markerImage,
      draggable: true,
      clickable: true,
      zIndex: 5,
    })
    setMarkerEvent(marker)
    marker.setMap(map.current)

    return { lat: latlng.Ma, lng: latlng.La }
  }

  const callbackOfClickingMarker = (e) => {
    const latlng = createMarker(e)
    setActiveMarker(false)
    setTimeout(() => setFormVisible(true), 0)
    handleChangeMode(Mode.AddReceipt)
    dispatch(actionCreators.addReceipt(latlng))
  }

  const handleAddMarker = () => {
    setActiveMarker(true)
    window.kakao.maps.event.addListener(map.current, 'click', callbackOfClickingMarker)
  }
  
  const handleAddOff = () => {
    setActiveMarker(false)
    window.kakao.maps.event.removeListener(map.current, 'click', callbackOfClickingMarker)
  }

  const handleChange = useCallback((
    e: InputChangeEventTargetType,
    propertyKey: ReceiptPropertyKey,
    id?: string,
  ) => {
    const value = e.target.value
    let action
    
    if (!id) {
      action = actionCreators.changeReceipt({
        [propertyKey]: value,
      })
    }

    dispatch(action)
  }, [])

  const handleConfirmReceipt = useCallback(() => {
    const getTripDateId = () => {
      return tripDates?.[tripDateIndex]?.id ?? null
    }

    switch (mode) {
      case Mode.AddReceipt: {
        const { location, name, prices } = receiptState
        const form = {
          location,
          name,
          prices,
          tripDateId: getTripDateId(),
        }
        addReceipt.mutate(form)
        break
      }
      case Mode.ModifyReceipt: {
        const form = {...receiptState}
        modifyReceipt.mutate(form)
        break
      }
      default: console.error('Not Availble Mode')
    }

    handleCancelFormVisible()
  }, [mode, receiptState, tripDates, tripDateIndex])

  const handleAddReceiptItem = useCallback((payload: ReceiptItemPayloadType) => {
    addReceiptItem.mutate(payload)
    handleCancelFormVisible()
  }, [])
  
  const handleModifyReceiptItem = useCallback((payload: ReceiptItemPayloadType) => {
    modifyReceiptItem.mutate(payload)
    handleCancelFormVisible()
  }, [])

  useEffect(() => {
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
      receipts.forEach((receipt) => {
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
        setMarkerEvent(marker, receipt)
      })
    } else {
      initMarkerName()
    }
  }, [receipts])

  useEffect(() => {
    if (receiptState) {
      const { location, name } = receiptState
      const { lat, lng } = location
      const latlng = new window.kakao.maps.LatLng(lat, lng)
      setMarkerName({
        position: latlng,
        name,
      })
    }
  }, [receiptState])

  useEffect(() => {
    if (!activeMarker) {
      handleAddOff()
    }
  }, [activeMarker])

  useEffect(() => {
    if (!formVisible) {
      handleChangeMode(Mode.Plus)
    }
  }, [formVisible])

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
        receipt={receiptState}
        visible={formVisible}
        mode={mode}
        handleChangeMode={handleChangeMode}
        onCancel={handleCancelFormVisible}
        onChange={handleChange}
        handleConfirmReceipt={handleConfirmReceipt}
        handleAddReceiptItem={handleAddReceiptItem}
        handleModifyReceiptItem={handleModifyReceiptItem}
      />
      {isLoading
        ? <span>로딩중...</span>
        : (
          <ReceiptSelector
            receipts={receipts}
            handleSelectReceipt={handleSelectReceipt}
          />
      )}
      <TripDateSelector
        tripDates={tripDates}
        setTripDateIndex={setTripDateIndex}
      />
    </MobileTemplate>
  )
}