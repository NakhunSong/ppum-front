import { useClickoutside } from 'hooks/useClickoutside'
import ReceiptButton from '../ReceiptButton'
import { Mode } from '../ReceiptButton/ReceiptButton'
import styles from './ReceiptForm.module.scss'
import ReceiptItem from '../ReceiptItem'
import ReceiptInfo from '../ReceiptInfo'
import { useEffect, useReducer } from 'react'

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

function init(receiptProp) {
  return {receipt: receiptProp};
}

function reducer(state, action) {
  switch (action.type) {
    case 'init': {
      return {...state, ...action.payload}
    }
    default:
      throw new Error();
  }
}

export default function ReceiptForm({
  receipt: receiptProp,
  visible,
  onAdd,
  onCancel,
  // onOk,
}) {
  const { ref } = useClickoutside(onCancel)
  const [{ receipt }, dispatch] = useReducer(reducer, receiptProp, init)
  useEffect(() => {
    dispatch({
      type: 'init',
      payload: { receipt: receiptProp },
    })
  }, [visible])

  return visible && (
    <div className={styles.wrapper}>
      <form ref={ref} className={styles.receipt_form}>
        <div className={styles.form_inner}>
          <ReceiptInfo receipt={receipt} />
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