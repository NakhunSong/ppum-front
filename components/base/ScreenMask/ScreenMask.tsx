import styles from './ScreenMask.module.scss'

export default function ScreenMask({ children }) {
  return (
    <div className={styles.wrapper}>
      {children}
      <div className={styles.opacity} />
    </div>
  )
}