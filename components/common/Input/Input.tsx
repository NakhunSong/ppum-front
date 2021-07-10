import classNames from 'classnames';
import { ChangeEventHandler } from 'react';
import styles from './Input.module.scss';

type InputWrapper = {
  children: any;
  marginBottom?: any;
}

type InputType = {
  styleProps?: any,
  value?: any,
  onChange?: ChangeEventHandler<HTMLInputElement>,
}

function InputWrapper({ children, marginBottom }: InputWrapper): any {
  return (
    <div className={
      classNames(styles.wrapper, {
        [styles.margin__bottom]: marginBottom
      })}>
      {children}
    </div>
  )
}

export default function Input({
  styleProps,
  value,
  onChange,
}: InputType) {
  return (
    <input
      className={styles.input}
      style={styleProps}
      value={value}
      onChange={onChange}
    />
  )
}

Input.InputWrapper = InputWrapper;