import { EventHandler } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  children: any,
  onClick?: EventHandler<any>,
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button className={styles.wrapper} onClick={onClick}>
      {children}
    </button>
  )
}