import { useClickoutside } from 'hooks/useClickoutside'
import ReceiptButton from '../ReceiptButton'
import ReceiptItem from '../ReceiptItem'
import { Mode } from '../ReceiptButton/ReceiptButton'
import styles from './ReceiptForm.module.scss'

export const initialReceipt = {
  location: { lat: 0, lng: 0 },
  name: '',
  prices: 0,
  receiptItems: [],
}

export const initialReceiptItem = {
  name: '',
  price: 0,
  prices: 0,
}

export default function ReceiptForm({
  receipt,
  visible,
  onAdd,
  onCancel,
  // onOk,
}) {
  const { ref } = useClickoutside(onCancel)
  
  return visible && (
    <div className={styles.wrapper}>
      <form ref={ref} className={styles.receipt_form}>
        <div className={styles.form_inner}>
          <div className={styles.receipt_info_wrapper}>
            <div className={styles.form_wrapper_label}>
              <span>
                영수증
              </span>
            </div>
            <div className={styles.input_wrapper}>
              <input
                className={styles.input}
                placeholder="장소명"
              />
            </div>
            <div className={styles.input_wrapper}>
              <input
                className={styles.input}
                placeholder="총 금액"
              />
            </div>
          </div>
          <ReceiptItem receiptItems={receipt.receiptItems} />
        </div>
        <ReceiptButton
          mode={Mode.add}
          onAdd={onAdd}
        />
      </form>
    </div>
  )
}