import { useClickoutside } from 'hooks/useClickoutside'
import ReceiptButton from '../ReceiptButton'
import styles from './ReceiptForm.module.scss'
import ReceiptItem from '../ReceiptItem'
import ReceiptInfo from '../ReceiptInfo'
import { useCallback, useMemo, useState } from 'react'
import { usePrevious } from 'hooks/usePrevious'
import { ReceiptItemPayloadType, ReceiptItemType } from 'types/receipt.type'

export interface ReceiptItemFormType extends ReceiptItemType {
  isEdit?: boolean
}

export default function ReceiptForm({
  receipt,
  visible,
  mode,
  handleChangeMode,
  onCancel,
  onChange,
  handleConfirmReceipt,
  handleAddReceiptItem,
  handleModifyReceiptItem,
}) {
  if (!visible) return null

  const { ref } = useClickoutside(onCancel)

  const receiptItems = useMemo(() => receipt.receiptItems, [receipt])
  const preReceiptItems = usePrevious(receiptItems)
  const [receiptItemForm, setReceiptItemForm] = useState<ReceiptItemFormType>(null)
  const [innerReceiptItems, setInnerReceiptItems] = useState<ReceiptItemFormType[]>(receiptItems)
  
  if (receiptItems !== innerReceiptItems && receiptItems !== preReceiptItems) {
    setInnerReceiptItems(receiptItems)
  }

  const handleClickReceiptItemModifyButton = useCallback((e, id: string, isEdit: boolean) => {
    e.stopPropagation()
    if (!isEdit) {
      setReceiptItemForm(innerReceiptItems.find(i => i.id === id))
    }
    handleChangeMode(`${isEdit ? 'create' : 'modify'}_receipt_item`)
    setInnerReceiptItems(items => {
      const newItems = items.map(i => {
        if (i.id === id) {
          if (!isEdit) {
            i.isEdit = true
          } else {
            delete i.isEdit
          }
        }
        return i
      })
      return newItems
    })
  }, [innerReceiptItems])

  const handleChangeReceiptItemInput = useCallback((key: string) => {
    return (e) => {
      console.log(e.target.value)
      setReceiptItemForm(item => ({
        ...item,
        [key]: e.target.value,
      }))
    }
  }, [receiptItemForm])
  

  const handleOk = useCallback((e) => {
    e.preventDefault()
    const getReceiptItemPayload = () => ({
      name: receiptItemForm.name,
      prices: receiptItemForm.prices,
      receiptId: receipt.id,
    })

    if (mode === 'add_receipt_item') {
      handleAddReceiptItem(receiptItemForm)
    }

    if (mode === 'modify_receipt_item') {
      const payload: ReceiptItemPayloadType = {
        ...getReceiptItemPayload(),
        id: receiptItemForm.id,
      }
      handleModifyReceiptItem(payload)
    }

    handleConfirmReceipt()
  }, [mode, handleConfirmReceipt, receipt, receiptItemForm])

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
            receiptItems={innerReceiptItems}
            receiptItemForm={receiptItemForm}
            onChange={handleChangeReceiptItemInput}
            onClick={handleClickReceiptItemModifyButton}
          />
        </div>
        <ReceiptButton
          mode={mode}
          onClick={handleOk}
        />
      </form>
    </div>
  )
}
