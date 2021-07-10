import { MouseEventHandler } from 'react';
import styles from './ReceiptButton.module.scss';

export enum Mode {
  add = 'add',
  confirm = 'confirm',
}

type ReceiptButtonType = {
  mode: Mode;
  onAdd: MouseEventHandler<HTMLButtonElement>;
}

export default function ReceiptButton({
  mode,
  onAdd,
}: ReceiptButtonType) {
  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={onAdd}
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