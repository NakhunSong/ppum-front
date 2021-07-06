import classNames from "classnames";
import styles from './KakaoMap.module.scss';

export default function kakaoMap({ draggingMarker }) {
  return (
    <div
      id="map"
      className={classNames(styles.wrapper, {
        [styles.draggingMarker]: draggingMarker,
      })}
    />
  );
}