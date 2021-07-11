import { useClickoutside } from 'hooks/useClickoutside'
import ReceiptButton from '../ReceiptButton'
import { Mode } from '../ReceiptButton/ReceiptButton'
import styles from './ReceiptForm.module.scss'
import ReceiptItem from '../ReceiptItem'
import ReceiptInfo from '../ReceiptInfo'

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
          <ReceiptInfo receipt="" />
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