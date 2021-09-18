import { MouseEventHandler } from 'react';
import styles from './ReceiptButton.module.scss';

export enum Mode {
  add = 'add',
  confirm = 'confirm',
}

type ReceiptButtonType = {
  mode: Mode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function ReceiptButton({
  mode,
  onClick,
}: ReceiptButtonType) {
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={onClick}
      >
        <img
          className={styles.button_icon}
          src={`/images/receipt/${mode}.svg`}
          alt={`${mode}`}
        />
      </button>
    </div>
  )
}