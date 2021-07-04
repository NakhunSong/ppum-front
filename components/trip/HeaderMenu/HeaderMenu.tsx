import styles from './HeaderMenu.module.scss';

export default function HeaderMenu({
  addMarker,
  handleAddMarker,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <img
          alt="profile"
          className={styles.image}
          src={`/images/trip/profile.svg`}
        />
      </div>
      <div className={styles.right}>
        <img
          alt="receipt"
          className={styles.image}
          src={`/images/trip/receipt.svg`}
        />
        <img
          alt="marker"
          className={styles.image}
          src={`/images/trip/marker${addMarker
            ? '_selected'
            : ''}.svg`}
          onClick={handleAddMarker}
        />
      </div>
    </div>
  )
}