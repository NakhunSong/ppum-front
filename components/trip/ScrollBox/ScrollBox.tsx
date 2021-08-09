import styles from './ScrollBox.module.scss'

export default function ScrollBox({ children, targetRef, scrollerRef }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.target} ref={targetRef} />
      <div className={styles.scroller} ref={scrollerRef}>
        {children}
      </div>
    </div>
  )
}