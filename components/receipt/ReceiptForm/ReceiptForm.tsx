import { useClickoutside } from 'hooks/useClickoutside'
import ReceiptButton from '../ReceiptButton'
import { Mode } from '../ReceiptButton/ReceiptButton'
import styles from './ReceiptForm.module.scss'
import ReceiptItem from '../ReceiptItem'
import ReceiptInfo from '../ReceiptInfo'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { InputChangeEventTargetType } from 'types/common/Event'

enum ReceiptType {
  name = 'name',
  prices = 'prices',
}

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
    case 'change_receipt': {
      return {
        ...state,
        receipt: {
          ...state.receipt,
          ...action.payload,
        },
      }
    }
    case 'change_receipt_item': {
      const { id, ...rest } = action.payload
      const receiptItems = state.receipt.receiptItems.map(r => {
        if (r.id === id) {
          return {...r, ...rest}
        }
        return r
      })
      return {
        ...state,
        receipt: {
          ...state.receipt,
          receiptItems,
        },
      }
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
  const [mode, setMode] = useState('add')
  const [{ receipt }, dispatch] = useReducer(reducer, receiptProp, init)

  useEffect(() => {
    if (!visible) {
      setMode('add')
    }
    dispatch({
      type: 'init',
      payload: { receipt: receiptProp },
    })
  }, [visible])

  const handleChangeReceipt = useCallback((e: InputChangeEventTargetType, type: ReceiptType) => {
    dispatch({
      type: 'change_receipt',
      payload: {
        [type]: e.target.value,
      },
    })
    setMode('confirm')
  }, [])
  
  const handleChangeReceiptItem = useCallback((e: InputChangeEventTargetType, type: ReceiptType, id: string) => {
    dispatch({
      type: 'change_receipt_item',
      payload: {
        id,
        [type]: e.target.value,
      },
    })
    setMode('confirm')
  }, [])

  return visible && (
    <div className={styles.wrapper}>
      <form ref={ref} className={styles.receipt_form}>
        <div className={styles.form_inner}>
          <ReceiptInfo
            receipt={receipt}
            onChange={handleChangeReceipt}
          />
          <ReceiptItem
            receiptItems={receipt.receiptItems}
            onChange={handleChangeReceiptItem}
          />
        </div>
        <ReceiptButton
          mode={Mode[mode]}
          onAdd={onAdd}
        />
      </form>
    </div>
  )
}