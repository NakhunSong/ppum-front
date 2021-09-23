import { useClickoutside } from 'hooks/useClickoutside'
import ReceiptButton from '../ReceiptButton'
import styles from './ReceiptForm.module.scss'
import ReceiptItem from '../ReceiptItem'
import ReceiptInfo from '../ReceiptInfo'

export default function ReceiptForm({
  receipt,
  visible,
  mode,
  handleChangeMode,
  onCancel,
  onChange,
  onOk,
}) {
  const { ref } = useClickoutside(onCancel)

  if (!visible) return null

  return (
    <div className={styles.wrapper}>
      <form ref={ref} className={styles.receipt_form}>
        <div className={styles.form_inner}>
          <ReceiptInfo
            mode={mode}
            receipt={receipt}
            onChange={onChange}
            handleChangeMode={handleChangeMode}
          />
          <ReceiptItem
            receiptItems={receipt.receiptItems}
            onChange={onChange}
          />
        </div>
        <ReceiptButton
          mode={mode}
          onClick={onOk}
        />
      </form>
    </div>
  )
}
