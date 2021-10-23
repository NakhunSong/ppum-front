import { MouseEventHandler, ReactElement } from 'react-transition-group/node_modules/@types/react'
import styles from './Button.module.scss'

export function TextButton({
  children,
  onClick,
}: TextButtonProps) {
  return (
    <span
      className={styles.text_button}
      onClick={onClick}
    >
      {children}
    </span>
  )
}

type TextButtonProps = {
  children: any
  onClick: MouseEventHandler
}