import MobileTemplate from "components/template/MobileTemplate";
import { useCallback, useEffect, useState } from "react";
import HeaderMenu from "../HeaderMenu";
import KakaoMap from "../KakaoMap";
import receiptsJson from 'services/receipts.json';

declare global {
  interface Window {
    kakao: any;
  }
}

const imageSrc = "/images/trip/marker_selected.svg";

export default function MyTrip() {
  let map;
  
  const [activeMarker, setActiveMarker] = useState(false);
  const [draggingMarker, setDraggingMarker] = useState(false);
  
  useEffect(() => {
    let container = document.getElementById('map');
    let options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3 //지도 확대, 축소 정도
    };
    map = new window.kakao.maps.Map(container, options);
      
    for (const receipt of receiptsJson) {
      const { id, location } = receipt;
      const { lat, lng } = location;
      const imageSize = new window.kakao.maps.Size(24, 35);
      const latlng = new window.kakao.maps.LatLng(lat, lng);
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
      const marker = new window.kakao.maps.Marker({
        map,
        position: latlng,
        image : markerImage,
        draggable: true,
        clickable: true,
        zIndex: 5,
      });
      window.kakao.maps.event.addListener(marker, 'click', function() {
        alert(id)
      });
      window.kakao.maps.event.addListener(marker, 'mouseover', function() {
        const size = new window.kakao.maps.Size(29, 40);
        const image = new window.kakao.maps.MarkerImage(imageSrc, size);
        marker.setImage(image);
      });
      window.kakao.maps.event.addListener(marker, 'mouseout', function() {
        const size = new window.kakao.maps.Size(25, 35);
        const image = new window.kakao.maps.MarkerImage(imageSrc, size);
        marker.setImage(image);
      });
      window.kakao.maps.event.addListener(marker, 'dragstart', function() {
        const size = new window.kakao.maps.Size(29, 40);
        const image = new window.kakao.maps.MarkerImage(imageSrc, size);
        marker.setImage(image);
        setDraggingMarker(true);
      });
      window.kakao.maps.event.addListener(marker, 'dragend', function() {
        const size = new window.kakao.maps.Size(24, 35);
        const image = new window.kakao.maps.MarkerImage(imageSrc, size);
        marker.setImage(image);
        setDraggingMarker(false);
        const location = marker.getPosition();
        console.log('location: ', location);
      });
    }
  }, []);

  const callback = (mouseEvent) => {
    const imageSize = new window.kakao.maps.Size(24, 35); 
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    const latlng = mouseEvent.latLng;
    const marker = new window.kakao.maps.Marker({ 
      position: latlng,
      image : markerImage,
      draggable: true,
      clickable: true,
      zIndex: 5,
    });
    window.kakao.maps.event.addListener(marker, 'dragstart', function() {
      const size = new window.kakao.maps.Size(29, 40);
      const image = new window.kakao.maps.MarkerImage(imageSrc, size);
      marker.setImage(image);
      setDraggingMarker(true);
    });
    window.kakao.maps.event.addListener(marker, 'dragend', function() {
      const size = new window.kakao.maps.Size(24, 35);
      const image = new window.kakao.maps.MarkerImage(imageSrc, size);
      marker.setImage(image);
      setDraggingMarker(false);
      const location = marker.getPosition();
      console.log('location: ', location);
    });
    marker.setMap(map);
  };

  const clickHandler = (event) => { 
    setActiveMarker(false);
    callback(event);
  };

  const handleAddMarker = useCallback(() => {
    setActiveMarker(true);
    window.kakao.maps.event.addListener(map, 'click', clickHandler);
  }, []);
  
  const handleAddOff = useCallback(() => {
    setActiveMarker(false);
    window.kakao.maps.event.removeListener(map, 'click', clickHandler);
  }, []);
  
  useEffect(() => {
    if (!activeMarker) {
      handleAddOff();
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
    </MobileTemplate>
  )
}