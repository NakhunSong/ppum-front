import styles from './Button.module.scss';

export default function Button({ children }) {
  return (
    <button className={styles.wrapper}>
      {children}
    </button>
  )
}