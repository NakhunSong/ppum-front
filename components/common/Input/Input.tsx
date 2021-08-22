import classNames from 'classnames'
import { ChangeEventHandler } from 'react'
import styles from './Input.module.scss'

type InputWrapper = {
  children: any,
  marginBottom?: any,
}

type InputType = {
  placeholder?: string,
  styleProps?: any,
  value?: any,
  type?: string,
  onChange?: ChangeEventHandler<HTMLInputElement>,
}

function InputWrapper({ children, marginBottom }: InputWrapper): any {
  return (
    <div className={
      classNames(styles.wrapper, {
        [styles.margin_bottom]: marginBottom
      })}>
      {children}
    </div>
  )
}

export default function Input(props: InputType) {
  const {
    styleProps,
    value,
    onChange,
    ...others
  } = props
  return (
    <input
      {...others}
      className={styles.input}
      style={styleProps}
      value={value}
      onChange={onChange}
    />
  )
}

Input.InputWrapper = InputWrapper