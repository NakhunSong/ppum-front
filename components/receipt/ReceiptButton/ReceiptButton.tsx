import { MouseEventHandler } from 'react';
import { Mode } from 'types/receipt.type';
import styles from './ReceiptButton.module.scss';

type ReceiptButtonType = {
  mode: Mode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export default function ReceiptButton({
  mode,
  onClick,
}: ReceiptButtonType) {
  const isAdd = (mode: Mode) => {
    if (mode.includes('add_receipt_item')) {
      return 'add'
    }
    return 'confirm'
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={onClick}
      >
        <img
          className={styles.button_icon}
          src={`/images/receipt/${isAdd(mode)}.svg`}
          alt={`${mode}`}
        />
      </button>
    </div>
  )
}