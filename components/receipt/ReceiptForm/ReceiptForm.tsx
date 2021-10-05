import { useClickoutside } from 'hooks/useClickoutside'
import ReceiptButton from '../ReceiptButton'
import styles from './ReceiptForm.module.scss'
import ReceiptItem from '../ReceiptItem'
import ReceiptInfo from '../ReceiptInfo'
import { useCallback, useMemo, useState } from 'react'
import { usePrevious } from 'hooks/usePrevious'
import { Mode, ModeType, ReceiptItemPayloadType, ReceiptItemType } from 'types/receipt.type'

export interface ReceiptItemFormType extends ReceiptItemType {
  mode?: ModeType
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
    handleChangeMode(isEdit
      ? Mode.Plus
      : Mode.ModifyReceiptItem)
    setInnerReceiptItems(items => {
      const newItems = items.map(item => {
        if (item.id === id) {
          if (!isEdit) {
            item.mode = Mode.ModifyReceiptItem
          } else {
            delete item.mode
          }
        }
        return item
      })
      return newItems
    })
  }, [innerReceiptItems])

  const handleChangeReceiptItemInput = useCallback((key: string) => {
    return (e) => {
      let { value, valueAsNumber } = e.target
      setReceiptItemForm(item => ({
        ...item,
        [key]: valueAsNumber || value,
      }))
    }
  }, [receiptItemForm])
  
  const handleAdd = useCallback((e) => {
    e.preventDefault()
    const payload = { name: '', prices: 0, mode: Mode.AddReceiptItem }
    handleChangeMode(Mode.AddReceiptItem)
    setReceiptItemForm(payload)
    setInnerReceiptItems(items => {
      const newItems = [...items]
      newItems.unshift(payload)
      return newItems
    })
  }, [])

  const handleOk = useCallback((e) => {
    e.preventDefault()
    const getReceiptItemPayload = () => ({
      name: receiptItemForm.name,
      prices: receiptItemForm.prices,
      receiptId: receipt.id,
    })

    switch (mode) {
      case Mode.AddReceiptItem: {
        handleAddReceiptItem(getReceiptItemPayload())
        break
      }
      case Mode.ModifyReceiptItem: {
        const payload: ReceiptItemPayloadType = {
          ...getReceiptItemPayload(),
          id: receiptItemForm.id,
        }
        handleModifyReceiptItem(payload)
        break
      }
      default: {
        handleConfirmReceipt()
      }
    }
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
          handleAdd={handleAdd}
          handleOk={handleOk}
        />
      </form>
    </div>
  )
}
