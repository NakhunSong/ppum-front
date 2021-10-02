import styles from './Button.module.scss'

export function TextButton({ children, onClick }) {
  return (
    <span
      className={styles.text_button}
      onClick={onClick}
    >
      {children}
    </span>
  )
}