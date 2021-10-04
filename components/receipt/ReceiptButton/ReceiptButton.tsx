import { MouseEventHandler, useMemo } from 'react';
import { Mode, ModeType } from 'types/receipt.type';
import styles from './ReceiptButton.module.scss';

type ReceiptButtonType = {
  mode: ModeType;
  handleAdd: MouseEventHandler<HTMLButtonElement>;
  handleOk: MouseEventHandler<HTMLButtonElement>;
}

export default function ReceiptButton({
  mode,
  handleAdd,
  handleOk,
}: ReceiptButtonType) {
  const isAdd = useMemo(() => {
    return mode === Mode.Plus
  }, [mode])
  const icon = useMemo(() => {
    if (isAdd) {
      return 'add'
    }
    return 'confirm'
  }, [isAdd])

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={isAdd ? handleAdd : handleOk}
      >
        <img
          className={styles.button_icon}
          src={`/images/receipt/${icon}.svg`}
          alt={`${mode}`}
        />
      </button>
    </div>
  )
}