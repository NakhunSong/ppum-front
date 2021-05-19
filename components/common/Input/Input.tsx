import classNames from 'classnames';
import styles from './Input.module.scss';

export type InputWrapper = {
  children: any;
  marginBottom?: any;
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
  value,
  onChange,
}) {
  return (
    <input
      className={styles.input}
      value={value}
      onChange={onChange}
    />
  )
}

Input.InputWrapper = InputWrapper;